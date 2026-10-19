import { useCallback, useEffect, useRef, useState } from "react";

import emailSvg from "./assets/email.svg";
import githubSvg from "./assets/github.svg";
import linkedinSvg from "./assets/linkedin.svg";
import arrowSvg from "./assets/arrow.svg";

import IntroAnimation from "./components/IntroAnimation";
import Polaroid from "./components/Polaroid";
import Blurb from "./components/Blurb";

import profilePhoto from "./assets/Evan_Lu_Professional_Profile_Confident_Cropped.webp";
import whWiring from "./assets/robot hand wiring closeup.webp";
import whCAD from "./assets/robot hand cad fusion 360.webp";
import whPrototype from "./assets/robot hand first iteration.webp";
import whRaspSide from "./assets/robot hand raspberry pi side.webp";
import hhForearm from "./assets/arm forearm assembly.webp";
import hhScrewCloseup from "./assets/arm unfortunate screw placement.webp";

const SCROLL_LENGTH = 2000;
const PLANE_TRAVEL = 2000;

const BACKGROUND_SCROLL_SPEED = 0.5;
const PLANE_SCROLL_SPEED = 1;

const TILT_ROTATE_X = 25;
const TILT_ROTATE_Y = -10;
const TILT_ROTATE_Z = 20;

const BTN_TILT_ROTATE_X = 25;
const BTN_TILT_ROTATE_Y = -10;
const BTN_TILT_ROTATE_Z = 25;

type TooltipPhase = "visible" | "fading" | "hidden";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function App() {
  const [isTilted, setIsTilted] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  const [tooltipPhase, setTooltipPhase] =
    useState<TooltipPhase>("visible");

  const tooltipDismissedRef = useRef(false);
  const tooltipTimeoutRef = useRef<number | null>(null);

  const lastScrollYRef = useRef(0);

  const planeRef = useRef<HTMLDivElement | null>(null);
  const backgroundScrollRef = useRef<HTMLDivElement | null>(null);
  const planeScrollRef = useRef<HTMLDivElement | null>(null);

  const transformTextRef = useRef<HTMLParagraphElement | null>(null);
  const headerTransformTextRef =
    useRef<HTMLParagraphElement | null>(null);

  const rafIdRef = useRef(0);
  const latestScrollYRef = useRef(0);
  const latestViewportHeightRef = useRef(0);

  const applyTransformRef =
    useRef<(scrollY: number) => void>(() => {});

  const handleTooltipDismiss = useCallback(() => {
    if (tooltipDismissedRef.current) return;

    tooltipDismissedRef.current = true;
    setTooltipPhase("fading");

    tooltipTimeoutRef.current = window.setTimeout(() => {
      tooltipTimeoutRef.current = null;
      setTooltipPhase("hidden");
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current !== null) {
        window.clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleNavVisibility = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      if (currentY <= 24) {
        setIsNavVisible(true);
        lastScrollYRef.current = currentY;
        return;
      }

      if (Math.abs(delta) < 5) return;

      if (delta > 0) {
        setIsNavVisible(false);
        handleTooltipDismiss();
      } else {
        setIsNavVisible(true);
      }

      lastScrollYRef.current = currentY;
    };

    lastScrollYRef.current = window.scrollY;

    window.addEventListener("scroll", handleNavVisibility, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleNavVisibility);
    };
  }, [handleTooltipDismiss]);

  useEffect(() => {
    applyTransformRef.current = (scrollY: number) => {
      const progress = clamp(scrollY / SCROLL_LENGTH, 0, 1);

      const planeOffsetY = Math.round(
        -progress * PLANE_TRAVEL * PLANE_SCROLL_SPEED + 100
      );

      const backgroundOffsetY = Math.round(
        -progress * PLANE_TRAVEL * BACKGROUND_SCROLL_SPEED
      );

      if (planeScrollRef.current) {
        planeScrollRef.current.style.transform =
          `translate3d(0, ${planeOffsetY}px, 0)`;
      }

      if (backgroundScrollRef.current) {
        backgroundScrollRef.current.style.transform =
          `translate3d(0, ${backgroundOffsetY}px, 0)`;
      }

      const transformText =
        `plane: translate3d(0, ${planeOffsetY}px, 0) | ` +
        `background: translate3d(0, ${backgroundOffsetY}px, 0)`;

      if (transformTextRef.current) {
        transformTextRef.current.textContent = transformText;
      }

      if (headerTransformTextRef.current) {
        headerTransformTextRef.current.textContent = transformText;
      }
    };
  }, []);

  useEffect(() => {
    const readViewportHeight = () => {
      return Math.round(
        window.visualViewport?.height ?? window.innerHeight
      );
    };

    const writeViewportHeight = (height: number) => {
      if (latestViewportHeightRef.current === height) return;

      latestViewportHeightRef.current = height;

      document.documentElement.style.setProperty(
        "--vvh",
        `${height}px`
      );
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

    const visualViewport = window.visualViewport;

    latestScrollYRef.current = window.scrollY;
    updateScene();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate);

    visualViewport?.addEventListener("resize", scheduleUpdate);
    visualViewport?.addEventListener("scroll", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      visualViewport?.removeEventListener("resize", scheduleUpdate);
      visualViewport?.removeEventListener("scroll", scheduleUpdate);

      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
  }, []);

  return (
    <div className="bg-[#f4f1ea] text-[#111111] selection:bg-[#111111] selection:text-[#f4f1ea]">
      {showIntro && (
        <IntroAnimation
          onComplete={() => setIsTilted(true)}
          onExited={() => setShowIntro(false)}
        />
      )}

      <div
        className="fixed inset-x-0 top-0 z-[40] h-24"
        onMouseEnter={() => setIsNavVisible(true)}
      />

      <header
        onMouseEnter={() => setIsNavVisible(true)}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-[rgba(80,62,44,0.16)] bg-[rgba(241,235,223,0.92)] px-5 py-4 shadow-[0_1px_0_rgba(80,62,44,0.08)] backdrop-blur-md sm:px-8 lg:px-12 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.35em] text-[rgba(80,62,44,0.66)] md:block">
              waffles-codes.github.io
            </p>

            <div className="mt-1 flex items-end gap-3">
              <div className="relative inline-block">
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
                    onMouseEnter={handleTooltipDismiss}
                    onFocus={handleTooltipDismiss}
                    aria-pressed={isTilted}
                    aria-label={
                      isTilted
                        ? "Reset website tilt"
                        : "Tilt website"
                    }
                    className="grid h-11 w-11 place-items-center border border-[rgba(80,62,44,0.82)] text-[12px] font-semibold transition-[transform,box-shadow,filter] duration-200 ease-out hover:shadow-lg hover:[filter:invert(63%)_sepia(21%)_saturate(478%)_hue-rotate(352deg)_brightness(60%)_contrast(87%)] shadow-[0_1px_0_rgba(80,62,44,0.1)]"
                  >
                    EL
                  </button>
                </div>

                {tooltipPhase !== "hidden" && (
                  <div
                    role="tooltip"
                    onMouseEnter={handleTooltipDismiss}
                    className={`pointer-events-auto absolute left-full top-16 ml-3 cursor-default whitespace-nowrap comic-relief-regular text-[14px] tracking-[0.22em] text-black transition-opacity duration-500 ease-out ${
                      tooltipPhase === "fading" || !isNavVisible
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                  >
                    <img
                      src={arrowSvg}
                      alt=""
                      aria-hidden="true"
                      className="absolute right-full mr-1 -top-4 h-8 w-8 shrink-0 -rotate-20"
                    />
                    I'm boring and hate fun button
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-[0.08em] sm:text-3xl">
                  EVAN LU
                </h1>

                <p className="text-sm text-[rgba(80,62,44,0.72)]">
                  Inspired by y-n10.com
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-right">
            <div className="h-[24px] max-w-[58vw]">
              <p
                ref={headerTransformTextRef}
                className="hidden overflow-hidden font-mono text-[11px] uppercase text-[rgba(80,62,44,0.58)] md:block"
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
                <img
                  src={emailSvg}
                  alt=""
                  className="h-5 w-5 shrink-0"
                />
              </a>

              <a
                href="https://github.com/waffles-codes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="relative mx-2 shrink-0 no-underline transition duration-300 hover:filter-[invert(63%)_sepia(21%)_saturate(478%)_hue-rotate(352deg)_brightness(91%)_contrast(87%)]"
              >
                <img
                  src={githubSvg}
                  alt=""
                  className="h-5 w-5 shrink-0"
                />
              </a>

              <a
                href="https://linkedin.com/in/evan-lu-tw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="relative mx-2 shrink-0 no-underline transition duration-300 hover:filter-[invert(63%)_sepia(21%)_saturate(478%)_hue-rotate(352deg)_brightness(91%)_contrast(87%)]"
              >
                <img
                  src={linkedinSvg}
                  alt=""
                  className="h-5 w-5 shrink-0"
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <div
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          style={{
            perspective: "2200px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            className="absolute inset-0 transform-gpu [transform-style:preserve-3d]"
            style={{
              transform: isTilted
                ? `rotateX(${TILT_ROTATE_X}deg) rotateY(${TILT_ROTATE_Y}deg) rotateZ(${TILT_ROTATE_Z}deg)`
                : "rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
              transformOrigin: "50% 50%",
              transition:
                "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              ref={backgroundScrollRef}
              className="absolute inset-0 transform-gpu will-change-transform"
            >
              <div className="absolute left-1/2 top-1/2 h-[420vmax] w-[420vmax] -translate-x-1/2">
                <div
                  className="absolute -inset-[100vmax]"
                  style={{
                    backgroundColor: "#efe8dc",
                    backgroundImage: `
                      linear-gradient(to right, rgba(80,62,44,0.10) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(80,62,44,0.10) 1px, transparent 1px),
                      linear-gradient(to right, rgba(80,62,44,0.14) 1.5px, transparent 1.5px),
                      linear-gradient(to bottom, rgba(80,62,44,0.14) 1.5px, transparent 1.5px)
                    `,
                    backgroundSize:
                      "24px 24px, 24px 24px, 96px 96px, 96px 96px",
                    backgroundPosition: "0 0, 0 0, 0 0, 0 0",
                  }}
                />
              </div>
            </div>

            <div
              ref={planeScrollRef}
              className="absolute inset-0 transform-gpu will-change-transform"
            >
              <div className="absolute inset-0 px-5 pt-24 pb-8 sm:px-8 lg:px-12">
                <div className="relative mx-auto h-full w-full max-w-[1600px]">
                  <div className="relative h-full px-6 py-10 sm:px-10 lg:px-16">
                    <div
                      ref={planeRef}
                      className="absolute left-1/2 top-0 w-full max-w-[1320px] -translate-x-1/2 transform-gpu [transform-style:preserve-3d] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                    >
                      <div className="relative">
                        <div
                          aria-hidden="true"
                          className="absolute -inset-1 z-0 bg-[rgba(80,62,44,0.16)] transition-transform duration-500 ease-out"
                          style={{
                            transform: isTilted
                              ? "translate(15px, 60px)"
                              : "translate(0px, 0px)",
                          }}
                        />

                        <div className="relative z-10 border border-[rgba(80,62,44,0.78)] bg-[rgba(241,235,223,1)]">
                          <section className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                            <div className="relative">
                              <div className="border-b border-[rgba(80,62,44,0.14)] px-6 py-8 sm:px-10 sm:py-12 lg:border-b-0 lg:border-r">
                                <div className="mb-3 flex items-center gap-3">
                                  <span className="h-px w-12 bg-[rgba(80,62,44,0.78)]" />

                                  <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[rgba(80,62,44,1)]">
                                    Main plane
                                  </span>
                                </div>

                                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[rgba(80,62,44,1)]">
                                  scroll-driven tilted surface
                                </p>

                                <h2 className="mt-3 max-w-[8ch] text-[clamp(3.6rem,7vw,8.5rem)] font-semibold leading-[0.88] tracking-[0.08em] text-[#111111]">
                                  EVAN LU
                                </h2>

                                <p className="mt-6 max-w-[30rem] text-sm leading-7 text-[rgba(80,62,44,1)] sm:text-base">
                                  Put some words here.
                                </p>
                              </div>

                              <Polaroid
                                image={profilePhoto}
                                alt="Profile Photo"
                                caption="Evan Lu #IrisBooth"
                                className="z-20"
                                width="clamp(160px,15vw,240px)"
                                height="clamp(200px,20vw,320px)"
                                style={{
                                  left: "60%",
                                  top: "30%",
                                }}
                                smallScreen={{
                                  width: "clamp(100px,32vw,200px)",
                                  height: "clamp(140px,42vw,240px)",
                                  left: "auto",
                                  right: "0",
                                  top: "40%",
                                }}
                                rotate={10}
                                shadowX="0px"
                                shadowY="0px"
                                shadowRotate={5}
                                tiltedRotate={10}
                                tiltedPositionX="clamp(10px,2vw,30px)"
                                tiltedPositionY="0px"
                                tiltedShadowX="0px"
                                tiltedShadowY="0px"
                                tiltedShadowRotate={15}
                                isTilted={isTilted}
                              />
                            </div>

                            <div className="flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-12">
                              <div>
                                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[rgba(80,62,44,0.55)]">
                                  Scroll mapping
                                </p>

                                <div className="mt-4 space-y-4 text-sm leading-7 text-[rgba(80,62,44,1)] sm:text-base">
                                  <p>
                                    The real page contains an invisible
                                    div with an arbitrary height.
                                  </p>

                                  <p>
                                    Window scroll progress is converted
                                    into separate translations for the
                                    plane and background.
                                  </p>
                                </div>
                              </div>

                              <div className="mt-8 hidden border-t border-[rgba(80,62,44,0.18)] pt-3 md:block">
                                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[rgba(80,62,44,0.55)]">
                                  Current transformation
                                </p>

                                <p
                                  ref={transformTextRef}
                                  className="mt-2 h-[24px] break-all font-mono text-[12px] leading-6 text-[rgba(80,62,44,0.66)]"
                                />
                              </div>
                            </div>
                          </section>

                          <section className="border-t border-[rgba(80,62,44,0.14)] px-14 py-12 sm:px-10 sm:py-8 lg:px-16 lg:py-16">
                            <div className="space-y-10">
                              <div className="relative">
                                <Blurb
                                  label="Projects 01 / Humanoid Robot Arm"
                                  title="Humanoid Robot Arm"
                                  leftOffset="clamp(75px, 25vw, 450px)"
                                  rightOffset="0px"
                                  isTilted={isTilted}
                                  tiltedPositionX="clamp(-225px, -12.5vw, 0px)"
                                  tiltedPositionY="0px"
                                  body="Introduce the robot arm project and its main goals."
                                  sections={[
                                    {
                                      id: "assembly",
                                      title: "Mechanical assembly",
                                      body: "Describe the forearm assembly and design decisions.",
                                    },
                                    {
                                      id: "revisions",
                                      title: "Design revisions",
                                      bullets: [
                                        "Assembly access and fastener placement.",
                                        "Cable routing and component clearances.",
                                      ],
                                    },
                                    {
                                      id: "technologies",
                                      title: "Technologies",
                                      bullets: [
                                        "Assembly access and fastener placement.",
                                        "Cable routing and component clearances.",
                                      ],
                                    },
                                  ]}
                                  polaroids={
                                    <>
                                      <Polaroid
                                        image={hhForearm}
                                        alt="Robot arm forearm assembly"
                                        caption="#completed forearm assembly"
                                        anchorSide="left"
                                        width="clamp(180px, 12vw, 240px)"
                                        height="clamp(240px, 16vw, 320px)"
                                        style={{
                                          top: "-10px",
                                          right: "clamp(0px, 12vw, 200px)",
                                          zIndex: 65,
                                        }}
                                        smallScreen={{
                                          width: "clamp(120px, 24vw, 156px)",
                                          height: "clamp(160px, 32vw, 208px)",
                                          top: "-20px",
                                          right: "clamp(0px, 9vw, 156px)",
                                        }}
                                        rotate={-5}
                                        shadowX="0px"
                                        shadowY="0px"
                                        shadowRotate={0}
                                        tiltedShadowX="0px"
                                        tiltedShadowY="0px"
                                        tiltedShadowRotate={-17}
                                        tiltedPositionX="-20px"
                                        tiltedPositionY="-10px"
                                        tiltedRotate={-12}
                                        isTilted={isTilted}
                                      />

                                      <Polaroid
                                        image={hhScrewCloseup}
                                        alt="Robot arm screw placement"
                                        caption="Umm... didn't think about that"
                                        anchorSide="left"
                                        width="clamp(180px, 12vw, 240px)"
                                        height="clamp(240px, 16vw, 320px)"
                                        style={{
                                          top: "60px",
                                          right: "0px",
                                          zIndex: 64,
                                        }}
                                        smallScreen={{
                                          width: "clamp(120px, 24vw, 156px)",
                                          height: "clamp(160px, 32vw, 208px)",
                                          top: "150px",
                                          right: "0px",
                                        }}
                                        rotate={3}
                                        shadowX="8px"
                                        shadowY="8px"
                                        shadowRotate={-2}
                                        tiltedShadowX="0px"
                                        tiltedShadowY="0px"
                                        tiltedShadowRotate={10}
                                        tiltedPositionX="0px"
                                        tiltedPositionY="10px"
                                        tiltedRotate={5}
                                        isTilted={isTilted}
                                      />
                                    </>
                                  }
                                />
                              </div>

                              <div className="relative">
                                <Blurb
                                  label="Projects 02 / Wooden Robot Hand"
                                  title="Wooden Robot Hand"
                                  leftOffset="0px"
                                  rightOffset="clamp(100px, 30vw, 800px)"
                                  isTilted={isTilted}
                                  tiltedPositionX="0px"
                                  tiltedPositionY="0px"
                                  body="Introduce the project and its main goals."
                                  sections={[
                                    {
                                      id: "assembly",
                                      title: "Mechanical assembly",
                                      body: "Describe the forearm assembly and design decisions.",
                                    },
                                    {
                                      id: "revisions",
                                      title: "Design revisions",
                                      bullets: [
                                        "Assembly access and fastener placement.",
                                        "Cable routing and component clearances.",
                                      ],
                                    },
                                  ]}
                                  polaroids={
                                    <>
                                      <Polaroid
                                        image={whRaspSide}
                                        alt="Wooden robot hand displaying motor layout and Raspberry Pi"
                                        caption="Raspberry Pi and Motor Layout"
                                        anchorSide="right"
                                        anchorGap="0px"
                                        width="clamp(240px, 16vw, 320px)"
                                        height="clamp(180px, 12vw, 240px)"
                                        style={{
                                          top: "0px",
                                          zIndex: 65,
                                        }}
                                        smallScreen={{
                                          width: "clamp(160px, 32vw, 208px)",
                                          height: "clamp(120px, 24vw, 156px)",
                                          top: "0px",
                                          left: "25px"
                                        }}
                                        rotate={-7.5}
                                        tiltedPositionX="0px"
                                        tiltedPositionY="0px"
                                        tiltedRotate={-12.5}
                                        doShadow={false}
                                        isTilted={isTilted}
                                      />

                                      <Polaroid
                                        image={whPrototype}
                                        alt="Wooden robot hand living hinge prototype"
                                        caption="#Prototyping"
                                        anchorSide="right"
                                        anchorGap="0px"
                                        width="clamp(180px, 12vw, 240px)"
                                        height="clamp(240px, 16vw, 320px)"
                                        style={{
                                          top: "-3vw",
                                          left: "20vw",
                                          zIndex: 64,
                                        }}
                                        smallScreen={{
                                          width: "clamp(120px, 24vw, 156px)",
                                          height: "clamp(160px, 32vw, 208px)",
                                          top: "150px",
                                          left: "50px"
                                        }}
                                        rotate={5}
                                        doShadow={false}
                                        tiltedPositionX="7vw"
                                        tiltedPositionY="-50px"
                                        tiltedRotate={2.5}
                                        isTilted={isTilted}
                                      />

                                      <Polaroid
                                        image={whWiring}
                                        alt="Wooden robot hand motor controller wiring close-up"
                                        caption="We love motor controller wiring"
                                        anchorSide="right"
                                        anchorGap="0px"
                                        width="clamp(180px, 12vw, 240px)"
                                        height="clamp(240px, 16vw, 320px)"
                                        style={{
                                          top: "0px",
                                          left: "11vw",
                                          zIndex: 63,
                                        }}
                                        smallScreen={{
                                          width: "clamp(120px, 24vw, 156px)",
                                          height: "clamp(160px, 32vw, 208px)",
                                          top: "325px",
                                          left: "50px"
                                        }}
                                        rotate={5}
                                        doShadow={false}
                                        tiltedPositionX="4vw"
                                        tiltedPositionY="-90px"
                                        tiltedRotate={-7.5}
                                        isTilted={isTilted}
                                      />

                                      <Polaroid
                                        image={whCAD}
                                        alt="Wooden robot hand CAD"
                                        caption="First taste of Fusion 360"
                                        anchorSide="right"
                                        anchorGap="0px"
                                        width="clamp(240px, 16vw, 320px)"
                                        height="clamp(180px, 12vw, 240px)"
                                        style={{
                                          top: "8vw",
                                          left: "12vw",
                                          zIndex: 62,
                                        }}
                                        smallScreen={{
                                          width: "clamp(160px, 32vw, 208px)",
                                          height: "clamp(120px, 24vw, 156px)",
                                          top: "500px",
                                          left: "25px"
                                        }}
                                        rotate={-2.5}
                                        tiltedPositionX="2vw"
                                        tiltedPositionY="20px"
                                        tiltedRotate={12.5}
                                        doShadow={false}
                                        isTilted={isTilted}
                                      />
                                    </>
                                  }
                                />
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
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
          style={{
            height: `calc(${SCROLL_LENGTH}px + var(--vvh, 100vh))`,
          }}
        />
      </main>
    </div>
  );
}