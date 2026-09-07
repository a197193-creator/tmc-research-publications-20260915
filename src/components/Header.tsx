import React, { useState, useEffect, useRef } from 'react';
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
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollYRef = useRef(0);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const lastScrollY = lastScrollYRef.current;
      const diff = currentScrollY - lastScrollY;

      setIsScrolled(currentScrollY > 10);

      // When near the top, always keep visible
      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else if (diff > 8 && currentScrollY > 120) {
        // Scrolled down significantly -> fold up
        if (!mobileMenuOpen) {
          setIsVisible(false);
        }
      } else if (diff < -8) {
        // Scrolled up -> bring back
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 ease-in-out ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      } ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* TOP ACCESSIBILITY & INSTITUTIONAL UTILITY BAR */}
      <aside aria-label="Utility navigation" className="bg-[#00274c] text-slate-300 border-b border-blue-900/50 text-xs font-heading">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-2 md:gap-6 min-w-0 flex-1">
            <span className="flex items-center gap-1.5 text-slate-200 min-w-0 flex-1">
              <span className="material-symbols-outlined text-sm text-[#f59e0b] shrink-0">local_hospital</span>
              <span className="truncate">{t.topBar.institution}</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <span className="material-symbols-outlined text-sm text-[#38bdf8]">call</span>
              {lang === 'en' ? 'Hotline:' : 'Talian:'} <strong className="text-white font-semibold">1800-88-2007</strong> / +603-9145 9000
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Language Switcher with National Flags */}
            <div className="flex items-center gap-1.5" aria-label="Language selection">
              <span className="text-[11px] uppercase tracking-wider text-slate-300 mr-1 hidden sm:inline">
                {t.topBar.lang}:
              </span>
              <div className="inline-flex items-center bg-white/10 p-0.5 rounded border border-white/20">
                <button
                  type="button"
                  onClick={() => onLanguageChange('bm')}
                  title="Bahasa Melayu (Malaysia)"
                  aria-label="Tukar ke Bahasa Melayu"
                    className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded text-xs transition-all font-heading ${
                    lang === 'bm'
                      ? 'bg-[#003b71] text-white font-bold shadow-xs border border-blue-300/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
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
                    className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded text-xs transition-all font-heading ${
                    lang === 'en'
                      ? 'bg-[#003b71] text-white font-bold shadow-xs border border-blue-300/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <UKFlag />
                  <span>EN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* UKM EDITORIAL MASTHEAD & LOGO */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
        <div className="flex items-center gap-2 sm:gap-5 min-w-0 flex-1">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex-shrink-0 group flex items-center gap-2 cursor-pointer text-left"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ7Cgz6jgnULMpxLU38lSRu2Y2BFUZuB8glBQBISbSm9e5ENfPFRyGKTT4s70Uje7gCJeV08H6UiPMZGvqrnxG9J9Jcu_C8E30LA7Wffghj_07u2mrfJORfuDljwHVp-P_Y03xPz8YzDUalyOl6BcrwX7g-hGmMKsyjvNxQUDC4oS9AcpErEAGW67kcdiJg2zL_d-h1jteZhsRP3Y-Wji0pc8sI_ccwXsHkMd5I9JfCU4fg-VysDL1yhaOKS910FVF2A"
              alt="The Malaysian Cohort Official Emblem"
              className="h-11 sm:h-16 w-[68px] sm:w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </button>
          <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
          <div className="flex flex-col min-w-0">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-serif text-base sm:text-2xl font-bold tracking-tight text-[#003366] leading-tight hover:text-[#007bff] transition-colors text-left cursor-pointer truncate sm:whitespace-normal"
            >
              The Malaysian Cohort
            </button>
            <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#007ca8] truncate">
              {t.nav.instituteSubtitle}
            </span>
          </div>
        </div>

        {/* UKM Style Participant Action & Search */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('portal')}
            id="header-participant-portal-btn"
            className="hidden lg:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-gradient-to-r from-[#007bff] to-[#003366] hover:from-[#0069d9] hover:to-[#00274c] text-white font-sans font-semibold text-sm tracking-wide shadow-sm hover:shadow-md transition-all duration-200 group border border-blue-400/30 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg text-[#6EC1E4]">clinical_notes</span>
            <span>{t.nav.participantPortal}</span>
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            id="header-search-btn"
            aria-label={t.nav.searchAria}
            className="p-2 sm:p-2.5 rounded-md hover:bg-blue-50 text-[#003366] transition-colors border border-slate-200 sm:border-transparent flex items-center justify-center cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined">search</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden rounded hover:bg-blue-50 text-[#003366] cursor-pointer shrink-0"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* UKM Signature Horizontal Navigation */}
      <nav className="bg-[#003366] border-t border-[#0056a8] shadow-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-7 xl:gap-8 py-3 text-[14px] font-sans tracking-tight">
            {/* Overview / Home */}
            <li>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className={`transition-colors text-left cursor-pointer ${
                  currentPage === 'home'
                    ? 'text-white border-b-2 border-[#6EC1E4] pb-1 font-bold flex items-center gap-1.5'
                    : 'text-[#9bb7d4] hover:text-[#6EC1E4] pb-1 font-medium flex items-center gap-1.5'
                }`}
              >
                <span>{t.nav.overview}</span>
              </button>
            </li>

            {/* Research Projects */}
            <li>
              <button
                type="button"
                onClick={() => onNavigate('research')}
                className={`transition-colors text-left cursor-pointer ${
                  currentPage === 'research'
                    ? 'text-white border-b-2 border-[#6EC1E4] pb-1 font-bold flex items-center gap-1.5'
                    : 'text-[#9bb7d4] hover:text-[#6EC1E4] pb-1 font-medium flex items-center gap-1.5'
                }`}
              >
                <span>{t.nav.researchProjects}</span>
              </button>
            </li>

            {/* National Biobank - NOT WHITE WHEN NOT CHOSEN */}
            <li>
              <button
                type="button"
                onClick={() => onNavigate('biobank')}
                id="nav-national-biobank-btn"
                className={`transition-colors text-left cursor-pointer ${
                  currentPage === 'biobank'
                    ? 'text-white border-b-2 border-[#6EC1E4] pb-1 font-bold flex items-center gap-1.5'
                    : 'text-[#9bb7d4] hover:text-[#6EC1E4] pb-1 font-medium flex items-center gap-1.5'
                }`}
              >
                <span>{t.nav.nationalBiobank}</span>
              </button>
            </li>

            {/* Publications */}
            <li>
              <button
                type="button"
                onClick={() => onNavigate('publications')}
                className={`transition-colors text-left cursor-pointer ${
                  currentPage === 'publications'
                    ? 'text-white border-b-2 border-[#6EC1E4] pb-1 font-bold flex items-center gap-1.5'
                    : 'text-[#9bb7d4] hover:text-[#6EC1E4] pb-1 font-medium flex items-center gap-1.5'
                }`}
              >
                <span>{t.nav.publications}</span>
              </button>
            </li>

            {/* News */}
            <li>
              <button
                type="button"
                onClick={() => onNavigate('news')}
                id="nav-news-btn"
                className={`transition-colors text-left cursor-pointer ${
                  currentPage === 'news'
                    ? 'text-white border-b-2 border-[#6EC1E4] pb-1 font-bold flex items-center gap-1.5'
                    : 'text-[#9bb7d4] hover:text-[#6EC1E4] pb-1 font-medium flex items-center gap-1.5'
                }`}
              >
                <span>{t.nav.news}</span>
              </button>
            </li>

            {/* Clinic Hours & Location */}
            <li>
              <button
                type="button"
                onClick={() => onNavigate('clinic')}
                className={`transition-colors text-left cursor-pointer ${
                  currentPage === 'clinic'
                    ? 'text-white border-b-2 border-[#6EC1E4] pb-1 font-bold flex items-center gap-1.5'
                    : 'text-[#9bb7d4] hover:text-[#6EC1E4] pb-1 font-medium flex items-center gap-1.5'
                }`}
              >
                <span>{t.nav.clinicHours}</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#00274c] border-t border-blue-800/80 px-4 py-4 space-y-3 shadow-xl text-white max-h-[calc(100dvh-7rem)] overflow-y-auto">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('portal');
            }}
            className="lg:hidden w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-gradient-to-r from-[#007bff] to-[#003366] text-white font-sans font-semibold text-sm tracking-wide shadow-sm border border-blue-400/30 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg text-[#6EC1E4]">clinical_notes</span>
            <span>{t.nav.participantPortal}</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
          <ul className="space-y-1 text-sm font-heading">
            <li>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('home');
                }}
                className={`w-full text-left py-2.5 px-3 rounded transition-colors ${
                  currentPage === 'home'
                    ? 'bg-[#003b71] text-white font-bold border-l-4 border-[#6EC1E4]'
                    : 'text-[#9bb7d4] hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                {t.nav.overview}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('research');
                }}
                className={`w-full text-left py-2.5 px-3 rounded transition-colors ${
                  currentPage === 'research'
                    ? 'bg-[#003b71] text-white font-bold border-l-4 border-[#6EC1E4]'
                    : 'text-[#9bb7d4] hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                {t.nav.researchProjects}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('biobank');
                }}
                className={`w-full text-left py-2.5 px-3 rounded transition-colors ${
                  currentPage === 'biobank'
                    ? 'bg-[#003b71] text-white font-bold border-l-4 border-[#6EC1E4]'
                    : 'text-[#9bb7d4] hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                {t.nav.nationalBiobank}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('publications');
                }}
                className={`w-full text-left py-2.5 px-3 rounded transition-colors ${
                  currentPage === 'publications'
                    ? 'bg-[#003b71] text-white font-bold border-l-4 border-[#6EC1E4]'
                    : 'text-[#9bb7d4] hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                {t.nav.publications}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('news');
                }}
                className={`w-full text-left py-2.5 px-3 rounded transition-colors ${
                  currentPage === 'news'
                    ? 'bg-[#003b71] text-white font-bold border-l-4 border-[#6EC1E4]'
                    : 'text-[#9bb7d4] hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                {t.nav.news}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('clinic');
                }}
                className={`w-full text-left py-2.5 px-3 rounded transition-colors ${
                  currentPage === 'clinic'
                    ? 'bg-[#003b71] text-white font-bold border-l-4 border-[#6EC1E4]'
                    : 'text-[#9bb7d4] hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                {t.nav.clinicHours}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
