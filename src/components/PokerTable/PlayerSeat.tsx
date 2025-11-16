import { motion } from 'framer-motion';

interface PlayerSeatProps {
  player: {
    username: string;
    avatar: string;
    score: number;
    status: 'active' | 'waiting' | 'passed' | 'sitting-out' | 'winner';
    isDealer?: boolean;
  } | null;
  isActive?: boolean;
}

export default function PlayerSeat({ player, isActive }: PlayerSeatProps) {
  if (!player) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-24 h-24 rounded-full border-4 border-dashed border-neon-text/30 bg-white/50 flex items-center justify-center cursor-pointer hover:border-tropical-gold transition-all"
      >
        <span className="text-gray-600 text-xs font-bold">Empty</span>
      </motion.div>
    );
  }

  const statusColors = {
    active: 'border-tropical-parrotBlue shadow-chunky-3d',
    waiting: 'border-tropical-gold/50',
    passed: 'border-gray-600 opacity-50',
    'sitting-out': 'border-gray-700 opacity-40',
    winner: 'border-tropical-parrotRed shadow-chunky-orange animate-pulse-glow',
  };

  return (
    <div className="relative">
      {player.isDealer && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          className="absolute -top-3 -right-3 w-8 h-8 bg-neon-gradient rounded-full flex items-center justify-center text-xs font-bold z-10 shadow-neon-glow"
        >
          D
        </motion.div>
      )}

      <motion.div
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
        className={`
          relative w-24 h-24 rounded-full
          border-6 ${statusColors[player.status]}
          bg-white
          flex flex-col items-center justify-center
          transition-all duration-300
        `}
      >
        <div className="text-3xl mb-1">{player.avatar}</div>
      </motion.div>

      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center w-32">
        <p className="text-sm font-bold text-neon-text truncate">{player.username}</p>
        <p className="text-xs text-tropical-gold font-black">⭐ {player.score} pts</p>
      </div>
    </div>
  );
}
