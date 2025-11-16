import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '../Button';

interface ActionPanelProps {
  onFold: () => void;
  onCheck: () => void;
  onPlay: () => void;
  onShowCards: () => void;
}

export default function ActionPanel({
  onFold,
  onCheck,
  onPlay,
  onShowCards,
}: ActionPanelProps) {
  const [confidence, setConfidence] = useState(50);

  const reactions = [
    { label: '😊 Happy', emoji: '😊' },
    { label: '😎 Cool', emoji: '😎' },
    { label: '🤔 Thinking', emoji: '🤔' },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 cartoon-panel-gold p-3 z-20"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="flex justify-between text-xs text-neon-text font-bold mb-1">
                <span>😟 Nervous</span>
                <span>Confidence</span>
                <span>😎 Confident</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full h-2 bg-white border-3 border-neon-text rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-neon-gradient
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-chunky-3d
                  [&::-webkit-slider-thumb]:border-3
                  [&::-webkit-slider-thumb]:border-neon-text
                  [&::-moz-range-thumb]:w-5
                  [&::-moz-range-thumb]:h-5
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-neon-gradient
                  [&::-moz-range-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:border-3
                  [&::-moz-range-thumb]:border-neon-text
                "
              />
              <div className="text-center mt-1">
                <span className="text-lg font-display font-black text-neon-text">
                  {confidence}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 justify-center">
            {reactions.map((reaction) => (
              <motion.button
                key={reaction.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 rounded-chunky bg-white border-3 border-neon-text shadow-chunky-3d hover:shadow-chunky-orange text-xs font-black transition-all"
              >
                {reaction.emoji}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="secondary" onClick={onFold} size="sm">
              Pass
            </Button>
            <Button variant="ghost" onClick={onCheck} size="sm">
              Ready!
            </Button>
            <Button variant="primary" onClick={onPlay} size="sm">
              Play
            </Button>
            <Button onClick={onShowCards} size="sm">
              Show
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
