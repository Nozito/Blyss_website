export const ogImageSize = { width: 1200, height: 630 };

export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #200310 0%, #3d0a27 30%, #8e315c 68%, #ff6b9c 100%)",
      }}
    >
      <div
        style={{
          fontSize: 140,
          fontWeight: 800,
          color: "#fbf5ef",
          letterSpacing: -4,
        }}
      >
        Blyss
      </div>
      <div
        style={{
          marginTop: 16,
          fontSize: 36,
          fontWeight: 500,
          color: "rgba(251,245,239,0.85)",
        }}
      >
        Beauté. Business. Sérénité.
      </div>
    </div>
  );
}
