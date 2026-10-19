import type { CSSProperties, ReactNode } from "react";

export type BlurbSection = {
  id: string;
  title?: ReactNode;
  body?: ReactNode;
  bullets?: readonly ReactNode[];
};

type BlurbProps = {
  label?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  polaroids?: ReactNode;

  bullets?: readonly ReactNode[];
  sections?: readonly BlurbSection[];
  children?: ReactNode;

  // Accept any CSS length: "30px", "10vw", "clamp(...)", etc.
  leftOffset?: string;
  rightOffset?: string;

  // Position offset applied while the plane is tilted.
  tiltedPositionX?: string;
  tiltedPositionY?: string;
  isTilted?: boolean;

  className?: string;
  style?: CSSProperties;
};

const bodyClasses =
  "space-y-2 text-sm leading-[-7] text-[rgba(80,62,44,0.72)] sm:text-base";

function BulletList({ items }: { items?: readonly ReactNode[] }) {
  if (!items?.length) return null;

  return (
    <ul
      className={`list-disc space-y-1 pl-4 marker:text-[rgba(80,62,44,0.55)] ${bodyClasses}`}
    >
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default function Blurb({
  label,
  title,
  body,
  bullets,
  sections,
  children,
  polaroids,

  leftOffset = "0px",
  rightOffset = "0px",

  tiltedPositionX = "0px",
  tiltedPositionY = "0px",
  isTilted = false,

  className = "",
  style,
}: BlurbProps) {
  const tiltedPositionStyle: CSSProperties = {
    transform: `translate3d(
      ${isTilted ? tiltedPositionX : "0px"},
      ${isTilted ? tiltedPositionY : "0px"},
      0
    )`,
    transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <article
      className={`relative ${className}`}
      style={{
        marginLeft: leftOffset,
        marginRight: rightOffset,
        ...tiltedPositionStyle,
        ...style,
      }}
    >
      <div className="relative max-w-3xl">
        {label != null && (
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[rgba(80,62,44,0.55)]">
            {label}
          </p>
        )}

        <h3
          className={`text-3xl font-semibold tracking-[0.06em] text-[#111111] ${
            label != null ? "mt-2" : ""
          }`}
        >
          {title}
        </h3>

        {body != null && (
          <div className={`mt-2 ${bodyClasses}`}>{body}</div>
        )}

        {!!bullets?.length && (
          <div className="mt-2">
            <BulletList items={bullets} />
          </div>
        )}

        {!!sections?.length && (
          <div className="mt-3 space-y-3">
            {sections.map((section) => (
              <section key={section.id} className="space-y-1">
                {section.title != null && (
                  <h4 className="text-lg font-semibold tracking-[0.03em] text-[#111111]">
                    {section.title}
                  </h4>
                )}

                {section.body != null && (
                  <div className={bodyClasses}>{section.body}</div>
                )}

                <BulletList items={section.bullets} />
              </section>
            ))}
          </div>
        )}

        {children != null && (
          <div className={`mt-2 ${bodyClasses}`}>{children}</div>
        )}

        {polaroids}
      </div>
    </article>
  );
}