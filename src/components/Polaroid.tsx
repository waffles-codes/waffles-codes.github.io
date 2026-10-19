import type { CSSProperties, ReactNode } from "react";

type PolaroidLayout = {
  width?: string;
  height?: string;

  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

type PolaroidProps = {
  image: string;
  alt?: string;
  caption?: ReactNode;

  className?: string;
  style?: CSSProperties;

  width?: string;
  height?: string;
  smallScreen?: PolaroidLayout;

  // Shared anchor for both states.
  anchorSide?: "left" | "right";
  anchorGap?: string;

  // Flat-state appearance.
  rotate?: number;
  shadowX?: string;
  shadowY?: string;
  shadowRotate?: number;

  // Tilted-state appearance and position.
  // These replace the flat-state values.
  tiltedPositionX?: string;
  tiltedPositionY?: string;
  tiltedRotate?: number;
  tiltedShadowX?: string;
  tiltedShadowY?: string;
  tiltedShadowRotate?: number;

  isTilted: boolean;
  doShadow?: boolean;
};

type PolaroidCSSProperties = CSSProperties & {
  [key: `--photo-${string}`]: string | number;
};

const TRANSITION =
  "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)";

function cssPosition(
  value: CSSProperties["top"] | undefined,
  fallback = "auto"
): string {
  if (value == null) return fallback;

  return typeof value === "number"
    ? `${value}px`
    : value;
}

function offsetValue(value: string): string {
  return value.trim() === "auto" ? "0px" : value;
}

export default function Polaroid({
  image,
  alt = "",
  caption,

  className = "",
  style,

  width = "clamp(180px, 20vw, 300px)",
  height = "clamp(240px, 26vw, 400px)",
  smallScreen,

  anchorSide,
  anchorGap,

  rotate = 0,
  shadowX = "0px",
  shadowY = "0px",
  shadowRotate = 0,

  tiltedPositionX = "0px",
  tiltedPositionY = "0px",
  tiltedRotate = 0,
  tiltedShadowX = "15px",
  tiltedShadowY = "60px",
  tiltedShadowRotate = 0,

  isTilted,
  doShadow = true,
}: PolaroidProps) {

  const top = cssPosition(style?.top);
  const right = cssPosition(style?.right);
  const bottom = cssPosition(style?.bottom);
  const left = cssPosition(style?.left);

  const smallTop = smallScreen?.top ?? top;
  const smallRight = smallScreen?.right ?? right;
  const smallBottom = smallScreen?.bottom ?? bottom;
  const smallLeft = smallScreen?.left ?? left;

  const activeRotate = isTilted ? tiltedRotate : rotate;

  const activeShadowX = isTilted
    ? tiltedShadowX
    : shadowX;

  const activeShadowY = isTilted
    ? tiltedShadowY
    : shadowY;

  const activeShadowRotate = isTilted
    ? tiltedShadowRotate
    : shadowRotate;

  const clearance = anchorGap ?? "calc(var(--photo-active-width) * 0.2)";

  const responsiveStyle: PolaroidCSSProperties = {
    ...style,

    "--photo-width": width,
    "--photo-height": height,
    "--photo-top": top,
    "--photo-right": right,
    "--photo-bottom": bottom,
    "--photo-left": left,

    "--photo-offset-left": offsetValue(left),
    "--photo-offset-right": offsetValue(right),

    "--photo-small-width": smallScreen?.width ?? width,
    "--photo-small-height": smallScreen?.height ?? height,
    "--photo-small-top": smallTop,
    "--photo-small-right": smallRight,
    "--photo-small-bottom": smallBottom,
    "--photo-small-left": smallLeft,

    "--photo-small-offset-left": offsetValue(smallLeft),
    "--photo-small-offset-right": offsetValue(smallRight),

    width: "var(--photo-active-width)",
    height: "var(--photo-active-height)",

    // Anchored tilted Y is a complete position from the parent's top.
    // Flat top/bottom are not carried into that state.
    top: "var(--photo-active-top)",
    bottom: "var(--photo-active-bottom)",

    left:
      anchorSide === "right"
        ? `calc(
            100% + ${clearance}
            + var(--photo-active-offset-left)
            - var(--photo-active-offset-right)
          )`
        : anchorSide === "left"
          ? "auto"
          : "var(--photo-active-left)",

    right:
      anchorSide === "left"
        ? `calc(
            100% + ${clearance}
            + var(--photo-active-offset-right)
            - var(--photo-active-offset-left)
          )`
        : anchorSide === "right"
          ? "auto"
          : "var(--photo-active-right)",
  };

  const positionStyle: CSSProperties = {
    transform: `translate3d(
      ${isTilted ? tiltedPositionX : "0px"},
      ${isTilted ? tiltedPositionY : "0px"},
      0px
    )`,
    transition: TRANSITION,
  };

  const frameStyle: CSSProperties = {
    transform: `rotate(${activeRotate}deg)`,
    transformOrigin: "50% 50%",
    transition: TRANSITION,
  };

  const shadowStyle: CSSProperties = {
    transform: `
      translate(${activeShadowX}, ${activeShadowY})
      rotate(${activeShadowRotate}deg)
    `,
    transformOrigin: "50% 50%",
    transition: TRANSITION,
  };

  return (
    <div
      className={`
        absolute

        [--photo-active-width:var(--photo-small-width)]
        [--photo-active-height:var(--photo-small-height)]
        [--photo-active-top:var(--photo-small-top)]
        [--photo-active-right:var(--photo-small-right)]
        [--photo-active-bottom:var(--photo-small-bottom)]
        [--photo-active-left:var(--photo-small-left)]
        [--photo-active-offset-left:var(--photo-small-offset-left)]
        [--photo-active-offset-right:var(--photo-small-offset-right)]

        lg:[--photo-active-width:var(--photo-width)]
        lg:[--photo-active-height:var(--photo-height)]
        lg:[--photo-active-top:var(--photo-top)]
        lg:[--photo-active-right:var(--photo-right)]
        lg:[--photo-active-bottom:var(--photo-bottom)]
        lg:[--photo-active-left:var(--photo-left)]
        lg:[--photo-active-offset-left:var(--photo-offset-left)]
        lg:[--photo-active-offset-right:var(--photo-offset-right)]

        ${className}
      `}
      style={responsiveStyle}
    >
      <div
        className="relative h-full w-full"
        style={positionStyle}
      >
        {doShadow && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[rgba(80,62,44,0.16)]"
            style={shadowStyle}
          />
        )}

        <div
          className="relative flex h-full w-full flex-col border border-[rgba(80,62,44,0.78)] bg-[#f7f3ea] p-[clamp(8px,1vw,14px)] pb-[clamp(38px,5vw,64px)]"
          style={frameStyle}
        >
          <div className="relative h-full w-full overflow-hidden border border-[rgba(80,62,44,0.22)] bg-[#e5ded1]">
            <img
              src={image}
              alt={alt}
              className="h-full w-full object-cover"
              draggable={false}
              loading="lazy"
            />
          </div>

          {caption != null && (
            <div className="absolute inset-x-[clamp(8px,1vw,14px)] bottom-[clamp(8px,1vw,24px)] text-center font-mono text-[clamp(9px,0.8vw,12px)] uppercase tracking-[0.18em] text-[rgba(80,62,44,0.75)]">
              {caption}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}