import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageCircle, Volume2, VolumeX, Settings, LogOut, Users } from 'lucide-react';
import PlayerSeat from '../components/PokerTable/PlayerSeat';
import PlayingCard from '../components/PokerTable/PlayingCard';
import ActionPanel from '../components/PokerTable/ActionPanel';
import ChatPanel from '../components/PokerTable/ChatPanel';
import Button from '../components/Button';
import { mockPlayers } from '../data/mockData';
import { useStore } from '../store/useStore';
import { soundEffects } from '../utils/soundEffects';
import backgroundImg from '../images/background.jpg';

export default function PokerTable() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { soundEnabled, toggleSound } = useStore();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [roundNumber, setRoundNumber] = useState(1);
  const [communityCards, setCommunityCards] = useState<string[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gamePhase, setGamePhase] = useState<'waiting' | 'dealing' | 'playing' | 'showdown'>('waiting');
  const [players, setPlayers] = useState(mockPlayers.map(p => ({
    ...p,
    cards: ['As', 'Kh'] // Each player gets 2 cards
  })));

  // Sync sound effects with global sound setting
  useEffect(() => {
    soundEffects.setEnabled(soundEnabled);
  }, [soundEnabled]);

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

  const handleAction = (action: string) => {
    soundEffects.playClick();
    
    if (action === 'fold') {
      soundEffects.playError();
      setPlayers(prev => prev.map((p, idx) => 
        idx === currentPlayerIndex ? { ...p, status: 'passed' as const } : p
      ));
      nextPlayer();
    } else if (action === 'check') {
      soundEffects.playClick();
      nextPlayer();
    } else if (action === 'deal') {
      soundEffects.playCard();
      if (gamePhase === 'waiting') {
        dealFlop();
      } else if (communityCards.length === 3) {
        dealTurn();
      } else if (communityCards.length === 4) {
        dealRiver();
      }
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
    soundEffects.playTurn();
  };

  const startNewRound = () => {
    soundEffects.playWin();
    setCommunityCards([]);
    setRoundNumber(prev => prev + 1);
    setGamePhase('waiting');
    setCurrentPlayerIndex(0);
    // Reset all players to active with new cards
    setPlayers(mockPlayers.map(p => ({ 
      ...p, 
      status: 'active' as const,
      cards: ['As', 'Kh'] // New hand
    })));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Beach Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-amber-100" />
      
      {/* Beach Sand Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a373' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='50' r='1.5'/%3E%3Ccircle cx='50' cy='10' r='1.5'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      
      <div className="relative z-10">
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

      <div className="flex items-center justify-center min-h-screen px-2 sm:px-4 py-20 sm:py-24">
        <div className="relative w-full max-w-6xl" style={{ aspectRatio: '16/9' }}>
          {/* Wooden Table with Thick 3D Borders */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
            style={{
              borderRadius: '45%',
            }}
          >
            {/* Outer wooden border - thick wall */}
            <div 
              className="absolute inset-0"
              style={{
                borderRadius: '45%',
                background: 'linear-gradient(145deg, #8B4513 0%, #D2691E 20%, #CD853F 40%, #D2691E 60%, #8B4513 100%)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5), inset 0 -8px 20px rgba(0, 0, 0, 0.4), inset 0 8px 20px rgba(222, 184, 135, 0.4)',
              }}
            >
              {/* Wood grain texture */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  borderRadius: '45%',
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 69, 19, 0.3) 2px, rgba(139, 69, 19, 0.3) 4px)',
                }}
              />
            </div>

            {/* Middle border - decorative ring */}
            <div 
              className="absolute"
              style={{
                top: '5%',
                left: '5%',
                right: '5%',
                bottom: '5%',
                borderRadius: '45%',
                background: 'linear-gradient(145deg, #DAA520 0%, #FFD700 50%, #DAA520 100%)',
                boxShadow: 'inset 0 -4px 8px rgba(0, 0, 0, 0.3), inset 0 4px 8px rgba(255, 255, 255, 0.3)',
              }}
            />

            {/* Inner wooden border */}
            <div 
              className="absolute"
              style={{
                top: '7%',
                left: '7%',
                right: '7%',
                bottom: '7%',
                borderRadius: '45%',
                background: 'linear-gradient(145deg, #A0522D 0%, #D2691E 50%, #A0522D 100%)',
                boxShadow: 'inset 0 -6px 12px rgba(0, 0, 0, 0.4), inset 0 6px 12px rgba(222, 184, 135, 0.4)',
              }}
            />

            {/* Felt playing surface - brown/red wooden felt */}
            <div 
              className="absolute"
              style={{
                top: '12%',
                left: '12%',
                right: '12%',
                bottom: '12%',
                borderRadius: '45%',
                background: 'radial-gradient(ellipse at center, #8B4513 0%, #A0522D 40%, #8B4513 100%)',
                boxShadow: 'inset 0 -15px 30px rgba(0, 0, 0, 0.5), inset 0 15px 30px rgba(0, 0, 0, 0.3), inset 0 0 100px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Subtle wood grain on felt */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  borderRadius: '45%',
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 0, 0, 0.1) 3px, rgba(0, 0, 0, 0.1) 6px)',
                }}
              />
              
              {/* Decorative inner border line */}
              <div 
                className="absolute"
                style={{
                  top: '3%',
                  left: '3%',
                  right: '3%',
                  bottom: '3%',
                  borderRadius: '45%',
                  border: '2px dashed rgba(218, 165, 32, 0.3)',
                }}
              />
            </div>
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

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
            {/* Table Info */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="mb-4 sm:mb-6"
            >
              <div 
                className="bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-2xl border-3 border-yellow-800 inline-block"
                style={{
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 -3px 8px rgba(0, 0, 0, 0.3), inset 0 2px 8px rgba(255, 215, 0, 0.3)'
                }}
              >
                <p className="text-sm sm:text-base font-bold text-amber-100">Texas Hold'em</p>
                <p className="text-xs text-amber-200">Round #{roundNumber}</p>
              </div>
            </motion.div>

            {/* Community Cards */}
            <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
              {communityCards.length === 0 ? (
                <div className="text-center">
                  <motion.p 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-amber-900 font-bold text-sm sm:text-base bg-amber-200/80 px-4 py-2 rounded-full shadow-lg border-2 border-amber-800"
                  >
                    👇 Press Play to Start!
                  </motion.p>
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
        onFold={() => handleAction('fold')}
        onCheck={() => handleAction('check')}
        onDeal={() => handleAction('deal')}
        communityCardsCount={communityCards.length}
      />

      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
}
