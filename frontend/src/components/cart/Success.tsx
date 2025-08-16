export default function Success() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#4CAF50" }}>🎉 Congratulations!</h1>
      <p>
        Your purchase has been <strong>successful</strong>.
      </p>
      <p>Expect delivery in 5–7 business days 🚚</p>
    </div>
  );
}
