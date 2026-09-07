import React, { useEffect, useRef, useState } from 'react';
import { Language, ParticipantMaterial } from '../types';
import { participantMaterialsList } from '../data/portalData';
import { downloadParticipantMaterialPdf } from '../utils/pdfDownload';

interface DocumentViewerPageProps {
  material: ParticipantMaterial;
  lang: Language;
  onBack: () => void;
  onSelectOtherMaterial: (m: ParticipantMaterial) => void;
}

export const DocumentViewerPage: React.FC<DocumentViewerPageProps> = ({
  material,
  lang,
  onBack,
  onSelectOtherMaterial,
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const downloadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDownload = () => {
    downloadParticipantMaterialPdf(material);
    setDownloaded(true);
    if (downloadTimerRef.current) clearTimeout(downloadTimerRef.current);
    downloadTimerRef.current = setTimeout(() => setDownloaded(false), 5000);
  };

  useEffect(() => () => {
    if (downloadTimerRef.current) clearTimeout(downloadTimerRef.current);
  }, []);

  const otherMaterials = participantMaterialsList.filter((m) => m.id !== material.id);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20 font-sans">
      {/* BREADCRUMB */}
      <div className="bg-[#00274c] text-white py-4 border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={onBack}
              className="text-slate-300 hover:text-[#6EC1E4] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span>{lang === 'en' ? 'Home' : 'Laman Utama'}</span>
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-slate-300">
              {lang === 'en' ? 'Participant Documents' : 'Dokumen Peserta'}
            </span>
            <span className="text-slate-400">/</span>
            <span className="text-[#6EC1E4] font-semibold truncate max-w-[200px] sm:max-w-none">
              {material.title}
            </span>
          </nav>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer border border-white/20"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>{lang === 'en' ? 'Back' : 'Kembali'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MAIN VIEWER */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold text-sm">
                  {material.fileType}
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#003366]">{material.title}</h1>
                  <span className="text-xs text-slate-500 font-mono">File Size: {material.size} • UKM Institutional Document</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#007bff] hover:bg-[#0069d9] text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Download PDF File</span>
              </button>
            </div>

            {downloaded && (
              <div
                role="status"
                aria-live="polite"
                className="fixed z-[100] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-full sm:max-w-xl p-3 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 text-xs flex items-center gap-2 shadow-lg animate-in fade-in"
              >
                <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                <span className="min-w-0 flex-1 truncate">Download started for <strong>{material.title}</strong></span>
                <button
                  type="button"
                  onClick={() => setDownloaded(false)}
                  aria-label="Dismiss download message"
                  className="text-emerald-700 hover:text-emerald-950 shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            )}

            <div className="space-y-4 text-xs sm:text-sm text-[#54595F] leading-relaxed">
              <h2 className="font-serif text-lg font-bold text-[#003366]">Document Summary</h2>
              <p>{material.description}</p>
            </div>

            {/* DOCUMENT PREVIEW CONTAINER */}
            <div className="border border-slate-200 rounded-lg p-6 bg-slate-50 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
                <span className="font-bold text-[#003366] uppercase">Interactive Document Content Preview</span>
                <span className="text-slate-500 font-mono">Page 1 of 4</span>
              </div>

              <div className="bg-white p-6 rounded shadow-inner border border-slate-200 space-y-3 font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
                {material.contentSnippet.map((paragraph, idx) => (
                  <p key={idx} className="pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007bff] hover:text-[#0056b3] cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>Back to Overview</span>
              </button>
            </div>
          </div>
        </div>

        {/* SIDEBAR: OTHER MATERIALS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#003366] border-b border-slate-100 pb-3">
              Other Official Brochures
            </h3>
            <div className="space-y-3">
              {otherMaterials.map((m) => (
                <div
                  key={m.id}
                  role="link"
                  tabIndex={0}
                  aria-label={`${lang === 'en' ? 'Open document' : 'Buka dokumen'}: ${m.title}`}
                  onClick={() => onSelectOtherMaterial(m)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onSelectOtherMaterial(m);
                    }
                  }}
                  className="p-3 rounded-lg border border-slate-100 hover:border-[#007bff]/60 hover:bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-[#007bff] transition-all cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-mono font-bold">
                      {m.fileType}
                    </span>
                    <span className="text-slate-400 font-mono">{m.size}</span>
                  </div>
                  <h4 className="font-serif text-xs font-bold text-[#003366]">{m.title}</h4>
                  <p className="text-[11px] text-[#54595F] line-clamp-2">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
