import { motion } from 'framer-motion';
import { cardSuits } from '../../data/mockData';

interface PlayingCardProps {
  card: string;
  faceDown?: boolean;
  delay?: number;
}

export default function PlayingCard({ card, faceDown = false, delay = 0 }: PlayingCardProps) {
  if (faceDown) {
    return (
      <motion.div
        initial={{ rotateY: 0, scale: 0 }}
        animate={{ rotateY: 0, scale: 1 }}
        transition={{ delay, duration: 0.3 }}
        className="w-14 h-20 sm:w-16 sm:h-24 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 flex items-center justify-center shadow-2xl"
        style={{
          boxShadow: '0 8px 20px rgba(139, 92, 246, 0.6)'
        }}
      >
        <div className="w-12 h-18 sm:w-14 sm:h-22 rounded-lg bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur border-2 border-purple-400/30 flex items-center justify-center">
          <span className="text-2xl">🎴</span>
        </div>
      </motion.div>
    );
  }

  const suit = card.slice(-1) as 's' | 'h' | 'd' | 'c';
  const rank = card.slice(0, -1);
  const isRed = suit === 'h' || suit === 'd';
  const suitSymbol = cardSuits[suit];

  return (
    <motion.div
      initial={{ rotateY: 180, scale: 0 }}
      animate={{ rotateY: 0, scale: 1 }}
      whileHover={{ scale: 1.1, y: -8 }}
      transition={{ delay, duration: 0.5 }}
      className="w-16 h-24 sm:w-20 sm:h-28 rounded-xl bg-white flex flex-col items-center justify-between p-2 sm:p-3 shadow-2xl border-3 border-gray-800"
      style={{ 
        transformStyle: 'preserve-3d',
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.9), 0 0 0 1px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Top corner */}
      <div className="flex flex-col items-center -mt-1">
        <div className={`text-xl sm:text-2xl font-black leading-none ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
          {rank}
        </div>
        <div className={`text-base sm:text-lg leading-none -mt-1 ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
          {suitSymbol}
        </div>
      </div>
      
      {/* Center suit */}
      <div className={`text-4xl sm:text-5xl ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
        {suitSymbol}
      </div>
      
      {/* Bottom corner (rotated) */}
      <div className="flex flex-col items-center rotate-180 -mb-1">
        <div className={`text-xl sm:text-2xl font-black leading-none ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
          {rank}
        </div>
        <div className={`text-base sm:text-lg leading-none -mt-1 ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
          {suitSymbol}
        </div>
      </div>
    </motion.div>
  );
}
