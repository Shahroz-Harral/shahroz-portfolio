'use client';

import React, { useState } from 'react';

export interface WavesConfig {
  // Colors
  horizonColor: string;
  waveColor: string;
  crestColor: string;
  backgroundColor: string;
  lightMode: boolean;

  // Wave Dynamics
  speed: number;
  amplitude: number;
  waveScale: number;
  waveRatio: number;
  swell: number;
  turbulence: number;

  // Camera & Optics
  tilt: number;
  zoom: number;
  height: number;
  fogDepth: number;
  relief: number;
  lightAngle: number;
  sheen: number;
  brightness: number;
  opacity: number;
  grain: number;

  // Interaction
  mouseInteraction: boolean;
  mouseStrength: number;
  parallaxStrength: number;
  swellOnClick: boolean;
  intro: boolean;
  dpr: number;

  // Dimensions & Layout
  containerHeight: number;
  bottomOffset: number;
  parallaxRise: number;
}

export const DEFAULT_WAVES_CONFIG: WavesConfig = {
  horizonColor: '#fbfbfa',
  waveColor: '#fbfbfa',
  crestColor: '#fbfbfa',
  backgroundColor: 'transparent',
  lightMode: false,
  speed: 0.45,
  amplitude: 0.95,
  waveScale: 1.05,
  waveRatio: 1.25,
  swell: 29,
  turbulence: 7,
  tilt: 78,
  zoom: 1.3,
  height: 7.1,
  fogDepth: 15,
  relief: 0.98,
  lightAngle: 225,
  sheen: 0,
  brightness: 0.1,
  opacity: 0.5,
  grain: 0.01,
  mouseInteraction: true,
  mouseStrength: 0.17,
  parallaxStrength: 0.5,
  swellOnClick: true,
  intro: true,
  dpr: 1,
  containerHeight: 610,
  bottomOffset: 0,
  parallaxRise: -120,
};

export interface WavesCustomizerProps {
  config: WavesConfig;
  onChange: (newConfig: WavesConfig) => void;
  isOpen?: boolean;
  onToggle?: () => void;
  onSwitchToAurora?: () => void;
}

export function WavesCustomizer({
  config,
  onChange,
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  onSwitchToAurora,
}: WavesCustomizerProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const toggleOpen = isControlled ? (controlledOnToggle ?? (() => {})) : () => setInternalIsOpen(!internalIsOpen);

  const update = <K extends keyof WavesConfig>(key: K, value: WavesConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  const getCodeSnippet = () => {
    return `<div style={{ width: '100%', height: '${config.containerHeight}px', position: 'relative' }}>
  <GradientWaves
    horizonColor="${config.horizonColor}"
    waveColor="${config.waveColor}"
    crestColor="${config.crestColor}"
    speed={${config.speed}}
    amplitude={${config.amplitude}}
    relief={${config.relief}}
    lightAngle={${config.lightAngle}}
    mouseInteraction={${config.mouseInteraction}}
    swellOnClick={${config.swellOnClick}}
    waveRatio={${config.waveRatio}}
    tilt={${config.tilt}}
    zoom={${config.zoom}}
    height={${config.height}}
    brightness={${config.brightness}}
    grain={${config.grain}}
    mouseStrength={${config.mouseStrength}}${config.lightMode ? '\n    lightMode' : ''}${config.opacity !== 1 ? `\n    opacity={${config.opacity}}` : ''}${config.waveScale !== 0.6 ? `\n    waveScale={${config.waveScale}}` : ''}${config.swell !== 35 ? `\n    swell={${config.swell}}` : ''}${config.turbulence !== 20 ? `\n    turbulence={${config.turbulence}}` : ''}${config.fogDepth !== 15 ? `\n    fogDepth={${config.fogDepth}}` : ''}${config.sheen !== 0 ? `\n    sheen={${config.sheen}}` : ''}
  />
</div>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const applyPreset = (name: string) => {
    if (name === 'user-blend') {
      onChange(DEFAULT_WAVES_CONFIG);
    } else if (name === 'emerald-aurora') {
      onChange({
        ...config,
        horizonColor: '#10b981',
        waveColor: '#5eeeb2',
        crestColor: '#ffffff',
        speed: 0.35,
        amplitude: 0.8,
        relief: 0.9,
        lightAngle: 140,
        tilt: 75,
        zoom: 1.0,
        height: 2.5,
        brightness: 0.95,
        grain: 0.04,
        mouseStrength: 0.3,
        lightMode: false,
      });
    } else if (name === 'react-bits-default') {
      onChange({
        ...config,
        horizonColor: '#5227FF',
        waveColor: '#FF9FFC',
        crestColor: '#FFFFFF',
        speed: 0.4,
        amplitude: 2.5,
        waveScale: 0.6,
        waveRatio: 0.9,
        swell: 35,
        turbulence: 20,
        tilt: 64,
        zoom: 1.0,
        height: 5.5,
        relief: 1.0,
        lightAngle: 120,
        brightness: 1.0,
        grain: 0.2,
        lightMode: false,
      });
    } else if (name === 'ethereal-light') {
      onChange({
        ...config,
        horizonColor: '#94a3b8',
        waveColor: '#e2e8f0',
        crestColor: '#ffffff',
        speed: 0.25,
        amplitude: 0.45,
        relief: 0.85,
        tilt: 82,
        zoom: 0.95,
        height: 1.8,
        brightness: 0.9,
        grain: 0.01,
        lightMode: true,
      });
    }
  };

  return (
    <>
      {/* Floating Toggle Button (only when not controlled from external dock) */}
      {!isControlled && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 select-none">
          <button
            onClick={toggleOpen}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111310] hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold shadow-2xl border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xl"
            id="btnToggleWavesCustomizer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span>{isOpen ? '✕ Close Waves' : '🌊 Customize Waves'}</span>
          </button>
        </div>
      )}

      {/* Floating Drawer Panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-6 z-50 w-[450px] max-w-[94vw] max-h-[84vh] overflow-y-auto rounded-2xl bg-[#111310]/95 backdrop-blur-2xl text-zinc-200 border border-white/15 p-5 shadow-2xl font-sans text-xs scrollbar-thin scrollbar-thumb-zinc-700"
          id="wavesCustomizerPanel"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div>
              <h3 className="font-display font-bold text-white text-sm tracking-wide flex items-center gap-2">
                <span>GradientWaves Studio</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  REACT BITS
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Live interactive controls for the WebGL fluid wave simulation.
              </p>
            </div>
            <button
              onClick={toggleOpen}
              className="text-zinc-400 hover:text-white text-base leading-none p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Tab Switcher if onSwitchToAurora is available */}
          {onSwitchToAurora && (
            <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 mb-4">
              <button
                onClick={onSwitchToAurora}
                className="flex-1 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 font-mono text-[11px] transition-all"
              >
                ✨ Aurora
              </button>
              <button
                className="flex-1 py-1.5 rounded-lg bg-cyan-400 text-black font-semibold font-mono text-[11px] transition-all"
              >
                🌊 Gradient Waves
              </button>
            </div>
          )}

          {/* Quick Presets */}
          <div className="mb-4">
            <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1.5 font-semibold">
              Presets
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => applyPreset('user-blend')}
                className="px-2.5 py-1 rounded bg-cyan-500/30 hover:bg-cyan-500/40 text-cyan-200 border border-cyan-500/30 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                🌾 Site #FBFBFA Blend
              </button>
              <button
                onClick={() => applyPreset('emerald-aurora')}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] transition-colors cursor-pointer"
              >
                ✨ Emerald Aurora
              </button>
              <button
                onClick={() => applyPreset('react-bits-default')}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] transition-colors cursor-pointer"
              >
                🔮 ReactBits Neon
              </button>
              <button
                onClick={() => applyPreset('ethereal-light')}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] transition-colors cursor-pointer"
              >
                ☁️ Ethereal Light
              </button>
            </div>
          </div>

          {/* Group 1: Colors & Lighting */}
          <div className="space-y-3.5 border-t border-white/10 pt-3.5 mb-4 bg-cyan-950/20 p-3 rounded-xl border border-cyan-500/20">
            <span className="text-[11px] font-mono uppercase text-cyan-300 block font-bold flex items-center justify-between">
              <span>🎨 1. Colors &amp; Lighting Palette</span>
              <span className="text-[10px] text-cyan-400 font-normal">WebGL Shaders</span>
            </span>

            {/* Color Pickers */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-black/40 p-2 rounded-lg border border-white/10">
                <span className="text-[10px] text-zinc-400 block mb-1">Horizon Color</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={config.horizonColor.startsWith('#') && config.horizonColor.length === 7 ? config.horizonColor : '#fbfbfa'}
                    onChange={e => update('horizonColor', e.target.value)}
                    className="w-6 h-6 rounded border-none bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.horizonColor}
                    onChange={e => update('horizonColor', e.target.value)}
                    className="bg-transparent font-mono text-[10px] text-white focus:outline-none w-14"
                  />
                </div>
              </div>

              <div className="bg-black/40 p-2 rounded-lg border border-white/10">
                <span className="text-[10px] text-zinc-400 block mb-1">Wave Color</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={config.waveColor.startsWith('#') && config.waveColor.length === 7 ? config.waveColor : '#fbfbfa'}
                    onChange={e => update('waveColor', e.target.value)}
                    className="w-6 h-6 rounded border-none bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.waveColor}
                    onChange={e => update('waveColor', e.target.value)}
                    className="bg-transparent font-mono text-[10px] text-white focus:outline-none w-14"
                  />
                </div>
              </div>

              <div className="bg-black/40 p-2 rounded-lg border border-white/10">
                <span className="text-[10px] text-zinc-400 block mb-1">Crest Color</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={config.crestColor.startsWith('#') && config.crestColor.length === 7 ? config.crestColor : '#ffffff'}
                    onChange={e => update('crestColor', e.target.value)}
                    className="w-6 h-6 rounded border-none bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.crestColor}
                    onChange={e => update('crestColor', e.target.value)}
                    className="bg-transparent font-mono text-[10px] text-white focus:outline-none w-14"
                  />
                </div>
              </div>
            </div>

            {/* Light Mode Toggle */}
            <div className="flex items-center justify-between bg-black/40 p-2 rounded-lg border border-white/10">
              <div>
                <span className="text-white block font-semibold text-[11px]">Light Mode Ink</span>
                <span className="text-zinc-400 text-[10px]">Draws soft colored ink optimized for light pages</span>
              </div>
              <input
                type="checkbox"
                checked={config.lightMode}
                onChange={e => update('lightMode', e.target.checked)}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Light Angle */}
            <div>
              <div className="flex justify-between items-center text-zinc-200 mb-1">
                <span>Light Angle</span>
                <span className="font-mono text-cyan-300">{config.lightAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={config.lightAngle}
                onChange={e => update('lightAngle', Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Relief (Depth of light and shadow) */}
            <div>
              <div className="flex justify-between items-center text-zinc-200 mb-1">
                <span>Relief (3D Shadow Depth)</span>
                <span className="font-mono text-cyan-300">{config.relief}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.02"
                value={config.relief}
                onChange={e => update('relief', Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Brightness & Opacity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Brightness</span>
                  <span className="font-mono text-cyan-300">{config.brightness}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.05"
                  value={config.brightness}
                  onChange={e => update('brightness', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Opacity</span>
                  <span className="font-mono text-cyan-300">{Math.round(config.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.05"
                  value={config.opacity}
                  onChange={e => update('opacity', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Group 2: Wave Geometry & Fluid Dynamics */}
          <div className="space-y-3.5 border-t border-white/10 pt-3.5 mb-4 bg-white/[0.02] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] font-mono uppercase text-cyan-300 block font-bold">
              🌊 2. Wave Dynamics &amp; Motion
            </span>

            {/* Speed & Amplitude */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Speed</span>
                  <span className="font-mono text-cyan-300">{config.speed}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.5"
                  step="0.05"
                  value={config.speed}
                  onChange={e => update('speed', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Amplitude</span>
                  <span className="font-mono text-cyan-300">{config.amplitude}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.05"
                  value={config.amplitude}
                  onChange={e => update('amplitude', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Wave Ratio & Wave Scale */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Wave Ratio</span>
                  <span className="font-mono text-cyan-300">{config.waveRatio}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.05"
                  value={config.waveRatio}
                  onChange={e => update('waveRatio', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Wave Scale</span>
                  <span className="font-mono text-cyan-300">{config.waveScale}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.05"
                  value={config.waveScale}
                  onChange={e => update('waveScale', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Swell & Turbulence */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Swell</span>
                  <span className="font-mono text-cyan-300">{config.swell}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="70"
                  step="1"
                  value={config.swell}
                  onChange={e => update('swell', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Turbulence</span>
                  <span className="font-mono text-cyan-300">{config.turbulence}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={config.turbulence}
                  onChange={e => update('turbulence', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Group 3: Camera, Tilt, Zoom & Height */}
          <div className="space-y-3.5 border-t border-white/10 pt-3.5 mb-4 bg-white/[0.02] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] font-mono uppercase text-cyan-300 block font-bold">
              📷 3. Camera Perspective &amp; Tilt
            </span>

            {/* Tilt & Zoom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Tilt Angle</span>
                  <span className="font-mono text-cyan-300">{config.tilt}°</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="85"
                  step="1"
                  value={config.tilt}
                  onChange={e => update('tilt', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Zoom / FOV</span>
                  <span className="font-mono text-cyan-300">{config.zoom}</span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="2.0"
                  step="0.05"
                  value={config.zoom}
                  onChange={e => update('zoom', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Water Height & Grain */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Water Height Level</span>
                  <span className="font-mono text-cyan-300">{config.height}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8.0"
                  step="0.2"
                  value={config.height}
                  onChange={e => update('height', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Grain</span>
                  <span className="font-mono text-cyan-300">{config.grain}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.3"
                  step="0.01"
                  value={config.grain}
                  onChange={e => update('grain', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Group 4: Interaction & Placement */}
          <div className="space-y-3.5 border-t border-white/10 pt-3.5 mb-4 bg-white/[0.02] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] font-mono uppercase text-cyan-300 block font-bold">
              🖱️ 4. Mouse &amp; Layout Controls
            </span>

            {/* Mouse Strength & Parallax */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Mouse Strength</span>
                  <span className="font-mono text-cyan-300">{config.mouseStrength}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.02"
                  value={config.mouseStrength}
                  onChange={e => update('mouseStrength', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-zinc-300 mb-1">
                  <span>Parallax Strength</span>
                  <span className="font-mono text-cyan-300">{config.parallaxStrength}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.5"
                  step="0.05"
                  value={config.parallaxStrength}
                  onChange={e => update('parallaxStrength', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Checkboxes: Mouse Interaction & Swell on Click */}
            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[11px]">
                <input
                  type="checkbox"
                  checked={config.mouseInteraction}
                  onChange={e => update('mouseInteraction', e.target.checked)}
                  className="w-3.5 h-3.5 accent-cyan-400"
                />
                <span>Mouse Follow</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[11px]">
                <input
                  type="checkbox"
                  checked={config.swellOnClick}
                  onChange={e => update('swellOnClick', e.target.checked)}
                  className="w-3.5 h-3.5 accent-cyan-400"
                />
                <span>Click Swell Wave</span>
              </label>
            </div>

            {/* Container Height */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Container Height</span>
                <span className="font-mono text-cyan-300">{config.containerHeight}px</span>
              </div>
              <input
                type="range"
                min="350"
                max="900"
                step="10"
                value={config.containerHeight}
                onChange={e => update('containerHeight', Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Vertical Bottom Offset */}
            <div>
              <div className="flex justify-between items-center text-zinc-300 mb-1">
                <span>Vertical Bottom Offset</span>
                <span className="font-mono text-cyan-300">{config.bottomOffset}px</span>
              </div>
              <input
                type="range"
                min="-200"
                max="200"
                step="5"
                value={config.bottomOffset}
                onChange={e => update('bottomOffset', Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Group 5: Copy Configuration & Code Block */}
          <div className="border-t border-white/10 pt-4 mt-4">
            <button
              onClick={handleCopy}
              className={`w-full py-3 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                copied
                  ? 'bg-cyan-400 text-black shadow-[0_0_20px_#22d3ee]'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-black'
              }`}
              id="btnCopyWavesConfig"
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

export default WavesCustomizer;
