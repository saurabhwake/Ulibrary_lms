// src/components/Footer.jsx
import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-950 via-purple-900 to-pink-900 text-white pt-10 pb-6 border-t border-white/10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </span>
            <div>
              <span className="font-bold text-lg tracking-wide">Library LMS</span>
              <div className="text-xs text-white/60 mt-1">Empowering your digital library experience</div>
            </div>
          </div>
          {/* Links */}
          <nav className="flex flex-wrap gap-6 text-sm font-medium">
            <a href="#" className="hover:text-orange-400 transition-colors focus:outline-none focus:underline">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors focus:outline-none focus:underline">Terms of Service</a>
            <a href="#" className="hover:text-orange-400 transition-colors focus:outline-none focus:underline">Support</a>
          </nav>
        </div>
        <div className="mt-8 pt-4 border-t border-white/10 text-center text-xs text-white/50">
          &copy; {new Date().getFullYear()} Library LMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;