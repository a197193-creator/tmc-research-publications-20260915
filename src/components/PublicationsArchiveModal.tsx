import React, { useState } from 'react';
import { Language, Publication } from '../types';
import { publicationsList } from '../data/publications';

interface PublicationsArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  selectedPublication?: Publication | null;
}

export const PublicationsArchiveModal: React.FC<PublicationsArchiveModalProps> = ({
  isOpen,
  onClose,
  lang,
  selectedPublication: initialSelected
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePub, setActivePub] = useState<Publication | null>(initialSelected || publicationsList[0] || null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredPubs = publicationsList.filter((p) => {
    return (
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.journal.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDownload = (pub: Publication) => {
    setDownloadSuccess(pub.id);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0c2340] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#b91c1c]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#f59e0b] text-2xl">menu_book</span>
            <div>
              <h3 className="font-serif text-2xl font-bold">
                {lang === 'en' ? 'Scientific Publications Archive' : 'Arkib Penerbitan Saintifik'}
              </h3>
              <p className="text-xs text-slate-300">
                {lang === 'en'
                  ? 'Publication records pending Statistics Unit validation'
                  : 'Rekod penerbitan menunggu pengesahan Unit Statistik'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[78vh] overflow-y-auto">
          {/* Left: Search & Papers List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-lg">search</span>
              <input
                type="text"
                placeholder={lang === 'en' ? 'Search papers, authors, topics...' : 'Cari penerbitan, penulis...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-[#0c2340]"
              />
            </div>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {filteredPubs.map((pub) => {
                const isSelected = activePub?.id === pub.id;
                return (
                  <div
                    key={pub.id}
                    onClick={() => setActivePub(pub)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#0c2340]/5 border-[#0c2340] shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                      <span className="font-semibold text-[#b91c1c]">{pub.journal.split('•')[0]}</span>
                      <span>{pub.year}</span>
                    </div>
                    <h5 className="font-serif text-xs sm:text-sm font-bold text-[#0c2340] line-clamp-2 leading-snug">
                      {pub.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-1 truncate">{pub.authors}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Active Paper Reading Panel (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col justify-between">
            {activePub ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <span className="px-2.5 py-1 rounded bg-[#0c2340] text-white text-[11px] font-heading font-bold uppercase">
                    {activePub.journal}
                  </span>
                  <span className="text-xs font-mono text-slate-500">DOI: {activePub.doi}</span>
                </div>

                <h4 className="font-serif text-xl font-bold text-[#0c2340] leading-snug">
                  "{activePub.title}"
                </h4>

                <div className="text-xs text-slate-600 font-mono">
                  <strong>{lang === 'en' ? 'Authors:' : 'Penulis:'}</strong> {activePub.authors}
                </div>

                {/* Plain language summary box */}
                <div className="p-4 rounded bg-amber-50 border border-amber-200 text-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    <span className="material-symbols-outlined text-sm text-[#d97706]">lightbulb</span>
                    <span>{lang === 'en' ? 'Clinical Plain-Language Takeaway' : 'Ringkasan Bahasa Mudah Klinikal'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activePub.plainLanguageSummary}
                  </p>
                </div>

                {/* Scientific Abstract */}
                <div>
                  <h6 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    {lang === 'en' ? 'Scientific Abstract' : 'Abstrak Saintifik'}
                  </h6>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded border border-slate-200">
                    {activePub.abstract}
                  </p>
                </div>

                {/* Download feedback */}
                {downloadSuccess === activePub.id && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                    <span>
                      {lang === 'en'
                        ? 'Abstract PDF downloaded successfully to your device!'
                        : 'Abstrak PDF berjaya dimuat turun ke peranti anda!'}
                    </span>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    {lang === 'en' ? 'File size:' : 'Saiz fail:'} <strong>{activePub.fullPdfSize}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownload(activePub)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-heading font-bold uppercase rounded shadow-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">download</span>
                    <span>{lang === 'en' ? 'Download Abstract (PDF)' : 'Muat Turun Abstrak (PDF)'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400 text-sm">
                {lang === 'en' ? 'Select a paper to read abstract' : 'Pilih kertas kerja untuk membaca abstrak'}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#0c2340] hover:bg-[#1a365d] text-white text-xs sm:text-sm font-semibold rounded"
          >
            {lang === 'en' ? 'Close Archive' : 'Tutup Arkib'}
          </button>
        </div>
      </div>
    </div>
  );
};
