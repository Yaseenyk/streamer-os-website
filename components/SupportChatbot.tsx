'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';

const EASE = [0.22, 1, 0.36, 1] as const;

// Inlined at build time. Production (GitHub Pages) sets NEXT_PUBLIC_CHAT_API to
// the deployed Worker URL; local dev falls back to the Hono Worker on 8787.
const CHAT_API = process.env.NEXT_PUBLIC_CHAT_API || 'http://localhost:8787/chat';

const GREETING =
  "Hey! I'm the streamerOS AI assistant. Ask me about setup, system requirements, or troubleshooting.";

// v6 UIMessages carry their text in parts[], not a flat content string.
function messageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => ('text' in part ? part.text : ''))
    .join('');
}

export default function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  // useChat (v3) no longer manages the input field, so we keep a local one.
  const [input, setInput] = useState('');

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: CHAT_API }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';
  // Show the typing dots after a send until the assistant's stream begins.
  const showTyping = isLoading && messages[messages.length - 1]?.role !== 'assistant';

  const scrollRef = useRef<HTMLDivElement>(null);

  // Pin the message list to the latest content as it grows or streams.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, status]);

  // Escape closes the panel.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="flex h-[500px] w-80 max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl shadow-black/50 backdrop-blur-md sm:w-96"
            role="dialog"
            aria-label="streamerOS AI Support"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                  <Bot className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">streamerOS AI Support</p>
                  <p className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                    </span>
                    Online · AI Powered
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {/* Message area */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div className="flex justify-start">
                  <p className="max-w-[85%] rounded-2xl rounded-bl-sm border border-cyan-400/10 bg-slate-900/80 px-3.5 py-2 text-sm text-cyan-100/90">
                    {GREETING}
                  </p>
                </div>
              )}

              {messages.map((message) =>
                message.role === 'user' ? (
                  <div key={message.id} className="flex justify-end">
                    <p className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-white/10 px-3.5 py-2 text-sm text-zinc-100">
                      {messageText(message)}
                    </p>
                  </div>
                ) : (
                  <div key={message.id} className="flex justify-start">
                    <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-cyan-400/10 bg-slate-900/80 px-3.5 py-2 text-sm text-cyan-100/90">
                      {messageText(message)}
                    </p>
                  </div>
                ),
              )}

              {/* Typing indicator (driven by isLoading / status) */}
              {showTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-cyan-400/10 bg-slate-900/80 px-3.5 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <form onSubmit={handleSubmit} className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about streamerOS setup, requirements..."
                  aria-label="Message"
                  className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 placeholder:text-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-cyan-400 text-[#05070A] transition-all hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-4 w-4" strokeWidth={2} aria-hidden />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close support chat' : 'Open support chat'}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-cyan-400 text-[#05070A] shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070A]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-6 w-6" aria-hidden />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Bot className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
