"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Neutral");
  const [length, setLength] = useState("1 min");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, tone, length }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    
  <main className="relative z-10 min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-4 overflow-x-hidden">


    {/* floating background glow */}
    <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[120px] rounded-full top-[-200px] left-[-200px] -z-10" />
<div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-200px] right-[-200px] -z-10" />

    {/* 3D card */}
    <div className="relative w-full max-w-4xl">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-10 transform transition hover:scale-[1.01]">

       <div className="text-center mb-10">
  
  <div className="flex items-center justify-center gap-2 mb-2">
    <span className="text-5xl font-extrabold text-white">𓃦</span>
    <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
      Blue Foxes AI Content Lab
    </span>
  </div>

  <h1 className="text-4xl font-extrabold text-white">
    AI Script Generator
  </h1>

  <p className="text-gray-300 mt-2">
    Turn ideas into cinematic stories with AI
  </p>

  <p className="text-gray-400 text-sm mt-1">
    Built by Rahaf Bakri
  </p>

</div>


        {/* Prompt */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: The life and death of Cleopatra"
          className="w-full h-36 bg-black/30 text-white border border-white/20 rounded-2xl p-5 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
        />

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="bg-black/30 text-white border border-white/20 rounded-xl p-3"
          >
            <option>Neutral</option>
            <option>Dramatic</option>
            <option>Uplifting</option>
          </select>

          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="bg-black/30 text-white border border-white/20 rounded-xl p-3"
          >
            <option>1 min</option>
            <option>3 min</option>
            <option>5 min</option>
            <option>10 min</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={generateScript}
          disabled={loading}
          className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-purple-500/40 transition transform hover:scale-[1.02]"
        >
          {loading ? "Generating..." : "Generate Script"}
        </button>

        {/* Loading */}
        {loading && (
          <p className="mt-4 text-center text-purple-300 animate-pulse">
            ✨ Generating cinematic script...
          </p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-8 bg-black/40 border border-white/10 rounded-2xl p-6 shadow-inner">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                Generated Script
              </h2>

              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="text-sm bg-white text-black px-3 py-1 rounded-lg font-medium hover:scale-105 transition"
              >
                Copy
              </button>
            </div>

            <pre className="whitespace-pre-wrap text-gray-200 leading-7">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  </main>
);

}

