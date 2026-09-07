import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  isLoading: boolean;
  targetPageName?: string;
  isInitialLoad?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  isLoading,
  targetPageName = 'Portal',
  isInitialLoad = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = isInitialLoad
    ? [
        'Preparing The Malaysian Cohort website...',
        'Loading research and participant information...',
        'Organising project and publication records...',
        'Preparing the website overview...',
        'Welcome to The Malaysian Cohort'
      ]
    : [
        `Preparing ${targetPageName}...`,
        'Loading the requested page...',
        'Rendering UKM institutional view...',
        'Loading complete'
      ];

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }

    setProgress(5);
    setStatusIndex(0);

    const stepInterval = isInitialLoad ? 120 : 60;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          return 98;
        }
        const jump = Math.floor(Math.random() * 14) + 6;
        const next = Math.min(prev + jump, 98);
        return next;
      });
    }, stepInterval);

    const msgInterval = setInterval(() => {
      setStatusIndex((prev) => Math.min(prev + 1, statusMessages.length - 1));
    }, isInitialLoad ? 280 : 180);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
    };
  }, [isLoading, isInitialLoad, statusMessages.length, targetPageName]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#001f3f] flex flex-col items-center justify-center p-6 text-white select-none transition-opacity duration-300 backdrop-blur-md"
      role="status"
      aria-live="polite"
    >
      {/* Background ambient medical glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#007bff]/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#6EC1E4]/15 rounded-full blur-[70px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* LOGO CONTAINER WITH MOVING ANIMATION */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Animated pulsing & rotating outer orbital ring */}
          <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#6EC1E4]/40 animate-[spin_8s_linear_infinite]"></div>
          <div className="absolute -inset-2 rounded-full border border-[#007bff]/50 animate-ping opacity-30"></div>

          {/* Logo Card */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-3 shadow-2xl flex items-center justify-center border-2 border-blue-200 relative overflow-hidden">
            {/* Shimmer light pass across logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ7Cgz6jgnULMpxLU38lSRu2Y2BFUZuB8glBQBISbSm9e5ENfPFRyGKTT4s70Uje7gCJeV08H6UiPMZGvqrnxG9J9Jcu_C8E30LA7Wffghj_07u2mrfJORfuDljwHVp-P_Y03xPz8YzDUalyOl6BcrwX7g-hGmMKsyjvNxQUDC4oS9AcpErEAGW67kcdiJg2zL_d-h1jteZhsRP3Y-Wji0pc8sI_ccwXsHkMd5I9JfCU4fg-VysDL1yhaOKS910FVF2A"
              alt="The Malaysian Cohort Logo"
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
        </div>

        {/* INSTITUTIONAL TITLES */}
        <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
          The Malaysian Cohort
        </h2>
        <p className="font-sans text-xs sm:text-sm font-medium text-[#6EC1E4] mb-6 tracking-wide">
          Institut Biologi Molekul Perubatan UKM (UMBI)
        </p>

        {/* MOVING DOWNLOAD VISUALIZER */}
        <div className="w-full bg-[#00274c]/80 border border-blue-800/80 rounded-xl p-4 shadow-lg mb-4 backdrop-blur-xs">
          {/* Download header with animated download icon */}
          <div className="flex items-center justify-between text-xs mb-2.5">
            <div className="flex items-center gap-2 text-[#6EC1E4] font-semibold">
              <span className="material-symbols-outlined text-base animate-bounce">
                downloading
              </span>
              <span> Loading page...</span>
            </div>
            <span className="font-mono text-white font-bold text-xs bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/50">
              {progress}%
            </span>
          </div>

          {/* MOVING PROGRESS BAR WITH SHIMMER */}
          <div className="w-full h-2.5 bg-blue-950 rounded-full overflow-hidden border border-blue-800/60 relative">
            <div
              className="h-full bg-gradient-to-r from-[#007bff] via-[#6EC1E4] to-[#28a745] transition-all duration-150 ease-out rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              {/* Active moving light beam along progress bar */}
              <div className="absolute inset-0 bg-white/40 animate-pulse"></div>
            </div>
          </div>

          {/* DYNAMIC MOVING STATUS CAPTION */}
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-300 font-sans">
            <span className="inline-block w-2 h-2 rounded-full bg-[#6EC1E4] animate-ping"></span>
            <span className="truncate max-w-[280px]">
              {statusMessages[statusIndex] || 'Downloading content...'}
            </span>
          </div>
        </div>

        {/* ACCREDITATION FOOTER IN SPLASH */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>UKM Research Ethics</span>
          <span>•</span>
          <span>ISO 15189 Biobank</span>
          <span>•</span>
          <span>PDPA 2010 Protected</span>
        </div>
      </div>
    </div>
  );
};
