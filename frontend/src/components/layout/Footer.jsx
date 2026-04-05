import Link from 'next/link';
import { Heart, Shield, AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Col 1 — About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart size={16} className="text-white" fill="white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-primary">Med</span>Swap
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              MedSwap helps patients find bioequivalent, affordable alternatives to prescribed medicines using
              active salt composition matching and doctor-verified safety ratings.
            </p>
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/landing-page' },
                { label: 'Search Medicines', href: '/landing-page#search' },
                { label: 'Medicine Detail', href: '/medicine-detail' },
                { label: 'Register as Doctor', href: '/sign-up-login-screen' },
                { label: 'Patient Login', href: '/sign-up-login-screen' },
              ]?.map(link => (
                <li key={`footer-${link?.label}`}>
                  <Link
                    href={link?.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Disclaimer */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">Medical Disclaimer</h4>
            <div className="flex gap-2">
              <AlertTriangle size={16} className="text-warning flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-muted leading-relaxed">
                MedSwap provides medicine information for educational purposes only. Always consult your registered
                doctor or pharmacist before switching, stopping, or starting any medication. Do not self-medicate.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            Built by <span className="font-semibold text-primary">Rishabh</span> © 2026 · MedSwap
          </p>
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <Shield size={12} className="text-primary" />
            <span>Not a substitute for professional medical advice</span>
          </div>
        </div>
      </div>
    </footer>
  );
}