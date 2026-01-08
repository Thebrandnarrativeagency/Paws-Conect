
import React, { useState, useRef, useEffect } from 'react';
import { askDrPaws } from '../services/geminiService';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { useApp } from '../App';
import { SubscriptionTier } from '../types';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const DR_PAWS_LIMIT = 3;

const DrPawsView: React.FC = () => {
  const { user, setUser, openUpgrade } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: `Hello ${user.name}! I'm Dr. Paws. How can I help you today? 🐾` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const remaining = DR_PAWS_LIMIT - user.usageCount.drPawsQueries;
  const isLimited = user.tier === SubscriptionTier.FREE && remaining <= 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (isLimited) {
      openUpgrade();
      return;
    }

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await askDrPaws(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
      setUser(prev => ({
        ...prev,
        usageCount: { 
          ...prev.usageCount, 
          drPawsQueries: prev.usageCount.drPawsQueries + 1 
        }
      }));
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having some technical trouble. Try again soon!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FDFBF7]">
      <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#78B2A4] rounded-full flex items-center justify-center text-white shadow-inner">
            <span className="text-xl">🐶</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm leading-tight">Expert AI Assistant</h3>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                {user.tier === SubscriptionTier.PREMIUM ? 'Unlimited Access' : `${remaining} queries left today`}
              </span>
            </div>
          </div>
        </div>
        {user.tier === SubscriptionTier.FREE && (
          <button 
            onClick={openUpgrade}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4A373]/10 text-[#D4A373] rounded-full hover:bg-[#D4A373]/20 transition-colors"
          >
            <SparklesIcon className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Go Pro</span>
          </button>
        )}
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar min-h-[300px]"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-[#78B2A4] text-white rounded-br-none shadow-md' 
                : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLimited && (
          <div className="bg-white border-2 border-dashed border-[#D4A373]/30 rounded-3xl p-6 text-center animate-in slide-in-from-bottom-2">
            <SparklesIcon className="w-10 h-10 text-[#D4A373] mx-auto mb-3" />
            <h4 className="font-bold text-gray-800 text-sm">Daily Limit Reached</h4>
            <p className="text-gray-500 text-[11px] mt-1 mb-4">Upgrade to Paws Plus for unlimited access to Dr. Paws and all premium guides.</p>
            <button 
              onClick={openUpgrade}
              className="px-6 py-2 bg-[#D4A373] text-white rounded-full text-xs font-bold shadow-lg shadow-[#D4A373]/30"
            >
              Get Unlimited Access
            </button>
          </div>
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 px-4 py-2 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#78B2A4] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#78B2A4] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-[#78B2A4] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className={`flex items-center gap-2 rounded-2xl p-2 border transition-all ${
          isLimited ? 'bg-gray-50 border-gray-200 opacity-50' : 'bg-gray-50 border-gray-200 focus-within:border-[#78B2A4] focus-within:bg-white'
        }`}>
          <input 
            type="text" 
            value={input}
            disabled={isLimited}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isLimited ? "Upgrade to keep chatting..." : "How can I help you and your pet?"}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 placeholder:text-gray-400"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading || isLimited}
            className={`p-2 rounded-xl transition-all ${
              input.trim() && !isLoading && !isLimited ? 'bg-[#78B2A4] text-white' : 'bg-gray-200 text-gray-400'
            }`}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrPawsView;
