"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { sendChatMessage } from "@/lib/api";

const MODES = [
  { id: "default", label: "Default" },
  { id: "developer", label: "Developer" },
  { id: "designer", label: "Designer" },
  { id: "mentor", label: "Mentor" }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("default");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! I’m Ankit’s AI assistant. Ask me anything about his projects, skills, or background."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const messagesEndRef = useRef(null);

  // auto scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  }, [messages, loading]);

  const toggleOpen = () => setIsOpen((o) => !o);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setErrorText("");
    setLoading(true);

    try {
      const data = await sendChatMessage(newMessages, mode);
      if (data?.reply) {
        setMessages((prev) => [...prev, data.reply]);
      } else {
        setErrorText("I couldn't understand that. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorText("Something went wrong talking to the AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat bubble button */}
      <motion.button
        onClick={toggleOpen}
        className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-colors"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 left-5 z-40 w-[320px] md:w-[380px]">
          <div className="glass flex h-[460px] flex-col overflow-hidden shadow-xl">
            {/* Header */}
            <div className="border-b border-slate-800 px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">Chat with Ankit&apos;s AI</p>
                  <p className="text-[11px] text-emerald-400">
                    Ask about projects, skills, or career guidance
                  </p>
                </div>
                <button
                  onClick={toggleOpen}
                  className="rounded-full p-1 hover:bg-slate-800"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              {/* Persona switch */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] border ${
                      mode === m.id
                        ? "bg-emerald-500 text-slate-950 border-emerald-400"
                        : "bg-slate-900/70 text-slate-300 border-slate-700 hover:border-emerald-400/70 hover:text-emerald-300"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <p className="mt-1 text-[10px] text-slate-500">
                Mode:{" "}
                {mode === "default"
                  ? "Balanced — mixes everything."
                  : mode === "developer"
                  ? "Talks like a dev: code, stack, architecture."
                  : mode === "designer"
                  ? "Focuses on UI/UX and design thinking."
                  : "Mentor vibe: career & learning guidance."}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                      m.role === "user"
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-slate-900 text-slate-100 border border-slate-800"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-slate-900 px-3 py-2 text-slate-400 border border-slate-800 text-[11px]">
                    Typing…
                  </div>
                </div>
              )}
              {errorText && (
                <p className="text-[11px] text-red-400 mt-1">{errorText}</p>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-slate-800 px-3 py-2 flex items-center gap-2"
            >
              <input
                type="text"
                className="flex-1 rounded-full bg-slate-900 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 outline-none border border-slate-800 focus:border-emerald-500"
                placeholder="Ask something about Ankit or his projects..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-emerald-500 px-3 py-2 text-xs font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
