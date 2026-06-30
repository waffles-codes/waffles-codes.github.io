import { useEffect, useRef, useState } from "react";
import WaffleParticles from "./WaffleParticles";

type IntroOverlayProps = {
  onComplete: () => void;
  onExited: () => void;
};

const FULL_TEXT = "Hello, I'm Evan";
const TYPE_SPEED_MS = 100;
const START_DELAY_MS = 250;
const HOLD_AFTER_TYPING_MS = 3500;

export default function IntroOverlay({
  onComplete,
  onExited,
}: IntroOverlayProps) {
  const [displayText, setDisplayText] = useState("");
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [typingDone, setTypingDone] = useState(false);

  const hasInitializedRef = useRef(false);
  const hasStartedExitRef = useRef(false);
  const hasSentCompleteRef = useRef(false);
  const typingIndexRef = useRef(0);
  const hasCompletedTypingRef = useRef(false);
  const timeoutIdsRef = useRef<number[]>([]);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const previousBodyOverflow = document.body.style.overflow;

    root.classList.add("intro-scroll-lock");
    document.body.style.overflow = "hidden";

    const clearAllTimeouts = () => {
      timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutIdsRef.current = [];
    };

    const startExit = () => {
      if (hasStartedExitRef.current) return;
      hasStartedExitRef.current = true;

      if (!hasSentCompleteRef.current) {
        hasSentCompleteRef.current = true;
        onComplete();
      }

      requestAnimationFrame(() => {
        setIsSlidingOut(true);
      });
    };

    const typeNext = () => {
      if (hasStartedExitRef.current) return;

      const nextIndex = typingIndexRef.current + 1;
      typingIndexRef.current = nextIndex;
      setDisplayText(FULL_TEXT.slice(0, nextIndex));

      if (nextIndex < FULL_TEXT.length) {
        const id = window.setTimeout(typeNext, TYPE_SPEED_MS);
        timeoutIdsRef.current.push(id);
        return;
      }

      if (hasCompletedTypingRef.current) return;
      hasCompletedTypingRef.current = true;
      setTypingDone(true);

      const holdId = window.setTimeout(() => {
        startExit();
      }, HOLD_AFTER_TYPING_MS);

      timeoutIdsRef.current.push(holdId);
    };

    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;

      if (typingIndexRef.current > 0) {
        setDisplayText(FULL_TEXT.slice(0, typingIndexRef.current));
      }

      if (hasCompletedTypingRef.current) {
        setTypingDone(true);
      } else {
        const startId = window.setTimeout(typeNext, START_DELAY_MS);
        timeoutIdsRef.current.push(startId);
      }
    } else {
      setDisplayText(FULL_TEXT.slice(0, typingIndexRef.current));
      setTypingDone(hasCompletedTypingRef.current);

      if (
        !hasStartedExitRef.current &&
        !hasCompletedTypingRef.current &&
        typingIndexRef.current < FULL_TEXT.length
      ) {
        const resumeId = window.setTimeout(typeNext, TYPE_SPEED_MS);
        timeoutIdsRef.current.push(resumeId);
      }
    }

    return () => {
      clearAllTimeouts();
      root.classList.remove("intro-scroll-lock");
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (hasStartedExitRef.current) return;
    hasStartedExitRef.current = true;

    if (!hasSentCompleteRef.current) {
      hasSentCompleteRef.current = true;
      onComplete();
    }

    requestAnimationFrame(() => {
      setIsSlidingOut(true);
    });
  };

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== overlayRef.current) return;
    if (event.propertyName !== "transform") return;
    if (!isSlidingOut) return;
    onExited();
  };

  return (
    <>
      <style>{`
        @keyframes intro-cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

      <div
        ref={overlayRef}
        className={[
          "fixed inset-0 z-[9999] overflow-hidden bg-[rgba(241,235,223,1)]",
          "transform-gpu transition-transform duration-[900ms]",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",
          isSlidingOut ? "translate-y-full pointer-events-none" : "translate-y-0",
        ].join(" ")}
        aria-hidden="true"
        onClick={handleSkip}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="absolute inset-0 opacity-90">
          <WaffleParticles />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="text-center">
            <p className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[0.04em] text-[#111111]">
              {displayText}
              <span
                className="inline-block"
                style={{
                  animation: typingDone
                    ? "intro-cursor-blink 0.8s steps(1) infinite"
                    : "none",
                }}
              >
                |
              </span>
            </p>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[rgba(80,62,44,0.62)] sm:text-xs">
              move your mouse around, or click to skip
            </p>
          </div>
        </div>
      </div>
    </>
  );
}