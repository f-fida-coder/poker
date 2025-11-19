import { motion } from 'framer-motion';
import PlayingCard from './PlayingCard';

interface PlayerSeatProps {
  player: {
    username: string;
    avatar: string;
    score: number;
    status: 'active' | 'waiting' | 'passed' | 'sitting-out' | 'winner';
    isDealer?: boolean;
    cards?: string[];
  } | null;
  isActive?: boolean;
}

export default function PlayerSeat({ player, isActive }: PlayerSeatProps) {
  if (!player) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 border-dashed border-amber-800/30 bg-gradient-to-br from-amber-900/30 to-amber-800/30 flex items-center justify-center cursor-pointer hover:border-amber-600 transition-all backdrop-blur-sm"
        style={{
          boxShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.3)'
        }}
      >
        <span className="text-amber-700/60 text-xs font-bold">Seat</span>
      </motion.div>
    );
  }

  const statusColors = {
    active: 'border-yellow-500 shadow-lg shadow-yellow-500/50',
    waiting: 'border-amber-400/50',
    passed: 'border-gray-600 opacity-50',
    'sitting-out': 'border-gray-700 opacity-40',
    winner: 'border-green-400 shadow-lg shadow-green-500/50 animate-pulse-glow',
  };

  return (
    <div className="relative">
      {/* Dealer Button */}
      {player.isDealer && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 border-3 border-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.6)'
          }}
        >
          D
        </motion.div>
      )}

      {/* Player Cards (above avatar) - Professional visible cards */}
      <div className="absolute -top-10 sm:-top-14 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-1.5 z-5">
        {player.cards && player.cards.map((card, idx) => (
          <div key={idx} className="transform" style={{ marginLeft: idx > 0 ? '-8px' : '0' }}>
            <PlayingCard card={card} delay={idx * 0.1} />
          </div>
        ))}
      </div>

      {/* Player Avatar */}
      <motion.div
        animate={isActive ? { 
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 20px rgba(234, 179, 8, 0.5)',
            '0 0 40px rgba(234, 179, 8, 0.9)',
            '0 0 20px rgba(234, 179, 8, 0.5)'
          ]
        } : {}}
        transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
        className={`
          relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full
          border-4 sm:border-6 ${statusColors[player.status]}
          bg-gradient-to-br from-white via-amber-50 to-yellow-50
          flex flex-col items-center justify-center
          transition-all duration-300
        `}
        style={{
          boxShadow: isActive 
            ? '0 0 30px rgba(234, 179, 8, 0.7), inset 0 2px 8px rgba(255, 255, 255, 0.5)' 
            : '0 8px 20px rgba(0, 0, 0, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.5)'
        }}
      >
        <div className="text-2xl sm:text-3xl mb-0.5 sm:mb-1">{player.avatar}</div>
      </motion.div>

      {/* Player Info Card */}
      <div className="absolute -bottom-10 sm:-bottom-14 left-1/2 transform -translate-x-1/2 text-center w-28 sm:w-36">
        <div 
          className="bg-gradient-to-br from-amber-900/95 to-amber-800/95 px-2 py-1.5 rounded-xl backdrop-blur-sm border-2 shadow-lg"
          style={{
            borderColor: '#92400e',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
          }}
        >
          <p className="text-xs sm:text-sm font-bold text-amber-50 truncate">{player.username}</p>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            {/* Chip Stack Icon */}
            <div className="flex gap-0.5">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-red-700 border border-white/30" />
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border border-white/30 -ml-1.5" />
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-green-700 border border-white/30 -ml-1.5" />
            </div>
            <p className="text-xs text-yellow-300 font-black">{player.score.toLocaleString()}K</p>
          </div>
        </div>
      </div>
    </div>
  );
}
