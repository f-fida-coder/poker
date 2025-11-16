import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageCircle, Volume2, VolumeX, Settings, LogOut, Users } from 'lucide-react';
import PlayerSeat from '../components/PokerTable/PlayerSeat';
import PlayingCard from '../components/PokerTable/PlayingCard';
import ActionPanel from '../components/PokerTable/ActionPanel';
import ChatPanel from '../components/PokerTable/ChatPanel';
import Button from '../components/Button';
import { mockPlayers } from '../data/mockData';
import { useStore } from '../store/useStore';

export default function PokerTable() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { soundEnabled, toggleSound } = useStore();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [roundNumber, setRoundNumber] = useState(1);
  const [communityCards, setCommunityCards] = useState<string[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gamePhase, setGamePhase] = useState<'waiting' | 'dealing' | 'playing' | 'showdown'>('waiting');
  const [players, setPlayers] = useState(mockPlayers);

  const seatPositions = [
    { top: '50%', left: '10%', transform: 'translate(-50%, -50%)' },
    { top: '20%', left: '20%' },
    { top: '5%', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '20%', right: '20%' },
    { top: '50%', right: '10%', transform: 'translate(50%, -50%)' },
    { top: '70%', right: '20%' },
    { top: '85%', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '70%', left: '20%' },
  ];

  const handleAction = (action: string, amount?: number) => {
    console.log(`Action: ${action}`, amount);
    
    if (action === 'pass') {
      // Update player status to passed
      setPlayers(prev => prev.map((p, idx) => 
        idx === currentPlayerIndex ? { ...p, status: 'passed' as const } : p
      ));
    } else if (action === 'ready') {
      // Player is ready, move to next player
      nextPlayer();
    } else if (action === 'play') {
      // Play action - deal community cards based on phase
      if (gamePhase === 'waiting') {
        // Deal flop (first 3 cards)
        dealFlop();
      } else if (communityCards.length === 3) {
        // Deal turn (4th card)
        dealTurn();
      } else if (communityCards.length === 4) {
        // Deal river (5th card)
        dealRiver();
      }
      nextPlayer();
    } else if (action === 'show') {
      // Show all cards - go to showdown
      setGamePhase('showdown');
    }
  };

  const dealFlop = () => {
    setCommunityCards(['As', 'Kh', 'Qd']);
    setGamePhase('playing');
  };

  const dealTurn = () => {
    setCommunityCards(prev => [...prev, 'Jc']);
  };

  const dealRiver = () => {
    setCommunityCards(prev => [...prev, '10s']);
  };

  const nextPlayer = () => {
    const activePlayers = players.filter(p => p.status === 'active');
    if (activePlayers.length === 0) return;
    
    let nextIndex = (currentPlayerIndex + 1) % players.length;
    // Skip passed players
    while (players[nextIndex]?.status === 'passed' && nextIndex !== currentPlayerIndex) {
      nextIndex = (nextIndex + 1) % players.length;
    }
    setCurrentPlayerIndex(nextIndex);
  };

  const startNewRound = () => {
    setCommunityCards([]);
    setRoundNumber(prev => prev + 1);
    setGamePhase('waiting');
    setCurrentPlayerIndex(0);
    // Reset all players to active
    setPlayers(mockPlayers.map(p => ({ ...p, status: 'active' as const })));
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate('/lobby')} size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Leave
          </Button>
          <Button variant="ghost" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Players ({players.filter(p => p.status !== 'sitting-out').length}/{seatPositions.length})
          </Button>
          <Button variant="primary" onClick={startNewRound} size="sm">
            🔄 New Round
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={toggleSound} size="sm">
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" onClick={() => setIsChatOpen(!isChatOpen)} size="sm">
            <MessageCircle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 py-24">
        <div className="relative w-full max-w-6xl aspect-[16/10]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-[50%] bg-gradient-to-br from-green-600 via-green-500 to-green-600 border-8 border-neon-text shadow-chunky-3d"
          >
            <div className="absolute inset-8 rounded-[50%] border-6 border-tropical-gold/30" />
          </motion.div>

          {seatPositions.map((position, index) => {
            const player = players.find((p) => p.seat === index);
            return (
              <div
                key={index}
                className="absolute"
                style={{
                  top: position.top,
                  left: position.left,
                  right: position.right,
                  transform: position.transform,
                }}
              >
                <PlayerSeat 
                  player={player || null} 
                  isActive={index === currentPlayerIndex && gamePhase === 'playing'} 
                />
              </div>
            );
          })}

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="mb-6"
            >
              <div className="cartoon-panel-gold px-8 py-4">
                <p className="text-sm text-neon-text font-bold mb-1">
                  {gamePhase === 'waiting' ? '⏳ Waiting' : 
                   gamePhase === 'dealing' ? '🎴 Dealing' : 
                   gamePhase === 'playing' ? '🎮 Playing' : 
                   '🏆 Showdown'}
                </p>
                <p className="text-4xl font-display font-black text-neon-text">
                  Round #{roundNumber}
                </p>
              </div>
            </motion.div>

            <div className="flex gap-3 justify-center">
              {communityCards.length === 0 ? (
                <div className="text-center">
                  <p className="text-neon-text font-bold text-sm">👇 Press Play to Start!</p>
                </div>
              ) : (
                communityCards.map((card, index) => (
                  <PlayingCard key={index} card={card} delay={index * 0.1} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <ActionPanel
        onFold={() => handleAction('pass')}
        onCheck={() => handleAction('ready')}
        onPlay={() => handleAction('play')}
        onShowCards={() => handleAction('show')}
      />

      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
