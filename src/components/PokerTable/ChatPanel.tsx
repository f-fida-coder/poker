import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Send, X, Smile, ThumbsUp, Heart, Laugh, PartyPopper, Zap } from 'lucide-react';
import { mockChatMessages } from '../../data/mockData';
import { soundEffects } from '../../utils/soundEffects';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  reactions?: { emoji: string; count: number; users: string[] }[];
}

const emojis = ['😊', '😂', '😎', '🎉', '🔥', '💯', '👍', '❤️', '🎰', '🃏', '💰', '⭐'];
const quickReactions = [
  { icon: ThumbsUp, emoji: '👍', label: 'Like' },
  { icon: Heart, emoji: '❤️', label: 'Love' },
  { icon: Laugh, emoji: '😂', label: 'Laugh' },
  { icon: PartyPopper, emoji: '🎉', label: 'Party' },
  { icon: Zap, emoji: '⚡', label: 'Wow' },
];

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages.map(msg => ({ ...msg, reactions: [] })));
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!message.trim()) return;

    soundEffects.playNotification();
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        username: 'You',
        message: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: [],
      },
    ]);
    setMessage('');
    setShowEmojiPicker(false);
    
    // Simulate opponent typing
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage(prev => prev + emoji);
    soundEffects.playClick();
  };

  const handleReaction = (messageId: string, emoji: string) => {
    soundEffects.playClick();
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        
        if (existingReaction) {
          // Toggle reaction
          if (existingReaction.users.includes('You')) {
            return {
              ...msg,
              reactions: reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, count: r.count - 1, users: r.users.filter(u => u !== 'You') }
                  : r
              ).filter(r => r.count > 0)
            };
          } else {
            return {
              ...msg,
              reactions: reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, count: r.count + 1, users: [...r.users, 'You'] }
                  : r
              )
            };
          }
        } else {
          return {
            ...msg,
            reactions: [...reactions, { emoji, count: 1, users: ['You'] }]
          };
        }
      }
      return msg;
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    soundEffects.playTyping();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-blue-900/95 backdrop-blur-xl border-l-4 border-purple-500/50 z-30 flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-500/30 bg-gradient-to-r from-purple-800/50 to-indigo-800/50">
            <div>
              <h3 className="text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                💬 Table Chat
              </h3>
              <p className="text-xs text-purple-300/70">Stay connected with players</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-purple-500/30 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-purple-200" />
            </motion.button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-purple-800/40 to-indigo-800/40 rounded-2xl p-3 border border-purple-500/20 hover:border-purple-400/40 transition-all backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      {msg.username}
                    </span>
                    <span className="text-xs text-purple-400/60">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm text-purple-100/90 leading-relaxed">{msg.message}</p>
                  
                  {/* Reactions */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {msg.reactions.map((reaction, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleReaction(msg.id, reaction.emoji)}
                          className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 transition-all ${
                            reaction.users.includes('You') 
                              ? 'bg-purple-500/40 border border-purple-400/50' 
                              : 'bg-purple-800/30 border border-purple-600/20'
                          }`}
                        >
                          <span>{reaction.emoji}</span>
                          <span className="text-purple-200 font-semibold">{reaction.count}</span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                  
                  {/* Quick Reactions (Show on Hover) */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 flex gap-1">
                    {quickReactions.map((reaction) => (
                      <motion.button
                        key={reaction.label}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleReaction(msg.id, reaction.emoji)}
                        className="p-1.5 hover:bg-purple-500/30 rounded-lg transition-all"
                        title={reaction.label}
                      >
                        <span className="text-sm">{reaction.emoji}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-purple-300/60 text-sm px-3"
              >
                <div className="flex gap-1">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                  />
                </div>
                <span>Someone is typing...</span>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Emoji Picker */}
          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="px-4 py-3 bg-gradient-to-r from-purple-800/80 to-indigo-800/80 border-t border-purple-500/30"
              >
                <div className="grid grid-cols-6 gap-2">
                  {emojis.map((emoji, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEmojiClick(emoji)}
                      className="text-2xl p-2 hover:bg-purple-500/30 rounded-lg transition-all"
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <div className="p-4 border-t border-purple-500/30 bg-gradient-to-r from-purple-800/50 to-indigo-800/50">
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`p-3 rounded-xl transition-all ${
                  showEmojiPicker 
                    ? 'bg-purple-500/40 text-purple-200' 
                    : 'bg-purple-800/40 text-purple-300 hover:bg-purple-700/40'
                }`}
              >
                <Smile className="w-5 h-5" />
              </motion.button>
              
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl bg-purple-800/40 border-2 border-purple-500/30 focus:border-purple-400 text-white placeholder-purple-300/50 focus:outline-none transition-all backdrop-blur-sm"
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all"
              >
                <Send className="w-5 h-5 text-white" />
              </motion.button>
            </div>
            
            <p className="text-xs text-purple-300/50 mt-2 text-center">
              Press Enter to send • Hover messages for reactions
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
