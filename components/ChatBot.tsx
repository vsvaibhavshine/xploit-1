import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { Button } from './ui/Button';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { Chat, GenerateContentResponse } from '@google/genai';

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      content: 'SYSTEM READY. LINK ESTABLISHED.\n\nGreetings, Operator. I am Cipher. I have been initialized to assist in your tactical training. We will proceed with precision and professional integrity.\n\nHow can I assist your mission today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatSession(createChatSession());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatSession || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseStream = await sendMessageStream(chatSession, userMsg.content);
      
      const modelMsgId = (Date.now() + 1).toString();
      let fullText = '';
      
      setMessages(prev => [...prev, {
        id: modelMsgId,
        role: 'model',
        content: 'Communicating with core...',
        timestamp: new Date()
      }]);

      for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          setMessages(prev => prev.map(msg => 
            msg.id === modelMsgId 
              ? { ...msg, content: fullText }
              : msg
          ));
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        content: 'Error: Connection lost. Please re-synchronize your link.',
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[800px] lg:h-[900px] border-2 border-slate-800 bg-black rounded-3xl overflow-hidden shadow-2xl relative transition-all">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015]"></div>
      
      {/* Header */}
      <div className="bg-slate-900/40 p-6 border-b border-slate-800 flex justify-between items-center backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
          <div>
            <h2 className="font-bold text-white font-display tracking-widest text-xl uppercase">Cipher Tactical Mentor</h2>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">Authorized Learning Interface</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-[10px] text-emerald-500/50 font-mono font-bold uppercase tracking-widest">Secure_AES_256</span>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-black/40 scroll-smooth">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}
          >
            <div className={`flex items-center gap-2 mb-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className={`text-[10px] font-bold font-mono tracking-widest uppercase ${msg.role === 'user' ? 'text-emerald-500' : 'text-slate-500'}`}>
                    {msg.role === 'user' ? 'Operator' : 'Cipher'}
                </span>
            </div>
            
            <div className={`max-w-[90%] md:max-w-[80%] rounded-2xl px-6 py-5 transition-all relative border ${
              msg.role === 'user' 
                ? 'bg-slate-900/40 border-slate-700 text-slate-100 rounded-tr-none' 
                : msg.isError 
                  ? 'bg-red-950/20 text-red-300 border-red-900/30' 
                  : 'bg-emerald-950/5 border-emerald-900/20 text-emerald-50 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed font-sans font-medium tracking-normal">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex flex-col items-start">
                <div className="bg-slate-900/20 border border-slate-800/40 rounded-2xl p-4 rounded-tl-none">
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-emerald-500/20 rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-8 bg-slate-900/20 border-t border-slate-800/50 z-10">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Cipher about protocols, commands, or defenses..."
            className="flex-1 bg-black/40 border border-slate-700 rounded-xl text-slate-100 px-6 py-4 focus:outline-none focus:border-emerald-500/40 font-sans text-base transition-all"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="px-8"
          >
            {isLoading ? 'Wait' : 'Send'}
          </Button>
        </div>
      </form>
    </div>
  );
};