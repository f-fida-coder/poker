import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Users, Calendar, TrendingUp, Crown, ArrowLeft, Settings } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { mockClubs } from '../data/mockData';

export default function ClubDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const club = mockClubs.find((c) => c.id === id) || mockClubs[0];

  const members = [
    { id: '1', username: 'NeonKing', avatar: '👑', level: 25, points: 15420 },
    { id: '2', username: 'PokerPro', avatar: '🎯', level: 22, points: 12350 },
    { id: '3', username: 'ChipMaster', avatar: '💎', level: 20, points: 11200 },
    { id: '4', username: 'BluffKing', avatar: '🃏', level: 18, points: 9800 },
  ];

  const upcomingEvents = [
    { id: '1', name: 'Friday Night Championship', date: '2025-11-17T20:00:00', players: 45 },
    { id: '2', name: 'Weekend Warrior', date: '2025-11-18T18:00:00', players: 32 },
    { id: '3', name: 'Monthly Finals', date: '2025-11-20T21:00:00', players: 89 },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate('/lobby')} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lobby
          </Button>
          <Button variant="secondary" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Club Settings
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card hover={false} glow>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 text-6xl rounded-full bg-neon-purple/20 flex items-center justify-center">
                {club.logo}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-display font-black mb-2">{club.name}</h1>
                <p className="text-gray-400 mb-4">{club.description}</p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-neon-teal">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">{club.members} Members</span>
                  </div>
                  {club.isPrivate && (
                    <span className="px-4 py-1 bg-neon-purple/20 text-neon-purple text-sm font-semibold rounded-full">
                      Private Club
                    </span>
                  )}
                </div>
              </div>

              <Button size="lg">Invite Members</Button>
            </div>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Users, label: 'Active Members', value: '45', color: 'neon-purple' },
            { icon: Calendar, label: 'Events This Month', value: '12', color: 'neon-teal' },
            { icon: TrendingUp, label: 'Total Games Played', value: '1,234', color: 'neon-pink' },
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
                <p className="text-3xl font-display font-bold">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <Crown className="w-6 h-6 text-neon-purple" />
              Leaderboard
            </h2>
            <Card hover={false}>
              <div className="space-y-4">
                {members.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-neon-dark/50 rounded-2xl hover:bg-neon-dark transition-all"
                  >
                    <div className="text-2xl font-display font-bold text-neon-purple w-8">
                      #{index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-neon-gradient flex items-center justify-center text-2xl">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{member.username}</p>
                      <p className="text-sm text-gray-400">Level {member.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-display font-bold text-neon-teal">
                        {member.points.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">points</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-neon-teal" />
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-display font-bold mb-1">{event.name}</h3>
                        <p className="text-sm text-gray-400">
                          {new Date(event.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neon-teal">
                        {event.players} players registered
                      </span>
                      <Button size="sm">Join</Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
