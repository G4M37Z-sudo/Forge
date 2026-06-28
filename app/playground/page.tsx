'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Download, Maximize2, Minimize2, Terminal, Eye, Code2, Settings } from 'lucide-react';

type Language = 'html' | 'javascript' | 'css' | 'typescript';

interface FileTab {
  id: string;
  name: string;
  language: Language;
  content: string;
}

const DEFAULT_FILES: FileTab[] = [
  {
    id: 'html',
    name: 'index.html',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Hello Forge</h1>
    <p>Start editing to see live changes!</p>
    <button id="clickMe">Click Me</button>
    <p id="counter"></p>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
  },
  {
    id: 'css',
    name: 'style.css',
    language: 'css',
    content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #0B0B0F;
  color: #F0F0F5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #0EA5E9, #06B6D4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

p {
  color: #A3A3B3;
  margin-bottom: 1.5rem;
}

button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #0284C7, #0EA5E9);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.3);
}

#counter {
  margin-top: 1rem;
  color: #22D3EE;
  font-weight: 500;
}`,
  },
  {
    id: 'javascript',
    name: 'script.js',
    language: 'javascript',
    content: `let count = 0;

document.getElementById('clickMe').addEventListener('click', () => {
  count++;
  document.getElementById('counter').textContent = \`Clicked \${count} time\${count !== 1 ? 's' : ''}\`;
  console.log('Button clicked! Count:', count);
});

console.log('App initialized!');`,
  },
];

export default function PlaygroundPage() {
  const [files, setFiles] = useState<FileTab[]>(DEFAULT_FILES);
  const [activeFile, setActiveFile] = useState<string>('html');
  const [output, setOutput] = useState<string>('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [view, setView] = useState<'split' | 'editor' | 'preview'>('split');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeFileObj = files.find(f => f.id === activeFile);

  const updateFileContent = useCallback((content: string) => {
    setFiles(prev => prev.map(f => f.id === activeFile ? { ...f, content } : f));
  }, [activeFile]);

  const runCode = useCallback(() => {
    const htmlFile = files.find(f => f.id === 'html');
    const cssFile = files.find(f => f.id === 'css');
    const jsFile = files.find(f => f.id === 'javascript');

    if (!htmlFile) return;

    const logs: string[] = [];
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
    };

    const combinedHtml = htmlFile.content
      .replace('</head>', `<style>${cssFile?.content || ''}</style></head>`)
      .replace('</body>', `<script>${jsFile?.content || ''}<\/script></body>`);

    console.log = originalConsoleLog;

    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(combinedHtml);
        doc.close();
      }
    }

    setConsoleLogs(logs);
    setOutput('Code executed successfully!');
  }, [files]);

  const resetCode = () => {
    setFiles(DEFAULT_FILES);
    setOutput('');
    setConsoleLogs([]);
  };

  const downloadProject = () => {
    const htmlFile = files.find(f => f.id === 'html');
    const blob = new Blob([htmlFile?.content || ''], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'index.html';
    a.click();
  };

  useEffect(() => {
    const timer = setTimeout(runCode, 1000);
    return () => clearTimeout(timer);
  }, [files]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1E1E26] bg-[#14141A]">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-sky-400" />
          <span className="text-sm font-semibold text-[#F0F0F5]" style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}>Playground</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={runCode} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-lg hover:bg-emerald-500/30 transition-colors">
            <Play className="w-3 h-3" /> Run
          </button>
          <button onClick={resetCode} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-[#A3A3B3] text-xs font-medium rounded-lg hover:bg-white/10 transition-colors">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
          <button onClick={downloadProject} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-[#A3A3B3] text-xs font-medium rounded-lg hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export
          </button>
          <div className="w-px h-5 bg-[#1E1E26] mx-1" />
          <button onClick={() => setView('editor')} className={`p-1.5 rounded transition-colors ${view === 'editor' ? 'bg-sky-500/20 text-sky-400' : 'text-[#5A5A6E] hover:text-[#A3A3B3]'}`} title="Editor only">
            <Code2 className="w-4 h-4" />
          </button>
          <button onClick={() => setView('split')} className={`p-1.5 rounded transition-colors ${view === 'split' ? 'bg-sky-500/20 text-sky-400' : 'text-[#5A5A6E] hover:text-[#A3A3B3]'}`} title="Split view">
            <Settings className="w-4 h-4" />
          </button>
          <button onClick={() => setView('preview')} className={`p-1.5 rounded transition-colors ${view === 'preview' ? 'bg-sky-500/20 text-sky-400' : 'text-[#5A5A6E] hover:text-[#A3A3B3]'}`} title="Preview only">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* File tabs */}
      <div className="flex items-center gap-0 border-b border-[#1E1E26] bg-[#0B0B0F] overflow-x-auto">
        {files.map(file => (
          <button
            key={file.id}
            onClick={() => setActiveFile(file.id)}
            className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${activeFile === file.id ? 'border-sky-400 text-[#F0F0F5] bg-[#14141A]' : 'border-transparent text-[#5A5A6E] hover:text-[#A3A3B3]'}`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Editor */}
        {view !== 'preview' && (
          <div className={`${view === 'split' ? 'lg:w-1/2' : 'w-full'} flex flex-col border-r border-[#1E1E26]`}>
            <div className="flex-1 min-h-[300px] lg:min-h-0">
              <Editor
                height="100%"
                language={activeFileObj?.language || 'javascript'}
                value={activeFileObj?.content || ''}
                onChange={(value) => updateFileContent(value || '')}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  renderLineHighlight: 'line',
                  cursorBlinking: 'smooth',
                  smoothScrolling: true,
                  padding: { top: 16 },
                }}
              />
            </div>
          </div>
        )}

        {/* Preview */}
        {view !== 'editor' && (
          <div className={`${view === 'split' ? 'lg:w-1/2' : 'w-full'} flex flex-col`}>
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#1E1E26] bg-[#14141A]">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#5A5A6E]" />
                <span className="text-xs font-medium text-[#A3A3B3]">Preview</span>
              </div>
              <span className="text-[10px] text-[#5A5A6E]">Auto-runs on change</span>
            </div>
            <div className="flex-1 bg-white min-h-[300px] lg:min-h-0">
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-modals"
                title="Preview"
              />
            </div>
            {/* Console */}
            {consoleLogs.length > 0 && (
              <div className="border-t border-[#1E1E26] bg-[#0B0B0F] max-h-32 overflow-y-auto">
                <div className="flex items-center gap-2 px-4 py-1.5 border-b border-[#1E1E26]">
                  <Terminal className="w-3 h-3 text-[#5A5A6E]" />
                  <span className="text-[10px] font-medium text-[#5A5A6E]">Console</span>
                </div>
                {consoleLogs.map((log, i) => (
                  <div key={i} className="px-4 py-1 text-xs font-mono text-[#22D3EE]">
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
