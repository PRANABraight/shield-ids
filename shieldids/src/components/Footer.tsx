import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeToNewsletter, NewsletterError } from '../services/newsletterService';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType(null);

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new NewsletterError('Please enter a valid email address');
      }

      await subscribeToNewsletter(email);
      
      setMessage('Thank you for subscribing!');
      setMessageType('success');
      setEmail('');
    } catch (error) {
      if (error instanceof NewsletterError) {
        setMessage(error.message);
      } else {
        setMessage('Failed to subscribe. Please try again later.');
      }
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>About NetGuard</h3>
          <p>Enabling individuals and organizations to improve security and protect data through advanced intrusion detection systems.</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <nav className="footer-nav">
            <Link to="/about">About</Link>
            <Link to="/features">Research</Link>
            {/* <Link to="/dashboard">Dashboard</Link> */}
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        <div className="footer-column">
          <h3>Newsletter</h3>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
            {message && (
              <p className={`newsletter-message ${messageType}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} NetGuard. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
