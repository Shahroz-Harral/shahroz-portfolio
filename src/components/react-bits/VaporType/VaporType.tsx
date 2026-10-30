"use client";

import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
} from "react";
import * as THREE from "three";

export type VaporSweep = "left" | "right" | "center" | "top" | "scatter";
export type VaporAlign = "start" | "center" | "end";
export type VaporArea = "parent" | "self" | "window";

export interface VaporTypeProps {
  words?: string[];
  as?: ElementType;
  align?: VaporAlign;
  color?: string;
  vaporColor?: string;
  density?: number;
  particleSize?: number;
  spread?: number;
  rise?: number;
  turbulence?: number;
  diffusion?: number;
  grain?: number;
  sweep?: VaporSweep;
  stagger?: number;
  condense?: number;
  hold?: number;
  dissolve?: number;
  overlap?: number;
  loop?: boolean;
  startOnView?: boolean;
  interactive?: boolean;
  breath?: number;
  breathRadius?: number;
  recovery?: number;
  clickAdvance?: boolean;
  pauseOnHover?: boolean;
  area?: VaporArea;
  paused?: boolean;
  dpr?: number;
  onWordChange?: (index: number) => void;
  className?: string;
  style?: CSSProperties;
}

export interface VaporTypeRef {
  next: () => void;
  replay: () => void;
}

const DEFAULT_WORDS = ["Imagine", "Create", "Inspire"];
const SWEEP_MODES: VaporSweep[] = ["left", "right", "center", "top", "scatter"];

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));

const subscribeMotionPreference = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const srOnlyStyle: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const gridStyle: CSSProperties = {
  display: "grid",
};

const transformText = (text: string, transform: string) => {
  if (transform === "uppercase") return text.toUpperCase();
  if (transform === "lowercase") return text.toLowerCase();
  if (transform === "capitalize") {
    return text.replace(/(^|\s)(\S)/gu, (_match, prefix, char) => `${prefix}${char.toUpperCase()}`);
  }
  return text;
};

const vertexQuadShader = `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const simFragmentShader = `
precision highp float;

uniform sampler2D uPrevious;
uniform vec2 uResolution;
uniform vec2 uCanvas;
uniform float uFollow;
uniform float uDrain;
uniform vec2 uFrom;
uniform vec2 uTo;
uniform float uRadius;
uniform float uAmount;
uniform vec2 uWind;

float segmentDistance(vec2 p, vec2 a, vec2 b) {
  vec2 e = b - a;
  float t = clamp(dot(p - a, e) / max(dot(e, e), 1e-4), 0.0, 1.0);
  return length(p - a - e * t);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = (uv - 0.5) * uCanvas;
  vec4 previous = texture2D(uPrevious, uv);
  float d = segmentDistance(p, uFrom, uTo) / uRadius;
  float paint = exp(-d * d * 2.0) * uAmount;
  float target = max(previous.a - uDrain, paint);
  float strength = previous.r + (target - previous.r) * uFollow;
  vec2 wind = mix(previous.gb, uWind, clamp(paint * 3.0, 0.0, 1.0));
  gl_FragColor = vec4(max(strength, 0.0), wind, max(target, 0.0));
}
`;

const commonShaderChunk = `
uniform vec2 uCanvas;
uniform vec4 uBounds;
uniform vec2 uOrigin;
uniform float uSweep;
uniform float uStagger;
uniform float uPhase;
uniform float uMode;
uniform float uGrain;
uniform float uDpr;
uniform float uEm;
uniform float uBreath;
uniform sampler2D uField;

const float TRAVEL = 0.75;

float hash12(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = hash12(i);
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float orderAt(vec2 p) {
  vec2 size = max(uBounds.zw - uBounds.xy, vec2(1.0));
  vec2 q = clamp((p - uBounds.xy) / size, 0.0, 1.0);
  float o;
  if (uSweep < 0.5) {
    o = q.x;
  } else if (uSweep < 1.5) {
    o = 1.0 - q.x;
  } else if (uSweep < 2.5) {
    o = abs(q.x - 0.5) * 2.0;
  } else if (uSweep < 3.5) {
    o = 1.0 - q.y;
  } else if (uSweep < 4.5) {
    o = noise(p / (uEm * 0.5) + 3.7);
  } else {
    o = clamp(length(p - uOrigin) / max(length(size), 1.0) * 1.5, 0.0, 1.0);
  }
  return clamp(mix(o, noise(p / (uEm * 0.35) + 11.0), 0.2), 0.0, 1.0);
}

float frontAt(vec2 p) {
  if (abs(uMode - 1.0) < 0.5) return 0.0;
  float t = clamp(uPhase * (1.0 + uStagger) - orderAt(p) * uStagger, 0.0, 1.0);
  t = t * t * (3.0 - 2.0 * t);
  return uMode < 0.5 ? 1.0 - t : t;
}

float releaseAt(vec2 p) {
  float g = noise(p / uGrain) * 0.6 + hash12(floor(p * uDpr) + 0.5) * 0.4;
  return 0.02 + 0.98 * clamp((g - 0.5) * 1.4 + 0.5, 0.0, 1.0);
}

vec4 fieldAt(vec2 p) {
  return texture2D(uField, p / uCanvas + 0.5);
}

float blowAt(float strength) {
  return clamp(strength * uBreath - 0.03, 0.0, 0.6);
}

vec3 toSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}
`;

const textVertexShader = `
varying vec2 vUv;
varying vec2 vWorld;

void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xy;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const textFragmentShader = `
precision highp float;
${commonShaderChunk}
uniform sampler2D uText;
uniform vec3 uColor;
varying vec2 vUv;
varying vec2 vWorld;

void main() {
  float ink = texture2D(uText, vUv).a;
  if (ink < 0.004) discard;
  float lift = max(frontAt(vWorld), blowAt(fieldAt(vWorld).r));
  if (lift >= releaseAt(vWorld) * (1.0 - TRAVEL)) discard;
  gl_FragColor = vec4(toSrgb(uColor), ink);
}
`;

const particleVertexShader = `
${commonShaderChunk}
attribute vec4 aSeed;
uniform float uTime;
uniform float uSpread;
uniform float uRise;
uniform float uTurbulence;
uniform float uDiffusion;
uniform float uSize;
varying float vAlpha;
varying float vTint;

vec2 flow(vec2 p, float t) {
  p += 0.45 * sin(p.yx * vec2(1.3, 1.7) + vec2(t * 0.21, -t * 0.17));
  vec2 v = vec2(0.0);
  vec2 k = normalize(vec2(1.0, 0.6));
  v += vec2(k.y, -k.x) * cos(dot(k, p) * 1.1 + t * 0.55 + 1.3);
  k = normalize(vec2(-0.7, 1.1));
  v += vec2(k.y, -k.x) * cos(dot(k, p) * 1.9 - t * 0.47 + 4.1) * 0.55;
  k = normalize(vec2(1.3, -0.4));
  v += vec2(k.y, -k.x) * cos(dot(k, p) * 3.3 + t * 0.71 + 2.2) * 0.3;
  return v;
}

void main() {
  vec2 home = position.xy;
  vec4 field = fieldAt(home);
  float front = frontAt(home);
  float blow = blowAt(field.r);
  float s = clamp((max(front, blow) - releaseAt(home) * (1.0 - TRAVEL)) / TRAVEL, 0.0, 1.0);
  if (s <= 0.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vAlpha = 0.0;
    vTint = 0.0;
    return;
  }
  float blown = smoothstep(-0.04, 0.04, blow - front);
  float eased = uMode < 0.5 ? s * s : 1.0 - (1.0 - s) * (1.0 - s);
  eased = mix(eased, s, blown);
  float angle = aSeed.x * 6.2831853;
  vec2 jitter = vec2(cos(angle), sin(angle) * 0.7);
  vec2 drift = mix(vec2(0.0, uRise), field.gb * 2.2 + vec2(0.0, uRise * 0.3), blown);
  float reach = uSpread * eased * (0.3 + 0.7 * sqrt(aSeed.y));
  float stride = reach / 6.0;
  vec2 p = home;
  for (int i = 0; i < 6; i++) {
    vec2 f = flow(p / uEm * 0.9 + aSeed.z * 0.06, uTime);
    vec2 direction = drift + f * uTurbulence + jitter * uDiffusion * (0.2 + s);
    p += direction / max(length(direction), 0.35) * stride;
  }
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 0.0, 1.0);
  gl_PointSize = max(uSize * uDpr * mix(1.0, 1.25, s), 1.0);
  vAlpha = (1.0 - smoothstep(mix(0.45, 0.7, blown), 1.0, s)) * (0.5 + 0.5 * aSeed.w);
  vTint = smoothstep(0.0, 0.5, s);
}
`;

const particleFragmentShader = `
precision highp float;
uniform vec3 uColor;
uniform vec3 uVaporColor;
varying float vAlpha;
varying float vTint;

vec3 toSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  float d = length(gl_PointCoord - 0.5);
  float soft = 1.0 - smoothstep(0.3, 0.5, d);
  vec3 color = mix(uColor, uVaporColor, vTint);
  gl_FragColor = vec4(toSrgb(color), vAlpha * soft);
}
`;

const createRenderTarget = (width: number, height: number) => {
  return new THREE.WebGLRenderTarget(width, height, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
  });
};

const disposeWordData = (item: { texture: THREE.Texture; geometry: THREE.BufferGeometry }) => {
  item.texture.dispose();
  item.geometry.dispose();
};

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export const VaporType = forwardRef<VaporTypeRef, VaporTypeProps>(function VaporType(
  {
    words = DEFAULT_WORDS,
    as: Component = "span",
    align = "center",
    color = "currentColor",
    vaporColor = "#B19EEF",
    density = 1,
    particleSize = 1.2,
    spread = 1.2,
    rise = 1,
    turbulence = 0.8,
    diffusion = 0.35,
    grain = 1,
    sweep = "left",
    stagger = 0.8,
    condense = 1.8,
    hold = 2.4,
    dissolve = 2,
    overlap = 0.6,
    loop = true,
    startOnView = true,
    interactive = true,
    breath = 1,
    breathRadius = 0.8,
    recovery = 1.2,
    clickAdvance = true,
    pauseOnHover = true,
    area = "parent",
    paused = false,
    dpr = 2,
    onWordChange,
    className,
    style,
  },
  ref
) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLSpanElement>(null);
  const engineRef = useRef<{
    sync: () => void;
    next: () => void;
    replay: () => void;
    destroy: () => void;
  } | null>(null);

  const isReducedMotion = useSyncExternalStore(subscribeMotionPreference, getReducedMotionSnapshot, () => false);
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  const shouldRenderStatic = isReducedMotion || isFallbackMode;

  const validWords = useMemo(() => {
    const list = words.map((w) => w.trim()).filter(Boolean);
    return list.length ? list : DEFAULT_WORDS;
  }, [words]);

  const currentProps = {
    words: validWords,
    align,
    color,
    vaporColor,
    density,
    particleSize,
    spread,
    rise,
    turbulence,
    diffusion,
    grain,
    sweep,
    stagger,
    condense,
    hold,
    dissolve,
    overlap,
    loop,
    startOnView,
    interactive,
    breath,
    breathRadius,
    recovery,
    clickAdvance,
    pauseOnHover,
    area,
    paused,
    dpr,
    onWordChange,
  };

  const propsRef = useRef(currentProps);
  useEffect(() => {
    propsRef.current = currentProps;
    engineRef.current?.sync();
  });

  useEffect(() => {
    if (shouldRenderStatic) return;
    const container = containerRef.current;
    const canvasWrap = canvasWrapRef.current;
    if (!container || !canvasWrap) return;

    const setupEngine = (
      hostEl: HTMLElement,
      wrapEl: HTMLElement,
      refProps: React.RefObject<typeof currentProps>
    ) => {
      let renderer: THREE.WebGLRenderer;
      const doc = hostEl.ownerDocument;
      const canvas = doc.createElement("canvas");
      canvas.style.cssText = "position:absolute;left:0;top:0;display:block;pointer-events:none";

      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          premultipliedAlpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        return null;
      }

      wrapEl.appendChild(canvas);
      renderer.setPixelRatio(1);
      renderer.setClearColor(0, 0);

      const commonUniforms = {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uStagger: { value: 1 },
        uGrain: { value: 2 },
        uDpr: { value: 1 },
        uEm: { value: 16 },
        uBreath: { value: 1 },
        uField: { value: null as THREE.Texture | null },
        uColor: { value: new THREE.Color(1, 1, 1) },
      };

      const particleUniforms = {
        uTime: { value: 0 },
        uSpread: { value: 40 },
        uRise: { value: 1 },
        uTurbulence: { value: 1 },
        uDiffusion: { value: 0.35 },
        uSize: { value: 1.2 },
        uVaporColor: { value: new THREE.Color(1, 1, 1) },
      };

      const simUniforms = {
        uPrevious: { value: null as THREE.Texture | null },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uCanvas: commonUniforms.uCanvas,
        uFollow: { value: 1 },
        uDrain: { value: 0 },
        uFrom: { value: new THREE.Vector2() },
        uTo: { value: new THREE.Vector2() },
        uRadius: { value: 40 },
        uAmount: { value: 0 },
        uWind: { value: new THREE.Vector2() },
      };

      const simMaterial = new THREE.ShaderMaterial({
        uniforms: simUniforms,
        vertexShader: vertexQuadShader,
        fragmentShader: simFragmentShader,
        depthTest: false,
        depthWrite: false,
      });

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
      const planeGeom = new THREE.PlaneGeometry(1, 1);
      const emptyGeom = new THREE.BufferGeometry();

      const createWordSlot = () => {
        const own = {
          uBounds: { value: new THREE.Vector4(0, 0, 1, 1) },
          uOrigin: { value: new THREE.Vector2() },
          uSweep: { value: 0 },
          uPhase: { value: 0 },
          uMode: { value: 1 },
          uText: { value: null as THREE.Texture | null },
        };

        const textMaterial = new THREE.ShaderMaterial({
          uniforms: { ...commonUniforms, ...own },
          vertexShader: textVertexShader,
          fragmentShader: textFragmentShader,
          transparent: true,
          depthTest: false,
          depthWrite: false,
        });

        const particleMaterial = new THREE.ShaderMaterial({
          uniforms: { ...commonUniforms, ...particleUniforms, ...own },
          vertexShader: particleVertexShader,
          fragmentShader: particleFragmentShader,
          transparent: true,
          depthTest: false,
          depthWrite: false,
        });

        const text = new THREE.Mesh(planeGeom, textMaterial);
        text.frustumCulled = false;
        text.visible = false;

        const points = new THREE.Points(emptyGeom, particleMaterial);
        points.frustumCulled = false;
        points.renderOrder = 1;
        points.visible = false;

        scene.add(text, points);

        return {
          own,
          text,
          points,
          textMaterial,
          particleMaterial,
          word: -1,
          mode: 1,
          elapsed: 0,
          radial: false,
        };
      };

      const slots = [createWordSlot(), createWordSlot()];

      const simScene = new THREE.Scene();
      const simMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial);
      simMesh.frustumCulled = false;
      simScene.add(simMesh);

      const scratchCanvas = doc.createElement("canvas");
      scratchCanvas.width = 1;
      scratchCanvas.height = 1;
      const ctx2d = scratchCanvas.getContext("2d", { willReadFrequently: true });
      const segmenter =
        typeof Intl !== "undefined" && "Segmenter" in Intl
          ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
          : null;

      let renderTargets: THREE.WebGLRenderTarget[] = [];
      let targetIndex = 0;
      let wordData: Array<{
        texture: THREE.CanvasTexture;
        geometry: THREE.BufferGeometry;
        center: [number, number];
        size: [number, number];
        bounds: [number, number, number, number];
      }> = [];
      let layoutHash = "";
      let colorHash = "";
      let canvasW = 0;
      let canvasH = 0;
      let dprVal = 1;
      let emVal = 16;
      let fontCounter = 0;
      let fontsReady = false;
      let activeSlot = 0;
      let isAnimRunning = false;
      let isVisible = false;
      let isContextLost = false;
      let isDestroyed = false;
      let rafId = 0;
      let idleTimerId = 0;
      let lastTimestamp = 0;
      let elapsedSimTime = 0;
      let lastBlowTime = -Infinity;
      let triggerNext = false;
      let targetReplayWord = -1;
      let clickPosition: { x: number; y: number } | null = null;

      const pointerState = {
        x: 0,
        y: 0,
        fromX: 0,
        fromY: 0,
        vx: 0,
        vy: 0,
        at: 0,
        fresh: true,
        moved: false,
        over: false,
      };

      const sampleColor = (colorStr: string, fallback: string, outColor: THREE.Color) => {
        if (!ctx2d) return;
        ctx2d.clearRect(0, 0, 1, 1);
        ctx2d.fillStyle = fallback;
        ctx2d.fillStyle = colorStr;
        ctx2d.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx2d.getImageData(0, 0, 1, 1).data;
        outColor.setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
      };

      const syncColors = () => {
        const props = refProps.current;
        if (!props) return false;
        const hostColor =
          props.color === "currentColor" ? getComputedStyle(hostEl).color : props.color;
        const vaporCol = props.vaporColor === "currentColor" ? hostColor : props.vaporColor;
        const key = `${hostColor}|${vaporCol}`;
        if (key !== colorHash) {
          colorHash = key;
          sampleColor(hostColor, "#ffffff", commonUniforms.uColor.value);
          sampleColor(vaporCol, hostColor, particleUniforms.uVaporColor.value);
          return true;
        }
        return false;
      };

      const assignWordToSlot = (slot: (typeof slots)[0], index: number) => {
        const data = wordData[index];
        slot.word = index;
        if (!data) {
          slot.text.visible = false;
          slot.points.visible = false;
          return;
        }
        slot.own.uText.value = data.texture;
        slot.own.uBounds.value.set(...data.bounds);
        slot.text.position.set(data.center[0], data.center[1], 0);
        slot.text.scale.set(data.size[0], data.size[1], 1);
        slot.text.visible = true;
        slot.points.geometry = data.geometry;
        slot.points.visible = true;
      };

      const resetSlot = (slot: (typeof slots)[0]) => {
        slot.word = -1;
        slot.text.visible = false;
        slot.points.visible = false;
        slot.points.geometry = emptyGeom;
        slot.own.uText.value = null;
      };

      const updateLayoutAndRasterize = () => {
        if (isContextLost) return false;
        const props = refProps.current;
        if (!props) return false;

        const wrapRect = wrapEl.getBoundingClientRect();
        if (wrapRect.width < 1 || wrapRect.height < 1) return false;

        const compStyle = getComputedStyle(hostEl);
        const targetDpr = Math.min(props.dpr ?? 1.5, 1.5);
        const pixelRatio = Math.min(window.devicePixelRatio || 1, Math.max(targetDpr, 0.5));
        const wordSpans = Array.from(hostEl.querySelectorAll<HTMLSpanElement>("[data-vapor-word]"));

        const hash = [
          Math.round(4 * wrapRect.width),
          Math.round(4 * wrapRect.height),
          pixelRatio,
          fontCounter,
          compStyle.fontStyle,
          compStyle.fontVariantCaps,
          compStyle.fontWeight,
          compStyle.fontSize,
          compStyle.fontFamily,
          compStyle.letterSpacing,
          compStyle.textTransform,
          compStyle.direction,
          props.density,
          props.align,
          wordSpans.map((el) => el.textContent ?? "").join("\0"),
        ].join("|");

        if (hash === layoutHash) return false;
        layoutHash = hash;
        dprVal = pixelRatio;
        emVal = Number.parseFloat(compStyle.fontSize) || 16;

        const physicalW = Math.max(2, 2 * Math.ceil((wrapRect.width * dprVal) / 2));
        const physicalH = Math.max(2, 2 * Math.ceil((wrapRect.height * dprVal) / 2));
        canvasW = physicalW / dprVal;
        canvasH = physicalH / dprVal;

        renderer.setSize(physicalW, physicalH, false);
        canvas.style.width = `${canvasW}px`;
        canvas.style.height = `${canvasH}px`;

        camera.left = -canvasW / 2;
        camera.right = canvasW / 2;
        camera.top = canvasH / 2;
        camera.bottom = -canvasH / 2;
        camera.updateProjectionMatrix();

        commonUniforms.uCanvas.value.set(canvasW, canvasH);
        commonUniforms.uDpr.value = dprVal;
        commonUniforms.uEm.value = emVal;

        const simW = Math.max(8, Math.ceil(canvasW / 6));
        const simH = Math.max(8, Math.ceil(canvasH / 6));

        renderTargets.forEach((rt) => rt.dispose());
        renderTargets = [createRenderTarget(simW, simH), createRenderTarget(simW, simH)];
        simUniforms.uResolution.value.set(simW, simH);

        for (const rt of renderTargets) {
          renderer.setRenderTarget(rt);
          renderer.clear();
        }
        renderer.setRenderTarget(null);
        targetIndex = 0;
        commonUniforms.uField.value = renderTargets[0].texture;

        const fontSpec = [
          compStyle.fontStyle,
          compStyle.fontVariantCaps === "small-caps" ? "small-caps" : "",
          compStyle.fontWeight,
          `${emVal}px`,
          compStyle.fontFamily,
        ]
          .filter(Boolean)
          .join(" ");

        const letterSpacingPx = Number.parseFloat(compStyle.letterSpacing) || 0;
        const textDir = compStyle.direction === "rtl" ? "rtl" : "ltr";
        const range = doc.createRange();

        wordData.forEach(disposeWordData);
        wordData = [];

        wordSpans.forEach((spanEl, wordIdx) => {
          const textNode = spanEl.firstChild;
          if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
          const rawText = (textNode as Text).data;
          const segments = segmenter
            ? Array.from(segmenter.segment(rawText), (s) => s.segment)
            : Array.from(rawText);

          const lines: Array<{ top: number; bottom: number; left: number; right: number; text: string }> = [];
          let charOffset = 0;

          for (const seg of segments) {
            range.setStart(textNode, charOffset);
            range.setEnd(textNode, charOffset + seg.length);
            charOffset += seg.length;
            const r = range.getBoundingClientRect();
            if (r.width <= 0 || r.height <= 0) continue;

            const prev = lines[lines.length - 1];
            if (prev && r.top < prev.bottom - 0.5 * r.height) {
              prev.text += seg;
              prev.left = Math.min(prev.left, r.left);
              prev.right = Math.max(prev.right, r.right);
              prev.top = Math.min(prev.top, r.top);
              prev.bottom = Math.max(prev.bottom, r.bottom);
            } else {
              lines.push({ top: r.top, bottom: r.bottom, left: r.left, right: r.right, text: seg });
            }
          }

          if (!lines.length) return;

          const padding = 0.3 * emVal;
          const minLeft = Math.min(...lines.map((l) => l.left)) - wrapRect.left - padding;
          const minTop = Math.min(...lines.map((l) => l.top)) - wrapRect.top - padding;
          const maxRight = Math.max(...lines.map((l) => l.right)) - wrapRect.left + padding;
          const maxBottom = Math.max(...lines.map((l) => l.bottom)) - wrapRect.top + padding;

          const snappedLeft = Math.floor(minLeft * dprVal) / dprVal;
          const snappedTop = Math.floor(minTop * dprVal) / dprVal;
          const canvasWidthPx = Math.max(1, Math.ceil((maxRight - snappedLeft) * dprVal));
          const canvasHeightPx = Math.max(1, Math.ceil((maxBottom - snappedTop) * dprVal));

          const wCanvas = doc.createElement("canvas");
          wCanvas.width = canvasWidthPx;
          wCanvas.height = canvasHeightPx;
          const wCtx = wCanvas.getContext("2d", { willReadFrequently: true });
          if (!wCtx) return;

          wCtx.setTransform(dprVal, 0, 0, dprVal, -snappedLeft * dprVal, -snappedTop * dprVal);
          wCtx.font = fontSpec;
          wCtx.fillStyle = "#ffffff";
          wCtx.textAlign = "left";
          wCtx.textBaseline = "alphabetic";
          wCtx.direction = textDir as CanvasDirection;
          wCtx.letterSpacing = `${letterSpacingPx}px`;

          for (const line of lines) {
            const transformed = transformText(line.text.replace(/\s+$/u, ""), compStyle.textTransform);
            if (!transformed) continue;
            const metrics = wCtx.measureText(transformed);
            const ascent = metrics.fontBoundingBoxAscent || 0.8 * emVal;
            const descent = metrics.fontBoundingBoxDescent || 0.2 * emVal;
            const baseline = line.top + ((line.bottom - line.top) * ascent) / (ascent + descent);
            wCtx.fillText(transformed, line.left - wrapRect.left, baseline - wrapRect.top);
          }

          const imgPixels = wCtx.getImageData(0, 0, canvasWidthPx, canvasHeightPx).data;
          const stepSize = 1 / Math.sqrt(clamp(props.density, 0.1, 4));

          let rngState = Math.imul(wordIdx + 1, 0x9e3779b1) >>> 0 || 1;
          const nextRng = () => {
            rngState ^= rngState << 13;
            rngState ^= rngState >>> 17;
            rngState ^= rngState << 5;
            return (rngState >>>= 0) / 0x100000000;
          };

          const pointPositions: number[] = [];
          const planeWidth = canvasWidthPx / dprVal;
          const planeHeight = canvasHeightPx / dprVal;
          let minX = Infinity;
          let minY = Infinity;
          let maxX = -Infinity;
          let maxY = -Infinity;

          for (let y = stepSize / 2; y < planeHeight; y += stepSize) {
            for (let x = stepSize / 2; x < planeWidth; x += stepSize) {
              const px = x + (nextRng() - 0.5) * stepSize;
              const py = y + (nextRng() - 0.5) * stepSize;
              const ix = Math.min(canvasWidthPx - 1, Math.max(0, Math.floor(px * dprVal)));
              const iy = Math.min(canvasHeightPx - 1, Math.max(0, Math.floor(py * dprVal)));

              if (imgPixels[(iy * canvasWidthPx + ix) * 4 + 3] < 96) continue;

              const worldX = snappedLeft + px - canvasW / 2;
              const worldY = canvasH / 2 - (snappedTop + py);

              pointPositions.push(worldX, worldY, 0);
              minX = Math.min(minX, worldX);
              maxX = Math.max(maxX, worldX);
              minY = Math.min(minY, worldY);
              maxY = Math.max(maxY, worldY);
            }
          }

          const vertexCount = pointPositions.length / 3;
          const seedArray = new Float32Array(4 * vertexCount);
          for (let i = 0; i < seedArray.length; i++) {
            seedArray[i] = nextRng();
          }

          const geom = new THREE.BufferGeometry();
          geom.setAttribute("position", new THREE.Float32BufferAttribute(pointPositions, 3));
          geom.setAttribute("aSeed", new THREE.Float32BufferAttribute(seedArray, 4));

          const texture = new THREE.CanvasTexture(wCanvas);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          texture.colorSpace = THREE.SRGBColorSpace;

          wordData.push({
            texture,
            geometry: geom,
            center: [snappedLeft + planeWidth / 2 - canvasW / 2, canvasH / 2 - (snappedTop + planeHeight / 2)],
            size: [planeWidth, planeHeight],
            bounds: vertexCount ? [minX, minY, maxX, maxY] : [0, 0, 1, 1],
          });
        });

        slots.forEach((slot, idx) => {
          if (slot.word < 0) return;
          if (slot.word < wordData.length) {
            assignWordToSlot(slot, slot.word);
          } else if (idx === activeSlot) {
            assignWordToSlot(slot, 0);
          } else {
            resetSlot(slot);
          }
        });

        return true;
      };

      const requestFrame = () => {
        if (isDestroyed || isContextLost || !isVisible || !isAnimRunning || rafId) return;
        if (idleTimerId) {
          window.clearTimeout(idleTimerId);
          idleTimerId = 0;
        }
        rafId = requestAnimationFrame(renderLoop);
      };

      const startAnimation = () => {
        const props = refProps.current;
        if (!props || isAnimRunning || !fontsReady || (!isVisible && props.startOnView)) return;
        isAnimRunning = true;
        activeSlot = 0;
        resetSlot(slots[1]);
        const mainSlot = slots[0];
        assignWordToSlot(mainSlot, 0);
        mainSlot.mode = +!!props.paused;
        mainSlot.elapsed = 0;
        mainSlot.radial = false;
        props.onWordChange?.(0);
      };

      function renderLoop(timestamp: number) {
        rafId = 0;
        if (isDestroyed || isContextLost || !wordData.length) return;
        const props = refProps.current;
        if (!props) return;

        const dtRaw = lastTimestamp ? Math.max(0, (timestamp - lastTimestamp) / 1000) : 0;
        lastTimestamp = timestamp;
        const dt = Math.min(dtRaw, 0.1);
        const totalWords = wordData.length;
        const isActive = !props.paused;
        const durations = [
          Math.max(props.condense, 0.05),
          Math.max(props.hold, 0),
          Math.max(props.dissolve, 0.05),
        ];
        const overlapPeriod = durations[2] * (1 - clamp(props.overlap, 0, 1));
        let curSlot = slots[activeSlot];
        const isHoverPaused = props.pauseOnHover && props.interactive && pointerState.over;
        const isFinished =
          !props.loop && curSlot.word >= totalWords - 1 && !triggerNext && targetReplayWord < 0;

        if (isActive) {
          elapsedSimTime += dt;
          const secondarySlot = slots[1 - activeSlot];
          if (secondarySlot.word >= 0) {
            secondarySlot.elapsed += dt;
            if (secondarySlot.elapsed >= durations[2]) {
              resetSlot(secondarySlot);
            }
          }

          if (curSlot.mode === 1) {
            if (!isHoverPaused) {
              curSlot.elapsed += dtRaw;
            }
            const isClickAdvance = clickPosition !== null && props.clickAdvance && props.interactive;
            if (
              isClickAdvance ||
              triggerNext ||
              targetReplayWord >= 0 ||
              (!isFinished && curSlot.elapsed >= durations[1])
            ) {
              curSlot.mode = 2;
              curSlot.elapsed = 0;
              curSlot.radial = isClickAdvance;
              if (clickPosition && isClickAdvance) {
                curSlot.own.uOrigin.value.set(clickPosition.x, clickPosition.y);
              }
            }
            triggerNext = false;
          } else if (curSlot.mode === 0) {
            curSlot.elapsed += dt;
            if (curSlot.elapsed >= durations[0]) {
              curSlot.mode = 1;
              curSlot.elapsed = 0;
              curSlot.radial = false;
            }
          } else {
            curSlot.elapsed += dt;
          }

          if (curSlot.mode === 2 && curSlot.elapsed >= overlapPeriod) {
            const nextIdx =
              targetReplayWord >= 0 ? targetReplayWord % totalWords : (curSlot.word + 1) % totalWords;
            targetReplayWord = -1;
            const incomingSlot = slots[1 - activeSlot];
            assignWordToSlot(incomingSlot, nextIdx);
            incomingSlot.mode = 0;
            incomingSlot.elapsed = 0;
            incomingSlot.radial = false;
            activeSlot = 1 - activeSlot;
            curSlot = incomingSlot;
            props.onWordChange?.(nextIdx);
          }
        }

        clickPosition = null;
        const recoveryTime = Math.max(props.recovery, 0.05);

        const isBlown =
          pointerState.moved &&
          isActive &&
          props.interactive &&
          props.breath > 0 &&
          (() => {
            const curData = wordData[slots[activeSlot].word];
            if (!curData) return false;
            const radius = Math.max(props.breathRadius, 0.05) * emVal * 1.5;
            const [minX, minY, maxX, maxY] = curData.bounds;
            for (let i = 0; i <= 6; i++) {
              const t = i / 6;
              const px = pointerState.fromX + (pointerState.x - pointerState.fromX) * t;
              const py = pointerState.fromY + (pointerState.y - pointerState.fromY) * t;
              if (Math.max(minX - px, 0, px - maxX) + Math.max(minY - py, 0, py - maxY) < radius) {
                return true;
              }
            }
            return false;
          })();

        const isInRecovery = timestamp - lastBlowTime < (recoveryTime + 1) * 1000;

        if ((isBlown || isInRecovery) && renderTargets.length === 2) {
          const speed = Math.hypot(pointerState.vx, pointerState.vy);
          const paintAmt = isBlown ? clamp(speed / 1600, 0, 1) : 0;
          const windFactor = speed > 1 ? Math.min(speed / 1200, 1) / speed : 0;

          simUniforms.uPrevious.value = renderTargets[targetIndex].texture;
          simUniforms.uFollow.value = 1 - Math.exp(-dt / 0.14);
          simUniforms.uDrain.value = dt / recoveryTime;
          simUniforms.uFrom.value.set(pointerState.fromX, pointerState.fromY);
          simUniforms.uTo.value.set(pointerState.x, pointerState.y);
          simUniforms.uRadius.value = Math.max(props.breathRadius, 0.05) * emVal;
          simUniforms.uAmount.value = paintAmt;
          simUniforms.uWind.value.set(pointerState.vx * windFactor, pointerState.vy * windFactor);

          renderer.setRenderTarget(renderTargets[1 - targetIndex]);
          renderer.render(simScene, camera);
          renderer.setRenderTarget(null);

          targetIndex = 1 - targetIndex;
          commonUniforms.uField.value = renderTargets[targetIndex].texture;
          if (isBlown && paintAmt > 0.02) {
            lastBlowTime = timestamp;
          }
        }

        pointerState.fromX = pointerState.x;
        pointerState.fromY = pointerState.y;
        pointerState.moved = false;

        const sweepIdx = Math.max(0, SWEEP_MODES.indexOf(props.sweep));
        for (const slot of slots) {
          slot.own.uMode.value = slot.mode;
          slot.own.uPhase.value =
            slot.mode === 1 ? 0 : Math.min(slot.elapsed / durations[slot.mode], 1);
          slot.own.uSweep.value = slot.radial ? 5 : sweepIdx;
        }

        commonUniforms.uStagger.value = clamp(props.stagger, 0, 4);
        commonUniforms.uGrain.value = Math.max(props.grain, 0.05) * emVal * 0.035;
        commonUniforms.uBreath.value = props.interactive ? clamp(props.breath, 0, 3) : 0;

        particleUniforms.uTime.value = elapsedSimTime;
        particleUniforms.uSpread.value = Math.max(props.spread, 0) * emVal;
        particleUniforms.uRise.value = clamp(props.rise, -3, 3);
        particleUniforms.uTurbulence.value = clamp(props.turbulence, 0, 4);
        particleUniforms.uDiffusion.value = clamp(props.diffusion, 0, 4);
        particleUniforms.uSize.value = clamp(props.particleSize, 0.25, 8);

        renderer.render(scene, camera);

        if (
          isActive &&
          (curSlot.mode !== 1 ||
            slots[1 - activeSlot].word >= 0 ||
            timestamp - lastBlowTime < (recoveryTime + 1) * 1000 ||
            triggerNext ||
            targetReplayWord >= 0)
        ) {
          requestFrame();
        } else if (isActive && curSlot.mode === 1 && !isFinished && !isHoverPaused && isVisible) {
          const waitTime = Math.max(durations[1] - curSlot.elapsed, 0);
          idleTimerId = window.setTimeout(() => {
            idleTimerId = 0;
            requestFrame();
          }, 1000 * waitTime + 16);
        }
      }

      const getPointerPos = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left - canvasW / 2,
          y: rect.top + canvasH / 2 - e.clientY,
        };
      };

      const isInsideHost = (e: PointerEvent) => {
        const rect = hostEl.getBoundingClientRect();
        return (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
      };

      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        const inside = isInsideHost(e);
        if (pointerState.over && !inside) {
          lastTimestamp = 0;
        }
        pointerState.over = inside;
        const pos = getPointerPos(e);
        const time = e.timeStamp;

        if (pointerState.fresh) {
          pointerState.fresh = false;
          pointerState.x = pos.x;
          pointerState.y = pos.y;
          pointerState.fromX = pos.x;
          pointerState.fromY = pos.y;
          pointerState.vx = 0;
          pointerState.vy = 0;
          pointerState.at = time;
          return;
        }

        const dtSec = Math.max((time - pointerState.at) / 1000, 0.002);
        const smooth = Math.min(1, dtSec / 0.03);
        pointerState.vx += ((pos.x - pointerState.x) / dtSec - pointerState.vx) * smooth;
        pointerState.vy += ((pos.y - pointerState.y) / dtSec - pointerState.vy) * smooth;
        pointerState.x = pos.x;
        pointerState.y = pos.y;
        pointerState.at = time;
        pointerState.moved = true;
        requestFrame();
      };

      const onPointerLeave = () => {
        if (pointerState.over) {
          lastTimestamp = 0;
        }
        pointerState.fresh = true;
        pointerState.over = false;
        pointerState.vx = 0;
        pointerState.vy = 0;
        requestFrame();
      };

      const onPointerDown = (e: PointerEvent) => {
        const props = refProps.current;
        if (!props || !props.clickAdvance || !props.interactive || e.button > 0) return;
        if (isInsideHost(e)) {
          clickPosition = getPointerPos(e);
          requestFrame();
        }
      };

      let activeListeners: Array<[EventTarget, string, EventListener]> = [];
      let boundArea: VaporArea | null = null;

      const detachListeners = () => {
        for (const [target, ev, fn] of activeListeners) {
          target.removeEventListener(ev, fn);
        }
        activeListeners = [];
      };

      const attachListeners = () => {
        const props = refProps.current;
        const targetArea = props?.area ?? "parent";
        if (targetArea === boundArea) return;
        detachListeners();
        boundArea = targetArea;

        const moveTarget: EventTarget =
          targetArea === "window" ? doc : targetArea === "self" ? hostEl : hostEl.parentElement ?? hostEl;
        const leaveTarget: EventTarget = targetArea === "window" ? doc.documentElement : moveTarget;

        activeListeners = [
          [moveTarget, "pointermove", onPointerMove as EventListener],
          [moveTarget, "pointerdown", onPointerDown as EventListener],
          [leaveTarget, "pointerleave", onPointerLeave as EventListener],
          [moveTarget, "pointercancel", onPointerLeave as EventListener],
        ];

        for (const [target, ev, fn] of activeListeners) {
          target.addEventListener(ev, fn, { passive: true });
        }
      };

      const onFontsLoaded = () => {
        fontsReady = true;
        fontCounter += 1;
        updateLayoutAndRasterize();
        startAnimation();
        requestFrame();
      };

      const resizeObserver = new ResizeObserver(() => {
        if (updateLayoutAndRasterize()) {
          requestFrame();
        }
      });
      resizeObserver.observe(hostEl);

      const mutationObserver = new MutationObserver(() => {
        if (syncColors()) {
          requestFrame();
        }
      });
      mutationObserver.observe(doc.documentElement, {
        attributes: true,
        attributeFilter: ["class", "style", "data-theme"],
      });

      const intersectionObserver =
        typeof IntersectionObserver !== "undefined"
          ? new IntersectionObserver(
              ([entry]) => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                  startAnimation();
                  lastTimestamp = 0;
                  requestFrame();
                } else if (rafId) {
                  cancelAnimationFrame(rafId);
                  rafId = 0;
                }
              },
              { rootMargin: "60px" }
            )
          : null;

      const onContextLost = (e: Event) => {
        e.preventDefault();
        isContextLost = true;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      };

      const onContextRestored = () => {
        isContextLost = false;
        layoutHash = "";
        colorHash = "";
        syncColors();
        updateLayoutAndRasterize();
        requestFrame();
      };

      canvas.addEventListener("webglcontextlost", onContextLost);
      canvas.addEventListener("webglcontextrestored", onContextRestored);

      syncColors();
      attachListeners();
      updateLayoutAndRasterize();

      const fontSet = doc.fonts;
      if (fontSet) {
        fontSet.addEventListener("loadingdone", onFontsLoaded);
        fontSet.ready.then(() => {
          if (!isDestroyed) onFontsLoaded();
        });
      } else {
        fontsReady = true;
      }

      if (intersectionObserver) {
        intersectionObserver.observe(hostEl);
      } else {
        isVisible = true;
        startAnimation();
      }

      return {
        sync: () => {
          attachListeners();
          syncColors();
          updateLayoutAndRasterize();
          startAnimation();
          requestFrame();
        },
        next: () => {
          triggerNext = true;
          requestFrame();
        },
        replay: () => {
          targetReplayWord = 0;
          requestFrame();
        },
        destroy: () => {
          isDestroyed = true;
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
          }
          if (idleTimerId) {
            window.clearTimeout(idleTimerId);
            idleTimerId = 0;
          }
          intersectionObserver?.disconnect();
          resizeObserver.disconnect();
          mutationObserver.disconnect();
          detachListeners();

          fontSet?.removeEventListener("loadingdone", onFontsLoaded);
          canvas.removeEventListener("webglcontextlost", onContextLost);
          canvas.removeEventListener("webglcontextrestored", onContextRestored);

          wordData.forEach(disposeWordData);
          wordData = [];

          renderTargets.forEach((rt) => rt.dispose());
          planeGeom.dispose();
          emptyGeom.dispose();
          simMesh.geometry.dispose();

          for (const s of slots) {
            s.textMaterial.dispose();
            s.particleMaterial.dispose();
          }

          simMaterial.dispose();
          renderer.dispose();
          if (!renderer.getContext().isContextLost()) {
            renderer.forceContextLoss();
          }
          canvas.remove();
        },
      };
    };

    const engine = setupEngine(container, canvasWrap, propsRef);
    if (!engine) {
      const fallbackId = requestAnimationFrame(() => setIsFallbackMode(true));
      return () => cancelAnimationFrame(fallbackId);
    }

    engineRef.current = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [shouldRenderStatic]);

  useImperativeHandle(
    ref,
    () => ({
      next: () => engineRef.current?.next(),
      replay: () => engineRef.current?.replay(),
    }),
    []
  );

  const canvasInset = Math.max(spread, 0) + 0.35;

  return (
    <Component
      ref={containerRef as any}
      className={cn("relative inline-block align-baseline", className)}
      style={style}
    >
      <span style={srOnlyStyle}>{validWords.join(", ")}</span>

      <span aria-hidden="true" style={gridStyle}>
        {validWords.map((word, idx) => (
          <span
            key={`${idx}:${word}`}
            data-vapor-word=""
            style={{
              gridArea: "1 / 1",
              justifySelf: align,
              alignSelf: "center",
              textAlign: align,
              color: shouldRenderStatic && idx === 0 ? undefined : "transparent",
              visibility: shouldRenderStatic && idx > 0 ? "hidden" : undefined,
            }}
          >
            {word}
          </span>
        ))}
      </span>

      {!shouldRenderStatic && (
        <span
          ref={canvasWrapRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: `-${canvasInset}em`,
            display: "block",
            pointerEvents: "none",
          }}
        />
      )}
    </Component>
  );
});

export default VaporType;
