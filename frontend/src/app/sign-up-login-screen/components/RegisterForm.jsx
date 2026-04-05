'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Stethoscope,
  UserRound,
  ArrowRight,
  Loader2,
  ClipboardList,
  GraduationCap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function PasswordStrengthBar({ password }) {
  const getStrength = (pwd) => {
    if (!pwd) return { level: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-danger' };
    if (score === 2) return { level: 2, label: 'Medium', color: 'bg-warning' };
    return { level: 3, label: 'Strong', color: 'bg-success' };
  };

  const strength = getStrength(password);
  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3].map(i => (
          <div
            key={`bar-${i}`}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= strength.level ? strength.color : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${
        strength.level === 1 ? 'text-danger' : strength.level === 2 ? 'text-warning' : 'text-success'
      }`}>
        {strength.label} password
      </p>
    </div>
  );
}

const SPECIALISATIONS = [
  'General Physician',
  'Internal Medicine',
  'Cardiology',
  'Neurology',
  'Orthopaedics',
  'Gynaecology & Obstetrics',
  'Paediatrics',
  'Dermatology',
  'Psychiatry',
  'Oncology',
  'Endocrinology',
  'Pulmonology',
  'Nephrology',
  'Gastroenterology',
  'Ophthalmology',
  'ENT',
  'Pharmacology',
  'Other',
];

export default function RegisterForm({ onSwitchToLogin }) {
  const [role, setRole] = useState('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { role: 'patient' } });

  const password = watch('password', '');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Backend: POST /api/auth/register
      await new Promise(r => setTimeout(r, 1200));
      toast.success(
        role === 'doctor'
          ? 'Account created! Pending admin verification.' :'Welcome to MedSwap!'
      );
      router.push('/landing-page');
    } catch {
      toast.error('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Role toggle */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">I am a</label>
        <div className="flex bg-background rounded-xl p-1 border border-gray-100">
          {[
            { key: 'patient', label: 'Patient', icon: UserRound },
            { key: 'doctor', label: 'Doctor', icon: Stethoscope },
          ].map(r => (
            <button
              key={`role-${r.key}`}
              type="button"
              onClick={() => setRole(r.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                role === r.key
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <r.icon size={15} />
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Full name */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">Full name</label>
        <div className="relative">
          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder={role === 'doctor' ? 'Dr. Priya Sharma' : 'Rishabh Gupta'}
            {...register('name', { required: 'Full name is required', minLength: { value: 2, message: 'Name too short' } })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
              errors.name ? 'border-danger bg-red-50' : 'border-gray-200'
            }`}
          />
        </div>
        {errors.name && <p className="text-xs text-danger mt-1.5">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">Email address</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="email"
            placeholder="you@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
            })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
              errors.email ? 'border-danger bg-red-50' : 'border-gray-200'
            }`}
          />
        </div>
        {errors.email && <p className="text-xs text-danger mt-1.5">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">Phone number</label>
        <div className="relative">
          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="tel"
            placeholder="+91 98765 43210"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' },
            })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
              errors.phone ? 'border-danger bg-red-50' : 'border-gray-200'
            }`}
          />
        </div>
        {errors.phone && <p className="text-xs text-danger mt-1.5">{errors.phone.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">Password</label>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            })}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
              errors.password ? 'border-danger bg-red-50' : 'border-gray-200'
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
        {errors.password && <p className="text-xs text-danger mt-1.5">{errors.password.message}</p>}
        <PasswordStrengthBar password={password} />
      </div>

      {/* Confirm password */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">Confirm password</label>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Re-enter your password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: val => val === password || 'Passwords do not match',
            })}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
              errors.confirmPassword ? 'border-danger bg-red-50' : 'border-gray-200'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(v => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-danger mt-1.5">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Doctor-specific fields */}
      <AnimatePresence>
        {role === 'doctor' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-2 pb-1">
              <div className="flex items-center gap-2 py-2 border-t border-dashed border-primary/30">
                <Stethoscope size={14} className="text-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Doctor verification
                </span>
              </div>

              {/* Medical registration number */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">
                  Medical Registration Number
                </label>
                <p className="text-xs text-text-muted mb-2">
                  Your MCI/State Medical Council registration number
                </p>
                <div className="relative">
                  <ClipboardList size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    placeholder="e.g. MH-2019-12345"
                    {...register('registrationNumber', {
                      required: role === 'doctor' ? 'Registration number is required' : false,
                    })}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                      errors.registrationNumber ? 'border-danger bg-red-50' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.registrationNumber && (
                  <p className="text-xs text-danger mt-1.5">{errors.registrationNumber.message}</p>
                )}
              </div>

              {/* Specialisation */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">
                  Specialisation
                </label>
                <div className="relative">
                  <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  <select
                    {...register('specialisation', {
                      required: role === 'doctor' ? 'Please select your specialisation' : false,
                    })}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 appearance-none bg-white cursor-pointer ${
                      errors.specialisation ? 'border-danger bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select your specialisation</option>
                    {SPECIALISATIONS.map(spec => (
                      <option key={`spec-${spec}`} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.specialisation && (
                  <p className="text-xs text-danger mt-1.5">{errors.specialisation.message}</p>
                )}
              </div>

              {/* Pending note */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-700 leading-relaxed">
                Your doctor account will be reviewed by our admin team within 24–48 hours. You&apos;ll
                receive an email once verified. You can log in immediately but annotation features
                will be unlocked after verification.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-sm text-sm mt-1"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Create account
            <ArrowRight size={15} />
          </>
        )}
      </motion.button>

      <p className="text-center text-sm text-text-muted">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary font-semibold hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}