import { motion } from 'framer-motion';
import { Sparkles, Users, Trophy, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/whitelogo.png';
import backgroundImg from '../images/background.jpg';
import character3d from '../images/3d1.png';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden relative">
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
      
      {/* Subtle floating shapes with brand colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(226, 152, 2, 0.15) 0%, transparent 70%)' }}
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-40 h-40 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(30, 104, 132, 0.12) 0%, transparent 70%)' }}
          animate={{ y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-48 h-48 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(85, 110, 0, 0.1) 0%, transparent 70%)' }}
          animate={{ y: [0, -35, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-36 h-36 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(191, 70, 1, 0.12) 0%, transparent 70%)' }}
          animate={{ y: [0, 25, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header with Logo */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 shadow-lg"
        style={{
          background: 'transparent'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <img 
                src={logo} 
                alt="Neuro Poker For Fun" 
                className="h-14 sm:h-16 md:h-20 w-auto drop-shadow-lg"
              />
            </motion.div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-[#1e6884] hover:text-[#e29802] font-bold transition-colors text-lg drop-shadow-md">Features</a>
              <a href="#about" className="text-[#1e6884] hover:text-[#e29802] font-bold transition-colors text-lg drop-shadow-md">About</a>
              <a href="#contact" className="text-[#1e6884] hover:text-[#e29802] font-bold transition-colors text-lg drop-shadow-md">Contact</a>
            </nav>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 md:pt-44 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16 sm:mb-20 md:mb-24 relative"
        >
          {/* 3D Character - Mobile/Tablet centered behind NEURO POKER heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 0.12, 
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: 0.4 },
              scale: { duration: 1, delay: 0.4 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="lg:hidden absolute left-[20%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-24 sm:w-28 md:w-32 pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <img 
              src={character3d} 
              alt="Poker Character" 
              className="w-full h-auto"
            />
          </motion.div>

          {/* 3D Character - Desktop version (floating on the right side) */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: [0, -20, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.5 },
              x: { duration: 0.8, delay: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="hidden lg:block absolute -right-8 xl:-right-16 top-0 w-24 xl:w-28 z-20"
            whileHover={{ scale: 1.1, rotate: 0 }}
          >
            <img 
              src={character3d} 
              alt="Poker Character" 
              className="w-full h-auto drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
              }}
            />
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black mb-6 sm:mb-8 relative z-10"
            style={{ 
              color: '#e29802',
              textShadow: '3px 3px 6px rgba(0,0,0,0.2), 0 0 40px rgba(226, 152, 2, 0.3)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            NEURO POKER
          </motion.h1>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 sm:mb-10 relative z-10"
            style={{ 
              color: '#1b6831',
              textShadow: '2px 2px 4px rgba(0,0,0,0.15)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            FOR FUN
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl font-semibold max-w-3xl mx-auto px-4 leading-relaxed mb-12 relative z-10"
            style={{ color: '#1e6884' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Experience the ultimate online poker platform. Play with friends, join tournaments and dominate the tables with professional gameplay.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center px-4 relative z-10"
          >
            <motion.button
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/lobby')}
              className="px-10 sm:px-12 md:px-16 py-4 sm:py-5 text-xl sm:text-2xl font-bold rounded-2xl text-white transition-all duration-300 shadow-xl hover:shadow-2xl"
              style={{ 
                background: 'linear-gradient(135deg, #e29802 0%, #bf4601 100%)',
                boxShadow: '0 8px 25px rgba(226, 152, 2, 0.4)'
              }}
            >
              Create Table
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/lobby')}
              className="px-10 sm:px-12 md:px-16 py-4 sm:py-5 text-xl sm:text-2xl font-bold rounded-2xl text-white transition-all duration-300 shadow-xl hover:shadow-2xl"
              style={{ 
                background: 'linear-gradient(135deg, #1e6884 0%, #1b6831 100%)',
                boxShadow: '0 8px 25px rgba(30, 104, 132, 0.4)'
              }}
            >
              Join Table
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-24">
          {[
            {
              icon: Users,
              title: 'Multiplayer Rooms',
              description: 'Create private tables or join public games with players worldwide',
              gradient: 'linear-gradient(135deg, rgba(30, 104, 132, 0.15) 0%, rgba(27, 104, 49, 0.15) 100%)',
              iconBg: 'linear-gradient(135deg, #1e6884 0%, #1b6831 100%)',
              titleColor: '#1e6884',
            },
            {
              icon: Trophy,
              title: 'Epic Tournaments',
              description: 'Compete in daily tournaments with massive prize pools',
              gradient: 'linear-gradient(135deg, rgba(226, 152, 2, 0.15) 0%, rgba(191, 70, 1, 0.15) 100%)',
              iconBg: 'linear-gradient(135deg, #e29802 0%, #bf4601 100%)',
              titleColor: '#e29802',
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Smooth gameplay with real-time updates and zero lag',
              gradient: 'linear-gradient(135deg, rgba(191, 70, 1, 0.15) 0%, rgba(85, 110, 0, 0.15) 100%)',
              iconBg: 'linear-gradient(135deg, #bf4601 0%, #556e00 100%)',
              titleColor: '#bf4601',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.15 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border-2 transition-all duration-300 shadow-xl hover:shadow-2xl"
              style={{ 
                background: feature.gradient,
                borderColor: feature.titleColor,
                boxShadow: `0 10px 30px rgba(0,0,0,0.1), 0 0 0 1px ${feature.titleColor}40`
              }}
            >
              <motion.div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg"
                style={{ background: feature.iconBg }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-center" style={{ color: feature.titleColor }}>
                {feature.title}
              </h3>
              <p className="text-gray-800 text-center text-base sm:text-lg leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(226, 152, 2, 0.2) 0%, rgba(30, 104, 132, 0.2) 33%, rgba(191, 70, 1, 0.2) 66%, rgba(27, 104, 49, 0.2) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(226, 152, 2, 0.3)',
          }}
        >
          <div className="relative z-10 py-16 sm:py-20 md:py-24 px-6 sm:px-8 text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-8"
            >
              <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 mx-auto drop-shadow-lg" style={{ color: '#e29802' }} />
            </motion.div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-display font-black mb-6 sm:mb-8" 
              style={{ 
                color: '#e29802',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2), 0 0 30px rgba(226, 152, 2, 0.3)'
              }}>
              Ready to Play?
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10 max-w-2xl mx-auto" style={{ color: '#1e6884' }}>
              Join thousands of players and start your poker journey today
            </p>
            <motion.button
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/auth/signin')}
              className="px-12 sm:px-16 md:px-20 py-5 sm:py-6 md:py-7 text-2xl sm:text-3xl font-bold rounded-2xl text-white transition-all duration-300 shadow-2xl"
              style={{ 
                background: 'linear-gradient(135deg, #1b6831 0%, #556e00 100%)',
                boxShadow: '0 12px 30px rgba(27, 104, 49, 0.5)'
              }}
            >
              Get Started Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
