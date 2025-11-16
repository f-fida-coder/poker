import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({ children, className = '', hover = true, glow = false }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      className={`
        bg-white
        rounded-super-chunky p-6
        border-6 border-neon-text
        shadow-chunky-3d
        ${glow ? 'hover:shadow-chunky-orange' : ''}
        ${hover ? 'hover:shadow-chunky-orange transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
