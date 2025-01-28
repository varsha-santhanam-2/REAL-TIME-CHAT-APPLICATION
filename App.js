import React, { useState, useEffect, useRef } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    // Connect to WebSocket server
    ws.current = new WebSocket("ws://localhost:4000");

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      ws.current.send(input);
      setInput("");
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="message-history">
          {messages.map((msg, idx) => (
            <div key={idx} className="message">
              {msg}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
