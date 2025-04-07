import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import './Contact.css';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Animation for floating elements
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Generate floating particles effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'contact-particle';
      
      // Random position, size and color
      const size = Math.random() * 10 + 5;
      const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#0ea5e9'];
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      containerRef.current.appendChild(particle);
      
      // Animate and remove
      setTimeout(() => {
        particle.style.opacity = '0';
        setTimeout(() => particle.remove(), 1000);
      }, 3000);
    };
    
    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 5000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      }
    }
  };

  return (
    <div className="contact-page" ref={containerRef}>
      {/* Decorative elements */}
      <div className="contact-grid"></div>
      <div className="contact-circle circle-1"></div>
      <div className="contact-circle circle-2"></div>
      
      <motion.div 
        className="contact-container"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="contact-header" variants={itemVariants}>
          <h1>Get in Touch</h1>
          <p>Have questions about our services? Contact us and our team will be happy to assist you.</p>
        </motion.div>
        
        <div className="contact-content">
          <motion.div className="contact-info" variants={itemVariants}>
            <Card className="contact-card">
              <h3>Contact Information</h3>
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <h4>Address</h4>
                  <p>Christ University, Bangalore, Karnataka, India</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">✉️</span>
                <div>
                  <h4>Email</h4>
                  <p>contact@shieldids.com</p>
                </div>
              </div>
              
              <div className="social-links">
                <motion.a 
                  href="#" 
                  className="social-icon"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-icon"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-icon"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-icon"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </motion.a>
              </div>
            </Card>
          </motion.div>
          
          <motion.div className="contact-form-container" variants={itemVariants}>
            <Card className="contact-card">
              {isSubmitted ? (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="success-icon">✓</div>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h3>Send us a Message</h3>
                  
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Subject of your message"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <motion.span 
                      className="button-overlay"
                      animate={{ 
                        x: isSubmitting ? 100 : 0,
                      }}
                      transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                    />
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
        
        <motion.div className="map-container" variants={itemVariants}>
          <Card className="map-card">
            <div className="map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7600002055613!2d77.60102011482112!3d12.93448041879116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15b277a93807%3A0x9ebbf88ff92bc7bc!2sChrist%20University!5e0!3m2!1sen!2sin!4v1649307859493!5m2!1sen!2sin" 
                width="100%" 
                height="400" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Christ University, Bangalore, Karnataka, India"
                className="google-map"
              ></iframe>
              <div className="map-overlay">
                <motion.div 
                  className="location-pulse"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
                <div className="map-label">
                    Christ University, Bangalore, Karnataka, India
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact; 