import { useEffect, useRef, useState } from "react";

const IDENTITY_MATRIX = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
];

const TILTED_MATRIX = [
  0.9, 0.6, 0.6, 0,
  -0.5, 0.9, 0.5, 0,
  0, -0.5, 0.9, 0,
  -500, -300, 0, 1,
];

const BUTTON_TILTED_MATRIX = [
  0.8, 0.4, 0.4, 0, 
  -0.6, 0.6, 0.6, 0, 
  0, -0.7, 0.7, 0, 
  0, 0, 0, 1
];

const SCROLL_LENGTH = 7000;
const PLANE_TRAVEL = 2600;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function matrixToCss(values: number[]) {
  return `matrix3d(${values.join(", ")})`;
}

export default function App() {
  const [isTilted, setIsTilted] = useState(false);

  const planeRef = useRef<HTMLDivElement | null>(null);
  const transformTextRef = useRef<HTMLParagraphElement | null>(null);
  const headerTransformTextRef = useRef<HTMLParagraphElement | null>(null);

  const rafIdRef = useRef(0);
  const latestScrollYRef = useRef(0);
  const latestViewportHeightRef = useRef(0);
  const isTiltedRef = useRef(isTilted);

  const applyTransformRef = useRef<(scrollY: number) => void>(() => {});

  useEffect(() => {
    applyTransformRef.current = (scrollY: number) => {
      const progress = clamp(scrollY / SCROLL_LENGTH, 0, 1);
      const planeOffsetY = Math.round(-progress * PLANE_TRAVEL);

      let transform = "";

      if (isTiltedRef.current) {
        const base = [...TILTED_MATRIX];
        base[12] += -0.5 * planeOffsetY;
        base[13] += 0.9 * planeOffsetY;
        base[14] += 0.5 * planeOffsetY;
        transform = matrixToCss(base);
      } else {
        transform = `translate3d(0, ${planeOffsetY}px, 0)`;
      }

      if (planeRef.current) {
        planeRef.current.style.transform = transform;
      }

      if (transformTextRef.current) {
        transformTextRef.current.textContent = transform;
      }

      if (headerTransformTextRef.current) {
        headerTransformTextRef.current.textContent = transform;
      }
    };
  });

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
      <header className="sticky top-0 z-50 border-b border-black/15 bg-[#f4f1ea]/90 px-5 py-4 shadow-[0_1px_0_rgba(0,0,0,0.1)] backdrop-blur-md sm:px-8 lg:px-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-black/55">
              waffles-codes.github.io
            </p>

            <div className="mt-1 flex items-end gap-3">
              <button
                type="button"
                onClick={() => setIsTilted((prev) => !prev)}
                aria-pressed={isTilted}
                aria-label={isTilted ? "Reset website tilt" : "Tilt website"}
                className="grid h-11 w-11 place-items-center border border-black/80 text-[12px] font-semibold transition-transform duration-500 ease-out hover:shadow-lg hover:bg-[#f6f3ec] shadow-[0_1px_0_rgba(0,0,0,0.1)]"
                style={{
                  transform: matrixToCss(isTilted ? BUTTON_TILTED_MATRIX : IDENTITY_MATRIX),
                  transformOrigin: "50% 50%",
                }}
              >
                EL
              </button>

              <div>
                <h1 className="text-2xl font-semibold tracking-[0.08em] sm:text-3xl">
                  EVAN LU
                </h1>
                <p className="text-sm text-black/60">Inspired by y-n10.com</p>
              </div>
            </div>
          </div>

          <div className="hidden space-y-2 text-right md:block">
            <p
              ref={headerTransformTextRef}
              className="max-w-[58vw] h-[30px] overflow-hidden font-mono text-[11px] uppercase text-black/45"
            />
          </div>
        </div>
      </header>

      <main className="relative">
        <div
          className="pointer-events-none fixed left-0 top-0 w-full overflow-hidden"
          style={{ height: stableViewportHeight }}
        >
          <div className="absolute inset-0 px-5 pt-24 pb-8 sm:px-8 lg:px-12">
            <div className="relative mx-auto h-full w-full max-w-[1600px]">
              <div className="relative h-full px-6 py-10 sm:px-10 lg:px-16">
                <div className="mx-auto w-full max-w-[1320px] [perspective:2200px]">
                  <div
                    ref={planeRef}
                    className="relative origin-center transform-gpu will-change-transform [transform-style:preserve-3d] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [contain:layout_paint_style] transition-transform duration-500 ease-out"
                    style={{
                      transform: "translate3d(0, 0, 0)",
                      transformOrigin: "50% 50%",
                    }}
                  >
                    <div className="pointer-events-none absolute -inset-4 border border-black/12 sm:-inset-6" />
                    <div className="pointer-events-none absolute -inset-8 border border-black/8 sm:-inset-10" />

                    <div className="relative border border-black/80 bg-[#f5f1e8]/90 shadow-[18px_18px_0_rgba(0,0,0,0.08)] backdrop-blur-sm max-md:backdrop-blur-0 max-md:shadow-[10px_10px_0_rgba(0,0,0,0.05)]">
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
                                The real page contains an invisible div with an
                                arbitrary height.
                              </p>
                              <p>
                                Window scroll progress is converted into a negative
                                Y translation and applied to the moving plane.
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
                                This content exists only inside the visual plane, so
                                most of it can drift off-screen while the actual page
                                scroll remains a hidden control surface underneath.
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