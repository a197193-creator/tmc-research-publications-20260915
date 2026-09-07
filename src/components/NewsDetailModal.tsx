import React from 'react';
import { Language, BulletinItem } from '../types';

interface NewsDetailModalProps {
  news: BulletinItem | null;
  onClose: () => void;
  lang: Language;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ news, onClose, lang }) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0c2340] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#b91c1c]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#f59e0b] text-2xl">campaign</span>
            <div>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-heading font-bold uppercase ${news.tagBg} ${news.tagColor} mb-1`}>
                {news.tag}
              </span>
              <h3 className="font-serif text-xl font-bold leading-snug">
                {news.title}
              </h3>
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

        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto text-slate-700 leading-relaxed text-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono pb-2 border-b border-slate-100">
            <span>{lang === 'en' ? 'Published Date:' : 'Tarikh Penerbitan:'} {news.date}</span>
            <span>UKM Medical Molecular Biology Institute (UMBI)</span>
          </div>

          <p className="font-serif text-base font-semibold text-[#0c2340]">
            {news.snippet}
          </p>

          <p>
            {news.body || (
              lang === 'en'
                ? 'The Malaysian Cohort (TMC) project at UMBI continues to deliver high-impact clinical discoveries and national population health insights. Participants and researchers are encouraged to reach out to the administrative desk for further inquiries.'
                : 'Projek The Malaysian Cohort (TMC) di UMBI terus menghasilkan penemuan klinikal berimpak tinggi dan pemahaman kesihatan populasi kebangsaan. Peserta dan penyelidik digalakkan menghubungi kaunter pentadbiran untuk pertanyaan lanjut.'
            )}
          </p>
        </div>

        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#0c2340] text-white text-xs font-semibold rounded"
          >
            {lang === 'en' ? 'Close Bulletin' : 'Tutup Buletin'}
          </button>
        </div>
      </div>
    </div>
  );
};
