import React, { useEffect, useState } from "react";

const MainSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Parallax Effect: Updates background based on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        background: `linear-gradient(to right, #7f00ff, #e100ff)`,
        backgroundPosition: `0px ${scrollPosition}px`,
        transition: "background-position 0.2s ease-out",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Title */}
      <h1 style={{ fontSize: "3rem", opacity: 0.9 }}>🎭 AI Story Chaos 🎭</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px", opacity: 0.9 }}>
        Start with an idea, let AI & your friends create the <strong>most bizarre</strong> story ever!
      </p>

      {/* Start Button with Animations */}
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
          transform: "scale(1)",
        }}
        onMouseOver={(e) => {
          e.target.style.background = "orange";
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "yellow";
          e.target.style.transform = "scale(1)";
        }}
        onClick={() => alert("Game Starting... 🚀")}
      >
        Start Game 🚀
      </button>

      {/* Floating Animation Elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "50px",
          height: "50px",
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "70px",
          height: "70px",
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      {/* Game Rules Section */}
      <div
        style={{
          width: "80%",
          marginTop: "50px",
          padding: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          textAlign: "left",
        }}
      >
        <h2 style={{ fontSize: "2rem", textAlign: "center" }}>📜 Game Rules</h2>
        <ul style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
          <li>📝 Each player writes one line or keywords.</li>
          <li>🤖 AI generates a crazy plot twist.</li>
          <li>🎭 Players continue the story with new lines.</li>
          <li>😂 AI adds more chaos and surprises.</li>
          <li>📜 Enjoy the hilarious, unexpected final story!</li>
        </ul>
      </div>

      {/* Instructions Section */}
      <div
        style={{
          width: "80%",
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          textAlign: "left",
        }}
      >
        <h2 style={{ fontSize: "2rem", textAlign: "center" }}>🕹 How to Play</h2>
        <ol style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
          <li>1️⃣ Click the <strong>Start Game</strong> button.</li>
          <li>2️⃣ Each player submits a **line or keywords**.</li>
          <li>3️⃣ AI generates **a creative plot twist**.</li>
          <li>4️⃣ Players continue adding lines **one by one**.</li>
          <li>5️⃣ AI keeps twisting the story.</li>
          <li>6️⃣ Enjoy reading the final **bizarre & funny** story!</li>
        </ol>
      </div>

      {/* Floating Animation CSS */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default MainSection;
