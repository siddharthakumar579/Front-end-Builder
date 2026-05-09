import { useState } from "react";
import "./App.css";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

function App() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [aiSpecs, setAiSpecs] = useState("");
  const [aiCode, setAiCode] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      setIsLoading(true);

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: inputValue,
        config: {
          systemInstruction: `You are an expert frontend developer.

          Return ONLY a valid JSON:
          {
            "specs": "explain features clearly",
            "code": "<!DOCTYPE html> ... </html>"
          }

          Rules:
          - No markdown
          - No extra text
          - Valid JSON only
          - HTML must start with <!DOCTYPE html>
          - HTML must end with exactly one </html>`,
        },
      });

      let text = response.text;

      // Fix common AI issues (optional cleanup)
      text = text.replace(/<\/html>\s*<\/html>/g, "</html>");

      // Parse JSON safely
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (err) {
        throw new Error("Invalid JSON from AI");
      }

      if (!parsed.code) {
        throw new Error("Missing code in response");
      }

      setAiSpecs(parsed.specs || "No specs provided");
      setAiCode(parsed.code);

      //Switch UI only on success
      setHasSubmitted(true);

    } catch (error) {
      console.error("Error:", error);
      setAiSpecs("Something went wrong. Please try again.");
      setAiCode("");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">

      {/* ================= INITIAL SCREEN ================= */}
      {!hasSubmitted ? (
        <div className="center">
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Describe your app..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">
              {isLoading ? "Generating..." : "Submit"}
            </button>
          </form>
        </div>
      ) : (
        /* ================= MAIN LAYOUT ================= */
        <div className="layout">

          {/* LEFT PANEL */}
          <div className="left">

            {/* Top: Input */}
            <div className="top">
              <form onSubmit={handleSubmit} className="form">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">
                  {isLoading ? "Generating..." : "Regenerate"}
                </button>
              </form>
            </div>

            {/* Bottom: Specs */}
            <div className="bottom">
              <h3>Specs</h3>
              <p>{aiSpecs}</p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="right">

            {/* Toggle */}
            <div className="toggle">
              <button onClick={() => setIsPreviewMode(false)}>
                Code
              </button>
              <button onClick={() => setIsPreviewMode(true)}>
                Preview
              </button>
            </div>

            {/* Output */}
            <div className="output">
              {isPreviewMode ? (
                <iframe
                  srcDoc={aiCode}
                  title="preview"
                  className="preview"
                />
              ) : (
                <pre className="code">{aiCode}</pre>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  ); 
}

export default App;
