import { useState } from "react";
import { useRouter } from "next/router";

export default function StartPage() {
  const [inviteCode, setInviteCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(""); // "new" or "join"
  const router = useRouter();

  const API_BASE_URL = "http://127.0.0.1:8000"; // Backend API URL

  const startNewGame = () => {
    setMode("new");
    setIsModalOpen(true);
  };

  const joinGame = () => {
    setMode("join");
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!nickname.trim()) {
      alert("Please enter a nickname.");
      return;
    }
  
    if (mode === "new") {
      // ✅ Send nickname to backend when creating a new game
      const response = await fetch(`${API_BASE_URL}/create-game/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname }),  // ✅ FIXED: Send nickname to backend
      });
  
      const data = await response.json();
      if (response.ok && data.game_id) {
        router.push(`/game/${data.game_id}?nickname=${nickname}`);
      } else {
        alert(`❌ Error creating game: ${data.error || "Unknown error"}`);
      }
    } else if (mode === "join") {
      if (!inviteCode.trim()) {
        alert("Please enter a valid game ID.");
        return;
      }
  
      // ✅ Error handling when joining a game
      const response = await fetch(`${API_BASE_URL}/join-game/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game_id: inviteCode, nickname }),
      });
  
      const data = await response.json();
      if (response.ok) {
        router.push(`/game/${inviteCode}?nickname=${nickname}`);
      } else {
        alert(`❌ Invalid game ID: ${data.error || "Unknown error"}`);
      }
    }
  
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4">
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

      {/* Modal for Nickname and Game ID */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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