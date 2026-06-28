'use client';
import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, MessageSquare, Send, Loader2 } from 'lucide-react';

type Template = 'html' | 'react' | 'javascript' | 'typescript';

interface ChatMessage { role: 'user' | 'assistant'; content: string; }
interface ProjectFile { id: string; name: string; language: string; content: string; }

const TEMPLATES: Record<Template, { name: string; files: ProjectFile[] }> = {
  html: { name: 'HTML / CSS / JS', files: [
    { id: 'html', name: 'index.html', language: 'html', content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My App</title>\n</head>\n<body>\n  <div class="container">\n    <h1>Hello Forge</h1>\n    <p>Start editing!</p>\n    <button id="btn">Click Me</button>\n    <p id="out"></p>\n  </div>\n  <script src="script.js"></script>\n</body>\n</html>' },
    { id: 'css', name: 'style.css', language: 'css', content: 'body { font-family: system-ui; background: #0B0B0F; color: #F0F0F5; display: flex; align-items: center; justify-content: center; min-height: 100vh; }\n.container { text-align: center; }\nh1 { color: #0EA5E9; }\nbutton { padding: 12px 24px; background: #0EA5E9; color: white; border: none; border-radius: 8px; cursor: pointer; }' },
    { id: 'js', name: 'script.js', language: 'javascript', content: 'let count = 0;\ndocument.getElementById("btn").addEventListener("click", () => {\n  count++;\n  document.getElementById("out").textContent = "Clicked " + count + " times";\n});' },
  ]},
  react: { name: 'React (CDN)', files: [
    { id: 'app', name: 'app.jsx', language: 'javascript', content: 'function App() {\n  const [count, setCount] = React.useState(0);\n  return (\n    <div style={{textAlign:"center",padding:"2rem"}}>\n      <h1 style={{color:"#0EA5E9"}}>React on Forge</h1>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>Increment</button>\n    </div>\n  );\n}\nReactDOM.createRoot(document.getElementById("root")).render(<App />);' },
  ]},
  javascript: { name: 'JavaScript', files: [
    { id: 'main', name: 'main.js', language: 'javascript', content: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\nconsole.log("Fibonacci:");\nfor (let i = 0; i < 10; i++) {\n  console.log("  F(" + i + ") = " + fibonacci(i));\n}' },
  ]},
  typescript: { name: 'TypeScript', files: [
    { id: 'main', name: 'main.ts', language: 'typescript', content: 'type User = { name: string; age: number };\nconst users: User[] = [\n  { name: "Alice", age: 30 },\n  { name: "Bob", age: 25 },\n];\nconsole.log("Users:", users);\nconsole.log("Names:", users.map(u => u.name).join(", "));' },
  ]},
};

function runTemplate(template: Template, files: ProjectFile[]): { html?: string; output: string } {
  if (template === 'html') {
    const html = files.find(f => f.id === 'html')?.content || '';
    const css = files.find(f => f.id === 'css')?.content || '';
    const js = files.find(f => f.id === 'js')?.content || '';
    const combined = html.replace('</head>', '<style>' + css + '</style></head>').replace('</body>', '<script>' + js + '</script></body>');
    return { html: combined, output: 'Preview rendered.' };
  }
  if (template === 'react') {
    const code = files.find(f => f.id === 'app')?.content || '';
    const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://unpkg.com/react@18/umd/react.min.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.min.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script></head><body><div id="root"></div><script type="text/babel">' + code + '</script></body></html>';
    return { html, output: 'React rendering...' };
  }
  const code = files[0]?.content || '';
  const logs: string[] = [];
  try {
    const mockConsole = {
      log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
      error: (...args: any[]) => logs.push('ERROR: ' + args.join(' ')),
      warn: (...args: any[]) => logs.push('WARN: ' + args.join(' ')),
    };
    const wrapped = code.replace(/console\.log/g, '__c.log').replace(/console\.error/g, '__c.error').replace(/console\.warn/g, '__c.warn');
    const fn = new Function('__c', wrapped);
    fn(mockConsole);
  } catch (e: any) {
    logs.push('Error: ' + e.message);
  }
  return { output: logs.join('\n') || 'Code executed (no output).' };
}

export default function PlaygroundPage() {
  const [template, setTemplate] = useState<Template | null>(null);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [activeFileId, setActiveFileId] = useState('');
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [autoRun, setAutoRun] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const filesRef = useRef<ProjectFile[]>(files);

  // Keep ref in sync
  useEffect(() => { filesRef.current = files; }, [files]);

  const selectTemplate = (t: Template) => {
    const tpl = TEMPLATES[t];
    setTemplate(t);
    setFiles(tpl.files.map(f => ({ ...f })));
    setActiveFileId(tpl.files[0].id);
    setPreviewHtml(null);
    setConsoleOutput('');
    setChatMessages([]);
  };

  const activeFile = files.find(f => f.id === activeFileId);

  const runCode = () => {
    if (!template) return;
    const result = runTemplate(template, filesRef.current);
    if (result.html) {
      setPreviewHtml(result.html);
    } else {
      setPreviewHtml(null);
      setConsoleOutput(result.output);
    }
  };

  // Write to iframe whenever previewHtml changes
  useEffect(() => {
    if (!previewHtml || !iframeRef.current) return;
    const iframe = iframeRef.current;
    const handler = () => {
      const doc = iframe.contentDocument;
      if (doc) { doc.open(); doc.write(previewHtml); doc.close(); }
    };
    // If iframe is already loaded, write immediately
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      handler();
    } else {
      iframe.onload = handler;
    }
  }, [previewHtml]);

  // Auto-run with debounce
  useEffect(() => {
    if (!autoRun || !template) return;
    const timer = setTimeout(runCode, 500);
    return () => clearTimeout(timer);
  }, [files, autoRun, template]);

  const handleSend = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatInput('');
    setChatLoading(true);
    setChatMessages(prev => [...prev, { role: 'user', content: msg }]);
    await new Promise(r => setTimeout(r, 800));
    const reply = 'I can help with that! Here are my suggestions:\n\n1. Your code structure looks solid\n2. Consider adding error handling (try/catch)\n3. Add comments for complex sections\n\nWhat specifically would you like help with?';
    setChatMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setChatLoading(false);
  };

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#0B0B0F]">
        <div className="max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-[#F0F0F5] mb-2" style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}>Code Playground</h1>
          <p className="text-sm text-[#A3A3B3] mb-8">Choose a template to start. AI assistant included.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(TEMPLATES) as Template[]).map(key => (
              <button key={key} onClick={() => selectTemplate(key)} className="p-5 rounded-xl bg-[#14141A] border border-[#1E1E26] hover:border-sky-500/50 transition-all text-left">
                <h3 className="text-sm font-semibold text-[#F0F0F5]" style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}>{TEMPLATES[key].name}</h3>
                <p className="text-xs text-[#5A5A6E] mt-1">{TEMPLATES[key].files.length} file{TEMPLATES[key].files.length > 1 ? 's' : ''}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1E1E26] bg-[#14141A] flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setTemplate(null)} className="text-xs text-[#5A5A6E] hover:text-sky-400">&larr; Templates</button>
          <span className="text-sm font-semibold text-[#F0F0F5]">{TEMPLATES[template].name}</span>
          <label className="flex items-center gap-1.5 text-xs text-[#A3A3B3]"><input type="checkbox" checked={autoRun} onChange={e => setAutoRun(e.target.checked)} className="rounded" /> Auto-run</label>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={runCode} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-lg"><Play className="w-3 h-3" /> Run</button>
          <button onClick={() => selectTemplate(template)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-[#A3A3B3] text-xs font-medium rounded-lg"><RotateCcw className="w-3 h-3" /> Reset</button>
          <button onClick={() => setChatOpen(!chatOpen)} className={"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg " + (chatOpen ? 'bg-sky-500/20 text-sky-400' : 'bg-white/5 text-[#A3A3B3]')}><MessageSquare className="w-3 h-3" /> AI</button>
        </div>
      </div>

      <div className="flex items-center border-b border-[#1E1E26] bg-[#0B0B0F] flex-shrink-0 overflow-x-auto">
        {files.map(file => (
          <button key={file.id} onClick={() => setActiveFileId(file.id)} className={"px-4 py-2 text-xs font-medium border-b-2 whitespace-nowrap " + (activeFileId === file.id ? 'border-sky-400 text-[#F0F0F5] bg-[#14141A]' : 'border-transparent text-[#5A5A6E]')}>{file.name}</button>
        ))}
      </div>

      <div className="flex-1 flex min-h-0">
        <div className={"flex flex-col border-r border-[#1E1E26] min-h-0 " + (chatOpen ? 'lg:w-2/5' : 'lg:w-1/2')}>
          <div className="flex-1 min-h-0">
            <Editor height="100%" language={activeFile?.language || 'javascript'} value={activeFile?.content || ''} onChange={(v) => setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: v || '' } : f))} theme="vs-dark" options={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", minimap: { enabled: false }, scrollBeyondLastLine: false, wordWrap: 'on', lineNumbers: 'on', padding: { top: 12 } }} />
          </div>
        </div>

        <div className={"flex flex-col border-r border-[#1E1E26] min-h-0 " + (chatOpen ? 'lg:w-1/5' : 'lg:w-1/2')}>
          <div className="flex items-center px-3 py-1.5 border-b border-[#1E1E26] bg-[#14141A]"><span className="text-xs text-[#A3A3B3]">Output</span></div>
          <div className="flex-1 min-h-0 overflow-auto bg-white">
            {previewHtml ? (
              <iframe ref={iframeRef} className="w-full h-full border-0" sandbox="allow-scripts allow-modals" title="Preview" srcDoc={previewHtml} />
            ) : (
              <div className="p-4 bg-[#0B0B0F] h-full">
                <pre className="text-xs font-mono text-[#A3A3B3] whitespace-pre-wrap">{consoleOutput || 'Output appears here...'}</pre>
              </div>
            )}
          </div>
        </div>

        {chatOpen && (
          <div className="lg:w-2/5 flex flex-col min-h-0">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[#1E1E26] bg-[#14141A]"><MessageSquare className="w-4 h-4 text-sky-400" /><span className="text-xs font-medium text-[#F0F0F5]">AI Assistant</span></div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
              {chatMessages.length === 0 && <p className="text-xs text-[#5A5A6E]">Ask me anything about your code.</p>}
              {chatMessages.map((msg, i) => (
                <div key={i} className={"p-3 rounded-lg text-xs leading-relaxed " + (msg.role === 'user' ? 'bg-sky-500/10 text-[#F0F0F5] ml-4' : 'bg-[#14141A] border border-[#1E1E26] text-[#A3A3B3] mr-4')}>
                  <strong className={msg.role === 'user' ? 'text-sky-400' : 'text-[#22D3EE]'}>{msg.role === 'user' ? 'You: ' : 'AI:  '}</strong>{msg.content}
                </div>
              ))}
              {chatLoading && <div className="p-3 rounded-lg bg-[#14141A] border border-[#1E1E26] flex items-center gap-2"><Loader2 className="w-3 h-3 text-sky-400 animate-spin" /><span className="text-xs text-[#5A5A6E]">Thinking...</span></div>}
            </div>
            <div className="p-3 border-t border-[#1E1E26] flex gap-2">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask about your code..." className="flex-1 px-3 py-2 bg-[#0B0B0F] border border-[#1E1E26] rounded-lg text-xs text-[#F0F0F5] placeholder-[#5A5A6E] focus:outline-none focus:border-sky-500" />
              <button onClick={handleSend} disabled={chatLoading} className="px-3 py-2 bg-sky-500/20 text-sky-400 rounded-lg disabled:opacity-50"><Send className="w-3 h-3" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
