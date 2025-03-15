import React, { useEffect, useState } from "react";

const MainSection = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Detects scroll position and toggles the "scroll to top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500">
      {/* Title */}
      <h1 className="text-5xl font-extrabold opacity-90">🎭 AI Story Chaos 🎭</h1>
      <p className="mt-4 text-lg max-w-2xl opacity-90">
        Start with an idea, let AI & your friends create the <strong>most bizarre</strong> story ever!
      </p>

      {/* Start Button with Hover Effects */}
      <button
        className="mt-6 px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-orange-500 transform transition duration-300 hover:scale-110"
        onClick={() => alert("Game Starting... 🚀")}
      >
        Start Game 🚀
      </button>

      {/* Floating Animation Elements */}
      <div className="absolute top-10 left-10 w-12 h-12 bg-white/30 rounded-full animate-bounce"></div>
      {/* <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-full animate-pulse"></div> */}

      {/* Game Rules Section */}
      <div className="w-4/5 mt-10 p-6 bg-gray-900/80 rounded-lg shadow-lg text-left">
        <h2 className="text-3xl font-bold text-center">📜 Game Rules</h2>
        <ul className="mt-4 text-lg space-y-2">
          <li>📝 Each player writes one line or keywords.</li>
          <li>🤖 AI generates a crazy plot twist.</li>
          <li>🎭 Players continue the story with new lines.</li>
          <li>😂 AI adds more chaos and surprises.</li>
          <li>📜 Enjoy the hilarious, unexpected final story!</li>
        </ul>
      </div>

      {/* Instructions Section */}
      <div className="w-4/5 mt-6 p-6 bg-white/20 rounded-lg shadow-lg text-left">
        <h2 className="text-3xl font-bold text-center">🕹 How to Play</h2>
        <ol className="mt-4 text-lg space-y-2">
          <li>1️⃣ Click the <strong>Start Game</strong> button.</li>
          <li>2️⃣ Each player submits a <strong> line or keywords</strong> .</li>
          <li>3️⃣ AI generates <strong> a creative plot twist</strong> .</li>
          <li>4️⃣ Players continue adding lines <strong> one by one</strong> .</li>
          <li>5️⃣ AI keeps twisting the story.</li>
          <li>6️⃣ Enjoy reading the final <strong> bizarre & funny</strong> story!</li>
        </ol>
      </div>

      {/* Scroll to Top Button (Appears after scrolling down) */}
      {showScrollButton && (
        <div
          className="fixed bottom-10 right-10 w-16 h-16 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:bg-orange-500 transition-all duration-300 cursor-pointer flex items-center justify-center"
          onClick={scrollToTop}
        >
          ⬆️
        </div>
      )}
    </div>
  );
};

export default MainSection;