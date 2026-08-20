type GlowBlobProps = {
  className?: string;
  color?: string;
  size?: string;
  delay?: string;
};

export default function GlowBlob({
  className = "",
  color = "rgba(255,107,156,0.35)",
  size = "44rem",
  delay = "0s",
}: GlowBlobProps) {
  return (
    <div
      aria-hidden="true"
      className={`blob-drift pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(closest-side, ${color}, transparent)`,
        animationDelay: delay,
      }}
    />
  );
}
