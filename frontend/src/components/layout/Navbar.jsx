'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLogo from '@/components/ui/AppLogo';

const navLinks = [
  { label: 'Home', href: '/landing-page' },
  { label: 'Search', href: '/landing-page#search' },
  { label: 'Browse Medicines', href: '/search-results' },
  { label: 'Doctor Dashboard', href: '/doctor-dashboard' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mock auth state — backend: replace with real AuthContext
  const [user] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const initials = user ? user?.name?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase() : '';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/landing-page" className="flex items-center gap-2 group">
              <AppLogo size={32} />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-primary">Med</span>
                <span className="text-text-primary">Swap</span>
              </span>
            </Link>

            {/* Center nav — desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks?.map(link => (
                <Link
                  key={`nav-${link?.label}`}
                  href={link?.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link?.href
                      ? 'text-primary bg-primary-lighter' :'text-text-secondary hover:text-primary hover:bg-primary-lighter'
                  }`}
                >
                  {link?.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(v => !v)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-lighter transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                      {initials}
                    </div>
                    <span className="text-sm font-medium text-text-primary">{user?.name?.split(' ')?.[0]}</span>
                    <ChevronDown size={14} className="text-text-muted" />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-card-hover border border-gray-100 overflow-hidden"
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:bg-primary-lighter hover:text-primary transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard size={16} />
                          Dashboard
                        </Link>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-danger hover:bg-red-50 transition-colors">
                          <LogOut size={16} />
                          Log out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    href="/sign-up-login-screen"
                    className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary-lighter rounded-lg transition-all duration-200"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/sign-up-login-screen"
                    className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary-light transition-all duration-200 shadow-sm"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-primary-lighter transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} className="text-text-primary" />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 md:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-white z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <span className="text-lg font-bold">
                  <span className="text-primary">Med</span>Swap
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {navLinks?.map(link => (
                  <Link
                    key={`drawer-${link?.label}`}
                    href={link?.href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-lighter transition-all"
                  >
                    {link?.label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-gray-100 space-y-2">
                <Link
                  href="/sign-up-login-screen"
                  onClick={() => setDrawerOpen(false)}
                  className="block text-center px-4 py-3 text-sm font-medium border border-primary text-primary rounded-lg hover:bg-primary-lighter transition-all"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up-login-screen"
                  onClick={() => setDrawerOpen(false)}
                  className="block text-center px-4 py-3 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary-light transition-all"
                >
                  Register
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}