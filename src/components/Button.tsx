import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'font-display font-black rounded-chunky transition-all duration-300 relative overflow-hidden border-4 border-neon-text';

  const variants = {
    primary: 'bg-neon-gradient text-neon-text shadow-chunky-3d hover:shadow-chunky-orange neon-glow-hover',
    secondary: 'bg-white text-neon-text shadow-chunky-3d hover:shadow-chunky-green',
    ghost: 'bg-transparent text-tropical-gold border-tropical-gold hover:bg-tropical-gold/20',
    danger: 'bg-tropical-parrotRed text-white shadow-chunky-3d hover:shadow-neon-red',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95';

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </motion.button>
  );
}
