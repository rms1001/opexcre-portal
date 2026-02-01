import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

  async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

      try {
              await login(email, password);
              navigate('/');
      } catch (err) {
              console.error('Login error:', err);
              setError('Invalid email or password');
      } finally {
              setLoading(false);
      }
  }

  return (
        <div className="min-h-screen flex">
              <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-800 p-12 flex-col justify-between">
                      <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                            <span className="text-emerald-600 font-bold text-xl">O</span>span>
                                </div>div>
                                <span className="text-white text-2xl font-bold">OPEX</span>span>
                      </div>div>
                      <div className="text-white">
                                <h1 className="text-4xl font-bold mb-4">Commercial Real Estate Client Portal</h1>h1>
                                <p className="text-emerald-100 text-lg">Manage your properties, documents, and reports in one place.</p>p>
                      </div>div>
                      <div className="text-emerald-200 text-sm">2026 OPEX CRE. All rights reserved.</div>div>
              </div>div>
        
              <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                      <div className="w-full max-w-md">
                                <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                                            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                                                          <span className="text-white font-bold text-xl">O</span>span>
                                            </div>div>
                                            <span className="text-gray-900 text-2xl font-bold">OPEX</span>span>
                                </div>div>
                      
                                <div className="bg-white rounded-2xl shadow-xl p-8">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>h2>
                                            <p className="text-gray-600 mb-8">Sign in to access your portal</p>p>
                                
                                  {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <span className="text-red-700 text-sm">{error}</span>span>
                        </div>div>
                                            )}
                                
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                          <div>
                                                                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>label>
                                                                          <input
                                                                                              type="email"
                                                                                              value={email}
                                                                                              onChange={(e) => setEmail(e.target.value)}
                                                                                              required
                                                                                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                                                                              placeholder="you@example.com"
                                                                                            />
                                                          </div>div>
                                            
                                                          <div>
                                                                          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>label>
                                                                          <input
                                                                                              type={showPassword ? 'text' : 'password'}
                                                                                              value={password}
                                                                                              onChange={(e) => setPassword(e.target.value)}
                                                                                              required
                                                                                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                                                                              placeholder="Enter your password"
                                                                                            />
                                                          </div>div>
                                            
                                                          <button
                                                                            type="submit"
                                                                            disabled={loading}
                                                                            className="w-full py-3 px-4 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
                                                                          >
                                                            {loading ? 'Signing in...' : 'Sign In'}
                                                          </button>button>
                                            </form>form>
                                </div>div>
                      </div>div>
              </div>div>
        </div>div>
      );
}</div>
