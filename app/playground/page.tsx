'use client';
import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, MessageSquare, Send, Loader2, Plus, Trash2, FileCode, FolderOpen } from 'lucide-react';

type ChatMessage = { role: 'user' | 'assistant'; content: string; };
type ProjectFile = { id: string; name: string; language: string; content: string; };

const LANGUAGE_MAP: Record<string, string> = {
  '.html': 'html',
  '.htm': 'html',
  '.css': 'css',
  '.js': 'javascript',
  '.jsx': 'javascript',
  '.ts': 'typescript',
  '.tsx': 'typescript',
  '.json': 'json',
  '.md': 'markdown',
  '.py': 'python',
  '.sql': 'sql',
  '.xml': 'xml',
  '.yaml': 'yaml',
  '.yml': 'yaml',
  '.bash': 'shell',
  '.sh': 'shell',
  '.env': 'plaintext',
  '.txt': 'plaintext',
};

function detectLanguage(filename: string): string {
  const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  return LANGUAGE_MAP[ext] || 'plaintext';
}

const TEMPLATES = {
  html: { name: 'HTML / CSS / JS', files: [
    { id: 'html', name: 'index.html', language: 'html', content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My App</title>\n</head>\n<body>\n  <div class="container">\n    <h1>Hello Forge</h1>\n    <p>Start editing to see live changes!</p>\n    <button id="btn">Click Me</button>\n    <p id="out"></p>\n  </div>\n  <script src="script.js"></script>\n</body>\n</html>' },
    { id: 'css', name: 'style.css', language: 'css', content: 'body { font-family: system-ui; background: #0B0B0F; color: #F0F0F5; display: flex; align-items: center; justify-content: center; min-height: 100vh; }\n.container { text-align: center; }\nh1 { color: #0EA5E9; }\np { color: #A3A3B3; margin-bottom: 1.5rem; }\nbutton { padding: 12px 24px; background: linear-gradient(135deg, #0284C7, #0EA5E9); color: white; border: none; border-radius: 8px; cursor: pointer; }\nbutton:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(14,165,233,0.3); }' },
    { id: 'js', name: 'script.js', language: 'javascript', content: 'let count = 0;\ndocument.getElementById("btn").addEventListener("click", () => {\n  count++;\n  document.getElementById("out").textContent = `Clicked ${count} time${count !== 1 ? "s" : ""}`;\n  console.log("Count:", count);\n});' },
  ]},
  react: { name: 'React (CDN)', files: [
    { id: 'app', name: 'app.jsx', language: 'javascript', content: 'function App() {\n  const [count, setCount] = React.useState(0);\n  return (\n    <div style={{ textAlign: "center", padding: "2rem" }}>\n      <h1 style={{ background: "linear-gradient(135deg, #0EA5E9, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>\n        React on Forge\n      </h1>\n      <p style={{ color: "#666" }}>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)} style={{ padding: "12px 24px", background: "#0EA5E9", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>\n        Increment\n      </button>\n    </div>\n  );\n}\nReactDOM.createRoot(document.getElementById("root")).render(<App />);' },
  ]},
  javascript: { name: 'JavaScript', files: [
    { id: 'main', name: 'main.js', language: 'javascript', content: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\nconsole.log("Fibonacci sequence:");\nfor (let i = 0; i <= 10; i++) {\n  console.log(`  F(${i}) = ${fibonacci(i)}`);\n}\n\nconst data = [3, 1, 4, 1, 5, 9, 2, 6];\nconsole.log("Sorted:", [...data].sort((a, b) => a - b));\nconsole.log("Sum:", data.reduce((a, b) => a + b, 0));' },
  ]},
  typescript: { name: 'TypeScript', files: [
    { id: 'main', name: 'main.ts', language: 'typescript', content: 'interface User {\n  name: string;\n  age: number;\n  role: "admin" | "user";\n}\n\nconst users: User[] = [\n  { name: "Alice", age: 30, role: "admin" },\n  { name: "Bob", age: 25, role: "user" },\n  { name: "Charlie", age: 35, role: "admin" },\n];\n\nconst admins = users.filter(u => u.role === "admin");\nconsole.log("Admins:", admins.map(u => u.name).join(", "));\nconsole.log("Average age:", users.reduce((s, u) => s + u.age, 0) / users.length);' },
  ]},
  blank: { name: 'Blank Project', files: [
    { id: 'main', name: 'main.js', language: 'javascript', content: '// Start coding here\nconsole.log("Hello Forge!");' },
  ]},
};

type TemplateKey = keyof typeof TEMPLATES;

function runFiles(files: ProjectFile[]): { html?: string; output: string } {
  const hasHtml = files.some(f => f.language === 'html');
  const hasReact = files.some(f => f.name.endsWith('.jsx') || f.name.endsWith('.tsx'));

  if (hasReact) {
    const code = files.find(f => f.name.endsWith('.jsx') || f.name.endsWith('.tsx'))?.content || '';
    const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://unpkg.com/react@18/umd/react.min.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.min.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script></head><body><div id="root"></div><script type="text/babel">' + code + '</script></body></html>';
    return { html, output: 'React app rendered.' };
  }

  if (hasHtml) {
    const htmlFile = files.find(f => f.language === 'html');
    const cssFiles = files.filter(f => f.language === 'css');
    const jsFiles = files.filter(f => f.language === 'javascript');
    let combined = htmlFile?.content || '';
    const allCss = cssFiles.map(f => f.content).join('\n');
    const allJs = jsFiles.map(f => f.content).join('\n');
    combined = combined.replace('</head>', '<style>' + allCss + '</style></head>');
    combined = combined.replace('</body>', '<script>' + allJs + '</script></body>');
    return { html: combined, output: 'Preview rendered.' };
  }

  // Run as script
  const code = files[0]?.content || '';
  const logs: string[] = [];
  try {
    const mockConsole = {
      log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
      error: (...args: any[]) => logs.push('ERROR: ' + args.join(' ')),
      warn: (...args: any[]) => logs.push('WARN: ' + args.join(' ')),
      info: (...args: any[]) => logs.push('INFO: ' + args.join(' ')),
    };
    const wrapped = code.replace(/console\./g, '__c.');
    const fn = new Function('__c', wrapped);
    fn(mockConsole);
  } catch (e: any) {
    logs.push('Error: ' + e.message);
  }
  return { output: logs.join('\n') || 'Code executed (no output).' };
}

export default function PlaygroundPage() {
  const [projectName, setProjectName] = useState('My Project');
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [activeFileId, setActiveFileId] = useState('');
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [autoRun, setAutoRun] = useState(true);
  const [showNewFile, setShowNewFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const filesRef = useRef<ProjectFile[]>(files);
  const runRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { filesRef.current = files; }, [files]);

  const loadTemplate = (key: TemplateKey) => {
    const tpl = TEMPLATES[key];
    setProjectName(tpl.name);
    setFiles(tpl.files.map(f => ({ ...f, id: f.id + '-' + Date.now() })));
    setActiveFileId(tpl.files[0].id + '-' + Date.now());
    setPreviewHtml(null);
    setConsoleOutput('');
    setChatMessages([]);
    setShowNewFile(false);
  };

  const activeFile = files.find(f => f.id === activeFileId);

  const createFile = () => {
    if (!newFileName.trim()) return;
    const name = newFileName.trim();
    const lang = detectLanguage(name);
    const id = name.replace(/[^a-z0-9]/gi, '-').toLowerCase() + '-' + Date.now();
    const newFile: ProjectFile = { id, name, language: lang, content: lang === 'html' ? '<!DOCTYPE html>\n<html>\n<head>\n  <title>New Page</title>\n</head>\n<body>\n  \n</body>\n</html>' : '// ' + name + '\n' };
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(id);
    setNewFileName('');
    setShowNewFile(false);
  };

  const deleteFile = (id: string) => {
    if (files.length <= 1) return; // Keep at least one file
    setFiles(prev => prev.filter(f => f.id !== id));
    if (activeFileId === id) {
      setActiveFileId(files.find(f => f.id !== id)?.id || '');
    }
  };

  const renameFile = (id: string, newName: string) => {
    const lang = detectLanguage(newName);
    setFiles(prev => prev.map(f => f.id === id ? { ...f, name: newName, language: lang } : f));
  };

  const runCode = () => {
    const result = runFiles(filesRef.current);
    if (result.html) {
      setPreviewHtml(result.html);
      setConsoleOutput('');
    } else {
      setPreviewHtml(null);
      setConsoleOutput(result.output);
    }
  };

  useEffect(() => {
    if (!autoRun || files.length === 0) return;
    if (runRef.current) clearTimeout(runRef.current);
    runRef.current = setTimeout(runCode, 600);
    return () => { if (runRef.current) clearTimeout(runRef.current); };
  }, [files, autoRun]);

  const handleSend = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatInput('');
    setChatLoading(true);
    setChatMessages(prev => [...prev, { role: 'user', content: msg }]);
    await new Promise(r => setTimeout(r, 1000));
    const codeContext = activeFile?.content?.slice(0, 300) || 'No code yet';
    const reply = `Looking at ${activeFile?.name || 'your file'}:\n\n${codeContext.slice(0, 100)}...\n\nSuggestions:\n1. Look for any syntax errors\n2. Consider adding error handling\n3. Break complex functions into smaller ones\n\nWhat would you like me to help with specifically?`;
    setChatMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setChatLoading(false);
  };

  // Template selector
  if (files.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#0B0B0F]">
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl font-bold text-[#F0F0F5] mb-2" style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}>Code Playground</h1>
          <p className="text-sm text-[#A3A3B3] mb-8">Choose a template or start blank. Add your own files. AI assistant included.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(Object.keys(TEMPLATES) as TemplateKey[]).map(key => (
              <button key={key} onClick={() => loadTemplate(key)} className="p-5 rounded-xl bg-[#14141A] border border-[#1E1E26] hover:border-sky-500/50 transition-all text-left group">
                <h3 className="text-sm font-semibold text-[#F0F0F5] group-hover:text-sky-400 transition-colors" style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}>{TEMPLATES[key].name}</h3>
                <p className="text-xs text-[#5A5A6E] mt-1">{TEMPLATES[key].files.length} file{TEMPLATES[key].files.length > 1 ? 's' : ''} ready</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1E1E26] bg-[#14141A] flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => { setFiles([]); setPreviewHtml(null); }} className="text-xs text-[#5A5A6E] hover:text-sky-400 transition-colors">&larr; Projects</button>
          <span className="text-sm font-semibold text-[#F0F0F5]">{projectName}</span>
          <span className="text-xs text-[#5A5A6E]">{files.length} file{files.length !== 1 ? 's' : ''}</span>
          <label className="flex items-center gap-1.5 text-xs text-[#A3A3B3]"><input type="checkbox" checked={autoRun} onChange={e => setAutoRun(e.target.checked)} className="rounded" /> Auto-run</label>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={runCode} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-lg hover:bg-emerald-500/30 transition-colors"><Play className="w-3 h-3" /> Run</button>
          <button onClick={() => setShowNewFile(true)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/10 text-sky-400 text-xs font-medium rounded-lg hover:bg-sky-500/20 transition-colors"><Plus className="w-3 h-3" /> New File</button>
          <button onClick={() => setChatOpen(!chatOpen)} className={"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors " + (chatOpen ? 'bg-sky-500/20 text-sky-400' : 'bg-white/5 text-[#A3A3B3] hover:bg-white/10')}><MessageSquare className="w-3 h-3" /> AI</button>
        </div>
      </div>

      {/* New file modal */}
      {showNewFile && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setShowNewFile(false)}>
          <div className="bg-[#14141A] border border-[#1E1E26] rounded-xl p-6 w-96" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-semibold text-[#F0F0F5] mb-4" style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}>Create New File</h3>
            <input
              value={newFileName}
              onChange={e => setNewFileName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createFile()}
              placeholder="filename.extension (e.g. utils.js, style.css)"
              className="w-full px-3 py-2 bg-[#0B0B0F] border border-[#1E1E26] rounded-lg text-sm text-[#F0F0F5] placeholder-[#5A5A6E] focus:outline-none focus:border-sky-500 mb-3"
              autoFocus
            />
            <p className="text-xs text-[#5A5A6E] mb-4">Supported: .html, .css, .js, .jsx, .ts, .tsx, .json, .md, .py, .sql, .xml, .yaml, .sh, .txt</p>
            <div className="flex gap-2">
              <button onClick={createFile} className="flex-1 px-4 py-2 bg-sky-500/20 text-sky-400 text-xs font-medium rounded-lg hover:bg-sky-500/30 transition-colors">Create</button>
              <button onClick={() => setShowNewFile(false)} className="px-4 py-2 bg-white/5 text-[#A3A3B3] text-xs font-medium rounded-lg hover:bg-white/10 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="flex-1 flex min-h-0">
        {/* File explorer sidebar */}
        <div className="w-48 border-r border-[#1E1E26] bg-[#0B0B0F] flex flex-col flex-shrink-0 hidden md:flex">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[#1E1E26] bg-[#14141A]">
            <FolderOpen className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs font-medium text-[#A3A3B3]">Files</span>
          </div>
          <div className="flex-1 overflow-y-auto py-1">
            {files.map(file => (
              <div key={file.id} className={"flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer group transition-colors " + (activeFileId === file.id ? 'bg-sky-500/10 text-[#F0F0F5]' : 'text-[#5A5A6E] hover:text-[#A3A3B3] hover:bg-white/[0.02]')}>
                <FileCode className="w-3 h-3 flex-shrink-0" onClick={() => setActiveFileId(file.id)} />
                <span className="flex-1 truncate" onClick={() => setActiveFileId(file.id)}>{file.name}</span>
                {files.length > 1 && (
                  <button onClick={(e) => { e.stopPropagation(); deleteFile(file.id); }} className="opacity-0 group-hover:opacity-100 text-[#5A5A6E] hover:text-red-400 transition-all">
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setShowNewFile(true)} className="flex items-center gap-2 px-3 py-2 border-t border-[#1E1E26] text-xs text-[#5A5A6E] hover:text-sky-400 transition-colors">
            <Plus className="w-3 h-3" /> New File
          </button>
        </div>

        {/* Editor */}
        <div className={"flex flex-col border-r border-[#1E1E26] min-h-0 " + (chatOpen ? 'lg:w-2/5' : 'lg:w-1/2')}>
          {/* Mobile file tabs */}
          <div className="flex items-center border-b border-[#1E1E26] bg-[#0B0B0F] overflow-x-auto md:hidden">
            {files.map(file => (
              <button key={file.id} onClick={() => setActiveFileId(file.id)} className={"px-4 py-2 text-xs font-medium border-b-2 whitespace-nowrap " + (activeFileId === file.id ? 'border-sky-400 text-[#F0F0F5] bg-[#14141A]' : 'border-transparent text-[#5A5A6E]')}>{file.name}</button>
            ))}
          </div>
          <div className="flex-1 min-h-0">
            {activeFile ? (
              <Editor height="100%" language={activeFile.language} value={activeFile.content} onChange={(v) => setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: v || '' } : f))} theme="vs-dark" options={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", minimap: { enabled: false }, scrollBeyondLastLine: false, wordWrap: 'on', lineNumbers: 'on', padding: { top: 12 } }} />
            ) : (
              <div className="flex items-center justify-center h-full text-[#5A5A6E] text-sm">No file selected</div>
            )}
          </div>
        </div>

        {/* Output / Preview */}
        <div className={"flex flex-col border-r border-[#1E1E26] min-h-0 " + (chatOpen ? 'lg:w-1/5' : 'lg:w-1/2')}>
          <div className="flex items-center px-3 py-1.5 border-b border-[#1E1E26] bg-[#14141A]"><span className="text-xs text-[#A3A3B3]">Output</span></div>
          <div className="flex-1 min-h-0 overflow-auto bg-white">
            {previewHtml ? (
              <iframe className="w-full h-full border-0" sandbox="allow-scripts allow-modals" title="Preview" srcDoc={previewHtml} />
            ) : (
              <div className="p-4 bg-[#0B0B0F] h-full">
                <pre className="text-xs font-mono text-[#A3A3B3] whitespace-pre-wrap">{consoleOutput || 'Output appears here...'}</pre>
              </div>
            )}
          </div>
        </div>

        {/* AI Chat */}
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
