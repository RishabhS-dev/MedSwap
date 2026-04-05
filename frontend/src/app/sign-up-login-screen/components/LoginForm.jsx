'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Demo credentials info box
function DemoCredentials({ onUse }) {
  return (
    <div className="mb-5 bg-primary-lighter/60 border border-primary/20 rounded-xl p-3.5">
      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2.5">Demo Account</p>
      <div className="space-y-1.5">
        {[
          { role: 'Patient', email: 'priya.sharma@medswap.in', password: 'MedSwap@2026' },
          { role: 'Doctor', email: 'dr.anand@medswap.in', password: 'Doctor@2026' },
        ].map(cred => (
          <div key={`demo-${cred.role}`} className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-primary">{cred.role}:</span>{' '}
              <span className="text-xs text-text-secondary truncate">{cred.email}</span>
            </div>
            <button
              type="button"
              onClick={() => onUse(cred.email, cred.password)}
              className="text-xs font-semibold text-primary bg-white border border-primary/30 px-2.5 py-1 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 flex-shrink-0"
            >
              Use
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LoginForm({ onSwitchToRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const handleUseDemo = (email, password) => {
    setValue('email', email);
    setValue('password', password);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Backend: POST /api/auth/login
      await new Promise(r => setTimeout(r, 1000));

      // Simulate wrong credentials for demo
      const validEmails = ['priya.sharma@medswap.in', 'dr.anand@medswap.in'];
      if (!validEmails.includes(data.email)) {
        setShake(true);
        setTimeout(() => setShake(false), 600);
        setError('email', {
          message: 'Invalid credentials — use the demo accounts below to sign in',
        });
        setLoading(false);
        return;
      }

      toast.success('Welcome back!');
      router.push('/landing-page');
    } catch {
      toast.error('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <DemoCredentials onUse={handleUseDemo} />

      <motion.div
        animate={shake ? { x: [-6, 6, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">
            Email address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
              })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                errors.email ? 'border-danger bg-red-50' : 'border-gray-200 bg-white'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-danger mt-1.5 flex items-center gap-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-semibold text-text-primary">Password</label>
            <button
              type="button"
              className="text-xs text-primary hover:underline font-medium"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password"
              {...register('password', { required: 'Password is required' })}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                errors.password ? 'border-danger bg-red-50' : 'border-gray-200 bg-white'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-danger mt-1.5">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-sm text-sm mt-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight size={15} />
            </>
          )}
        </motion.button>
      </motion.div>

      <p className="text-center text-sm text-text-muted mt-5">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary font-semibold hover:underline"
        >
          Register free
        </button>
      </p>
    </form>
  );
}