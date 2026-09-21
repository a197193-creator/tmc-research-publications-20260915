import React, { useState, useEffect } from 'react';
import { Language, PageType } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSearch: () => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

// Malaysia Flag SVG
const MalaysiaFlag = () => (
  <svg
    className="w-4 h-2.5 rounded-xs shadow-xs shrink-0 overflow-hidden"
    viewBox="0 0 28 14"
    aria-hidden="true"
  >
    {/* 14 Red and White stripes */}
    <rect width="28" height="14" fill="#CC0000" />
    <rect y="1" width="28" height="1" fill="#FFFFFF" />
    <rect y="3" width="28" height="1" fill="#FFFFFF" />
    <rect y="5" width="28" height="1" fill="#FFFFFF" />
    <rect y="7" width="28" height="1" fill="#FFFFFF" />
    <rect y="9" width="28" height="1" fill="#FFFFFF" />
    <rect y="11" width="28" height="1" fill="#FFFFFF" />
    <rect y="13" width="28" height="1" fill="#FFFFFF" />
    {/* Blue canton */}
    <rect width="14" height="8" fill="#000066" />
    {/* Yellow crescent */}
    <path
      d="M 6.8 1.4 A 2.6 2.6 0 1 0 6.8 6.6 A 2.2 2.2 0 1 1 6.8 1.4 Z"
      fill="#FFCC00"
    />
    {/* Yellow star */}
    <circle cx="9.2" cy="4.0" r="1.7" fill="#FFCC00" />
  </svg>
);

// UK Flag SVG for English
const UKFlag = () => (
  <svg
    className="w-4 h-2.5 rounded-xs shadow-xs shrink-0 overflow-hidden"
    viewBox="0 0 60 30"
    aria-hidden="true"
  >
    <clipPath id="uk-flag-clip">
      <rect width="60" height="30" />
    </clipPath>
    <g clipPath="url(#uk-flag-clip)">
      <rect width="60" height="30" fill="#012169" />
      {/* Saltires */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3" />
      {/* St George's Cross */}
      <path d="M30,0 v30 M0,15 h60" stroke="#FFF" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onOpenSearch,
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];
  const announcementTagline =
    lang === 'en' ? 'National Population Cohort & Biobank' : 'Kohort Populasi Kebangsaan & Biobank';
  const portalStatus = lang === 'en' ? 'Research portal' : 'Portal penyelidikan';
  const searchLabel = lang === 'en' ? 'Search research' : 'Cari penyelidikan';
  const mobileMenuLabel = lang === 'en' ? 'Main menu' : 'Menu utama';
  const navItems: Array<{ page: PageType; label: string; id?: string }> = [
    { page: 'home', label: t.nav.overview },
    { page: 'research', label: t.nav.researchProjects },
    { page: 'publications', label: t.nav.publications },
    { page: 'news', label: t.nav.news, id: 'nav-news-btn' },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileMenuOpen]);

  return (
    <header
      className="relative sticky top-0 z-50 isolate border-b border-slate-200/90 bg-white shadow-sm"
    >
      <div
        className="relative overflow-hidden border-b border-white/10 bg-[#00274c] text-white"
        aria-label={lang === 'en' ? 'Research portal announcement' : 'Pengumuman portal penyelidikan'}
      >
        <div
          className="relative mx-auto grid min-h-8 max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-1.5 sm:px-6 lg:px-8"
        >
          <p
            className="min-w-0 text-[9px] font-semibold leading-tight tracking-[0.04em] text-slate-100 sm:text-[11px]"
          >
            <span className="sm:hidden">{announcementTagline}</span>
            <span className="hidden sm:inline">{t.topBar.institution}</span>
          </p>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[9px] font-medium text-slate-200 sm:text-[11px]">
              <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#6EC1E4] shadow-[0_0_0_3px_rgba(110,193,228,0.16)]" />
              </span>
              <span>{portalStatus}</span>
              <span className="hidden md:inline text-slate-400" aria-hidden="true">·</span>
              <span className="hidden md:inline">
                {lang === 'en' ? 'Hotline' : 'Talian'} <strong className="font-semibold text-white">1800-88-2007</strong>
              </span>
            </span>

            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/8 p-0.5" aria-label={lang === 'en' ? 'Language selection' : 'Pilihan bahasa'}>
              <button
                type="button"
                onClick={() => onLanguageChange('bm')}
                title="Bahasa Melayu (Malaysia)"
                aria-label="Tukar ke Bahasa Melayu"
                aria-pressed={lang === 'bm'}
                className={`inline-flex min-h-6 items-center gap-1 rounded-full px-1.5 text-[9px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6EC1E4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#00274c] sm:px-2 sm:text-[10px] ${
                  lang === 'bm' ? 'bg-white text-[#00274c]' : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <MalaysiaFlag />
                <span>BM</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                title="English (United Kingdom)"
                aria-label="Switch to English"
                aria-pressed={lang === 'en'}
                className={`inline-flex min-h-6 items-center gap-1 rounded-full px-1.5 text-[9px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6EC1E4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#00274c] sm:px-2 sm:text-[10px] ${
                  lang === 'en' ? 'bg-white text-[#00274c]' : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <UKFlag />
                <span>EN</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mx-auto flex min-h-[70px] max-w-[1400px] items-center justify-between gap-3 px-3 py-2 sm:min-h-[76px] sm:px-6 lg:grid lg:min-h-[84px] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-5 lg:px-8"
      >
        <button
          type="button"
          onClick={() => onNavigate('home')}
          aria-label={lang === 'en' ? 'The Malaysian Cohort home' : 'Laman utama The Malaysian Cohort'}
          className="group flex min-w-0 items-center gap-3 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] focus-visible:ring-offset-4"
        >
          <img
            src="/assets/tmc-emblem.png"
            alt=""
            className="h-12 w-[64px] shrink-0 object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none sm:h-14 sm:w-[74px]"
          />
          <span className="hidden min-w-0 border-l border-slate-200 pl-3 md:block lg:pl-4">
            <span className="block truncate font-serif text-lg font-bold leading-tight tracking-tight text-[#003366] transition-colors group-hover:text-[#007bff] lg:text-xl xl:text-2xl">
              The Malaysian Cohort
            </span>
            <span className="mt-1 hidden max-w-[260px] text-[8px] font-semibold uppercase leading-[1.25] tracking-[0.07em] text-[#007ca8] xl:block 2xl:max-w-none 2xl:text-[9px]">
              {t.nav.instituteSubtitle}
            </span>
          </span>
        </button>

        <nav className="hidden lg:block" aria-label={lang === 'en' ? 'Main navigation' : 'Navigasi utama'}>
          <ul className="flex items-center justify-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <li key={item.page}>
                  <button
                    type="button"
                    id={item.id}
                    onClick={() => onNavigate(item.page)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`rounded-full px-3 py-2 text-[12px] font-semibold tracking-tight transition-[color,background-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] focus-visible:ring-offset-2 motion-reduce:transition-none xl:px-4 xl:text-[13px] ${
                      isActive
                        ? 'bg-[#e9f4fb] text-[#003366] shadow-[inset_0_0_0_1px_rgba(0,123,255,0.08)]'
                        : 'text-slate-600 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-[#003366]'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            id="header-search-btn"
            aria-label={searchLabel}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#003366] px-3 text-xs font-bold text-white shadow-sm transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#00274c] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] focus-visible:ring-offset-2 motion-reduce:transition-none sm:min-h-11 sm:px-4"
          >
            <span className="material-symbols-outlined text-[19px]" aria-hidden="true">search</span>
            <span className="hidden sm:inline">{searchLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#003366] transition-colors hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] focus-visible:ring-offset-2 lg:hidden sm:h-11 sm:w-11"
            aria-label={mobileMenuLabel}
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined" aria-hidden="true">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-3 pb-4 pt-2 shadow-[0_16px_30px_rgba(0,39,76,0.12)] sm:px-6 lg:hidden"
          aria-label={lang === 'en' ? 'Mobile main navigation' : 'Navigasi utama mudah alih'}
        >
          <ul className="mx-auto max-w-[1400px] space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <li key={item.page}>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(item.page);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-11 w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] focus-visible:ring-offset-2 ${
                      isActive
                        ? 'bg-[#e9f4fb] text-[#003366]'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-[#003366]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="h-2 w-2 rounded-full bg-[#007bff]" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

    </header>
  );
};
