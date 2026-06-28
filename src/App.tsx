import { useEffect, useMemo, useState } from "react";

const IDENTITY_MATRIX = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
];

const TILTED_MATRIX = [
  0.8, 0.4, 0.4, 0,
  -0.6, 0.6, 0.6, 0,
  0, -0.7, 0.7, 0,
  -500, -500, 0, 1,
];

function matrixToCss(values: number[]) {
  return `matrix3d(${values.join(", ")})`;
}

const SCROLL_LENGTH = 7000;
const PLANE_TRAVEL = 2600;

export default function App() {
  const [isTilted, setIsTilted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const readViewportHeight = () => {
      const vv = window.visualViewport;
      const nextHeight = Math.round(vv?.height ?? window.innerHeight);
      setViewportHeight((prev) => (prev !== nextHeight ? nextHeight : prev));
    };

    const readScroll = () => {
      setScrollY(window.scrollY);
    };

    const scheduleViewportRead = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        readViewportHeight();
        readScroll();
        rafId = 0;
      });
    };

    readViewportHeight();
    readScroll();

    window.addEventListener("scroll", scheduleViewportRead, { passive: true });
    window.addEventListener("resize", scheduleViewportRead);
    window.visualViewport?.addEventListener("resize", scheduleViewportRead);
    window.visualViewport?.addEventListener("scroll", scheduleViewportRead);

    return () => {
      window.removeEventListener("scroll", scheduleViewportRead);
      window.removeEventListener("resize", scheduleViewportRead);
      window.visualViewport?.removeEventListener("resize", scheduleViewportRead);
      window.visualViewport?.removeEventListener("scroll", scheduleViewportRead);

      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const progress = Math.max(0, Math.min(1, scrollY / SCROLL_LENGTH));
  const planeOffsetY = -progress * PLANE_TRAVEL;

  const activeMatrix = useMemo(() => {
    const base = [...(isTilted ? TILTED_MATRIX : IDENTITY_MATRIX)];

    if (isTilted) {
      base[12] += -planeOffsetY; // tx
      base[13] += planeOffsetY;  // ty
      base[14] += planeOffsetY;  // tz
    } else {
      base[13] += planeOffsetY;  // translateY only
    }

    return base;
  }, [isTilted, planeOffsetY]);

  const planeTransform = useMemo(() => matrixToCss(activeMatrix), [activeMatrix]);

  const stableViewportHeight = viewportHeight || 800;

  return (
    <div className="bg-[#f4f1ea] text-[#111111] selection:bg-[#111111] selection:text-[#f4f1ea]">
      <header className="sticky top-0 z-50 border-b border-black/15 bg-[#f4f1ea]/90 px-5 py-4 shadow-[0_1px_0_rgba(0,0,0,0.1)] backdrop-blur-md sm:px-8 lg:px-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-black/55">
              waffles-codes.github.io
            </p>

            <div className="mt-1 flex items-end gap-3">
              <div className="grid h-11 w-11 place-items-center border border-black/80 text-[12px] font-semibold">
                EL
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-[0.08em] sm:text-3xl">
                  EVAN LU
                </h1>
                <p className="text-sm text-black/60">Inspired by y-n10.com</p>
              </div>
            </div>
          </div>

          <div className="hidden space-y-2 text-right md:block">
            <p className="max-w-[50rem] break-all font-mono text-[11px] uppercase text-black/45">
              {planeTransform}
            </p>
            <button
              onClick={() => setIsTilted((prev) => !prev)}
              className="h-11 border border-black bg-black px-4 text-sm uppercase tracking-[0.18em] text-[#f4f1ea] transition hover:bg-[#222]"
            >
              {isTilted ? "Reset tilt" : "Tilt website"}
            </button>
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
                    className="relative origin-center will-change-transform [transform-style:preserve-3d] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                    style={{
                      transform: planeTransform,
                      transformOrigin: "50% 50%",
                    }}
                  >
                    <div className="pointer-events-none absolute -inset-4 border border-black/12 sm:-inset-6" />
                    <div className="pointer-events-none absolute -inset-8 border border-black/8 sm:-inset-10" />

                    <div className="relative border border-black/80 bg-[#f5f1e8]/90 shadow-[18px_18px_0_rgba(0,0,0,0.08)] backdrop-blur-sm">
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
                                Y translation and applied to the 3dmatrix.
                              </p>
                            </div>
                          </div>

                          <div className="mt-8 border-t border-black/20 pt-3">
                            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/45">
                              Current transformation
                            </p>
                            <p className="mt-2 break-all font-mono text-[12px] leading-6 text-black/55">
                              {planeTransform}
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="border-t border-black/15 px-6 py-16 sm:px-10 lg:px-16">
                        <div className="space-y-24">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="max-w-2xl">
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
          style={{ height: SCROLL_LENGTH + stableViewportHeight }}
        />
      </main>
    </div>
  );
}