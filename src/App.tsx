import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Language,
  PageType,
  ResearchInitiativeItem,
  Publication,
  BulletinItem,
  ParticipantMaterial
} from './types';
import {
  researchBulletinNews,
  participantMaterialsList,
} from './data/portalData';
import { allResearchInitiatives, researchProjectRegister } from './data/researchInitiatives';

// Core Layout & Splash Screen
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';

// Home Screen Components
import { HeroCarousel } from './components/HeroCarousel';
import { ResearchInitiatives } from './components/ResearchInitiatives';
import { PublicationsAndSidebar } from './components/PublicationsAndSidebar';

// Dedicated Full Pages (Replacing pop-up message modals with real page routes)
import { BiobankPage } from './pages/BiobankPage';
import { ResearchProjectsPage } from './pages/ResearchProjectsPage';
import { ResearchProjectDetailPage } from './pages/ResearchProjectDetailPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { ParticipantPortalPage } from './pages/ParticipantPortalPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { ClinicLocationPage } from './pages/ClinicLocationPage';
import { LegalPage } from './pages/LegalPage';
import { DocumentViewerPage } from './pages/DocumentViewerPage';

// Search Modal
import { SearchModal } from './components/SearchModal';

interface TmcHistoryState {
  __tmc: true;
  page: PageType;
  payload?: any;
  depth: number;
}

const pageTypes: PageType[] = [
  'home',
  'biobank',
  'research',
  'publications',
  'portal',
  'news',
  'research-detail',
  'news-detail',
  'clinic',
  'legal',
  'document',
];

const isPageType = (value: unknown): value is PageType =>
  typeof value === 'string' && pageTypes.includes(value as PageType);

const getInitialPage = (): PageType => {
  const state = window.history.state as Partial<TmcHistoryState> | null;
  if (state?.__tmc === true && isPageType(state.page)) return state.page;

  const hashPage = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  return isPageType(hashPage) ? hashPage : 'home';
};

const getResearchProjectFromHash = (): ResearchInitiativeItem | undefined => {
  const [hashPage, projectId] = window.location.hash.replace(/^#\/?/, '').split('/');
  if (hashPage !== 'research-detail' || !projectId) return undefined;
  return allResearchInitiatives.find((project) => project.id === projectId);
};

const getPageHash = (page: PageType, payload?: any) =>
  page === 'research-detail' && payload?.id
    ? `#research-detail/${payload.id}`
    : `#${page}`;

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';

  try {
    const savedLanguage = window.localStorage.getItem('tmc-language');
    return savedLanguage === 'bm' || savedLanguage === 'en' ? savedLanguage : 'en';
  } catch {
    return 'en';
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);

  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageType>(getInitialPage);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const historyDepthRef = useRef<number>(0);
  const mainContentRef = useRef<HTMLElement | null>(null);

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Selected Data Items for Detail Pages
  const [selectedResearchProject, setSelectedResearchProject] = useState<ResearchInitiativeItem>(
    () => getResearchProjectFromHash() || allResearchInitiatives[0] || researchProjectRegister[0]
  );
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [selectedNews, setSelectedNews] = useState<BulletinItem | null>(researchBulletinNews[0] ?? null);
  const [selectedMaterial, setSelectedMaterial] = useState<ParticipantMaterial>(participantMaterialsList[0]);
  const [initialLegalSection, setInitialLegalSection] = useState<'ethics' | 'pdpa' | 'terms' | 'governance'>('ethics');

  useEffect(() => {
    document.documentElement.lang = lang === 'bm' ? 'ms' : 'en';

    try {
      window.localStorage.setItem('tmc-language', lang);
    } catch {
      // The language switch still works when browser storage is unavailable.
    }
  }, [lang]);

  useEffect(() => {
    const pageTitles: Record<PageType, { en: string; bm: string }> = {
      home: { en: 'Overview', bm: 'Gambaran Keseluruhan' },
      biobank: { en: 'National Biobank Facility', bm: 'Fasiliti Biobank Kebangsaan' },
      research: { en: 'Research Projects', bm: 'Projek Penyelidikan' },
      publications: { en: 'Scientific Publications', bm: 'Penerbitan Saintifik' },
      portal: { en: 'Participant Support', bm: 'Sokongan Peserta' },
      news: { en: 'Research News', bm: 'Berita Penyelidikan' },
      'research-detail': { en: selectedResearchProject.title, bm: selectedResearchProject.title },
      'news-detail': { en: selectedNews?.title ?? 'Research News', bm: selectedNews?.title ?? 'Berita Penyelidikan' },
      clinic: { en: 'Clinic and Location', bm: 'Klinik dan Lokasi' },
      legal: { en: 'Governance and Ethics', bm: 'Tadbir Urus dan Etika' },
      document: { en: selectedMaterial.title, bm: selectedMaterial.title },
    };

    document.title = `${pageTitles[currentPage][lang]} | TMC Research & Publications`;

    if (!showSplash) {
      window.requestAnimationFrame(() => mainContentRef.current?.focus({ preventScroll: true }));
    }
  }, [currentPage, lang, selectedMaterial.title, selectedNews?.title, selectedResearchProject.title, showSplash]);

  // Reveal marked cards as they enter the viewport. A mutation observer keeps
  // the effect working for cards rendered after navigation or filtering.
  useEffect(() => {
    const selector = '[data-scroll-reveal]';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealImmediately = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        element.classList.add('is-revealed');
      });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealImmediately(document);
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const siblings = element.parentElement
          ? Array.from(element.parentElement.children).filter((child) => child.matches(selector))
          : [];
        const siblingIndex = Math.max(0, siblings.indexOf(element));
        element.style.setProperty('--reveal-delay', `${Math.min(siblingIndex, 5) * 75}ms`);
        element.classList.add('is-revealed');
        revealObserver.unobserve(element);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    const observeCards = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        if (!element.classList.contains('is-revealed')) revealObserver.observe(element);
      });
    };

    observeCards(document);

    const cardMutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(selector)) revealObserver.observe(node);
          observeCards(node);
        });
      });
    });

    cardMutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      cardMutationObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  // Keep the opening brand moment brief; navigation after load remains instant.
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Apply a page change without creating a browser history entry.
  // Browser Back/Forward uses this same transition after restoring its saved state.
  const transitionToPage = useCallback((targetPage: PageType, payload?: any) => {
    // Store payload if provided
    if (targetPage === 'research-detail' && payload) {
      setSelectedResearchProject(payload);
    } else if (targetPage === 'news-detail' && payload) {
      setSelectedNews(payload);
    } else if (targetPage === 'document' && payload) {
      setSelectedMaterial(payload);
    } else if (targetPage === 'publications') {
      setSelectedPublication(payload || null);
    } else if (targetPage === 'legal' && payload?.section) {
      setInitialLegalSection(payload.section);
    }

    // Scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(targetPage);
  }, []);

  // Central navigation dispatcher. Each internal page change receives its own
  // browser-history entry, so Back/Forward stays inside the TMC website.
  const navigateWithTransition = useCallback((targetPage: PageType, payload?: any) => {
    const nextDepth = historyDepthRef.current + 1;
    const state: TmcHistoryState = {
      __tmc: true,
      page: targetPage,
      payload,
      depth: nextDepth,
    };

    window.history.pushState(state, '', getPageHash(targetPage, payload));
    historyDepthRef.current = nextDepth;
    transitionToPage(targetPage, payload);
  }, [transitionToPage]);

  // Controls explicitly labelled "Home" or "Back to Overview" always go to
  // the overview route, regardless of the browser's previous history entry.
  const handleNavigateHome = useCallback(() => {
    navigateWithTransition('home');
  }, [navigateWithTransition]);

  const handleBack = useCallback(() => {
    if (historyDepthRef.current > 0) {
      window.history.back();
      return;
    }

    if (currentPage !== 'home') {
      const homeState: TmcHistoryState = { __tmc: true, page: 'home', depth: 0 };
      window.history.replaceState(homeState, '', getPageHash('home'));
      transitionToPage('home');
    }
  }, [currentPage, transitionToPage]);

  const handleResearchProjectBack = useCallback(() => {
    if (historyDepthRef.current > 0) {
      window.history.back();
      return;
    }

    const researchState: TmcHistoryState = {
      __tmc: true,
      page: 'research',
      depth: 0,
    };
    window.history.replaceState(researchState, '', getPageHash('research'));
    transitionToPage('research');
  }, [transitionToPage]);

  useEffect(() => {
    const existingState = window.history.state as Partial<TmcHistoryState> | null;
    const initialPage = getInitialPage();
    const initialState: TmcHistoryState =
      existingState?.__tmc === true && isPageType(existingState.page)
        ? {
            __tmc: true,
            page: existingState.page,
            payload: existingState.payload,
            depth: typeof existingState.depth === 'number' ? existingState.depth : 0,
          }
        : {
            __tmc: true,
            page: initialPage,
            payload: initialPage === 'research-detail' ? getResearchProjectFromHash() : undefined,
            depth: 0,
          };

    historyDepthRef.current = initialState.depth;
    window.history.replaceState(
      initialState,
      '',
      getPageHash(initialState.page, initialState.payload)
    );

    if (initialState.payload) {
      if (initialState.page === 'research-detail') setSelectedResearchProject(initialState.payload);
      else if (initialState.page === 'news-detail') setSelectedNews(initialState.payload);
      else if (initialState.page === 'document') setSelectedMaterial(initialState.payload);
      else if (initialState.page === 'publications') setSelectedPublication(initialState.payload);
      else if (initialState.page === 'legal' && initialState.payload.section) {
        setInitialLegalSection(initialState.payload.section);
      }
    }

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state as Partial<TmcHistoryState> | null;
      if (state?.__tmc !== true || !isPageType(state.page)) return;

      historyDepthRef.current = typeof state.depth === 'number' ? state.depth : 0;
      transitionToPage(state.page, state.payload);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [transitionToPage]);

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      lang === 'en'
        ? 'Hello The Malaysian Cohort UMBI, I am a cohort participant and would like to inquire about my follow-up appointment.'
        : 'Salam The Malaysian Cohort UMBI, saya peserta kohort dan ingin bertanyakan tentang janji temu susulan saya.'
    );
    window.open(`https://wa.me/60192429415?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-[#f0f0f0] text-[#333333] selection:bg-[#3399ff] selection:text-white font-sans transition-all duration-200">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[200] -translate-y-20 rounded bg-white px-4 py-2 text-sm font-bold text-[#003366] shadow-lg transition-transform focus:translate-y-0"
      >
        {lang === 'en' ? 'Skip to main content' : 'Langkau ke kandungan utama'}
      </a>
      {/* 1. Brief, lightweight opening brand screen */}
      <SplashScreen isVisible={showSplash} />

      {/* 2. Research & Publications navigation */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentPage={currentPage}
        onNavigate={navigateWithTransition}
      />

      {/* 3. Main Dynamic Page Views */}
      <main
        id="main-content"
        ref={mainContentRef}
        tabIndex={-1}
        className="flex-1 min-w-0 w-full max-w-full focus:outline-none"
      >
        {/* VIEW 1: HOME PAGE */}
        {currentPage === 'home' && (
          <>
            {/* Research-focused hero carousel and cohort context */}
            <HeroCarousel
              lang={lang}
              onOpenResearch={() => navigateWithTransition('research')}
              onOpenPublications={() => navigateWithTransition('publications')}
              onOpenProject={(project) => navigateWithTransition('research-detail', project)}
            />

            {/* Research Initiatives & Cohort Impact */}
            <ResearchInitiatives
              lang={lang}
              onSelectInitiative={(project) => navigateWithTransition('research-detail', project)}
              onOpenAllInitiatives={() => navigateWithTransition('research')}
            />

            {/* Peer-reviewed publications and research news */}
            <PublicationsAndSidebar
              lang={lang}
              onSelectPublication={(pub) => navigateWithTransition('publications', pub)}
              onBrowseArchive={() => navigateWithTransition('publications')}
              onBrowseNews={() => navigateWithTransition('news')}
              onSelectNews={(news) => navigateWithTransition('news-detail', news)}
            />
          </>
        )}

        {/* VIEW 2: NATIONAL BIOBANK FULL PAGE */}
        {currentPage === 'biobank' && (
          <BiobankPage
            lang={lang}
            onBack={handleNavigateHome}
            onNavigatePortal={() => navigateWithTransition('portal')}
          />
        )}

        {/* VIEW 3: RESEARCH PROJECTS & CONSORTIA FULL PAGE */}
        {currentPage === 'research' && (
          <ResearchProjectsPage
            lang={lang}
            onBack={handleNavigateHome}
            onSelectInitiative={(project) => navigateWithTransition('research-detail', project)}
          />
        )}

        {/* VIEW 3A: INDIVIDUAL RESEARCH PROJECT PROFILE */}
        {currentPage === 'research-detail' && (
          <ResearchProjectDetailPage
            project={selectedResearchProject}
            lang={lang}
            onBack={handleResearchProjectBack}
            onNavigateResearch={() => navigateWithTransition('research')}
          />
        )}

        {/* VIEW 4: SCIENTIFIC PUBLICATIONS ARCHIVE FULL PAGE */}
        {currentPage === 'publications' && (
          <PublicationsPage
            lang={lang}
            onBack={handleNavigateHome}
            selectedPublication={selectedPublication}
          />
        )}

        {/* VIEW 5: PARTICIPANT SCREENING & IC PORTAL FULL PAGE */}
        {currentPage === 'portal' && (
          <ParticipantPortalPage
            lang={lang}
            onBack={handleNavigateHome}
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}

        {/* VIEW: NEWS & OFFICIAL BULLETINS LIST FULL PAGE */}
        {currentPage === 'news' && (
          <NewsPage
            lang={lang}
            onBack={handleNavigateHome}
            onSelectNews={(news) => navigateWithTransition('news-detail', news)}
          />
        )}

        {/* VIEW 7: OFFICIAL ANNOUNCEMENT / BULLETIN ARTICLE FULL PAGE */}
        {currentPage === 'news-detail' && selectedNews && (
          <NewsDetailPage
            news={selectedNews}
            lang={lang}
            onBack={handleBack}
            onNavigateHome={handleNavigateHome}
            onSelectOtherNews={(news) => navigateWithTransition('news-detail', news)}
            onNavigateNews={() => navigateWithTransition('news')}
          />
        )}

        {currentPage === 'news-detail' && !selectedNews && (
          <NewsPage
            lang={lang}
            onBack={handleNavigateHome}
            onSelectNews={(news) => navigateWithTransition('news-detail', news)}
          />
        )}

        {/* VIEW 8: CLINIC, FASTING SAMPLING & TRANSIT FULL PAGE */}
        {currentPage === 'clinic' && (
          <ClinicLocationPage
            lang={lang}
            onBack={handleNavigateHome}
            onNavigatePortal={() => navigateWithTransition('portal')}
          />
        )}

        {/* VIEW 9: ETHICS, PDPA & GOVERNANCE FULL PAGE */}
        {currentPage === 'legal' && (
          <LegalPage
            initialSection={initialLegalSection}
            lang={lang}
            onBack={handleNavigateHome}
          />
        )}

        {/* VIEW 10: PARTICIPANT BROCHURE & DOCUMENT READER FULL PAGE */}
        {currentPage === 'document' && (
          <DocumentViewerPage
            material={selectedMaterial}
            lang={lang}
            onBack={handleBack}
            onNavigateHome={handleNavigateHome}
            onSelectOtherMaterial={(mat) => navigateWithTransition('document', mat)}
          />
        )}
      </main>

      {/* 4. Institutional Footer (Provides universal cross-navigation across all pages) */}
      <Footer
        lang={lang}
        onNavigate={navigateWithTransition}
      />

      {/* 5. Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
        onSelectResearch={(project) => {
          setIsSearchOpen(false);
          navigateWithTransition('research-detail', project);
        }}
        onSelectPublication={(pub) => {
          setIsSearchOpen(false);
          navigateWithTransition('publications', pub);
        }}
        onOpenResearch={() => {
          setIsSearchOpen(false);
          navigateWithTransition('research');
        }}
        onOpenPublications={() => {
          setIsSearchOpen(false);
          navigateWithTransition('publications');
        }}
        onOpenNews={() => {
          setIsSearchOpen(false);
          navigateWithTransition('news');
        }}
      />
    </div>
  );
}
