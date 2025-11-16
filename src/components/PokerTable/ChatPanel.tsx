import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Send, X } from 'lucide-react';
import { mockChatMessages } from '../../data/mockData';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockChatMessages);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        username: 'You',
        message: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setMessage('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed right-0 top-0 h-full w-80 bg-neon-dark/95 backdrop-blur-lg border-l-2 border-neon-purple/30 z-30 flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-neon-purple/20">
            <h3 className="text-xl font-display font-bold">Chat</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neon-purple/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neon-dark/50 rounded-2xl p-3 border border-neon-purple/10"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-neon-teal">{msg.username}</span>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                </div>
                <p className="text-sm text-gray-300">{msg.message}</p>
              </motion.div>
            ))}
          </div>

          <div className="p-4 border-t border-neon-purple/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl bg-neon-dark/50 border-2 border-neon-purple/30 focus:border-neon-purple text-white placeholder-gray-500 focus:outline-none transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                className="px-4 py-3 bg-neon-gradient rounded-xl shadow-neon-glow"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
