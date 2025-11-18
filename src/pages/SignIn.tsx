import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { useStore } from '../store/useStore';
import logo from '../images/logo.jpeg';
import backgroundImg from '../images/background.JPG';

export default function SignIn() {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: '', password: '' };
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    login({
      id: '1',
      username: email.split('@')[0],
      avatar: '👑',
      balance: 25000,
      level: 15,
    });

    navigate('/lobby');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
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
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
            className="inline-block mb-6"
          >
            <img 
              src={logo} 
              alt="Neuro Poker For Fun" 
              className="h-32 w-auto mx-auto rounded-3xl shadow-chunky-3d"
            />
          </motion.div>
          <h1 className="text-5xl font-display font-black mb-2 neon-text">
            Welcome Back
          </h1>
          <p className="text-gray-700 font-medium">Sign in to continue playing</p>
        </div>

        <Card hover={false} glow>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-neon-text bg-white text-tropical-gold focus:ring-tropical-gold"
                />
                <span className="ml-2 text-sm text-gray-700 font-medium">Remember me</span>
              </label>
              <Link to="/auth/forgot-password" className="text-sm text-tropical-parrotBlue hover:text-tropical-gold transition-colors font-bold">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-neon-text" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-700 font-bold">Or continue with</span>
              </div>
            </div>

            <Button variant="secondary" className="w-full" size="lg">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-700 font-medium">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="text-tropical-parrotBlue hover:text-tropical-gold transition-colors font-bold">
              Sign up
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
