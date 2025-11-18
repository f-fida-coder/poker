import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Trophy, Crown, Plus, Search } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { mockRooms, mockClubs, mockTournaments } from '../data/mockData';
import { useStore } from '../store/useStore';
import logo from '../images/logo.jpeg';
import backgroundImg from '../images/background.JPG';

export default function Lobby() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<'rooms' | 'clubs' | 'tournaments'>('rooms');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'rooms', label: 'Rooms', icon: Users },
    { id: 'clubs', label: 'Clubs', icon: Crown },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Transparency */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          opacity: 0.6,
        }}
      />
      
      {/* White overlay for better readability */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Neuro Poker" className="h-20 w-auto rounded-2xl shadow-chunky-3d" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-black neon-text mb-2">
              Game Lobby
            </h1>
            <p className="text-gray-700 font-medium">
              Welcome back, <span className="text-tropical-parrotBlue font-bold">{user?.username || 'Player'}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-700 font-bold">Fun Points</p>
              <p className="text-2xl font-display font-bold text-tropical-gold">
                ⭐ {user?.balance || 0}
              </p>
            </div>
            <Button onClick={() => navigate('/profile')} variant="secondary">
              Profile
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-2 cartoon-panel-gold p-2 w-full md:w-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center justify-center gap-2 px-6 py-3 rounded-chunky font-display font-black
                  transition-all duration-300 border-4 border-neon-text w-full sm:w-auto
                  ${
                    activeTab === tab.id
                      ? 'bg-white text-neon-text shadow-chunky-3d'
                      : 'bg-tropical-orange text-white hover:bg-tropical-softOrange'
                  }
                `}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            ))}
          </div>

          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>
            <Button onClick={() => navigate('/create-room')}>
              <Plus className="w-5 h-5 mr-2" />
              Create
            </Button>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'rooms' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRooms.map((room) => (
                <Card key={room.id}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-display font-bold mb-1 text-neon-text">{room.name}</h3>
                      <p className="text-sm text-gray-600 font-medium">Host: {room.host}</p>
                    </div>
                    {room.isPrivate && (
                      <span className="px-3 py-1 bg-tropical-gold/30 text-neon-text text-xs font-bold rounded-full border-2 border-neon-text">
                        Private
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-bold">Players</span>
                      <span className="text-neon-text font-bold">
                        {room.players}/{room.maxPlayers}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-bold">Mode</span>
                      <span className="text-tropical-parrotBlue font-bold">{room.blinds}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-bold">Entry</span>
                      <span className="text-tropical-parrotRed font-bold">{room.buyIn}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate(`/table/${room.id}`)}
                    className="w-full"
                    disabled={room.players >= room.maxPlayers}
                  >
                    {room.players >= room.maxPlayers ? 'Full' : 'Join Table'}
                  </Button>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'clubs' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockClubs.map((club) => (
                <Card key={club.id}>
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 mx-auto mb-4 text-5xl rounded-full bg-tropical-gold/20 border-4 border-neon-text flex items-center justify-center">
                      {club.logo}
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2 text-neon-text">{club.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{club.description}</p>
                    <div className="flex items-center justify-center gap-2 text-tropical-parrotBlue">
                      <Users className="w-4 h-4" />
                      <span className="font-bold">{club.members} members</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate(`/club/${club.id}`)}
                    className="w-full"
                    variant={club.isPrivate ? 'secondary' : 'primary'}
                  >
                    {club.isPrivate ? 'Request to Join' : 'Join Club'}
                  </Button>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'tournaments' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTournaments.map((tournament) => (
                <Card key={tournament.id}>
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-display font-bold text-neon-text">{tournament.name}</h3>
                      <Trophy className="w-6 h-6 text-tropical-gold" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      {new Date(tournament.startTime).toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-bold">Entry</span>
                      <span className="text-tropical-parrotRed font-bold">{tournament.buyIn}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-bold">Reward</span>
                      <span className="text-tropical-parrotBlue font-bold">{tournament.prizePool}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-bold">Players</span>
                      <span className="text-neon-text font-bold">
                        {tournament.registered}/{tournament.maxPlayers}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate(`/tournament/${tournament.id}`)}
                    className="w-full"
                    disabled={tournament.registered >= tournament.maxPlayers}
                  >
                    {tournament.registered >= tournament.maxPlayers ? 'Full' : 'Register'}
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
