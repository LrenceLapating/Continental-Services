/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Continental Services assistant. How can I help you today? Ask me about our glass restoration services or auto parts!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check if we're in development or production
      const isDevelopment = import.meta.env.DEV;
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

      if (!apiKey) {
        throw new Error('API key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file');
      }

      let responseText: string;

      if (isDevelopment) {
        // Direct API call for local development
        // Build dynamic system prompt from knowledge base
        const kb = await fetch('/chatbot-knowledge.json').then(r => r.json());
        const systemPrompt = buildSystemPrompt(kb);


        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Continental Construction Services'
          },
          body: JSON.stringify({
            model: 'inclusionai/ling-2.6-flash:free',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map(m => ({ role: m.role, content: m.content })),
              { role: 'user', content: userMessage.content }
            ],
            temperature: 0.3,
            max_tokens: 200
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('OpenRouter error:', errorData);
          throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
        }

        const data = await response.json();
        responseText = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
        
        // Aggressive cleaning of thinking process
        // First, try to extract content between quotes if present
        const quoteMatch = responseText.match(/"([^"]+)"/);
        if (quoteMatch && quoteMatch[1].length > 30) {
          responseText = quoteMatch[1];
        } else {
          // Remove thinking process patterns but preserve the actual response
          const cleaningPatterns = [
            /Check word count.*?\.\s*/gi,
            /That covers.*?\.\s*/gi,
            /flows naturally.*?\.\s*/gi,
            /No markdown.*?\.\s*/gi,
            /thinking process.*?\.\s*/gi,
            /per guidelines.*?\.\s*/gi,
            /Okay, the user.*?\.\s*/gi,
            /Let me recall.*?\.\s*/gi,
            /I need to respond.*?\.\s*/gi,
            /Important:.*?\.\s*/gi,
            /Double-check.*?\.\s*/gi,
            /Draft:.*?\.\s*/gi,
            /Example response.*?\.\s*/gi,
            /includes the contact.*?\.\s*/gi,
            /as per guidelines.*?\.\s*/gi,
            /stay concise.*?\.\s*/gi,
            /key points.*?\.\s*/gi
          ];
          
          for (const pattern of cleaningPatterns) {
            responseText = responseText.replace(pattern, '');
          }
        }
        
        responseText = responseText.trim();
        
        // Only do sentence extraction if response is clearly broken (too short or has thinking keywords)
        if (responseText.length < 50 || 
            (responseText.toLowerCase().includes('check word') || 
             responseText.toLowerCase().includes('that covers'))) {
          const sentences = responseText.split(/[.!?]\s+/);
          const goodSentences = sentences.filter(s => 
            s.length > 30 && 
            (s.toLowerCase().includes('we ') || 
             s.toLowerCase().includes('our ') ||
             s.includes('+63') ||
             s.toLowerCase().includes('call us') ||
             s.toLowerCase().includes('email') ||
             s.toLowerCase().includes('glass') ||
             s.toLowerCase().includes('parts'))
          );
          if (goodSentences.length > 0) {
            responseText = goodSentences.join('. ') + '.';
          }
        }
      } else {
        // Use serverless function for production
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(m => ({
              role: m.role,
              content: m.content
            }))
          })
        });

        if (!response.ok) {
          throw new Error('Failed to get response from server');
        }

        const data = await response.json();
        responseText = data.message;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: error instanceof Error && error.message.includes('API key') 
          ? 'API key not configured. Please check your .env file has VITE_OPENROUTER_API_KEY set.'
          : 'Sorry, I\'m having trouble connecting right now. Please try again or contact us directly at +63 912 345 6789.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-blue-500/50 transition-shadow"
          >
            <MessageCircle className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] glass-dark rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Continental Assistant</h3>
                  <p className="text-xs text-white/80">Online • Powered by AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                    <div className={`inline-block px-4 py-3 rounded-2xl max-w-[85%] ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-sm'
                        : 'glass text-slate-100 rounded-tl-sm'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.role === 'assistant' ? convertLinksToClickable(message.content, navigate) : message.content}
                      </p>
                      <p className={`text-[10px] mt-1 ${
                        message.role === 'user' ? 'text-blue-200' : 'text-slate-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="glass px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                    />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 glass rounded-xl border border-white/10 focus:border-cyan-400/50 text-white placeholder-slate-500 focus:outline-none transition-all text-sm disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 text-center">
                AI responses may not always be accurate. For urgent matters, call us directly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Helper function to convert URLs in text to clickable links
function convertLinksToClickable(text: string, navigate: any): JSX.Element {
  const urlRegex = /(\/shop[^\s]*)/g;
  const parts = text.split(urlRegex);
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.match(urlRegex)) {
          return (
            <a
              key={index}
              href={part}
              className="text-cyan-400 hover:text-cyan-300 underline font-semibold cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate(part);
              }}
            >
              {part}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function buildSystemPrompt(kb: any) {
  // Build auto parts list dynamically with product-to-category mapping
  const categories = [];
  const productToCategory: Record<string, string> = {};
  const categoryLinks: Record<string, string> = {
    'windshield': 'windshield',
    'engine': 'engine',
    'brakes': 'brakes',
    'lighting': 'lights',
    'electrical': 'electrical',
    'accessories': 'accessories'
  };

  // Build product mapping and category lists
  for (const [category, items] of Object.entries(kb.autoPartsInStock)) {
    const itemNames = (items as any[]).map(item => item.name).join(', ');
    const link = categoryLinks[category] || category;
    categories.push(`${category.toUpperCase()}: ${itemNames} → /shop?category=${link}`);
    
    // Map each product to its category
    (items as any[]).forEach(item => {
      productToCategory[item.name.toLowerCase()] = link;
      // Also map common variations
      const words = item.name.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 3) { // Only meaningful words
          productToCategory[word] = link;
        }
      });
    });
  }

  const categoriesText = categories.join('\n');
  
  // Build product mapping text for AI
  const productMappingText = Object.entries(productToCategory)
    .map(([product, category]) => `${product} → /shop?category=${category}`)
    .join('\n');

  return `You are a helpful sales assistant for ${kb.company.name}.

COMPANY INFO:
- Services: ${kb.glassServices.services.map((s: any) => s.name).join(', ')}
- Coverage: ${kb.company.serviceAreas}
- Contact: ${kb.company.phone}
- Shop: /shop

AUTO PARTS CATEGORIES:
${categoriesText}

PRODUCT TO CATEGORY MAPPING (use this to provide correct links):
${productMappingText}

RESPONSE STRATEGY:

When asked about ANY specific product:
1. Identify which category it belongs to from the mapping above
2. Provide the link: /shop?category=[correct-category]
3. Example: "brake pads" → /shop?category=brakes
4. Example: "headlights" → /shop?category=lights
5. Example: "battery" → /shop?category=electrical

When asked "What car parts?" or "List all parts":
→ List the categories and say "Browse all at /shop or call ${kb.company.phone}"

When asked about specific product:
→ "Yes, we have [product name]. Check our [Category] section at /shop?category=[category] or call ${kb.company.phone}"

When asked about service area:
→ "Yes, ${kb.company.serviceAreas}. Call ${kb.company.phone}"

When asked about quotes/pricing:
→ "Yes, free quotes! Call ${kb.company.phone}"

When asked about glass services:
→ Mention glass restoration, scratch removal, 25-50% savings. Call ${kb.company.phone}

For car parts NOT in our inventory:
→ "We don't stock [item] yet, but we're expanding. Call ${kb.company.phone}"

For off-topic questions:
→ "I’m currently unable to provide an answer for that specific request. I can assist you with inquiries related to glass restoration and auto parts. Call ${kb.company.phone}"

CRITICAL RULES:
- ALWAYS use the product mapping to provide the CORRECT category link
- If asked about "brake pads", link to /shop?category=brakes
- If asked about "spark plugs", link to /shop?category=engine
- If asked about "headlights", link to /shop?category=lights
- Be direct and answer the specific question
- Keep responses under 45 words
- No markdown, no thinking process

Examples:
Q: "Do you have brake pads?" → "Yes, we have Brake Pads Set. Check our Brakes section at /shop?category=brakes or call ${kb.company.phone}"
Q: "What about spark plugs?" → "Yes, we have Performance Spark Plugs. Check our Engine section at /shop?category=engine or call ${kb.company.phone}"
Q: "Do you sell batteries?" → "Yes, we have 12V Battery. Check our Electrical section at /shop?category=electrical or call ${kb.company.phone}"`;
}
