// src/components/InteractiveTerminal.jsx
import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Copy, Check, Star, GitFork } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEngine';

export default function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef(null);

  const [history, setHistory] = useState([
    { 
      cmd: 'inventus --version', 
      res: 'Inventus Tech Studio CLI v4.0.0 [Silicon Valley Grade Engineering Suite]' 
    },
    { 
      cmd: 'help', 
      res: 'Comandos disponibles: "projects", "github", "stack", "flutter", "benchmark", "hire", "clear"' 
    }
  ]);

  const quickCommands = ['projects', 'github', 'stack', 'flutter', 'benchmark', 'hire', 'clear'];

  const githubRepos = [
    { name: 'inventus/stateflow-reactive', stars: 184, forks: 32, lang: 'Dart / Flutter', desc: 'Toolkit reactivo con persistencia local cifrada y sincronización offline sub-85ms.' },
    { name: 'inventus/flame-neon-physics', stars: 142, forks: 26, lang: 'Flutter / WASM', desc: 'Motor de físicas vectoriales 2D optimizado para 60-120 FPS en CanvasKit.' },
    { name: 'inventus/enterprise-websocket-mesh', stars: 215, forks: 48, lang: 'Node.js / Redis', desc: 'Arquitectura distribuida para sincronización de datos con tolerancia a fallas.' }
  ];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const runCommand = (commandToRun) => {
    sounds.playClick();
    const cmd = commandToRun.trim().toLowerCase();
    let res = '';
    let isSpecial = false;

    switch(cmd) {
      case 'help':
        res = 'Comandos disponibles: "projects", "github", "stack", "flutter", "benchmark", "hire", "clear"';
        break;
      case 'projects':
        res = '1. [Enterprise Sync] Plataforma B2B Distribuida (<85ms latency)\n2. [Cyber Rush] Videojuego Arcade Flutter WebAssembly (60 FPS)\n3. [StateFlow] Toolkit Móvil de Alta Concurrencia\n4. [Nexus 3D] Portal Web Cinemático con Three.js';
        break;
      case 'github':
        res = 'REPOSITORIOS OPEN-SOURCE DESTACADOS:\n' + 
          githubRepos.map(r => `★ ${r.name} (${r.stars} Stars, ${r.forks} Forks) - [${r.lang}]\n  ↳ ${r.desc}`).join('\n\n');
        break;
      case 'stack':
        res = '• Mobile: Flutter 3.x, Dart, Riverpod, Isar/Hive DB, Rust FFI\n• Frontend: React 19, Three.js, Tailwind v4, Lenis, WebGL, Framer Motion\n• Backend & Cloud: Node.js, WebSockets, PostgreSQL, Docker, Redis, Cloudflare Workers';
        break;
      case 'flutter':
        res = '✓ Flutter WebAssembly Activo\n✓ CanvasKit & Skia Renderer a 60-120 FPS\n✓ Arquitectura Limpia & Despliegue Multiplataforma (iOS, Android, Web, macOS/Windows)';
        break;
      case 'benchmark':
        res = '⚡ INVENTUS PERFORMANCE BENCHMARK 2026:\n- Time to First Byte: 14ms (Cloudflare Edge)\n- Sincronización WebSockets: ~38ms p99\n- Frame Rate UI: 60 FPS estables sin jank\n- Costo de Servidores: $0.00/mes para landing y edge routing';
        break;
      case 'hire':
        sounds.playSuccess();
        res = '🚀 ¡Iniciando contacto prioritario con Samuel & Inventus Studio! Redirigiendo a WhatsApp...';
        isSpecial = true;
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#00F0FF', '#A855F7', '#10B981']
        });
        setTimeout(() => {
          window.open('https://wa.me/573000000000?text=Hola%20Inventus%20Studio,%20quiero%20contratar%20su%20desarrollo%20de%20software', '_blank');
        }, 1000);
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        res = `Comando no reconocido: "${cmd}". Escribe "help" o haz clic en uno de los comandos rápidos abajo.`;
    }

    setHistory(prev => [...prev, { cmd: commandToRun, res, isSpecial }]);
    setInput('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    runCommand(input);
  };

  const copyHistory = () => {
    sounds.playClick();
    const text = history.map(h => `$ ${h.cmd}\n${h.res}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden font-mono text-xs backdrop-blur-xl">
      
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900/90 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-3 text-zinc-300 flex items-center gap-1.5 font-semibold text-[11px]">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" /> inventus-core-terminal ~ zsh (Production v4)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={copyHistory}
            className="text-zinc-400 hover:text-white flex items-center gap-1 text-[10px] transition-colors cursor-pointer"
            title="Copiar salida de terminal"
            data-cursor="COPY"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>
          <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-white/5">
            UTF-8
          </span>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="p-6 space-y-4 min-h-60 max-h-80 overflow-y-auto">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="text-zinc-500 font-bold">➜</span>
              <span className="text-cyan-400 font-bold">inventus@studio:~$</span>
              <span className="text-white font-semibold">{item.cmd}</span>
            </div>
            <div className={`pl-5 border-l-2 leading-relaxed whitespace-pre-line font-mono text-[11px] ${
              item.isSpecial ? 'border-emerald-400 text-emerald-300 font-bold' : 'border-cyan-500/30 text-zinc-300'
            }`}>
              {item.res}
            </div>
          </div>
        ))}

        {/* Input Prompt Form */}
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-2 text-cyan-400">
          <span className="text-zinc-500 font-bold">➜</span>
          <span className="font-bold">inventus@studio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe 'projects', 'github', 'hire' o presiona un botón..."
            className="flex-1 bg-transparent text-white outline-none placeholder:text-zinc-600 font-mono text-xs"
          />
          <button type="submit" className="p-1 text-zinc-500 hover:text-cyan-400 transition-colors cursor-pointer">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Quick Command Chips & GitHub Highlights */}
      <div className="px-6 py-3.5 bg-zinc-900/60 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mr-1">
            Comandos Rápidos:
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              className={`px-3 py-1 rounded-lg border text-[11px] font-mono transition-all cursor-pointer ${
                cmd === 'hire'
                  ? 'bg-linear-to-r from-cyan-400 to-sky-500 text-black font-bold border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-zinc-950 text-zinc-400 hover:text-cyan-300 border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10'
              }`}
              data-cursor="RUN"
            >
              ${cmd}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
          <span className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 540+ Stars Totales
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-purple-400">
            <GitFork className="w-3.5 h-3.5" /> 106 Forks
          </span>
        </div>
      </div>

    </div>
  );
}