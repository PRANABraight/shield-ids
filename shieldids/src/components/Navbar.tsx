// Navbar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './auth/AuthContext';
import './Navbar.css';
import logo from '../assets/NetGuard-removebg-preview.png';
import { FaUserCircle, FaSignOutAlt, FaCog, FaChevronDown } from 'react-icons/fa';
import { FiUser, FiSettings } from 'react-icons/fi';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, userProfile, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!userProfile?.name) return 'U';
    
    const nameParts = userProfile.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/download', label: 'Download' },
    { path: '/contact', label: 'Contact' }
  ];

  // If dashboard is available, add it for logged in users
  if (user) {
    // navLinks.push({ path: '/dashboard', label: 'Dashboard' });
  }

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="navbar-logo"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" className="logo-link">
          <motion.img 
            src={logo} 
            alt="Logo" 
            className="logo-image"
            initial={{ rotate: -180 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          />
          <span className="logo-text">NetGuard</span>
        </Link>
      </motion.div>

      {/* User greeting - visible on desktop only */}
      {user && userProfile && (
        <motion.div 
          className="user-greeting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>
            Welcome, <span className="user-name">{userProfile.name.split(' ')[0]}</span>!
          </span>
        </motion.div>
      )}

      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul>
          {navLinks.map((link) => (
            <motion.li 
              key={link.path}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to={link.path} 
                onClick={toggleMobileMenu}
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>
        
        <div className="navbar-buttons">
          {user ? (
            // User is logged in - show user menu
            <div className="user-menu-container" ref={userMenuRef}>
              <motion.div 
                className="user-avatar-wrapper"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleUserMenu}
              >
                <div className="user-avatar">
                  {getInitials()}
                </div>
                <FaChevronDown className={`avatar-chevron ${userMenuOpen ? 'open' : ''}`} />
              </motion.div>
              
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div 
                    className="user-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Mobile-only greeting */}
                    <div className="dropdown-greeting">
                      Hello, <strong>{userProfile?.name.split(' ')[0]}</strong>!
                    </div>
                    
                    <Link to="/profile" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <FiUser />
                      <span>My Profile</span>
                    </Link>
                    
                    <Link to="/settings" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <FiSettings />
                      <span>Settings</span>
                    </Link>
                    
                    <div className="dropdown-divider"></div>
                    
                    <div className="dropdown-item" onClick={handleLogout}>
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // User is not logged in - show login/signup buttons
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/register" className="btn btn-signup" onClick={toggleMobileMenu}>
                  Sign Up
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login" className="btn btn-login" onClick={toggleMobileMenu}>
                  Log In
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>

      <motion.button 
        className="mobile-menu-button"
        onClick={toggleMobileMenu}
        whileTap={{ scale: 0.9 }}
      >
        <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} />
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;
