import React, { useState } from 'react';
import { Language, Publication, ResearchInitiativeItem } from '../types';
import { publicationsList } from '../data/publications';
import { allResearchInitiatives } from '../data/researchInitiatives';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectResearch: (project: ResearchInitiativeItem) => void;
  onSelectPublication: (pub: Publication) => void;
  onOpenResearch: () => void;
  onOpenPublications: () => void;
  onOpenNews: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectResearch,
  onSelectPublication,
  onOpenResearch,
  onOpenPublications,
  onOpenNews
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingProjects = cleanQuery
    ? allResearchInitiatives.filter(
        (project) =>
          project.title.toLowerCase().includes(cleanQuery) ||
          project.description.toLowerCase().includes(cleanQuery) ||
          project.category.toLowerCase().includes(cleanQuery) ||
          project.collaborators.toLowerCase().includes(cleanQuery) ||
          project.funding.toLowerCase().includes(cleanQuery) ||
          project.subProjects?.some(
            (subProject) =>
              subProject.title.toLowerCase().includes(cleanQuery) ||
              subProject.description?.toLowerCase().includes(cleanQuery)
          )
      )
    : [];

  const matchingPubs = cleanQuery
    ? publicationsList.filter(
        (p) =>
          p.title.toLowerCase().includes(cleanQuery) ||
          p.authors.toLowerCase().includes(cleanQuery) ||
          p.journal.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery) ||
          String(p.year).includes(cleanQuery)
      )
    : [];

  const quickLinks = [
    {
      title: lang === 'en' ? 'Browse All Research Projects' : 'Layari Semua Projek Penyelidikan',
      icon: 'science',
      action: () => {
        onClose();
        onOpenResearch();
      }
    },
    {
      title: lang === 'en' ? 'Scientific Publications Archive' : 'Arkib Penerbitan Saintifik',
      icon: 'menu_book',
      action: () => {
        onClose();
        onOpenPublications();
      }
    },
    {
      title: lang === 'en' ? 'Research News & Updates' : 'Berita & Kemas Kini Penyelidikan',
      icon: 'campaign',
      action: () => {
        onClose();
        onOpenNews();
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-4 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <span className="material-symbols-outlined text-slate-400 text-2xl">search</span>
          <input
            type="text"
            placeholder={
              lang === 'en'
                ? 'Search research projects, publications, authors...'
                : 'Cari projek penyelidikan, penerbitan, penulis...'
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-hidden"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {!cleanQuery ? (
            <div className="space-y-3">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400">
                {lang === 'en' ? 'Research & Publication Sections' : 'Bahagian Penyelidikan & Penerbitan'}
              </span>
              <div className="space-y-1.5">
                {quickLinks.map((link, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={link.action}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-100 text-left text-sm text-[#0c2340] font-heading font-medium transition-colors"
                  >
                    <span className="material-symbols-outlined text-[#b91c1c] text-xl">{link.icon}</span>
                    <span>{link.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
                {matchingProjects.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400">
                    {lang === 'en' ? 'Research Initiatives' : 'Inisiatif Penyelidikan'} ({matchingProjects.length})
                  </span>
                  {matchingProjects.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectResearch(project);
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
                    >
                      <div className="font-serif font-bold text-sm text-[#0c2340]">{project.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{project.description}</div>
                    </button>
                  ))}
                </div>
              )}

              {matchingPubs.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400">
                    {lang === 'en' ? 'Scientific Publications' : 'Penerbitan Saintifik'} ({matchingPubs.length})
                  </span>
                  {matchingPubs.map((pub) => (
                    <button
                      key={pub.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectPublication(pub);
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
                    >
                      <div className="text-[10px] font-mono text-[#b91c1c] uppercase">{pub.journal}</div>
                      <div className="font-serif font-bold text-sm text-[#0c2340]">{pub.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{pub.authors}</div>
                    </button>
                  ))}
                </div>
              )}

              {matchingProjects.length === 0 && matchingPubs.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">
                  {lang === 'en'
                    ? `No results found for "${query}". Try "Genomics", "MyPrecise", or an author name.`
                    : `Tiada hasil untuk "${query}". Cuba "Genomik", "MyPrecise", atau nama penulis.`}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
          <span className="text-[11px] text-slate-400">
            {lang === 'en' ? 'Press ESC or close button to exit' : 'Tekan ESC atau butang tutup untuk keluar'}
          </span>
        </div>
      </div>
    </div>
  );
};
