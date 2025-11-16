import { motion } from 'framer-motion';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-bold text-neon-text mb-2">
            {label}
          </label>
        )}
        <motion.div
          whileFocus={{ scale: 1.01 }}
          className="relative"
        >
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-chunky
              bg-white border-4
              ${error ? 'border-tropical-parrotRed' : 'border-neon-text focus:border-tropical-gold'}
              text-neon-text placeholder-gray-400 font-medium
              focus:outline-none shadow-chunky-3d
              transition-all duration-300
              ${className}
            `}
            {...props}
          />
        </motion.div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-tropical-parrotRed text-sm mt-1 font-bold"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
