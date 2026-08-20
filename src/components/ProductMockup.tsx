import { useId, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";

const PHONE_WIDTH = 433;
const PHONE_HEIGHT = 882;
const SCREEN_X = 21.25;
const SCREEN_Y = 19.25;
const SCREEN_WIDTH = 389.5;
const SCREEN_HEIGHT = 843.5;
const SCREEN_RADIUS = 55.75;

const LEFT_PCT = (SCREEN_X / PHONE_WIDTH) * 100;
const TOP_PCT = (SCREEN_Y / PHONE_HEIGHT) * 100;
const WIDTH_PCT = (SCREEN_WIDTH / PHONE_WIDTH) * 100;
const HEIGHT_PCT = (SCREEN_HEIGHT / PHONE_HEIGHT) * 100;
const RADIUS_H = (SCREEN_RADIUS / SCREEN_WIDTH) * 100;
const RADIUS_V = (SCREEN_RADIUS / SCREEN_HEIGHT) * 100;

const TILT_TRANSFORM: Record<string, string> = {
  none: "none",
  left: "rotateY(16deg) rotateX(4deg) rotateZ(-2.5deg)",
  right: "rotateY(-16deg) rotateX(4deg) rotateZ(2.5deg)",
};

const GROUND_SHADOW_SHIFT: Record<string, string> = {
  none: "0%",
  left: "10%",
  right: "-10%",
};

type ProductMockupProps = {
  src?: StaticImageData;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tone?: "light" | "dark";
  tilt?: "none" | "left" | "right";
  groundShadow?: boolean;
  screenChildren?: ReactNode;
};

export default function ProductMockup({
  src,
  alt = "",
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 320px, 60vw",
  tone = "light",
  tilt = "none",
  groundShadow = true,
  screenChildren,
}: ProductMockupProps) {
  const reactId = useId();
  const maskId = `screen-punch-${reactId}`;
  const frameId = `frame-metal-${reactId}`;
  const dim = tone === "dark";

  return (
    <div className="relative" style={{ aspectRatio: `${PHONE_WIDTH} / ${PHONE_HEIGHT}` }}>
      {groundShadow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[6%] left-1/2 h-[14%] w-[86%] -translate-x-1/2 rounded-[50%] blur-2xl"
          style={{
            transform: `translateX(calc(-50% + ${GROUND_SHADOW_SHIFT[tilt]}))`,
            background:
              "radial-gradient(closest-side, rgba(20,14,22,0.32), rgba(254,93,157,0.14) 55%, transparent 80%)",
          }}
        />
      )}

      <div
        className={`absolute inset-0 ${className}`}
        style={{
          transform: TILT_TRANSFORM[tilt],
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="pointer-events-none absolute z-0 overflow-hidden bg-dark"
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
            transform: "translateZ(14px)",
          }}
        >
          {screenChildren ??
            (src && (
              <Image
                src={src}
                alt={alt}
                fill
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                sizes={sizes}
                className="object-cover object-top"
              />
            ))}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.06) 22%, transparent 40%, transparent 72%, rgba(255,255,255,0.12) 100%)",
            }}
          />
        </div>

        <svg
          viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          style={{ transform: "translateZ(0)" }}
        >
          <defs>
            <linearGradient id={frameId} x1="0" y1="0" x2={PHONE_WIDTH} y2={PHONE_HEIGHT}>
              {dim ? (
                <>
                  <stop offset="0%" stopColor="#3a3a3d" />
                  <stop offset="45%" stopColor="#161618" />
                  <stop offset="100%" stopColor="#050506" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="45%" stopColor="#e7e7ea" />
                  <stop offset="100%" stopColor="#c9c9cf" />
                </>
              )}
            </linearGradient>
            <mask id={maskId} maskUnits="userSpaceOnUse">
              <rect x="0" y="0" width={PHONE_WIDTH} height={PHONE_HEIGHT} fill="white" />
              <rect
                x={SCREEN_X}
                y={SCREEN_Y}
                width={SCREEN_WIDTH}
                height={SCREEN_HEIGHT}
                rx={SCREEN_RADIUS}
                ry={SCREEN_RADIUS}
                fill="black"
              />
            </mask>
          </defs>

          <g mask={`url(#${maskId})`}>
            <path
              d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
              fill={`url(#${frameId})`}
            />
            <path
              d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
              fill={dim ? "#0a0a0b" : "#ffffff"}
            />
          </g>

          <path
            d={`M${SCREEN_X} 75C${SCREEN_X} 44.2101 46.2101 ${SCREEN_Y} 77 ${SCREEN_Y}H355C385.79 ${SCREEN_Y} 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 ${SCREEN_X} 837.79 ${SCREEN_X} 807V75Z`}
            fill={dim ? "#1c1c1e" : "#dcdce0"}
            mask={`url(#${maskId})`}
          />

          <path
            d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
            fill={dim ? "#0a0a0b" : "#f5f5f5"}
          />

          <path
            d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
            fill="none"
            stroke={dim ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.9)"}
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}
