"use client";

import { useState, useEffect, useRef } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await fetch("https://therapyai-production-c82a.up.railway.app/aibot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: input }),
      });

      const data = await response.json();
      const botMessage = { text: data.response, sender: "bot" };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background-2076334_1280.jpg')" }}
    >
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Chat Messages */}
      <div className="h-[500px] overflow-y-auto space-y-3 p-4 border rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg max-w-[75%] ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="text"
          className="flex-1 border rounded-lg p-3 text-lg"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg"
        >
          Send
        </button>
      </div>
    </div>
    </div>
  );
}
