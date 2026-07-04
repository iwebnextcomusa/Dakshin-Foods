import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, ArrowRight, Trash2, HelpCircle } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      role: "bot",
      text: "Namaste! Welcome to Dakshin Foods INC. 🍁 I'm your virtual food companion. How can I help you discover our authentic South & North Indian culinary delights across British Columbia today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What is your phone number?",
    "Show me South Indian specialties",
    "Where in BC do you deliver?",
    "Do you have vegan options?"
  ];

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Map message history to the format expected by our Express server
      const history = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        text: msg.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: history
        })
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: "bot",
            text: data.reply,
            timestamp: new Date()
          }
        ]);
      } else {
        throw new Error(data.error || "Failed to fetch response");
      }
    } catch (error: any) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "bot",
          text: "Oops! I had a connection blip. Our high-performance servers are secure, but make sure your `GEMINI_API_KEY` is configured in the Secrets Panel. In the meantime, you can call us directly at +1 (778) 288-8261!",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "init-2",
        role: "bot",
        text: "Chat cleared! I'm ready for your fresh food queries. Ask me about our dishes, delivery areas, or catering!",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[480px] max-h-[calc(100vh-160px)] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden flex flex-col mb-4 transition-all duration-300 animate-in slide-in-from-bottom-8">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 dark:from-zinc-900 dark:to-zinc-800 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white/10 rounded-lg">
                <Bot size={20} className="text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">Dakshin Bot</h3>
                <div className="flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-zinc-200 dark:text-zinc-400">AI Assistant</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={clearChat}
                className="p-1 hover:bg-white/10 rounded text-zinc-300 hover:text-white transition-colors"
                title="Clear Chat"
              >
                <Trash2 size={16} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded text-zinc-300 hover:text-white transition-colors"
                title="Close Chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 dark:bg-zinc-900/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                  {msg.role === "bot" && (
                    <div className="p-1 bg-emerald-100 dark:bg-zinc-800 rounded-lg shrink-0 mt-0.5">
                      <Bot size={14} className="text-emerald-700 dark:text-emerald-400" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-emerald-700 to-emerald-600 text-white rounded-tr-none"
                        : "bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className={`text-[9px] block text-right mt-1.5 ${msg.role === "user" ? "text-emerald-200" : "text-zinc-400"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[85%]">
                  <div className="p-1 bg-emerald-100 dark:bg-zinc-800 rounded-lg shrink-0 mt-0.5">
                    <Bot size={14} className="text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-1">
                    <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggesters */}
          <div className="p-2 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="shrink-0 px-2.5 py-1.5 text-[11px] font-medium bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all cursor-pointer shadow-sm"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Dakshin Bot..."
              className="flex-1 px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-zinc-800 dark:text-zinc-100"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-emerald-700 dark:bg-emerald-600 text-white rounded-xl hover:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-50 transition-colors flex items-center justify-center shrink-0"
              title="Send Message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Floating launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white shadow-xl flex items-center justify-center cursor-pointer hover:scale-108 active:scale-95 transition-all duration-300 ring-4 ring-emerald-500/10 hover:ring-emerald-500/20 group"
        title="Dakshin Foods Assistant"
        id="chatbot-launcher-btn"
      >
        {isOpen ? (
          <X size={24} className="transition-transform duration-300 rotate-90" />
        ) : (
          <div className="relative">
            <MessageSquare size={24} className="group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-emerald-600 animate-pulse" />
          </div>
        )}
      </button>
    </div>
  );
}
