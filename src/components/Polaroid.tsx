import type { CSSProperties, ReactNode } from "react";

type PolaroidProps = {
  image: string;
  alt?: string;
  caption?: ReactNode;

  className?: string;
  style?: CSSProperties;

  // Accepts any CSS length: "300px", "22vw", "clamp(...)", etc.
  width?: string;
  height?: string;

  // Depth above the tilted plane, in px.
  z?: number;

  // Polaroid frame rotation.
  rotate?: number;

  // Untilted shadow. CSS lengths allow it to scale with the page.
  shadowX?: string;
  shadowY?: string;
  shadowRotate?: number;

  // Tilted shadow.
  tiltedShadowX?: string;
  tiltedShadowY?: string;
  tiltedShadowRotate?: number;

  isTilted: boolean;
};

export default function Polaroid({
  image,
  alt = "",
  caption,
  className = "",
  style,

  width = "clamp(180px, 20vw, 300px)",
  height = "clamp(240px, 26vw, 400px)",

  z = 50,
  rotate = 0,

  shadowX = "0px",
  shadowY = "0px",
  shadowRotate = 0,

  tiltedShadowX = "15px",
  tiltedShadowY = "60px",
  tiltedShadowRotate = 0,

  isTilted,
}: PolaroidProps) {
  const activeShadowX = isTilted ? tiltedShadowX : shadowX;
  const activeShadowY = isTilted ? tiltedShadowY : shadowY;
  const activeShadowRotate = (isTilted ? tiltedShadowRotate : shadowRotate) + rotate;

  const frameStyle: CSSProperties = {
    width,
    height,
    transform: `translateZ(${z}px) rotate(${rotate}deg)`,
    transformStyle: "preserve-3d",
  };

  const shadowStyle: CSSProperties = {
    transform: `translate3d(${activeShadowX}, ${activeShadowY}, ${-z}px) rotate(${activeShadowRotate}deg)`,
    transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <div
      className={`absolute transform-gpu [transform-style:preserve-3d] ${className}`}
      style={style}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(80,62,44,0.16)]"
        style={shadowStyle}
      />

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
          />
        </div>

        {caption && (
          <div className="absolute inset-x-[clamp(8px,1vw,14px)] bottom-[clamp(8px,1vw,24px)] text-center font-mono text-[clamp(9px,0.8vw,12px)] uppercase tracking-[0.18em] text-[rgba(80,62,44,0.75)]">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}