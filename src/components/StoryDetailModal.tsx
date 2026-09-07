import React from 'react';
import { Language, ResearchStory } from '../types';

interface StoryDetailModalProps {
  story: ResearchStory | null;
  onClose: () => void;
  lang: Language;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({ story, onClose, lang }) => {
  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Image Banner */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-100">
          <img src={story.image} alt={story.imageAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071629] via-[#071629]/40 to-transparent"></div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span
              className={`inline-block ${story.categoryBg} ${story.categoryText} text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-xs mb-2`}
            >
              {story.category} • {story.subCategory}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
              {story.title}
            </h3>
          </div>
        </div>

        {/* Story Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto text-slate-700">
          <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <span className="material-symbols-outlined text-[#b91c1c]">analytics</span>
            <span>
              <strong>{lang === 'en' ? 'Validated Metric:' : 'Metrik Disahkan:'}</strong> {story.metric}
            </span>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-[#0c2340] mb-2">
              {lang === 'en' ? 'Research Overview' : 'Gambaran Keseluruhan Penyelidikan'}
            </h4>
            <p className="text-sm leading-relaxed text-slate-600">
              {story.fullContent?.background || story.description}
            </p>
          </div>

          {story.fullContent?.keyFindings && (
            <div>
              <h4 className="font-serif text-lg font-bold text-[#0c2340] mb-2">
                {lang === 'en' ? 'Key Scientific Findings' : 'Penemuan Saintifik Utama'}
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                {story.fullContent.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-sm text-[#b91c1c] mt-1 shrink-0">
                      check_circle
                    </span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {story.fullContent?.clinicalRelevance && (
            <div className="p-4 rounded bg-amber-50/80 border border-amber-200 text-slate-800">
              <h5 className="font-heading text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#d97706]">health_and_safety</span>
                <span>{lang === 'en' ? 'Clinical Relevance & Health Policy Impact' : 'Impak Klinikal & Dasar Kesihatan'}</span>
              </h5>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {story.fullContent.clinicalRelevance}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Universiti Kebangsaan Malaysia (UKM)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#0c2340] hover:bg-[#1a365d] text-white text-xs sm:text-sm font-semibold rounded"
          >
            {lang === 'en' ? 'Close Window' : 'Tutup'}
          </button>
        </div>
      </div>
    </div>
  );
};
