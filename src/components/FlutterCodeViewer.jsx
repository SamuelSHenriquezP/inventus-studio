// src/components/FlutterCodeViewer.jsx
import { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { sounds } from '../utils/soundEngine';

export default function FlutterCodeViewer({ codeSnippet, accentColor = '#38bdf8' }) {
  const [copied, setCopied] = useState(false);

  if (!codeSnippet) return null;

  const handleCopy = (e) => {
    e.stopPropagation();
    sounds.playClick();
    navigator.clipboard.writeText(codeSnippet.code);
    setCopied(true);
    sounds.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  // Robust Single-Pass Tokenizer for Dart / Flutter / GLSL
  const renderTokens = (line) => {
    if (line.trim().startsWith('//')) {
      return <span className="text-zinc-500 italic">{line}</span>;
    }

    // Token match pattern
    const tokenRegex = /('(?:\\'|[^'])*'|"(?:\\"|[^"])*"|\/\/.*$|\b(?:class|extends|with|implements|abstract|return|if|else|super|this|new|import|export)\b|\b(?:final|late|const|var|void|async|await|Future|double|int|String|bool|vec3|vec2|vec4|float|mat4|Uint8List)\b|\b(?:@override|uniform|varying|attribute)\b|\b[A-Z][a-zA-Z0-9_]*\b|\b\d+\.?\d*\b|[{}();,.<>+\-*/=!]|[\s]+|[^\s{}();,.<>+\-*/=!]+)/g;

    const tokens = [];
    let match;
    let keyIdx = 0;

    while ((match = tokenRegex.exec(line)) !== null) {
      const text = match[0];
      keyIdx++;

      if (text.startsWith('//')) {
        tokens.push(<span key={keyIdx} className="text-zinc-500 italic">{text}</span>);
      } else if (text.startsWith("'") || text.startsWith('"')) {
        tokens.push(<span key={keyIdx} className="text-emerald-300">{text}</span>);
      } else if (/^(?:class|extends|with|implements|abstract|return|if|else|super|this|new|import|export)$/.test(text)) {
        tokens.push(<span key={keyIdx} className="text-pink-400 font-bold">{text}</span>);
      } else if (/^(?:final|late|const|var|void|async|await|Future|double|int|String|bool|vec3|vec2|vec4|float|mat4|Uint8List)$/.test(text)) {
        tokens.push(<span key={keyIdx} className="text-sky-400">{text}</span>);
      } else if (/^(?:@override|uniform|varying|attribute)$/.test(text)) {
        tokens.push(<span key={keyIdx} className="text-purple-400 font-semibold">{text}</span>);
      } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(text)) {
        tokens.push(<span key={keyIdx} className="text-amber-300 font-medium">{text}</span>);
      } else if (/^\d+\.?\d*$/.test(text)) {
        tokens.push(<span key={keyIdx} className="text-amber-400">{text}</span>);
      } else {
        tokens.push(<span key={keyIdx} className="text-zinc-300">{text}</span>);
      }
    }

    return tokens.length > 0 ? tokens : <span className="text-zinc-300">{line}</span>;
  };

  const lines = codeSnippet.code.split('\n');

  return (
    <div className="w-full h-full bg-[#0b0c12]/98 text-zinc-300 font-mono text-[10px] sm:text-[11px] flex flex-col justify-between overflow-hidden select-text">
      
      {/* IDE Top Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-black/70 border-b border-white/10 select-none shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400 pl-2 text-[10px]">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-white font-bold">{codeSnippet.filename}</span>
            <span className="text-zinc-600">({codeSnippet.language.toUpperCase()})</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer text-[10px]"
          title="Copiar código al portapapeles"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copiado' : 'Copiar'}</span>
        </button>
      </div>

      {/* Code Text Area with Line Numbers */}
      <div className="flex-1 p-3 overflow-y-auto overflow-x-auto space-y-0.5 scrollbar-thin scrollbar-thumb-white/10 leading-relaxed font-mono">
        {lines.map((line, idx) => (
          <div key={idx} className="flex gap-3 hover:bg-white/[0.04] px-1 rounded transition-colors">
            <span className="w-5 shrink-0 text-right text-zinc-600 select-none text-[9px] pt-0.5">
              {idx + 1}
            </span>
            <span className="flex-1 whitespace-pre">
              {renderTokens(line)}
            </span>
          </div>
        ))}
      </div>

      {/* IDE Bottom Status */}
      <div className="px-3 py-1 bg-black/80 border-t border-white/5 flex items-center justify-between text-[9px] text-zinc-500 select-none shrink-0">
        <span className="flex items-center gap-1.5" style={{ color: accentColor }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
          Flutter Engine / Impeller Native
        </span>
        <span>UTF-8 • Dart 3.5</span>
      </div>

    </div>
  );
}
