// Author Credits: Steve Hatch (steve@hatch.org), Cursor AI, ChatGPT
// Version: 1.0.0
"use client";
import { useState, useEffect, useRef } from "react";

export default function ArtHangingCalculator() {
  const [artHeight, setArtHeight] = useState<number>(24);
  const [wireHeight, setWireHeight] = useState<number>(6);
  const [nailHeight, setNailHeight] = useState<string | null>(null);
  const [mood, setMood] = useState("cubist");
  const standardEyeLevel = 57;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [prefersDark, setPrefersDark] = useState(false);

  const calculateNailHeight = () => {
    const A = artHeight;
    const F = wireHeight;
    const nailPos = standardEyeLevel + A / 2 - F;
    setNailHeight(nailPos.toFixed(1));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;
    const seed = Math.random() * 1000;
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    function drawAbstract(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      let count: number, opacity: number, sizeFactor: number, shapePoints: number;
      let xFunc: (i: number, t: number) => number, yFunc: (i: number, t: number) => number, colorFunc: (i: number, t: number) => string;

      if (mood === "cubist") {
        count = 30;
        opacity = 0.25;
        sizeFactor = 1;
        shapePoints = 8;
        xFunc = (i: number, t: number) => Math.sin(t * 0.00005 + i);
        yFunc = (i: number, t: number) => Math.cos(t * 0.00007 + i);
        colorFunc = (i: number, t: number) => `hsla(${(seed * i + t * 0.01) % 360}, 70%, 50%, ${opacity})`;
      } else if (mood === "post-impressionist") {
        count = 20;
        opacity = 0.2;
        sizeFactor = 0.8;
        shapePoints = 6;
        xFunc = (i: number, t: number) => Math.sin(t * 0.00004 + i);
        yFunc = (i: number, t: number) => Math.cos(t * 0.00006 + i);
        colorFunc = (i: number, t: number) => `hsla(${(seed * i + t * 0.01 + 90) % 360}, 60%, 60%, ${opacity})`;
      } else if (mood === "zen") {
        count = 18;
        opacity = 0.09;
        sizeFactor = 1.2;
        shapePoints = 32;
        xFunc = (i: number, t: number) => Math.sin(t * 0.00009 + i * 0.2) * Math.cos(t * 0.00013 + i * 0.3);
        yFunc = (i: number, t: number) => Math.cos(t * 0.00011 + i * 0.3) * Math.sin(t * 0.00015 + i * 0.2);
        colorFunc = (i: number, t: number) => `hsla(${(180 + Math.sin(t * 0.0002 + i) * 60) % 360}, 40%, ${60 + 20 * Math.sin(i + t * 0.0002)}%, ${opacity})`;
        for (let k = 0; k < 6; k++) {
          if (!ctx) continue;
          const orbX = width / 2 + Math.sin(t * 0.00012 + k) * width * 0.35 + Math.cos(t * 0.0002 + k) * 80;
          const orbY = height / 2 + Math.cos(t * 0.00014 + k) * height * 0.35 + Math.sin(t * 0.00018 + k) * 80;
          const orbRadius = 80 + Math.sin(t * 0.0003 + k) * 30;
          ctx.save();
          ctx.globalAlpha = 0.13 + 0.07 * Math.sin(t * 0.0002 + k);
          ctx.beginPath();
          ctx.arc(orbX, orbY, orbRadius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = `radial-gradient(circle at 50% 50%, hsla(${180 + k * 30}, 60%, 80%, 0.7), hsla(${180 + k * 30}, 60%, 60%, 0.1))`;
          ctx.fillStyle = `hsla(${180 + k * 30}, 60%, 80%, 0.25)`;
          ctx.shadowColor = `hsla(${180 + k * 30}, 60%, 80%, 0.7)`;
          ctx.shadowBlur = 40;
          ctx.fill();
          ctx.restore();
        }
      } else {
        count = 10;
        opacity = 0.1;
        sizeFactor = 1;
        shapePoints = 4;
        xFunc = (i: number, t: number) => Math.sin(t * 0.00005 + i);
        yFunc = (i: number, t: number) => Math.cos(t * 0.00005 + i);
        colorFunc = () => "rgba(200,200,200,0.2)";
      }

      for (let i = 0; i < count; i++) {
        const x = width / 2 + xFunc(i, t) * width * 0.4;
        const y = height / 2 + yFunc(i, t) * height * 0.4;
        const size = (20 + Math.sin(t * 0.0001 + i) * 40) * sizeFactor;
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.fillStyle = colorFunc(i, t);
        ctx.beginPath();
        for (let j = 0; j < shapePoints; j++) {
          const angle = (Math.PI * 2 / shapePoints) * j;
          const radius = size + Math.sin(t * 0.0003 + j + i) * 8;
          const x1 = x + Math.cos(angle) * radius;
          const y1 = y + Math.sin(angle) * radius;
          ctx.lineTo(x1, y1);
        }
        ctx.closePath();
        ctx.shadowColor = mood === "zen" ? "#b2f5ea" : "#0000";
        ctx.shadowBlur = mood === "zen" ? 24 : 0;
        ctx.fill();
        ctx.restore();
      }
    }

    const render = () => {
      drawAbstract(performance.now());
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [mood]);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const audioMap: Record<string, string> = {
      cubist: "/audio/cubist.mp3",
      "post-impressionist": "/audio/post-impressionist.mp3",
      zen: "/audio/zen.mp3"
    };
    audio.src = audioMap[mood];
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {});

    return () => audio.pause();
  }, [mood]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setPrefersDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);
  const backgroundClass = prefersDark ? "bg-black text-white" : "bg-white text-black";
  const inputClass = prefersDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300";

  return (
    <div className={`relative min-h-screen overflow-hidden ${backgroundClass} font-serif`} style={{ background: prefersDark ? 'radial-gradient(ellipse at top left, #232526 0%, #414345 100%)' : 'radial-gradient(ellipse at top left, #f8fafc 0%, #e2e8f0 100%)' }}>
      <svg className="absolute left-0 top-0 z-0" width="320" height="320" viewBox="0 0 320 320" fill="none" style={{opacity: 0.18}}><ellipse cx="160" cy="160" rx="160" ry="80" fill="url(#paint0_radial)"/><defs><radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(160 160) scale(160 80)" gradientUnits="userSpaceOnUse"><stop stopColor="#a5b4fc"/><stop offset="1" stopColor="#f0abfc" stopOpacity="0.2"/></radialGradient></defs></svg>
      <svg className="absolute right-0 bottom-0 z-0" width="240" height="240" viewBox="0 0 240 240" fill="none" style={{opacity: 0.13}}><ellipse cx="120" cy="120" rx="120" ry="60" fill="url(#paint1_radial)"/><defs><radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientTransform="translate(120 120) scale(120 60)" gradientUnits="userSpaceOnUse"><stop stopColor="#6ee7b7"/><stop offset="1" stopColor="#f472b6" stopOpacity="0.2"/></radialGradient></defs></svg>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <audio ref={audioRef} />
      <div className="relative z-10 max-w-lg mx-auto p-8 flex flex-col gap-8 rounded-3xl shadow-2xl bg-opacity-80" style={{ background: prefersDark ? 'rgba(20,20,20,0.85)' : 'rgba(255,255,255,0.85)', border: prefersDark ? '1.5px solid #444' : '1.5px solid #e2e8f0', boxShadow: prefersDark ? '0 8px 32px 0 rgba(0,0,0,0.45)' : '0 8px 32px 0 rgba(100,100,100,0.10)' }}>
        <div className="flex justify-center">
          <h1 className="text-2xl font-extrabold tracking-widest font-serif italic drop-shadow-lg text-black dark:text-white whitespace-nowrap">
            🎯 The Hanging Equation
          </h1>
        </div>
        <div className="space-y-6 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-700 bg-gradient-to-br from-white/80 to-indigo-50/60 dark:from-black/70 dark:to-indigo-950/60 shadow-lg">
          <div>
            <label className="block text-base font-semibold mb-1 tracking-wide text-indigo-700 dark:text-indigo-200">Artwork Height (inches)</label>
            <input
              type="number"
              value={artHeight === 0 ? '' : String(artHeight)}
              onChange={e => setArtHeight(Number(e.target.value.replace(/^0+(?=\d)/, '')))}
              className={`${inputClass} w-full px-4 py-2 rounded-3xl border-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-200 shadow-md bg-opacity-90 outline-none ring-1 ring-pink-200/40 hover:ring-emerald-300/60`}
              style={{ fontFamily: 'inherit', fontSize: '1.1rem', letterSpacing: '0.03em', background: 'linear-gradient(90deg, #f0abfc22 0%, #a5b4fc22 100%)', borderImage: 'linear-gradient(90deg, #f0abfc 0%, #a5b4fc 100%) 1' }}
              min={1}
              max={200}
            />
          </div>
          <div>
            <label className="block text-base font-semibold mb-1 tracking-wide text-indigo-700 dark:text-indigo-200">Distance from Top to Taut Wire (inches)</label>
            <input
              type="number"
              value={wireHeight === 0 ? '' : String(wireHeight)}
              onChange={e => setWireHeight(Number(e.target.value.replace(/^0+(?=\d)/, '')))}
              className={`${inputClass} w-full px-4 py-2 rounded-3xl border-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-200 shadow-md bg-opacity-90 outline-none ring-1 ring-emerald-200/40 hover:ring-pink-300/60`}
              style={{ fontFamily: 'inherit', fontSize: '1.1rem', letterSpacing: '0.03em', background: 'linear-gradient(90deg, #6ee7b722 0%, #f472b622 100%)', borderImage: 'linear-gradient(90deg, #6ee7b7 0%, #f472b6 100%) 1' }}
              min={0}
              max={100}
            />
          </div>
          <button
            onClick={calculateNailHeight}
            className="w-full mt-2 py-2 px-6 rounded-full bg-gradient-to-r from-pink-400 via-indigo-400 to-emerald-400 text-white font-extrabold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 border-none outline-none focus:ring-4 focus:ring-pink-200/60 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
            style={{ letterSpacing: '0.07em', fontFamily: 'inherit', backgroundBlendMode: 'multiply', border: 'none', boxShadow: '0 4px 32px 0 #f0abfc33, 0 1.5px 8px 0 #a5b4fc22' }}
          >
            Calculate
          </button>
          {nailHeight && (
            <div className="text-xl font-bold text-center mt-4 tracking-wider drop-shadow-sm">
              📌 Place the nail at <span className="text-indigo-600 dark:text-indigo-300 font-extrabold text-2xl">{nailHeight}"</span> from the floor.
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 justify-center mt-2">
          <label className="text-base font-semibold text-indigo-700 dark:text-indigo-200">Mood:</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className={`text-base p-2 rounded-2xl border-2 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 shadow-lg ${inputClass}`}
            style={{ fontFamily: 'inherit', fontWeight: 700, letterSpacing: '0.05em', minWidth: 180, background: 'linear-gradient(90deg, #f0abfc22 0%, #a5b4fc22 100%)', borderImage: 'linear-gradient(90deg, #f0abfc 0%, #a5b4fc 100%) 1' }}
          >
            <option value="cubist">🎨 Cubist</option>
            <option value="post-impressionist">🌻 Post-Impressionist</option>
            <option value="zen">🪷 Zen</option>
          </select>
        </div>
      </div>
    </div>
  );
}
