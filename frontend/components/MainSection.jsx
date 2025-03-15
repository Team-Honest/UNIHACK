import React from "react";


const MainSection = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        background: "linear-gradient(to right, #7f00ff, #e100ff)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>🎭 AI Story Chaos 🎭</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
        Start with an idea, let AI & your friends create the **most bizarre**
        story ever!
      </p>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1.2rem",
          background: "yellow",
          color: "black",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.background = "orange")}
        onMouseOut={(e) => (e.target.style.background = "yellow")}
      >
        Start Game 🚀
      </button>
    </div>
  );
};

export default MainSection;
