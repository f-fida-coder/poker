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
        className="w-16 h-24 rounded-lg bg-neon-gradient flex items-center justify-center shadow-lg"
      >
        <div className="w-14 h-22 rounded-md bg-neon-dark/50 backdrop-blur border-2 border-neon-purple/30" />
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
      transition={{ delay, duration: 0.5 }}
      className="w-16 h-24 rounded-lg bg-white flex flex-col items-center justify-between p-2 shadow-lg border-2 border-gray-200"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`text-xl font-bold ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
        {rank}
      </div>
      <div className={`text-3xl ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
        {suitSymbol}
      </div>
      <div className={`text-xl font-bold ${isRed ? 'text-red-600' : 'text-gray-900'} rotate-180`}>
        {rank}
      </div>
    </motion.div>
  );
}
