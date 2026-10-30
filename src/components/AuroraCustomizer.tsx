'use client';

import React, { useState } from 'react';

export interface AuroraConfig {
  // Color stops (up to 5 stops)
  colorStops: string[];

  // Wave & Fluid Parameters
  amplitude: number;
  blend: number;
  speed: number;
  height: number;
  scale: number;
  glow: number;
  brightness: number;
  layers: number;
  direction: 'top' | 'bottom';
  opacity: number;
  lightMode: boolean;
  mouseInteraction: boolean;
  intro: boolean;
  dpr: number;

  // Layout & Vignette
  containerHeight: number; // in vh
  showTopGlow: boolean;
  topGlowColor: string;
  bottomFadeHeight: number; // in px
}

export const DEFAULT_AURORA_CONFIG: AuroraConfig = {
  colorStops: ['#5eeeb2', '#7cff67', '#7cff67', '#5eeeb2'],
  amplitude: 0.6,
  blend: 0.39,
  speed: 1.15,
  height: 0.59,
  scale: 1,
  glow: 1.5,
  brightness: 1,
  layers: 3,
  direction: 'top',
  opacity: 1,
  lightMode: true,
  mouseInteraction: true,
  intro: true,
  dpr: 1,
  containerHeight: 50,
  showTopGlow: true,
  topGlowColor: '#5eeeb2',
  bottomFadeHeight: 192,
};

export interface AuroraCustomizerProps {
  config: AuroraConfig;
  onChange: (newConfig: AuroraConfig) => void;
  isOpen: boolean;
  onToggle: () => void;
  onSwitchToWaves?: () => void;
}

export function AuroraCustomizer({
  config,
  onChange,
  isOpen,
  onToggle,
  onSwitchToWaves,
}: AuroraCustomizerProps) {
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof AuroraConfig>(key: K, value: AuroraConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  const handleColorStopChange = (index: number, val: string) => {
    const updated = [...config.colorStops];
    updated[index] = val;
    update('colorStops', updated);
  };

  const addColorStop = () => {
    if (config.colorStops.length >= 5) return;
    const lastColor = config.colorStops[config.colorStops.length - 1] || '#5eeeb2';
    update('colorStops', [...config.colorStops, lastColor]);
  };

  const removeColorStop = (index: number) => {
    if (config.colorStops.length <= 2) return;
    const updated = config.colorStops.filter((_, i) => i !== index);
    update('colorStops', updated);
  };

  const getCodeSnippet = () => {
    const stopsFormatted = JSON.stringify(config.colorStops);
    return `<div style={{ width: '100%', height: '${config.containerHeight}vh', minHeight: '750px', position: 'relative' }}>
  <Aurora
    colorStops={${stopsFormatted}}
    amplitude={${config.amplitude}}
    blend={${config.blend}}
    speed={${config.speed}}
    height={${config.height}}
    scale={${config.scale}}
    glow={${config.glow}}
    brightness={${config.brightness}}
    layers={${config.layers}}
    direction="${config.direction}"${config.lightMode ? '\n    lightMode' : ''}${config.opacity !== 1 ? `\n    opacity={${config.opacity}}` : ''}${!config.mouseInteraction ? '\n    mouseInteraction={false}' : ''}
  />
</div>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const applyPreset = (name: string) => {
    if (name === 'mint-lime') {
      onChange({
        ...config,
        colorStops: ['#5eeeb2', '#7cff67', '#7cff67', '#5eeeb2'],
        amplitude: 0.6,
        blend: 0.39,
        height: 0.59,
        speed: 1.15,
        glow: 1.5,
        layers: 3,
        scale: 1,
        brightness: 1,
        lightMode: true,
        direction: 'top',
        topGlowColor: '#5eeeb2',
        containerHeight: 50,
      });
    } else if (name === 'react-bits-neon') {
      onChange({
        ...config,
        colorStops: ['#5227FF', '#FF9FFC', '#5227FF'],
        amplitude: 1.2,
        blend: 0.5,
        height: 0.5,
        speed: 1,
        glow: 0.8,
        layers: 2,
        scale: 1,
        brightness: 1,
        lightMode: false,
        direction: 'top',
        topGlowColor: '#5227FF',
      });
    } else if (name === 'northern-lights') {
      onChange({
        ...config,
        colorStops: ['#00f2fe', '#4facfe', '#00ff87'],
        amplitude: 2.2,
        blend: 0.45,
        height: 0.6,
        speed: 0.85,
        glow: 1.8,
        layers: 3,
        scale: 1.1,
        brightness: 1.1,
        lightMode: true,
        direction: 'top',
        topGlowColor: '#00f2fe',
      });
    } else if (name === 'cyber-sunset') {
      onChange({
        ...config,
        colorStops: ['#ff0844', '#ffb199', '#f6d365'],
        amplitude: 2.0,
        blend: 0.4,
        height: 0.55,
        speed: 0.7,
        glow: 1.2,
        layers: 2,
        scale: 1.0,
        brightness: 1.0,
        lightMode: true,
        direction: 'top',
        topGlowColor: '#ff0844',
      });
    } else if (name === 'minimal-silver') {
      onChange({
        ...config,
        colorStops: ['#cbd5e1', '#94a3b8', '#e2e8f0'],
        amplitude: 1.8,
        blend: 0.3,
        height: 0.5,
        speed: 0.5,
        glow: 1.0,
        layers: 2,
        scale: 1.0,
        brightness: 0.9,
        lightMode: true,
        direction: 'top',
        topGlowColor: '#cbd5e1',
      });
    }
  };

  return (
    <>
      {/* Floating Drawer Panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-6 z-50 w-[450px] max-w-[94vw] max-h-[84vh] overflow-y-auto rounded-2xl bg-[#111310]/95 backdrop-blur-2xl text-zinc-200 border border-white/15 p-5 shadow-2xl font-sans text-xs scrollbar-thin scrollbar-thumb-zinc-700"
          id="auroraCustomizerPanel"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-white tracking-wide">Aurora Studio</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                  REACT BITS
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Live interactive controls for the WebGL Aurora simulation.
              </p>
            </div>
            <button
              onClick={onToggle}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              title="Close panel"
            >
              ✕
            </button>
          </div>

          {/* Tab Switcher if onSwitchToWaves is available */}
          {onSwitchToWaves && (
            <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 mb-4">
              <button
                className="flex-1 py-1.5 rounded-lg bg-emerald-500 text-black font-semibold font-mono text-[11px] transition-all"
              >
                ✨ Aurora
              </button>
              <button
                onClick={onSwitchToWaves}
                className="flex-1 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 font-mono text-[11px] transition-all"
              >
                🌊 Gradient Waves
              </button>
            </div>
          )}

          {/* Quick Presets */}
          <div className="mb-4">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block mb-2">
              Presets
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => applyPreset('mint-lime')}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] transition-colors border border-white/10 flex items-center gap-1"
              >
                🍃 Mint & Lime
              </button>
              <button
                onClick={() => applyPreset('northern-lights')}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] transition-colors border border-white/10 flex items-center gap-1"
              >
                🌌 Northern Lights
              </button>
              <button
                onClick={() => applyPreset('cyber-sunset')}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] transition-colors border border-white/10 flex items-center gap-1"
              >
                🌅 Cyber Sunset
              </button>
              <button
                onClick={() => applyPreset('react-bits-neon')}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] transition-colors border border-white/10 flex items-center gap-1"
              >
                👾 ReactBits Neon
              </button>
              <button
                onClick={() => applyPreset('minimal-silver')}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] transition-colors border border-white/10 flex items-center gap-1"
              >
                ☁️ Minimal Silver
              </button>
            </div>
          </div>

          {/* Group 1: Color Stops */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>🎨 1. Color Palette ({config.colorStops.length}/5 stops)</span>
              {config.colorStops.length < 5 && (
                <button
                  onClick={addColorStop}
                  className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 transition-all font-mono"
                >
                  + Add Stop
                </button>
              )}
            </div>

            <div className="space-y-2">
              {config.colorStops.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-mono text-zinc-400 w-12 text-[10px]">
                    Stop {index + 1}
                  </span>
                  <div className="flex-1 flex items-center gap-2 p-1.5 rounded-lg bg-black/40 border border-white/10">
                    <input
                      type="color"
                      value={color.startsWith('#') ? color : '#5eeeb2'}
                      onChange={e => handleColorStopChange(index, e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={e => handleColorStopChange(index, e.target.value)}
                      className="flex-1 bg-transparent border-0 font-mono text-xs text-white uppercase focus:outline-none"
                    />
                  </div>
                  {config.colorStops.length > 2 && (
                    <button
                      onClick={() => removeColorStop(index)}
                      className="text-zinc-500 hover:text-red-400 p-1.5 rounded hover:bg-white/5 transition-colors font-mono"
                      title="Remove stop"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Light Mode Switch */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-zinc-200 block font-medium">Light Mode Shader</span>
                <span className="text-[10px] text-zinc-400">
                  Soft pigment blending optimized for light backgrounds
                </span>
              </div>
              <input
                type="checkbox"
                checked={config.lightMode}
                onChange={e => update('lightMode', e.target.checked)}
                className="w-4 h-4 accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Group 2: Ribbon Dynamics & Geometry */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>🌊 2. Ribbon Dynamics & Flow</span>
            </div>

            {/* Amplitude */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Amplitude (Wave Height)</span>
                <span className="font-mono text-emerald-300">{config.amplitude}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="4.0"
                step="0.05"
                value={config.amplitude}
                onChange={e => update('amplitude', Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Blend */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Blend Softness</span>
                <span className="font-mono text-emerald-300">{config.blend}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.01"
                value={config.blend}
                onChange={e => update('blend', Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Speed */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Speed</span>
                <span className="font-mono text-emerald-300">{config.speed}x</span>
              </div>
              <input
                type="range"
                min="0"
                max="2.5"
                step="0.05"
                value={config.speed}
                onChange={e => update('speed', Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Height (Horizon position) */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Horizon Water Height</span>
                <span className="font-mono text-emerald-300">{config.height}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.0"
                step="0.01"
                value={config.height}
                onChange={e => update('height', Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Scale */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Noise Scale</span>
                <span className="font-mono text-emerald-300">{config.scale}</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.05"
                value={config.scale}
                onChange={e => update('scale', Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Group 3: Lighting, Glow & Layers */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>✨ 3. Lighting, Glow & Layers</span>
            </div>

            {/* Glow */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Glow Strength</span>
                <span className="font-mono text-emerald-300">{config.glow}</span>
              </div>
              <input
                type="range"
                min="0"
                max="3.0"
                step="0.05"
                value={config.glow}
                onChange={e => update('glow', Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Brightness */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Brightness</span>
                <span className="font-mono text-emerald-300">{config.brightness}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.05"
                value={config.brightness}
                onChange={e => update('brightness', Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Opacity */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Opacity</span>
                <span className="font-mono text-emerald-300">{Math.round(config.opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.0"
                step="0.02"
                value={config.opacity}
                onChange={e => update('opacity', Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Layers count (1, 2, 3) */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Ribbon Layers</span>
                <span className="font-mono text-emerald-300">{config.layers}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map(layerNum => (
                  <button
                    key={layerNum}
                    onClick={() => update('layers', layerNum)}
                    className={`py-1 rounded font-mono text-xs transition-colors border ${
                      config.layers === layerNum
                        ? 'bg-emerald-500 text-black border-emerald-400 font-semibold'
                        : 'bg-black/40 text-zinc-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {layerNum} {layerNum === 1 ? 'Layer' : 'Layers'}
                  </button>
                ))}
              </div>
            </div>

            {/* Direction */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Direction</span>
                <span className="font-mono text-emerald-300 uppercase">{config.direction}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['top', 'bottom'] as const).map(dir => (
                  <button
                    key={dir}
                    onClick={() => update('direction', dir)}
                    className={`py-1 rounded font-mono text-xs transition-colors border uppercase ${
                      config.direction === dir
                        ? 'bg-emerald-500 text-black border-emerald-400 font-semibold'
                        : 'bg-black/40 text-zinc-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            {/* Mouse Interaction & Intro */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                <input
                  type="checkbox"
                  checked={config.mouseInteraction}
                  onChange={e => update('mouseInteraction', e.target.checked)}
                  className="w-3.5 h-3.5 accent-emerald-400"
                />
                <span>Mouse Pointer Tracking</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                <input
                  type="checkbox"
                  checked={config.intro}
                  onChange={e => update('intro', e.target.checked)}
                  className="w-3.5 h-3.5 accent-emerald-400"
                />
                <span>Intro Ease-in</span>
              </label>
            </div>
          </div>

          {/* Group 4: Layout & Vignette */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>📐 4. Layout & Vignettes</span>
            </div>

            {/* Container Height */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Container Height</span>
                <span className="font-mono text-emerald-300">{config.containerHeight}vh</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="1"
                value={config.containerHeight}
                onChange={e => update('containerHeight', Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Top Horizon Ambient Glow */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-zinc-200 block font-medium">Top Horizon Glow</span>
                <span className="text-[10px] text-zinc-400">Radial ambient light halo</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.topGlowColor}
                  onChange={e => update('topGlowColor', e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                />
                <input
                  type="checkbox"
                  checked={config.showTopGlow}
                  onChange={e => update('showTopGlow', e.target.checked)}
                  className="w-4 h-4 accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Bottom Vignette Height */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Bottom Blend Height</span>
                <span className="font-mono text-emerald-300">{config.bottomFadeHeight}px</span>
              </div>
              <input
                type="range"
                min="64"
                max="320"
                step="8"
                value={config.bottomFadeHeight}
                onChange={e => update('bottomFadeHeight', Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Group 5: Copy Configuration & Code Block */}
          <div className="border-t border-white/10 pt-4 mt-4">
            <button
              onClick={handleCopy}
              className={`w-full py-3 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                copied
                  ? 'bg-emerald-400 text-black shadow-[0_0_20px_#34d399]'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black'
              }`}
              id="btnCopyAuroraConfig"
            >
              <span>{copied ? '✓ Copied to Clipboard!' : '📋 Copy Config for Agent'}</span>
            </button>

            {/* Code Snippet Box */}
            <div className="mt-3 p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[10px] text-zinc-300 overflow-x-auto max-h-48">
              <pre className="whitespace-pre">{getCodeSnippet()}</pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AuroraCustomizer;
