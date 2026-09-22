import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, Lock, Mail, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { mockSalonOwner } from '../../lib/mockData';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('elena@lumierestudio.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Frontend authentication simulation for Phase 1
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setForgotPasswordMessage(
      'Single-client security: A recovery link has been dispatched to the registered salon director inbox.'
    );
    setTimeout(() => {
      setForgotPasswordMessage(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FAF8F7] text-slate-800">
      {/* LEFT COLUMN: Luxury Salon Branding Showcase (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-charcoal-900 text-white overflow-hidden">
        {/* Background Ambient Glow & Patterns */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-salon-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-salon-400/15 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#262a32_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        {/* Top Brand Tag */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-salon-500 to-rose-400 text-white shadow-glow-pink">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif tracking-widest text-2xl font-bold uppercase tracking-wider text-white">
              LUMIÈRE
            </h1>
            <p className="text-xs tracking-widest text-salon-300 font-semibold uppercase">
              Private Salon Studio
            </p>
          </div>
        </div>

        {/* Center: Editorial Beauty & CRM Intelligence Headline */}
        <div className="relative z-10 max-w-lg space-y-6 my-auto py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salon-500/10 border border-salon-500/20 text-salon-300 text-xs font-semibold uppercase tracking-wider">
            <Heart className="h-3.5 w-3.5 fill-salon-400 text-salon-400" />
            <span>Dedicated Client Sanctuary</span>
          </div>

          <h2 className="font-serif text-4xl xl:text-5xl font-semibold leading-tight text-white">
            Elegance meets intelligent client care.
          </h2>

          <p className="text-slate-300 text-base leading-relaxed font-light">
            Empower your salon studio with unified client relationship management, personalized
            campaigns, and official WhatsApp conversations tailored to your VIP clientele.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="rounded-2xl border border-charcoal-700/80 bg-charcoal-800/60 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-salon-400 mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Client Retention</span>
              </div>
              <p className="text-xl font-bold text-white">96.5%</p>
              <p className="text-[11px] text-slate-400">Regular re-booking rate</p>
            </div>

            <div className="rounded-2xl border border-charcoal-700/80 bg-charcoal-800/60 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Private Access</span>
              </div>
              <p className="text-xl font-bold text-white">Internal Only</p>
              <p className="text-[11px] text-slate-400">Owner-managed system</p>
            </div>
          </div>
        </div>

        {/* Bottom Salon Status Note */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-6 border-t border-charcoal-800">
          <span>&copy; {new Date().getFullYear()} {mockSalonOwner.salonName}</span>
          <span className="text-salon-400/80 font-medium">StyleSalon CRM Engine</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Salon-Themed Login Form Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Top Brand Display */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-salon-500 to-rose-400 text-white shadow-glow-pink">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif tracking-widest text-xl font-bold text-charcoal-900 uppercase">
                LUMIÈRE
              </h1>
              <p className="text-[11px] tracking-wider text-salon-500 font-semibold uppercase">
                Salon CRM
              </p>
            </div>
          </div>

          {/* Login Card Header */}
          <div className="space-y-2 text-left">
            <div className="inline-block rounded-lg bg-salon-100/70 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-salon-700">
              Internal Portal
            </div>
            <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-500">
              Login to your salon CRM to manage clients, campaigns, and WhatsApp conversations.
            </p>
          </div>

          {/* Notification / Toast for Forgot Password */}
          {forgotPasswordMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5 transition-all">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{forgotPasswordMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@your-salon.com"
              leftIcon={<Mail className="h-4 w-4" />}
            />

            <Input
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your private password"
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 hover:text-slate-700 transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-salon-500 focus:ring-salon-400 accent-salon-500"
                />
                <span className="text-xs font-medium text-slate-600">Remember me</span>
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs font-semibold text-salon-600 hover:text-salon-700 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              fullWidth
              disabled={isLoading}
              className="mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                'Sign In to Dashboard'
              )}
            </Button>
          </form>

          {/* Single-client Note */}
          <div className="pt-4 text-center">
            <p className="text-xs text-slate-400">
              Authorized salon personnel only. Protected single-tenant application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
