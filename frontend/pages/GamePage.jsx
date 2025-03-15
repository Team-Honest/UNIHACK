import { useState } from "react";

const GamePage = () => {
  const [output, setOutput] = useState([
    "Welcome to the game! Type a story below",
  ]);
  const [input, setInput] = useState("");

  const processInput = () => {
    if (input.trim() !== "") {
      setOutput((prevOutput) => [...prevOutput, `> ${input}`]);
      setInput("");
    }
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
            onChange={(e) => setInput(e.target.value)}
            className="Input Field"
            placeholder="Enter a command..."
          />
          <button onClick={processInput} className="Button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
