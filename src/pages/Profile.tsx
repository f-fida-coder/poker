import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Trophy, Target, Zap, Edit, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useStore } from '../store/useStore';
import { mockStats, mockAchievements } from '../data/mockData';
import logo from '../images/logo.jpeg';

export default function Profile() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  const statCards = [
    { icon: Target, label: 'Hands Played', value: mockStats.handsPlayed, color: 'neon-purple' },
    { icon: Trophy, label: 'Hands Won', value: mockStats.handsWon, color: 'neon-teal' },
    { icon: TrendingUp, label: 'Win Rate', value: `${mockStats.winRate}%`, color: 'neon-pink' },
    { icon: Zap, label: 'Biggest Win', value: mockStats.biggestWin.toLocaleString(), color: 'neon-blue' },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate('/lobby')} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lobby
          </Button>
          <img src={logo} alt="Neuro Poker" className="h-16 w-auto rounded-2xl shadow-chunky-3d" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card hover={false} glow>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-32 h-32 rounded-full bg-neon-gradient flex items-center justify-center text-6xl shadow-neon-glow"
              >
                {user?.avatar}
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                  <h1 className="text-4xl font-display font-black text-neon-text">{user?.username}</h1>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                  <span className="text-tropical-parrotBlue text-lg font-bold">Level {user?.level}</span>
                  <div className="w-48 h-3 bg-gray-300 rounded-full overflow-hidden border-2 border-neon-text">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-neon-gradient"
                    />
                  </div>
                  <span className="text-sm text-gray-600 font-bold">65%</span>
                </div>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div>
                    <p className="text-sm text-gray-600 font-bold">Fun Points</p>
                    <p className="text-2xl font-display font-bold text-tropical-gold">
                      ⭐ {user?.balance || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-bold">Total Points</p>
                    <p className="text-2xl font-display font-bold text-tropical-parrotBlue">
                      {mockStats.totalEarnings}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-bold">Tournaments Won</p>
                    <p className="text-2xl font-display font-bold text-tropical-parrotRed">
                      {mockStats.tournamentsWon}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="w-12 h-12 rounded-2xl bg-tropical-gold/20 flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-tropical-parrotRed" strokeWidth={2.5} />
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-display font-bold text-neon-text">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-display font-bold mb-6">Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card hover={achievement.unlocked}>
                  <div className={`${!achievement.unlocked ? 'opacity-40 grayscale' : ''}`}>
                    <div className="text-5xl mb-4 text-center">{achievement.icon}</div>
                    <h3 className="text-xl font-display font-bold mb-2 text-center text-neon-text">
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">{achievement.description}</p>
                    {achievement.unlocked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-4 text-center"
                      >
                        <span className="px-4 py-2 bg-neon-gradient rounded-full text-sm font-bold shadow-neon-glow inline-block">
                          Unlocked
                        </span>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
