import { motion } from 'framer-motion';

interface ActionPanelProps {
  onFold: () => void;
  onCheck: () => void;
  onDeal: () => void;
  communityCardsCount: number;
}

export default function ActionPanel({
  onFold,
  onCheck,
  onDeal,
  communityCardsCount,
}: ActionPanelProps) {

  const getDealButtonText = () => {
    if (communityCardsCount === 0) return '🎴 Deal Flop';
    if (communityCardsCount === 3) return '🎴 Deal Turn';
    if (communityCardsCount === 4) return '🎴 Deal River';
    return '🎴 Deal';
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-20"
    >
      <div 
        className="bg-gradient-to-r from-amber-900/95 via-amber-800/95 to-amber-900/95 backdrop-blur-xl border-t-4 p-4 sm:p-5"
        style={{
          borderTop: '4px solid #92400e',
          boxShadow: '0 -10px 40px rgba(120, 53, 15, 0.5)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onFold}
              className="px-6 py-4 rounded-2xl bg-gradient-to-br from-red-700 to-red-900 text-white font-bold text-base sm:text-lg border-3 border-red-950 shadow-lg hover:shadow-xl transition-all"
              style={{
                boxShadow: '0 6px 16px rgba(127, 29, 29, 0.6)'
              }}
            >
              ❌ Fold
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCheck}
              className="px-6 py-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-base sm:text-lg border-3 border-blue-950 shadow-lg hover:shadow-xl transition-all"
              style={{
                boxShadow: '0 6px 16px rgba(30, 64, 175, 0.6)'
              }}
            >
              ✅ Check
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDeal}
              className="px-6 py-4 rounded-2xl bg-gradient-to-br from-green-600 to-green-800 text-white font-bold text-base sm:text-lg border-3 border-green-950 shadow-lg hover:shadow-xl transition-all"
              style={{
                boxShadow: '0 6px 16px rgba(22, 101, 52, 0.6)'
              }}
            >
              {getDealButtonText()}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
