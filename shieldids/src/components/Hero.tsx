import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';
import '../assets/gradient.png';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticle = () => {
      if (!containerRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'hero-particle';
      
      // Random position and size
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.width = `${Math.random() * 3 + 1}px`;
      particle.style.height = particle.style.width;
      
      containerRef.current.appendChild(particle);
      setTimeout(() => particle.remove(), 3000);
    };

    const interval = setInterval(createParticle, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section" ref={containerRef}>
      <div className="hero-geometric"></div>
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="gradient-text">Protect Your Network</span>
          <br/ >
          with Advanced Intrusion Detection
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Our cutting-edge technology monitors and defends against potential threats in real-time.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Link to="/download" className="cta-button">
            Get Started
            <span className="button-glow"></span>
          </Link>
        </motion.div>
      </motion.div>
      
      <div className="scroll-indicator">
        <div className="mouse"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default HeroSection;
