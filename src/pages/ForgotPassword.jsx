import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Building2, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

  async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

      try {
              await resetPassword(email);
              setSuccess(true);
      } catch (err) {
              setError('Failed to send reset email. Please check your email address.');
      } finally {
              setLoading(false);
      }
  }

  return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
              <div className="w-full max-w-md">
                      <div className="flex items-center gap-3 mb-8 justify-center">
                                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                                            <Building2 className="w-7 h-7 text-white" />
                                </div>div>
                                <span className="text-gray-900 text-2xl font-bold">OPEX</span>span>
                      </div>div>
              
                      <div className="bg-white rounded-2xl shadow-xl p-8">
                        {success ? (
                      <div className="text-center">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                                    </div>div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>h2>
                                    <p className="text-gray-600 mb-6">
                                                    We've sent password reset instructions to {email}
                                    </p>p>
                                    <Link
                                                      to="/login"
                                                      className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                                                    >
                                                    <ArrowLeft className="w-4 h-4" />
                                                    Back to sign in
                                    </Link>Link>
                      </div>div>
                    ) : (
                      <>
                                    <Link
                                                      to="/login"
                                                      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                                                    >
                                                    <ArrowLeft className="w-4 h-4" />
                                                    Back to sign in
                                    </Link>Link>
                      
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset password</h2>h2>
                                    <p className="text-gray-600 mb-8">
                                                    Enter your email and we'll send you instructions to reset your password.
                                    </p>p>
                      
                        {error && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                                                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                                          <span className="text-red-700 text-sm">{error}</span>span>
                                        </div>div>
                                    )}
                      
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                                    <div>
                                                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                                          Email Address
                                                                      </label>label>
                                                                      <input
                                                                                            type="email"
                                                                                            value={email}
                                                                                            onChange={(e) => setEmail(e.target.value)}
                                                                                            required
                                                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                                                                            placeholder="you@example.com"
                                                                                          />
                                                    </div>div>
                                    
                                                    <button
                                                                        type="submit"
                                                                        disabled={loading}
                                                                        className="w-full py-3 px-4 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                                                                      >
                                                      {loading ? 'Sending...' : 'Send Reset Instructions'}
                                                    </button>button>
                                    </form>form>
                      </>>
                    )}
                      </div>div>
              </div>div>
        </div>div>
      );
}</></div>
