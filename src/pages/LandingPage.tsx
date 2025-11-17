import { motion } from 'framer-motion';
import { Sparkles, Users, Trophy, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import logo from '../images/logo.png';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Floating decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-pink-400 rounded-full opacity-30"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-12 h-12 bg-purple-400 rounded-lg opacity-30"
          animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-yellow-300 rounded-full opacity-20"
          animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-14 h-14 bg-cyan-400 rounded-lg opacity-30"
          animate={{ y: [0, 15, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Logo positioned on the left - mobile responsive */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-4 left-4 md:top-8 md:left-8 z-20"
      >
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-2 md:p-3 border-4 md:border-6 border-[#2C2416] shadow-[0_6px_0_#2C2416,0_8px_16px_rgba(0,0,0,0.3)]"
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ y: 0 }}
        >
          <motion.img 
            src={logo} 
            alt="Neuro Poker For Fun" 
            className="h-12 sm:h-16 md:h-20 w-auto"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-24 sm:pt-32 md:pt-40">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black mb-4 sm:mb-6 md:mb-8"
            style={{
              color: '#FF6B9D',
              textShadow: '0 6px 0 #CC5680, 0 8px 20px rgba(0,0,0,0.3)',
              WebkitTextStroke: '3px #2C2416',
              paintOrder: 'stroke fill',
            }}
            animate={{ 
              textShadow: [
                '0 6px 0 #CC5680, 0 8px 20px rgba(0,0,0,0.3)',
                '0 8px 0 #CC5680, 0 10px 24px rgba(0,0,0,0.4)',
                '0 6px 0 #CC5680, 0 8px 20px rgba(0,0,0,0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            NEURO POKER
          </motion.h1>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              color: '#FFD700',
              textShadow: '0 4px 0 #CC9A00, 0 6px 16px rgba(0,0,0,0.3)',
              WebkitTextStroke: '2px #2C2416',
              paintOrder: 'stroke fill',
            }}
          >
            FOR FUN! 🎉
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#2C2416] font-semibold max-w-2xl mx-auto px-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Experience the ultimate online poker with psychedelic vibes! 🌈 Play with friends, join tournaments, and dominate the tables! 🃏✨
          </motion.p>
        </motion.div>

        {/* CTA Buttons - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center mb-12 sm:mb-16 md:mb-24 px-4"
        >
          <motion.div
            whileHover={{ y: -6, scale: 1.05 }}
            whileTap={{ y: 2 }}
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              onClick={() => navigate('/lobby')}
              className="w-full sm:w-auto text-xl sm:text-2xl px-8 sm:px-12 md:px-16 py-5 sm:py-6 md:py-7 shadow-[0_8px_0_#CC9A00,0_10px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_0_#CC9A00,0_12px_24px_rgba(0,0,0,0.5)] active:shadow-[0_4px_0_#CC9A00,0_6px_12px_rgba(0,0,0,0.3)]"
            >
              🎮 Create Table
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ y: -6, scale: 1.05 }}
            whileTap={{ y: 2 }}
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/lobby')}
              className="w-full sm:w-auto text-xl sm:text-2xl px-8 sm:px-12 md:px-16 py-5 sm:py-6 md:py-7 bg-[#B4E7FF] hover:bg-[#9DD9F0] border-6 border-[#2C2416] shadow-[0_8px_0_#3691A7,0_10px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_0_#3691A7,0_12px_24px_rgba(0,0,0,0.5)] active:shadow-[0_4px_0_#3691A7,0_6px_12px_rgba(0,0,0,0.3)]"
            >
              🚀 Join Table
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature Cards - Cartoon Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-24 px-2">
          {[
            {
              icon: Users,
              title: 'Multiplayer Rooms',
              description: 'Create private tables or join public games with players worldwide',
              bgColor: 'bg-[#B4A7FF]',
              shadowColor: '#8B7FCC',
              emoji: '👥',
            },
            {
              icon: Trophy,
              title: 'Epic Tournaments',
              description: 'Compete in daily tournaments with massive prize pools',
              bgColor: 'bg-[#FFD700]',
              shadowColor: '#CC9A00',
              emoji: '🏆',
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Smooth gameplay with real-time updates and zero lag',
              bgColor: 'bg-[#FF6B9D]',
              shadowColor: '#CC5680',
              emoji: '⚡',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className={`${feature.bgColor} rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 border-5 sm:border-6 border-[#2C2416] transition-all duration-300 cursor-pointer`}
              style={{
                boxShadow: `0 8px 0 ${feature.shadowColor}, 0 10px 24px rgba(0,0,0,0.4)`
              }}
            >
              <motion.div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white border-4 sm:border-5 border-[#2C2416] flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-[0_4px_0_#2C2416]"
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-3xl sm:text-4xl">{feature.emoji}</span>
              </motion.div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-display font-black mb-3 sm:mb-4 text-center text-[#2C2416]">
                {feature.title}
              </h3>
              <p className="text-[#2C2416] text-center text-base sm:text-lg font-semibold leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section - Cartoon Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative min-h-[300px] sm:h-96 rounded-3xl sm:rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#FF6B9D] via-[#B4A7FF] to-[#FFD700] border-6 border-[#2C2416] shadow-[0_12px_0_#2C2416,0_16px_32px_rgba(0,0,0,0.5)] mb-8 sm:mb-12 mx-2"
        >
          <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
            <div className="text-center relative z-10">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6"
              >
                🎰
              </motion.div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-3 sm:mb-4 md:mb-6 text-white"
                style={{
                  textShadow: '0 6px 0 #2C2416, 0 8px 20px rgba(0,0,0,0.5)',
                  WebkitTextStroke: '3px #2C2416',
                  paintOrder: 'stroke fill',
                }}
              >
                Ready to Play?
              </h3>
              <p className="text-lg sm:text-xl md:text-2xl text-[#2C2416] font-bold mb-6 sm:mb-8 max-w-md mx-auto px-4">
                Join thousands of players and start your poker journey today! 🌟
              </p>
              <motion.div 
                whileHover={{ y: -6, scale: 1.05 }}
                whileTap={{ y: 2 }}
              >
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth/signin')} 
                  className="text-xl sm:text-2xl px-10 sm:px-12 md:px-16 py-5 sm:py-6 md:py-7 bg-white text-[#2C2416] hover:bg-gray-100 border-6 border-[#2C2416] shadow-[0_8px_0_#2C2416,0_10px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_0_#2C2416,0_12px_28px_rgba(0,0,0,0.6)]"
                >
                  Get Started Now! 🎯
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
