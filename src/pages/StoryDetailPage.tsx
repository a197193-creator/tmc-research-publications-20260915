import React from 'react';
import { Language, ResearchStory } from '../types';

interface StoryDetailPageProps {
  story: ResearchStory;
  lang: Language;
  onBack: () => void;
  onNavigateResearch: () => void;
}

export const StoryDetailPage: React.FC<StoryDetailPageProps> = ({
  story,
  lang,
  onBack,
  onNavigateResearch,
}) => {
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
            <button
              type="button"
              onClick={onNavigateResearch}
              className="text-slate-300 hover:text-[#6EC1E4] transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Research Discovery' : 'Penemuan Penyelidikan'}
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-[#6EC1E4] font-semibold truncate max-w-[200px] sm:max-w-none">
              {story.title}
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

      {/* ARTICLE CONTAINER */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded bg-[#007bff] text-white text-xs font-bold uppercase tracking-wider">
              {story.category}
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-200 text-slate-700 text-xs font-semibold">
              {story.subCategory}
            </span>
            <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
              {story.metric}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] leading-tight">
            {story.title}
          </h1>

          <p className="text-base sm:text-lg text-[#54595F] leading-relaxed">
            {story.description}
          </p>
        </header>

        {/* HERO IMAGE */}
        <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 relative">
          <img
            src={story.image}
            alt={story.imageAlt}
            className="w-full h-80 sm:h-96 object-cover"
          />
          <div className="p-3 bg-slate-900 text-slate-300 text-xs flex items-center justify-between">
            <span>Photo: UKM Medical Molecular Biology Institute (UMBI) Investigation Archive</span>
            <span className="text-[#6EC1E4] font-mono">The Malaysian Cohort</span>
          </div>
        </div>

        {/* FULL INVESTIGATION CONTENT */}
        {story.fullContent && (
          <div className="bg-white rounded-xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8 text-[#54595F] leading-relaxed text-sm sm:text-base">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#003366]">Scientific Background & Context</h2>
              <p>{story.fullContent.background}</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#003366]">Empirical Discoveries & Key Findings</h2>
              <ul className="space-y-3">
                {story.fullContent.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-blue-50/60 p-3.5 rounded-lg border border-blue-100">
                    <span className="material-symbols-outlined text-[#007bff] shrink-0 mt-0.5">check_circle</span>
                    <span className="text-slate-800 text-sm">{finding}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-[#003366]">Clinical Relevance for Malaysian Healthcare</h2>
              <p>{story.fullContent.clinicalRelevance}</p>
            </section>

            <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-500 uppercase tracking-wider block">Lead Principal Investigator</span>
                <strong className="text-[#003366] text-sm block">{story.fullContent.leadInvestigator}</strong>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-500 uppercase tracking-wider block">Collaborating Institutions</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {story.fullContent.collaboratingInstitutions.map((inst, idx) => (
                    <span key={idx} className="px-2 py-1 rounded bg-slate-100 text-slate-700 font-medium">
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-slate-200 hover:bg-slate-300 text-[#003366] font-semibold text-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Return to Overview</span>
          </button>
          <button
            type="button"
            onClick={onNavigateResearch}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#007bff] hover:bg-[#0069d9] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <span>Browse All Research Initiatives</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </article>
    </div>
  );
};
