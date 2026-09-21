interface SplashScreenProps {
  isVisible: boolean;
}

export function SplashScreen({ isVisible }: SplashScreenProps) {
  if (!isVisible) return null;

  return (
    <div
      className="tmc-splash fixed inset-0 z-[9999] grid place-items-center bg-[#00274c] px-6 text-white"
      role="status"
      aria-label="Loading TMC Research and Publications"
    >
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-28 items-center justify-center bg-white px-2 py-1 sm:h-20 sm:w-32">
            <img
              src="/assets/tmc-emblem.png"
              alt="The Malaysian Cohort emblem"
              width="203"
              height="120"
              className="h-full w-full object-contain"
              decoding="sync"
              fetchPriority="high"
            />
          </div>

          <p className="text-left font-serif text-xl font-bold leading-snug sm:text-2xl">
            The Malaysian
            <br />
            Cohort
          </p>
        </div>

        <p className="mt-6 text-sm font-semibold tracking-[0.18em] text-[#6ec1e4] uppercase">
          Research &amp; Publications
        </p>

        <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
          <span className="tmc-splash__progress block h-full rounded-full bg-[#6ec1e4]" />
        </div>
      </div>
    </div>
  );
}
