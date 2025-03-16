import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function StartGame() {
  const [inviteCode, setInviteCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(""); // "new" or "join"
  const router = useRouter();

  useEffect(() => {
    // Load existing games from localStorage when the component mounts
    const storedGames = JSON.parse(localStorage.getItem("games")) || {};
    console.log("Stored Games:", storedGames);
  }, []);

  const startNewGame = () => {
    setMode("new");
    setIsModalOpen(true);
  };

  const joinGame = () => {
    setMode("join");
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (!nickname.trim()) {
      alert("Please enter a nickname.");
      return;
    }

    if (mode === "new") {
      // Generate a new game ID
      const roomId = Math.random().toString(36).substring(2, 8);

      // Save the new game session in localStorage
      const storedGames = JSON.parse(localStorage.getItem("games")) || {};
      storedGames[roomId] = { players: [nickname] }; // Store player list
      localStorage.setItem("games", JSON.stringify(storedGames));

      // Redirect to the game page
      router.push(`/game/${roomId}?nickname=${nickname}`);
    } else if (mode === "join") {
      if (!inviteCode.trim()) {
        alert("Please enter a valid game ID.");
        return;
      }

      // Check if the game exists in localStorage
      const storedGames = JSON.parse(localStorage.getItem("games")) || {};
      if (!storedGames[inviteCode]) {
        alert("Invalid game ID! Please enter a correct one.");
        return;
      }

      // Add player to the game session
      storedGames[inviteCode].players.push(nickname);
      localStorage.setItem("games", JSON.stringify(storedGames));

      // Redirect to the game page
      router.push(`/game/${inviteCode}?nickname=${nickname}`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 relative">
      {/* Title Section */}
      <h1 className="text-4xl font-bold mb-4">Let's get started!</h1>
      <p className="text-lg text-gray-200 mb-6">Create a new story or join an existing one.</p>

      {/* Start New Game Button */}
      <button
        onClick={startNewGame}
        className="w-64 bg-yellow-400 text-black py-3 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition mb-6"
      >
        Start New Game
      </button>

      {/* Join Game Section */}
      <button
        onClick={joinGame}
        className="w-64 bg-blue-400 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition"
      >
        Join a Game
      </button>

      {/* Modal with Background Blur Effect */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96">
            <h2 className="text-xl font-semibold mb-4">
              {mode === "new" ? "Enter Your Nickname" : "Join a Game"}
            </h2>
            
            <input
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            />

            {mode === "join" && (
              <input
                type="text"
                placeholder="Enter game ID"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mb-4"
              />
            )}

            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="mr-2 px-4 py-2 text-gray-600">
                Cancel
              </button>
              <button onClick={handleConfirm} className="px-4 py-2 bg-blue-500 text-white rounded">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
