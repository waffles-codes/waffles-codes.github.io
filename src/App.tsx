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

  useEffect(() => {
    const update = () => setScrollY(window.scrollY);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const progress = Math.max(0, Math.min(1, scrollY / SCROLL_LENGTH));
  const planeOffsetY = -progress * PLANE_TRAVEL;

  const activeMatrix = useMemo(() => {
    const base = [...(isTilted ? TILTED_MATRIX : IDENTITY_MATRIX)];

    if (isTilted) {
      base[12] += -0.6 * planeOffsetY; // tx
      base[13] +=  0.6 * planeOffsetY; // ty
      base[14] +=  0.6 * planeOffsetY; // tz
    } else {
      base[13] += planeOffsetY; // just translateY
    }

    return base;
  }, [isTilted, planeOffsetY]);

  const planeTransform = useMemo(() => {
    return matrixToCss(activeMatrix);
  }, [activeMatrix]);

  return (
    <div className="bg-[#f4f1ea] text-[#111111] selection:bg-[#111111] selection:text-[#f4f1ea]">
      <header className="sticky top-0 z-50 bg-[#f4f1ea]/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.1)] border-b border-black/15 py-4 px-5 sm:px-8 lg:px-12">
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

          <div className="hidden text-right md:block space-y-2">
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
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 px-5 pt-24 pb-8 sm:px-8 lg:px-12">
            <div className="relative mx-auto w-full max-w-[1600px] h-full">
              <div className="relative px-6 py-10 sm:px-10 lg:px-16 h-full">
                <div className="mx-auto w-full max-w-[1320px] [perspective:2200px]">
                  <div
                    className="relative origin-center will-change-transform transition-transform duration-300 ease-out [transform-style:preserve-3d]"
                    style={{ transform: planeTransform }}
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
          className="opacity-0 pointer-events-none select-none"
          style={{ height: `${SCROLL_LENGTH + window.innerHeight}px` }}
        />

        <section className="relative z-10 px-5 py-6 sm:px-8 lg:px-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/30">
            Invisible scroll rail active
          </div>
        </section>
      </main>
    </div>
  );
}