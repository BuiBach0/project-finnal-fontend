// components/ChatPopup.tsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion, SendHorizontal, X } from "lucide-react";
import { ChatSession, Message, Sender } from "@/types/chat";
import { sendMessageToGemini } from "@/lib/gemini";
import TableSkeleton from "@/components/skeleton-loaders/table-skeleton";

const ChatPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const STORAGE_KEY = "chat_sessions";

  const startNewChat = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSession(newSession);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ChatSession[];
        if (parsed.length > 0) {
          setSessions(parsed);
          setCurrentSession(parsed[0]);
        } else {
          startNewChat();
        }
      } catch (e) {
        console.error("Failed to parse chat sessions", e);
        startNewChat();
      }
    } else {
      startNewChat();
    }
  }, [startNewChat]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSendMessage = async () => {
    console.log("Sending:", input);
    if (!input.trim()) {
      console.warn("Empty input");
      return;
    }
    if (!currentSession) {
      console.warn("No current session");
      startNewChat();
      return;
    }

    const userMessage: Message = {
      text: input,
      sender: "user" as Sender,
    };

    const updatedSession: ChatSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
    };

    setSessions((prev) =>
      prev.map((s) => (s.id === updatedSession.id ? updatedSession : s))
    );
    setCurrentSession(updatedSession);
    setInput("");
    setIsLoading(true);

    const botText = await sendMessageToGemini(input);

    const botMessage: Message = {
      text: botText,
      sender: "bot" as Sender,
    };

    const sessionWithBotReply: ChatSession = {
      ...updatedSession,
      messages: [...updatedSession.messages, botMessage],
    };

    setSessions((prev) =>
      prev.map((s) => (s.id === sessionWithBotReply.id ? sessionWithBotReply : s))
    );
    setCurrentSession(sessionWithBotReply);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div
          ref={popupRef}
          className="w-[400px] h-[550px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold text-lg">Workzen Chat</h2>
            <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {currentSession?.messages.length ? (
              currentSession.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-4 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl max-w-[70%] shadow-sm text-base ${
                      msg.sender === "user"
                        ? "bg-blue-100 text-gray-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 mt-10">Start a new conversation</div>
            )}
            {isLoading && (
              <TableSkeleton columns={1} rows={1} />
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..." 
                  className="w-full resize-none border rounded-xl pr-12 text-base font-medium"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  className="absolute right-2 bottom-2 w-9 h-9 p-0 rounded-full bg-black text-white "
                  size="icon"
                  disabled={isLoading}
                >
                  <SendHorizontal size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          className="rounded-full p-6 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircleQuestion size={30}/>
        </Button>
      )}
    </div>
  );
};

export default ChatPopup;
