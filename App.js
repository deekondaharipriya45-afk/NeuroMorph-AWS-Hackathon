import { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = async () => {
  console.log("Button clicked");

  try {
    const response = await fetch("http://localhost:5000/generate", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: input })
    });

    const data = await response.json();
    setOutput(data.result);

  } catch (error) {
    console.error(error);
    setOutput("Error generating content.");
  }
};


  return (
    <div className={darkMode ? "app dark" : "app light"}>

      {/* Floating Background */}
      <div className="blob"></div>
      <div className="blob blob2"></div>

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">NeuroMorph</h2>
        <div className="nav-links">
          <button>Home</button>
          <button>Features</button>
          <button>Dashboard</button>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero fade-in">
        <h1>
          Transform Content with
          <span className="gradient-text"> AI Personalization</span>
        </h1>
        <p>
          Create adaptive, audience-aware content in seconds.
        </p>
      </section>

      {/* Features Section */}
      <section className="features fade-in">
        <div className="card">Audience Adaptation</div>
        <div className="card">Emotion Intelligence</div>
        <div className="card">Regional Localization</div>
      </section>

      {/* AI Input Section */}
      <section className="generator fade-in">
        <h2>Try NeuroMorph AI</h2>

        <textarea
          placeholder="Enter your content..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={handleGenerate}>Generate</button>

        {output && <div className="output">{output}</div>}
      </section>

    </div>
  );
}

export default App;
