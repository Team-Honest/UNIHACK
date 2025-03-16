import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

export default function GamePage() {
  const router = useRouter();
  const { roomID, nickname } = router.query;
  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]); // ✅ Stores user input & AI responses
  const [inputText, setInputText] = useState("");
  const [socket, setSocket] = useState(null);

  const API_BASE_URL = "http://127.0.0.1:8000"; // Backend API URL

  useEffect(() => {
    if (!roomID) return;

    // ✅ Fetch game details from backend
    fetch(`${API_BASE_URL}/game/${roomID}/`)
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.players);
        if (data.story) {
          setMessages([{ text: data.story, sender: "ai", name: "The Mighty Storyteller" }]); // ✅ AI starts story
        }
      });

    // ✅ Setup WebSocket connection
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/game/${roomID}/`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("🔍 WebSocket Update:", data);

      if (data.story) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.story, sender: "ai", name: "AI" },
        ]);
      }

      if (data.players) {
        console.log("✅ Updating Players List:", data.players);
        setPlayers(data.players);
      }
    };

    setSocket(ws);

    return () => ws.close();
  }, [roomID]);

  const handleStoryUpdate = () => {
    if (!inputText.trim()) return;
  
    // ✅ Add user message to chat first (with name)
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user", name: nickname },
    ]);
  
    // ✅ Send text to backend for AI response
    fetch(`${API_BASE_URL}/game/${roomID}/generate-story/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ AI Story Response:", data);
  
        if (data.updated_story) {
          // 🚀 DO NOT manually add AI response to chat
          // The WebSocket will handle updating the chat with the full story
        } else {
          console.error("❌ AI did not return a story.");
        }
  
        setInputText("");
      })
      .catch((error) => console.error("❌ Error updating story:", error));
  
    // ✅ Send message through WebSocket
    if (socket) {
      console.log("🔍 Sending message to WebSocket:", inputText);
      socket.send(JSON.stringify({ text: inputText }));
    }
  };

  return (
    <div>
    <Navbar></Navbar>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-white p-6 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500">
      <h1 className="text-3xl font-bold">Game Room: {roomID}</h1>
      <p className="text-lg">Welcome, {nickname}!</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Players:</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>✅ {player}</li>
          ))}
        </ul>
      </div>

      {/* ✅ Chat Box */}
      <div className="mt-4 p-4 bg-white text-black shadow-lg w-full  h-[70vh] overflow-y-auto rounded-lg">
        {messages
          .filter((msg) => msg.text.trim() !== "") // ✅ Prevent blank bubbles
          .map((msg, index) => (
            <div
              key={index}
              className={`p-3 my-2 rounded-lg max-w-3xl ${
                msg.sender === "user"
                  ? "bg-blue-300 self-end text-right ml-auto"
                  : "bg-gray-300 self-start mr-auto"
              }`}
            >
              <p className="text-sm font-semibold ">{msg.name}:</p>
              <p className="text-sm">{msg.text}</p>
            </div>
          ))}
      </div>

      {/* ✅ User Input Field */}
      <textarea
        className="mt-4 w-full max-w-xl p-2 border rounded bg-white text-black"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        onClick={handleStoryUpdate}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add to Story
      </button>
    </div>
    </div>
  );
}