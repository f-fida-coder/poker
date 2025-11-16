import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, Bell, BellOff, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useStore } from '../store/useStore';

export default function Settings() {
  const navigate = useNavigate();
  const { soundEnabled, toggleSound } = useStore();

  const cardStyles = [
    { id: 'classic', name: 'Classic', preview: '🃏' },
    { id: 'modern', name: 'Modern', preview: '🎴' },
    { id: 'minimal', name: 'Minimal', preview: '🔲' },
  ];

  const tableSkins = [
    { id: 'green', name: 'Classic Green', color: 'bg-green-800' },
    { id: 'blue', name: 'Ocean Blue', color: 'bg-blue-900' },
    { id: 'purple', name: 'Neon Purple', color: 'bg-purple-900' },
    { id: 'red', name: 'Velvet Red', color: 'bg-red-900' },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-black neon-text">
            Settings
          </h1>
          <Button variant="ghost" onClick={() => navigate('/lobby')} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card hover={false}>
              <h2 className="text-2xl font-display font-bold mb-6">Audio & Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-neon-dark/50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    {soundEnabled ? (
                      <Volume2 className="w-6 h-6 text-neon-teal" />
                    ) : (
                      <VolumeX className="w-6 h-6 text-gray-500" />
                    )}
                    <div>
                      <p className="font-semibold">Sound Effects</p>
                      <p className="text-sm text-gray-400">Enable game sound effects</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleSound}
                    className={`
                      relative w-14 h-8 rounded-full transition-colors duration-300
                      ${soundEnabled ? 'bg-neon-gradient' : 'bg-gray-700'}
                    `}
                  >
                    <motion.div
                      animate={{ x: soundEnabled ? 24 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-neon-dark/50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <Bell className="w-6 h-6 text-neon-purple" />
                    <div>
                      <p className="font-semibold">Notifications</p>
                      <p className="text-sm text-gray-400">Enable push notifications</p>
                    </div>
                  </div>
                  <button
                    className="relative w-14 h-8 rounded-full bg-neon-gradient transition-colors"
                  >
                    <motion.div
                      initial={{ x: 24 }}
                      className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                    />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card hover={false}>
              <h2 className="text-2xl font-display font-bold mb-6">Card Style</h2>
              <div className="grid grid-cols-3 gap-4">
                {cardStyles.map((style, index) => (
                  <motion.button
                    key={style.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      p-6 rounded-2xl border-2 transition-all
                      ${
                        index === 0
                          ? 'border-neon-purple bg-neon-purple/20 shadow-neon-purple'
                          : 'border-neon-purple/20 bg-neon-dark/50 hover:border-neon-pink/50'
                      }
                    `}
                  >
                    <div className="text-5xl mb-3">{style.preview}</div>
                    <p className="font-semibold">{style.name}</p>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card hover={false}>
              <h2 className="text-2xl font-display font-bold mb-6">Table Skin</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tableSkins.map((skin, index) => (
                  <motion.button
                    key={skin.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      p-4 rounded-2xl border-2 transition-all
                      ${
                        index === 0
                          ? 'border-neon-purple shadow-neon-purple'
                          : 'border-neon-purple/20 hover:border-neon-pink/50'
                      }
                    `}
                  >
                    <div className={`w-full aspect-video rounded-xl ${skin.color} mb-3 border-2 border-white/20`} />
                    <p className="font-semibold text-sm">{skin.name}</p>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card hover={false}>
              <h2 className="text-2xl font-display font-bold mb-6">Account</h2>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full justify-start" size="lg">
                  Change Password
                </Button>
                <Button variant="secondary" className="w-full justify-start" size="lg">
                  Privacy Settings
                </Button>
                <Button variant="danger" className="w-full justify-start" size="lg">
                  Sign Out
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
