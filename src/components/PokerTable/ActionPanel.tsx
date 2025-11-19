import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '../Button';
import { soundEffects } from '../../utils/soundEffects';

interface ActionPanelProps {
  onFold: () => void;
  onCheck: () => void;
  onCall: () => void;
  onRaise: (amount: number) => void;
  currentBet: number;
  pot: number;
}

export default function ActionPanel({
  onFold,
  onCheck,
  onCall,
  onRaise,
  currentBet,
  pot,
}: ActionPanelProps) {
  const [raiseAmount, setRaiseAmount] = useState(currentBet * 2);

  const quickBets = [
    { label: 'Min', value: currentBet },
    { label: '2x', value: currentBet * 2 },
    { label: '3x', value: currentBet * 3 },
    { label: 'Pot', value: pot },
  ];

  const handleRaiseClick = () => {
    soundEffects.playChip();
    onRaise(raiseAmount);
  };

  const handleQuickBet = (amount: number) => {
    setRaiseAmount(amount);
    soundEffects.playClick();
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-20"
    >
      <div 
        className="bg-gradient-to-r from-amber-900/95 via-amber-800/95 to-amber-900/95 backdrop-blur-xl border-t-4 p-3 sm:p-4"
        style={{
          borderTop: '4px solid #92400e',
          boxShadow: '0 -10px 40px rgba(120, 53, 15, 0.5)'
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-3">
            {/* Betting Info */}
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <div className="bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-700">
                <span className="text-amber-200">Current Bet: </span>
                <span className="text-yellow-400 font-bold">{currentBet.toLocaleString()} K</span>
              </div>
              <div className="bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-700">
                <span className="text-amber-200">Pot: </span>
                <span className="text-yellow-400 font-bold">{pot.toLocaleString()} K</span>
              </div>
            </div>

            {/* Raise Amount Input */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex gap-1 mb-2">
                  {quickBets.map((bet) => (
                    <motion.button
                      key={bet.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickBet(bet.value)}
                      className="flex-1 px-2 py-1 text-xs rounded-lg bg-amber-700/60 hover:bg-amber-600/80 text-amber-100 border border-amber-600 transition-all"
                    >
                      {bet.label}
                    </motion.button>
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="range"
                    min={currentBet}
                    max={pot * 2}
                    step={100}
                    value={raiseAmount}
                    onChange={(e) => setRaiseAmount(Number(e.target.value))}
                    className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: 'linear-gradient(90deg, #78350f 0%, #d97706 50%, #fbbf24 100%)'
                    }}
                  />
                  <div className="bg-amber-950/80 px-3 py-1 rounded-lg border-2 border-yellow-600 min-w-[100px] text-center">
                    <span className="text-yellow-400 font-bold text-sm">{raiseAmount.toLocaleString()}K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onFold}
                className="px-4 py-3 rounded-xl bg-gradient-to-br from-red-700 to-red-900 text-white font-bold border-2 border-red-950 shadow-lg hover:shadow-xl transition-all"
                style={{
                  boxShadow: '0 4px 12px rgba(127, 29, 29, 0.5)'
                }}
              >
                ❌ Fold
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCheck}
                className="px-4 py-3 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 text-white font-bold border-2 border-gray-900 shadow-lg hover:shadow-xl transition-all"
                style={{
                  boxShadow: '0 4px 12px rgba(31, 41, 55, 0.5)'
                }}
              >
                ✅ Check
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCall}
                className="px-4 py-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold border-2 border-blue-950 shadow-lg hover:shadow-xl transition-all"
                style={{
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.5)'
                }}
              >
                📞 Call {currentBet}K
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRaiseClick}
                className="px-4 py-3 rounded-xl bg-gradient-to-br from-green-600 to-green-800 text-white font-bold border-2 border-green-950 shadow-lg hover:shadow-xl transition-all"
                style={{
                  boxShadow: '0 4px 12px rgba(22, 101, 52, 0.5)'
                }}
              >
                🚀 Raise
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          cursor: pointer;
          border: 3px solid #78350f;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          cursor: pointer;
          border: 3px solid #78350f;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </motion.div>
  );
}
