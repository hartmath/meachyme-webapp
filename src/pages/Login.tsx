import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpLoading, setSignUpLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpLoading(true);
    try {
      await signUp(signUpEmail, signUpPassword);
      toast.success('Sign up successful! You can now log in.');
      setShowSignUp(false);
      setEmail(signUpEmail);
      setPassword(signUpPassword);
      setSignUpEmail('');
      setSignUpPassword('');
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Failed to sign up');
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 px-6 py-8 text-center">
        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 overflow-hidden">
          <img 
            src="/mealogo.png.jpg" 
            alt="Chyme Logo" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to the original M if image fails to load
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              const nextElement = target.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'flex';
              }
            }}
          />
          <span className="text-4xl font-bold text-red-600" style={{display: 'none'}}>M</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Chyme
        </h1>
        <p className="text-white/90 text-sm">
          The messaging space for event people
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Sign in to continue
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  className="text-red-600 hover:text-red-700 font-medium"
                  onClick={() => setShowSignUp(true)}
                  type="button"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowSignUp(false)}
              type="button"
              aria-label="Close sign up modal"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Create an account
            </h2>
            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <input
                  id="signup-email"
                  name="signup-email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
                  placeholder="Email address"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="signup-password"
                  name="signup-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={signUpLoading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {signUpLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing up...
                  </>
                ) : (
                  'Sign up'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
