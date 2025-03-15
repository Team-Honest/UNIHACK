import { useState } from "react";

const GamePage = () => {
  const [output, setOutput] = useState([
    "Welcome to the game! Type a story below",
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const processInput = async () => {
    if (input.trim() === "") return;

    // Add user's input to output
    setOutput((prevOutput) => [...prevOutput, `> ${input}`]);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-beat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput((prevOutput) => [...prevOutput, data.response]); // Add AI response
      } else {
        setOutput((prevOutput) => [...prevOutput, " Error: " + data.error]);
      }
    } catch (error) {
      setOutput((prevOutput) => [
        ...prevOutput,
        "Error: Failed to connect to server.",
      ]);
    }

    setInput(""); // Clear input field
    setLoading(false);
  };

  return (
    <div className="Main Window">
      <div className="Border">
        <h1 className="GamePage Header">Text Adventure</h1>

        {/* Output Box */}
        {/* this holds the output values once you hit submit */}
        <div className="Output mapping">
          {output.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        {/* Input Field & Button */}
        <div className="Input Mapping">
          <input
            type="text"
            value={input}
            //when submit is clicked input is emptied and replaced with the placeholder text
            onChange={(e) => setInput(e.target.value)}
            className="Input Field"
            placeholder="Enter a command..."
          />
          <button onClick={processInput} className="Button" disabled={loading}>
            {loading ? "Loading" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
