import { useState, useRef } from "react";
import { createTask } from "../api";

interface CSVRow {
  title: string;
  description: string;
}

interface ImportCSVProps {
  onImported: () => void;
  onToast: (msg: string, type?: "ok" | "error") => void;
}

function parseCSV(text: string): CSVRow[] {
  const lines = text.trim().split("\n").slice(1);
  return lines.map(line => {
    const [title, ...rest] = line.split(",");
    return { title: title?.trim(), description: rest.join(",").trim() };
  }).filter(r => r.title && r.description);
}

export function ImportCSV({ onImported, onToast }: ImportCSVProps) {
  const [csvRows, setCsvRows] = useState<CSVRow[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    setCsvFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setCsvRows(parseCSV(e.target?.result as string));
    reader.readAsText(file);
  };

  const importCSV = async () => {
    setImporting(true);
    setProgress(0);
    for (let i = 0; i < csvRows.length; i++) {
      await createTask(csvRows[i]);
      setProgress(Math.round(((i + 1) / csvRows.length) * 100));
    }
    const count = csvRows.length;
    setImporting(false);
    setCsvRows([]);
    setCsvFile(null);
    onToast(`${count} tasks importadas!`);
    onImported();
  };

  return (
    <>
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7 mb-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-1 h-5 bg-[#c8f135] rounded-sm" />
          <h2 className="text-lg font-bold font-['Syne']">Importar CSV</h2>
        </div>

        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all mb-5
            ${dragging ? "border-[#c8f135] bg-[#c8f135]/5" : "border-neutral-700 hover:border-[#c8f135] hover:bg-[#c8f135]/5"}`}
        >
          <div className="text-4xl mb-3">📄</div>
          <div className="font-mono text-sm text-neutral-500">
            {csvFile
              ? <><span className="text-[#c8f135] font-bold">{csvFile.name}</span> — {csvRows.length} tasks</>
              : <>arraste o arquivo ou <span className="text-[#c8f135] font-bold">clique para selecionar</span></>
            }
          </div>
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        </div>

        {csvRows.length > 0 && (
          <>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden mb-4">
              <div className="bg-neutral-800 px-4 py-3 font-mono text-[11px] text-neutral-500 uppercase tracking-widest grid grid-cols-2 gap-4">
                <span>título</span><span>descrição</span>
              </div>
              {csvRows.slice(0, 8).map((r, i) => (
                <div key={i} className={`px-4 py-2.5 border-t border-neutral-800 font-mono text-xs grid grid-cols-2 gap-4 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                  <span className="truncate">{r.title}</span>
                  <span className="truncate text-neutral-500">{r.description}</span>
                </div>
              ))}
              {csvRows.length > 8 && (
                <div className="px-4 py-2.5 border-t border-neutral-800 font-mono text-xs text-neutral-600">
                  + {csvRows.length - 8} linhas...
                </div>
              )}
            </div>

            {importing && (
              <div className="h-1 bg-neutral-800 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-[#c8f135] transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
              </div>
            )}

            <button
              onClick={importCSV}
              disabled={importing}
              className="bg-[#c8f135] text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest font-['Syne'] hover:bg-[#d4ff40] hover:-translate-y-px transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {importing ? `Importando... ${progress}%` : `Importar ${csvRows.length} tasks`}
            </button>
          </>
        )}
      </div>

      <div className="font-mono text-xs text-neutral-600 leading-relaxed">
        <div className="text-[#c8f135] mb-2">// formato esperado do CSV:</div>
        <div>title,description</div>
        <div>Estudar Node.js,Aprender HTTP nativo</div>
        <div>Fazer exercícios,Treinar 30 minutos</div>
      </div>
    </>
  );
}
