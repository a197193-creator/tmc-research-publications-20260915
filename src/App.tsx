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
  bulletinNews,
  participantMaterialsList,
} from './data/portalData';
import { allResearchInitiatives } from './data/researchInitiatives';

// Core Layout & Splash Screen
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';

// Home Screen Components
import { HeroCarousel } from './components/HeroCarousel';
import { Phase3SupportStrip } from './components/Phase3SupportStrip';
import { ResearchInitiatives } from './components/ResearchInitiatives';
import { PublicationsAndSidebar } from './components/PublicationsAndSidebar';
import { ClinicAndLocation } from './components/ClinicAndLocation';

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
import { downloadPublicationAbstractPdf } from './utils/pdfDownload';

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

export default function App() {
  const [lang, setLang] = useState<Language>('en');

  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageType>(getInitialPage);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [targetPageTitle, setTargetPageTitle] = useState<string>('National Biobank & Population Data');
  const historyDepthRef = useRef<number>(0);
  const pageTransitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Selected Data Items for Detail Pages
  const [selectedResearchProject, setSelectedResearchProject] = useState<ResearchInitiativeItem>(
    () => getResearchProjectFromHash() || allResearchInitiatives[0]
  );
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [selectedNews, setSelectedNews] = useState<BulletinItem>(bulletinNews[0]);
  const [selectedMaterial, setSelectedMaterial] = useState<ParticipantMaterial>(participantMaterialsList[0]);
  const [initialLegalSection, setInitialLegalSection] = useState<'ethics' | 'pdpa' | 'terms' | 'governance'>('ethics');

  // Initial Splash Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsInitialLoad(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Apply a page change without creating a browser history entry.
  // Browser Back/Forward uses this same transition after restoring its saved state.
  const transitionToPage = useCallback((targetPage: PageType, payload?: any) => {
    let title = 'Overview';
    if (targetPage === 'biobank') title = 'National Biobank Facility';
    else if (targetPage === 'research') title = 'Research Projects & Consortia';
    else if (targetPage === 'research-detail') title = payload?.title || 'Research Project Profile';
    else if (targetPage === 'publications') title = 'Scientific Publications Index';
    else if (targetPage === 'portal') title = 'Phase 3 Participant Portal';
    else if (targetPage === 'news') title = 'Cohort News & Bulletins';
    else if (targetPage === 'clinic') title = 'Clinic Hours & Location';
    else if (targetPage === 'legal') title = 'Governance & Ethics';
    else if (targetPage === 'news-detail') title = payload?.title || 'Cohort Bulletin';
    else if (targetPage === 'document') title = payload?.title || 'Participant Brochure';

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

    setTargetPageTitle(title);
    setIsInitialLoad(false);
    setIsLoading(true);

    // Scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageTransitionTimerRef.current) clearTimeout(pageTransitionTimerRef.current);
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);

    // Transition delay to allow TMC splash screen animation to run
    pageTransitionTimerRef.current = setTimeout(() => {
      setCurrentPage(targetPage);
      loadingTimerRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, 450);
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
      if (pageTransitionTimerRef.current) clearTimeout(pageTransitionTimerRef.current);
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    };
  }, [transitionToPage]);

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      lang === 'en'
        ? 'Hello The Malaysian Cohort UMBI, I am an enrolled cohort participant inquiring about my Phase 3 follow-up appointment.'
        : 'Salam The Malaysian Cohort UMBI, saya peserta kohort ingin bertanyakan tentang temujanji susulan saringan Fasa 3.'
    );
    window.open(`https://wa.me/60199145900?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-[#f0f0f0] text-[#333333] selection:bg-[#3399ff] selection:text-white font-sans transition-all duration-200">
      {/* 1. Splash Screen with TMC Logo, Moving Rings, and Progress Bar */}
      <SplashScreen
        isLoading={isLoading}
        targetPageName={targetPageTitle}
        isInitialLoad={isInitialLoad}
      />

      {/* 2. Top Header Navigation (Active State Styling & Non-White National Biobank) */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentPage={currentPage}
        onNavigate={navigateWithTransition}
      />

      {/* 3. Main Dynamic Page Views */}
      <main className="flex-1 min-w-0 w-full max-w-full">
        {/* VIEW 1: HOME PAGE */}
        {currentPage === 'home' && (
          <>
            {/* Hero Carousel with National Cohort Statistics */}
            <HeroCarousel
              lang={lang}
              onOpenPortal={() => navigateWithTransition('portal')}
              onOpenBiobank={() => navigateWithTransition('biobank')}
              onOpenResearch={() => navigateWithTransition('research')}
            />

            {/* Phase 3 Health Screening Follow-Up Quick Action Banner */}
            <Phase3SupportStrip
              lang={lang}
              onOpenPortal={() => navigateWithTransition('portal')}
              onOpenWhatsApp={handleOpenWhatsApp}
            />

            {/* Research Initiatives & Cohort Impact */}
            <ResearchInitiatives
              lang={lang}
              onSelectInitiative={(project) => navigateWithTransition('research-detail', project)}
              onOpenAllInitiatives={() => navigateWithTransition('research')}
            />

            {/* Peer-Reviewed Publications & Clinical Helpdesk Sidebar */}
            <PublicationsAndSidebar
              lang={lang}
              onSelectPublication={(pub) => navigateWithTransition('publications', pub)}
              onDownloadPublication={downloadPublicationAbstractPdf}
              onBrowseArchive={() => navigateWithTransition('publications')}
              onBrowseNews={() => navigateWithTransition('news')}
              onSelectNews={(news) => navigateWithTransition('news-detail', news)}
              onSelectMaterial={(material) => navigateWithTransition('document', material)}
              onContactNurse={handleOpenWhatsApp}
            />

            {/* Clinical Operating Hours, Location & Transit */}
            <ClinicAndLocation
              lang={lang}
              onNavigateClinic={() => navigateWithTransition('clinic')}
            />
          </>
        )}

        {/* VIEW 2: NATIONAL BIOBANK FULL PAGE */}
        {currentPage === 'biobank' && (
          <BiobankPage
            lang={lang}
            onBack={handleBack}
            onNavigatePortal={() => navigateWithTransition('portal')}
          />
        )}

        {/* VIEW 3: RESEARCH PROJECTS & CONSORTIA FULL PAGE */}
        {currentPage === 'research' && (
          <ResearchProjectsPage
            lang={lang}
            onBack={handleBack}
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
            onBack={handleBack}
            selectedPublication={selectedPublication}
          />
        )}

        {/* VIEW 5: PARTICIPANT SCREENING & IC PORTAL FULL PAGE */}
        {currentPage === 'portal' && (
          <ParticipantPortalPage
            lang={lang}
            onBack={handleBack}
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}

        {/* VIEW: NEWS & OFFICIAL BULLETINS LIST FULL PAGE */}
        {currentPage === 'news' && (
          <NewsPage
            lang={lang}
            onBack={handleBack}
            onSelectNews={(news) => navigateWithTransition('news-detail', news)}
          />
        )}

        {/* VIEW 7: OFFICIAL ANNOUNCEMENT / BULLETIN ARTICLE FULL PAGE */}
        {currentPage === 'news-detail' && (
          <NewsDetailPage
            news={selectedNews}
            lang={lang}
            onBack={handleBack}
            onSelectOtherNews={(news) => navigateWithTransition('news-detail', news)}
            onNavigateNews={() => navigateWithTransition('news')}
          />
        )}

        {/* VIEW 8: CLINIC, FASTING SAMPLING & TRANSIT FULL PAGE */}
        {currentPage === 'clinic' && (
          <ClinicLocationPage
            lang={lang}
            onBack={handleBack}
            onNavigatePortal={() => navigateWithTransition('portal')}
          />
        )}

        {/* VIEW 9: ETHICS, PDPA & GOVERNANCE FULL PAGE */}
        {currentPage === 'legal' && (
          <LegalPage
            initialSection={initialLegalSection}
            lang={lang}
            onBack={handleBack}
          />
        )}

        {/* VIEW 10: PARTICIPANT BROCHURE & DOCUMENT READER FULL PAGE */}
        {currentPage === 'document' && (
          <DocumentViewerPage
            material={selectedMaterial}
            lang={lang}
            onBack={handleBack}
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
        onOpenPortal={() => {
          setIsSearchOpen(false);
          navigateWithTransition('portal');
        }}
        onOpenBiobank={() => {
          setIsSearchOpen(false);
          navigateWithTransition('biobank');
        }}
      />
    </div>
  );
}
