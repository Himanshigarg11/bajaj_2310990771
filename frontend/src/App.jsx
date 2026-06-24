import { useState } from "react";

function App() {
  const [input, setInput] = useState(`[
  "A->B",
  "A->C",
  "B->D"
]`);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = JSON.parse(input);

      const response = await fetch(
        "https://bajaj-2310990771.onrender.com/bfhl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      );

      const json = await response.json();

      setResult(json);
    } catch (error) {
      alert("Invalid Input");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>BFHL Tree Analyzer</h1>

      <textarea
        rows="10"
        style={{ width: "100%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>
        {loading ? "Loading..." : "Submit"}
      </button>

      <pre
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#f4f4f4",
          overflow: "auto",
        }}
      >
        {result
          ? JSON.stringify(result, null, 2)
          : "Response will appear here"}
      </pre>
    </div>
  );
}

export default App;