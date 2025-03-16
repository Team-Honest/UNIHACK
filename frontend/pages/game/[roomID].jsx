import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function GamePage() {
  const router = useRouter();
  const { roomID, nickname } = router.query;
  const [players, setPlayers] = useState([]);
  const [story, setStory] = useState("");
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (!roomID || !nickname) return;

    // Retrieve game data from localStorage
    const storedGames = JSON.parse(localStorage.getItem("games")) || {};
    const gameData = storedGames[roomID];

    if (!gameData) {
      alert("Game session not found! Redirecting to home.");
      router.push("/");
      return;
    }

    // Update the players list
    setPlayers(gameData.players);

    // Load existing story
    const savedStory = localStorage.getItem(`story_${roomID}`) || "";
    setStory(savedStory);
  }, [roomID, nickname, router]);

  const handleStoryUpdate = () => {
    if (!inputText.trim()) return;

    // Append new text to the story
    const newStory = story + " " + inputText;
    setStory(newStory);
    setInputText("");

    // Save updated story to localStorage
    localStorage.setItem(`story_${roomID}`, newStory);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">Game Room: {roomID}</h1>
        <p className="text-lg text-center text-gray-600 mt-2">Welcome, <span className="font-semibold text-blue-600">{nickname}</span>!</p>

        {/* Player List */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800">Players in this game:</h2>
          <ul className="mt-2 space-y-1">
            {players.map((player, index) => (
              <li key={index} className="text-gray-700 font-medium">
                ✅ {player}
              </li>
            ))}
          </ul>
        </div>

        {/* Story Section */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800">Story Progress:</h2>
          <div className="mt-2 p-3 h-40 bg-white border rounded overflow-y-auto">
            <p className="text-gray-700">{story || "No story started yet. Be the first to add!"}</p>
          </div>
        </div>

        {/* Story Contribution Input */}
        <div className="mt-6">
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add to the story..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={handleStoryUpdate}
            className="mt-3 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Add to Story
          </button>
        </div>
      </div>
    </div>
  );
}