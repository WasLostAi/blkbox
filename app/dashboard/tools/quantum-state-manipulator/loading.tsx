"use client"

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "2rem",
            height: "2rem",
            border: "2px solid rgba(255, 0, 255, 0.3)",
            borderTopColor: "#f0f",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 1rem auto",
          }}
        />
        <p>Loading...</p>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}
