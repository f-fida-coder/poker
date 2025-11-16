import { motion } from 'framer-motion';
import { Sparkles, Users, Trophy, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import logo from '../images/logo.jpeg';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block mb-8"
          >
            <img 
              src={logo} 
              alt="Neuro Poker For Fun" 
              className="h-40 md:h-48 w-auto mx-auto rounded-3xl shadow-chunky-3d"
            />
          </motion.div>

          <h1 className="text-7xl md:text-8xl font-display font-black mb-6 neon-text">
            NEURO POKER
          </h1>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-neon-gradient bg-clip-text text-transparent">
            FOR FUN
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the ultimate online poker with psychedelic neon vibes. Play with friends, join tournaments, and dominate the tables.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
        >
          <Button
            size="lg"
            onClick={() => navigate('/lobby')}
            className="w-full sm:w-auto text-2xl px-12 py-6"
          >
            Create Table
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/lobby')}
            className="w-full sm:w-auto text-2xl px-12 py-6"
          >
            Join Table
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Users,
              title: 'Multiplayer Rooms',
              description: 'Create private tables or join public games with players worldwide',
              color: 'neon-purple',
            },
            {
              icon: Trophy,
              title: 'Epic Tournaments',
              description: 'Compete in daily tournaments with massive prize pools',
              color: 'neon-pink',
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Smooth gameplay with real-time updates and zero lag',
              color: 'neon-teal',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-super-chunky p-8 border-6 border-neon-text shadow-chunky-3d hover:shadow-chunky-orange transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-tropical-gold/20 flex items-center justify-center mb-6 mx-auto">
                <feature.icon className="w-8 h-8 text-tropical-parrotRed" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 text-center text-neon-text">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative h-96 rounded-super-chunky overflow-hidden bg-tropical-gold border-6 border-neon-text shadow-chunky-3d"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="w-32 h-32 mx-auto mb-6 rounded-full bg-neon-gradient opacity-50"
              />
              <h3 className="text-4xl font-display font-bold mb-4">Ready to Play?</h3>
              <Button size="lg" onClick={() => navigate('/auth/signin')} className="text-xl px-10 py-5">
                Get Started Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
