import React from 'react';
import { Language, ResearchInitiativeItem } from '../types';
import { translations } from '../data/translations';
import { allResearchInitiatives } from '../data/researchInitiatives';
import { getResearchVisual } from '../data/researchVisuals';

interface ResearchInitiativesProps {
  lang: Language;
  onSelectInitiative: (project: ResearchInitiativeItem) => void;
  onOpenAllInitiatives: () => void;
}

// Curated current initiatives: active work is prioritised here while the full
// index remains available for completed and older projects.
const featuredProjectIds = ['proj-2', 'proj-3', 'proj-7', 'proj-20'];

const featuredProjects = featuredProjectIds
  .map((id) => allResearchInitiatives.find((project) => project.id === id))
  .filter((project): project is ResearchInitiativeItem => Boolean(project));

export const ResearchInitiatives: React.FC<ResearchInitiativesProps> = ({
  lang,
  onSelectInitiative,
  onOpenAllInitiatives
}) => {
  const t = translations[lang];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" id="research">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-300 pb-5 mb-10 gap-4">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#007bff]">
            {t.researchSection.tag}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#003366] mt-1">
            {t.researchSection.title}
          </h2>
        </div>
        <p className="text-sm text-[#54595F] max-w-md font-sans leading-relaxed">
          {t.researchSection.subtitle}
        </p>
      </div>

      {/* Four current initiatives in a clean two-row desktop layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredProjects.map((project) => {
          const visual = getResearchVisual(project.category, project.id);
          return (
          <article
            key={project.id}
            id={`featured-${project.id}`}
            data-scroll-reveal
            className="bg-white rounded-lg overflow-hidden border border-slate-200 hover-lift group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-60 overflow-hidden bg-slate-100">
                <img
                  src={visual.image}
                  alt={visual.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span
                  className={`absolute top-4 left-4 ${visual.categoryBg} ${visual.categoryText} text-[11px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm`}
                >
                  {project.category}
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs font-sans font-semibold text-[#007ca8] uppercase tracking-wider block">
                  {project.duration}
                </span>
                <h3
                  onClick={() => onSelectInitiative(project)}
                  className="font-serif text-xl font-bold text-[#003366] mt-2 leading-snug group-hover:text-[#007bff] transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>
                <p className="text-sm text-[#54595F] mt-3 leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {lang === 'en'
                  ? `Target: ${project.targetedParticipants} • Current count awaiting Statistics Unit approval`
                  : `Sasaran: ${project.targetedParticipants} • Bilangan semasa menunggu pengesahan Unit Statistik`}
              </span>
              <button
                type="button"
                onClick={() => onSelectInitiative(project)}
                className="inline-flex items-center gap-1 text-sm font-sans font-bold text-[#007bff] hover:text-[#0056b3] cursor-pointer"
              >
                <span>{t.researchSection.readDiscovery}</span>
                <span className="material-symbols-outlined text-base group-hover:translate-x-1.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </article>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={onOpenAllInitiatives}
          id="view-all-initiatives-btn"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded border-2 border-[#007bff] text-[#007bff] hover:bg-gradient-to-r hover:from-[#007bff] hover:to-[#003366] hover:text-white hover:border-transparent font-sans font-semibold text-sm transition-all duration-300 shadow-xs cursor-pointer"
        >
          <span>
            {t.researchSection.viewAll} ({allResearchInitiatives.length}{' '}
            {lang === 'en' ? 'Projects' : 'Projek'})
          </span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </div>
    </section>
  );
};
