import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Trophy, Users, DollarSign, Clock, ArrowLeft, Award } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { mockTournaments } from '../data/mockData';

export default function Tournament() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tournament = mockTournaments.find((t) => t.id === id) || mockTournaments[0];

  const blindStructure = [
    { level: 1, smallBlind: 25, bigBlind: 50, ante: 0, duration: '15:00' },
    { level: 2, smallBlind: 50, bigBlind: 100, ante: 0, duration: '15:00' },
    { level: 3, smallBlind: 75, bigBlind: 150, ante: 25, duration: '15:00' },
    { level: 4, smallBlind: 100, bigBlind: 200, ante: 25, duration: '15:00' },
    { level: 5, smallBlind: 150, bigBlind: 300, ante: 50, duration: '15:00' },
  ];

  const prizeDistribution = [
    { place: '1st', percentage: 40, amount: (tournament.prizePool * 0.4).toLocaleString() },
    { place: '2nd', percentage: 25, amount: (tournament.prizePool * 0.25).toLocaleString() },
    { place: '3rd', percentage: 15, amount: (tournament.prizePool * 0.15).toLocaleString() },
    { place: '4th-5th', percentage: 10, amount: (tournament.prizePool * 0.1).toLocaleString() },
    { place: '6th-10th', percentage: 10, amount: (tournament.prizePool * 0.1).toLocaleString() },
  ];

  const registeredPlayers = [
    { id: '1', username: 'NeonKing', avatar: '👑' },
    { id: '2', username: 'PokerPro', avatar: '🎯' },
    { id: '3', username: 'ChipMaster', avatar: '💎' },
    { id: '4', username: 'BluffKing', avatar: '🃏' },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate('/lobby')} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lobby
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card hover={false} glow>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-neon-gradient flex items-center justify-center">
                  <Trophy className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-4xl font-display font-black mb-2">{tournament.name}</h1>
                  <p className="text-gray-400">
                    Starts {new Date(tournament.startTime).toLocaleString()}
                  </p>
                </div>
              </div>
              <Button size="lg" className="text-xl px-8 py-6">
                Register Now
              </Button>
            </div>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: DollarSign,
              label: 'Buy-in',
              value: tournament.buyIn.toLocaleString(),
              color: 'neon-pink',
            },
            {
              icon: Trophy,
              label: 'Prize Pool',
              value: tournament.prizePool.toLocaleString(),
              color: 'neon-purple',
            },
            {
              icon: Users,
              label: 'Players',
              value: `${tournament.registered}/${tournament.maxPlayers}`,
              color: 'neon-teal',
            },
            {
              icon: Clock,
              label: 'Status',
              value: tournament.status,
              color: 'neon-blue',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className={`w-12 h-12 rounded-2xl bg-${stat.color}/20 flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} strokeWidth={2.5} />
                </div>
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-display font-bold">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-neon-purple" />
              Blind Structure
            </h2>
            <Card hover={false}>
              <div className="space-y-3">
                {blindStructure.map((level, index) => (
                  <motion.div
                    key={level.level}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`
                      flex items-center justify-between p-4 rounded-2xl
                      ${index === 0 ? 'bg-neon-purple/20 border-2 border-neon-purple' : 'bg-neon-dark/50'}
                    `}
                  >
                    <div>
                      <p className="font-display font-bold">Level {level.level}</p>
                      <p className="text-sm text-gray-400">{level.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-neon-teal">
                        {level.smallBlind}/{level.bigBlind}
                      </p>
                      {level.ante > 0 && (
                        <p className="text-xs text-gray-400">Ante: {level.ante}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-neon-teal" />
                Prize Distribution
              </h2>
              <Card hover={false}>
                <div className="space-y-3">
                  {prizeDistribution.map((prize, index) => (
                    <motion.div
                      key={prize.place}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-neon-dark/50 rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neon-gradient flex items-center justify-center font-display font-bold text-sm">
                          {prize.place}
                        </div>
                        <span className="text-gray-400">{prize.percentage}%</span>
                      </div>
                      <p className="text-xl font-display font-bold text-neon-pink">
                        {prize.amount}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-neon-blue" />
                Registered Players ({registeredPlayers.length})
              </h2>
              <Card hover={false}>
                <div className="grid grid-cols-2 gap-3">
                  {registeredPlayers.map((player, index) => (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-neon-dark/50 rounded-xl"
                    >
                      <div className="text-2xl">{player.avatar}</div>
                      <p className="text-sm font-semibold truncate">{player.username}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
