import { useEffect, useRef, useState } from "react";
import emailSvg from "./assets/email.svg";
import githubSvg from "./assets/github.svg";
import linkedinSvg from "./assets/linkedin.svg";

const SCROLL_LENGTH = 2000;
const PLANE_TRAVEL = 4000;

const TILT_ROTATE_X = 20;
const TILT_ROTATE_Y = -10;
const TILT_ROTATE_Z = 20;

const BTN_TILT_ROTATE_X = 25;
const BTN_TILT_ROTATE_Y = -10;
const BTN_TILT_ROTATE_Z = 25;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function App() {
  const [isTilted, setIsTilted] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const lastScrollYRef = useRef(0);

  const planeRef = useRef<HTMLDivElement | null>(null);
  const paperRef = useRef<HTMLDivElement | null>(null);

  const transformTextRef = useRef<HTMLParagraphElement | null>(null);
  const headerTransformTextRef = useRef<HTMLParagraphElement | null>(null);

  const rafIdRef = useRef(0);
  const latestScrollYRef = useRef(0);
  const latestViewportHeightRef = useRef(0);
  const isTiltedRef = useRef(isTilted);

  const applyTransformRef = useRef<(scrollY: number) => void>(() => {});

  useEffect(() => {
    const handleNavVisibility = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      // make navbar always visible at top of page
      if (currentY <= 24) {
        setIsNavVisible(true);
        lastScrollYRef.current = currentY;
        return;
      }

      if (Math.abs(delta) < 1) return;

      if (delta > 0) {
        setIsNavVisible(false);
      }

      lastScrollYRef.current = currentY;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleNavVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleNavVisibility);
    };
  }, []);

  useEffect(() => {
    applyTransformRef.current = (scrollY: number) => {
      const progress = clamp(scrollY / SCROLL_LENGTH, 0, 1);
      const planeOffsetY = Math.round(-progress * PLANE_TRAVEL);

      const planeTransform = isTiltedRef.current
        ? `rotateX(${TILT_ROTATE_X}deg) rotateY(${TILT_ROTATE_Y}deg) rotateZ(${TILT_ROTATE_Z}deg) translate3d(50px, ${planeOffsetY + 100}px, 0)`
        : `translate3d(0, ${planeOffsetY}px, 0)`;

      if (planeRef.current) {
        planeRef.current.style.transform = planeTransform;
      }

      if (transformTextRef.current) {
        transformTextRef.current.textContent = planeTransform;
      }

      if (headerTransformTextRef.current) {
        headerTransformTextRef.current.textContent = planeTransform;
      }
    };
  }, []);

  useEffect(() => {
    if (!paperRef.current) return;

    paperRef.current.style.transform = isTilted
      ? `rotateX(${TILT_ROTATE_X}deg) rotateY(${TILT_ROTATE_Y}deg) rotateZ(${TILT_ROTATE_Z}deg) translate3d(-55%, -45%, 0)`
      : `translate3d(-50%, -50%, 0)`;
  }, [isTilted]);

  useEffect(() => {
    isTiltedRef.current = isTilted;
    applyTransformRef.current(latestScrollYRef.current);
  }, [isTilted]);

  useEffect(() => {
    const readViewportHeight = () => {
      const vv = window.visualViewport;
      return Math.round(vv?.height ?? window.innerHeight);
    };

    const writeViewportHeight = (height: number) => {
      if (latestViewportHeightRef.current === height) return;
      latestViewportHeightRef.current = height;
      document.documentElement.style.setProperty("--vvh", `${height}px`);
    };

    const updateScene = () => {
      writeViewportHeight(readViewportHeight());
      applyTransformRef.current(latestScrollYRef.current);
    };

    const scheduleUpdate = () => {
      latestScrollYRef.current = window.scrollY;

      if (rafIdRef.current) return;

      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = 0;
        updateScene();
      });
    };

    latestScrollYRef.current = window.scrollY;
    updateScene();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.visualViewport?.addEventListener("resize", scheduleUpdate);
    window.visualViewport?.addEventListener("scroll", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.visualViewport?.removeEventListener("resize", scheduleUpdate);
      window.visualViewport?.removeEventListener("scroll", scheduleUpdate);

      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const stableViewportHeight = "var(--vvh, 100vh)";

  return (
    <div className="bg-[#f4f1ea] text-[#111111] selection:bg-[#111111] selection:text-[#f4f1ea]">
      <div
        className="fixed inset-x-0 top-0 z-[40] h-24"
        onMouseEnter={() => setIsNavVisible(true)}
      />

      <header
        onMouseEnter={() => setIsNavVisible(true)}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-black/15 bg-[#f4f1ea]/90 px-5 py-4 shadow-[0_1px_0_rgba(0,0,0,0.1)] backdrop-blur-md sm:px-8 lg:px-12
          transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${(isNavVisible) ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.35em] text-black/55 md:block">
              waffles-codes.github.io
            </p>

            <div className="mt-1 flex items-end gap-3">
              <div
                className="inline-block transition-transform duration-500 ease-out"
                style={{
                  transform: isTilted
                    ? `rotateX(${BTN_TILT_ROTATE_X}deg) rotateY(${BTN_TILT_ROTATE_Y}deg) rotateZ(${BTN_TILT_ROTATE_Z}deg)`
                    : "none",
                  transformOrigin: "50% 50%",
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsTilted((prev) => !prev)}
                  aria-pressed={isTilted}
                  aria-label={isTilted ? "Reset website tilt" : "Tilt website"}
                  className="grid h-11 w-11 place-items-center border border-black/80 text-[12px] font-semibold
                              transition-[transform,box-shadow,filter] duration-200 ease-out
                              hover:shadow-lg
                              hover:[filter:invert(63%)_sepia(21%)_saturate(478%)_hue-rotate(352deg)_brightness(60%)_contrast(87%)]
                              shadow-[0_1px_0_rgba(0,0,0,0.1)]"
                >
                  EL
                </button>
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-[0.08em] sm:text-3xl">
                  EVAN LU
                </h1>
                <p className="text-sm text-black/60">
                  ← Inspired by y-n10.com
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-right">
            <div className="max-w-[58vw] h-[24px]">
              <p
                ref={headerTransformTextRef}
                className="hidden overflow-hidden font-mono text-[11px] uppercase text-black/45 md:block"
              />
            </div>

            <div className="mt-3 flex items-center justify-end">
              <a
                href="mailto:evalu802@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="relative mx-2 shrink-0 no-underline transition duration-300 hover:filter-[invert(63%)_sepia(21%)_saturate(478%)_hue-rotate(352deg)_brightness(91%)_contrast(87%)]"
              >
                <img src={emailSvg} alt="" className="h-5 w-5 shrink-0" />
              </a>

              <a
                href="https://github.com/waffles-codes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="relative mx-2 shrink-0 no-underline transition duration-300 hover:filter-[invert(63%)_sepia(21%)_saturate(478%)_hue-rotate(352deg)_brightness(91%)_contrast(87%)]"
              >
                <img src={githubSvg} alt="" className="h-5 w-5 shrink-0" />
              </a>

              <a
                href="https://linkedin.com/in/evan-lu-tw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="relative mx-2 shrink-0 no-underline transition duration-300 hover:filter-[invert(63%)_sepia(21%)_saturate(478%)_hue-rotate(352deg)_brightness(91%)_contrast(87%)]"
              >
                <img src={linkedinSvg} alt="" className="h-5 w-5 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <div
          className="pointer-events-none fixed left-0 top-0 w-full overflow-visible"
          style={{ height: stableViewportHeight }}
        >
          <div className="absolute inset-0 px-5 pt-24 pb-8 sm:px-8 lg:px-12">
            <div className="relative mx-auto h-full w-full max-w-[1600px]">
              <div className="relative h-full px-6 py-10 sm:px-10 lg:px-16">
                <div className="mx-auto w-full max-w-[1320px] [perspective:2200px]">
                  <div
                    ref={paperRef}
                    className="absolute left-1/2 top-1/2 -z-20 h-[420vmax] w-[420vmax] transform-gpu
                                [transform-style:preserve-3d] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
                                transition-transform duration-500 ease-out"
                    style={{
                      transform: "translate3d(-50%, -50%, 0)",
                      transformOrigin: "top center",
                    }}
                  >
                    <div
                      className="absolute -left-[100vw] -right-[100vw] -top-[100vh] -bottom-[500vh]"
                      style={{
                        backgroundColor: "#f1ebdf",
                        backgroundImage: `
                          linear-gradient(to right, rgba(80,62,44,0.11) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(80,62,44,0.11) 1px, transparent 1px),
                          linear-gradient(to right, rgba(80,62,44,0.16) 1.5px, transparent 1.5px),
                          linear-gradient(to bottom, rgba(80,62,44,0.16) 1.5px, transparent 1.5px)
                        `,
                        backgroundSize:
                        //first two layers repeat every 24px, next two repeat every 96px, last two repeat every 48px
                          `24px 24px, 24px 24px,
                          96px 96px, 96px 96px`,
                        backgroundPosition: "0 0, 0 0, 0 0, 0 0, 0 0, 0 0",
                      }}
                    />
                  </div>

                  <div
                    ref={planeRef}
                    className="relative origin-top transform-gpu will-change-transform [transform-style:preserve-3d] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] transition-transform duration-500 ease-out"
                    style={{
                      transform: "translate3d(0, 0, 0)",
                      transformOrigin: "top center",
                    }}
                  >
                      <div
                        aria-hidden="true"
                        className="absolute -inset-1 z-0 bg-black/5 transition-transform duration-500 ease-out"
                        style={{
                          transform: isTilted ? "translate(15px, 60px)" : "translate(0px, 0px)",
                        }}
                      />

                    <div className="relative z-10 border border-black/80 bg-[#f5f1e8]/90 backdrop-blur-sm max-md:backdrop-blur-0">
                      <section className="grid min-h-[72vh] gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="border-b border-black/15 px-6 py-8 sm:px-10 sm:py-12 lg:border-b-0 lg:border-r">
                          <div className="mb-3 flex items-center gap-3">
                            <span className="h-px w-12 bg-black/70" />
                            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-black/55">
                              Main plane
                            </span>
                          </div>

                          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-black/45">
                            scroll-driven tilted surface
                          </p>

                          <h2 className="mt-3 max-w-[8ch] text-[clamp(3.6rem,12vw,8.5rem)] font-semibold leading-[0.88] tracking-[0.08em] text-black">
                            EVAN LU
                          </h2>

                          <p className="mt-6 max-w-[30rem] text-sm leading-7 text-black/60 sm:text-base">
                            Put some words here.
                          </p>
                        </div>

                        <div className="flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-12">
                          <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/45">
                              Scroll mapping
                            </p>
                            <div className="mt-4 space-y-4 text-sm leading-7 text-black/60 sm:text-base">
                              <p>
                                The real page contains an invisible div with an arbitrary height.
                              </p>
                              <p>
                                Window scroll progress is converted into a negative Y translation and
                                applied to the moving plane.
                              </p>
                            </div>
                          </div>

                          <div className="mt-8 hidden border-t border-black/20 pt-3 md:block">
                            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/45">
                              Current transformation
                            </p>
                            <p
                              ref={transformTextRef}
                              className="mt-2 h-[24px] break-all font-mono text-[12px] leading-6 text-black/55"
                            />
                          </div>
                        </div>
                      </section>

                      <section className="border-t border-black/15 px-6 py-16 sm:px-10 lg:px-16">
                        <div className="space-y-24">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div
                              key={i}
                              className="[content-visibility:auto] [contain-intrinsic-size:1px_420px] max-w-2xl"
                            >
                              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/45">
                                Section {String(i + 1).padStart(2, "0")}
                              </p>
                              <h3 className="mt-3 text-3xl font-semibold tracking-[0.06em]">
                                Visual overflow block
                              </h3>
                              <p className="mt-4 text-sm leading-7 text-black/60 sm:text-base">
                                This content exists only inside the visual plane, so most of it can drift
                                off-screen while the actual page scroll remains a hidden control surface
                                underneath.
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none select-none opacity-0"
          style={{ height: `calc(${SCROLL_LENGTH}px + var(--vvh, 100vh))` }}
        />
      </main>
    </div>
  );
}