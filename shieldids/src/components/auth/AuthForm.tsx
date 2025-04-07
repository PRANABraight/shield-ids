import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Auth.css';
import { FaUser, FaEnvelope, FaLock, FaShieldAlt } from 'react-icons/fa';

interface AuthFormProps {
    isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
    const { login, register, userProfile, isLoading, showSuccessAnimation } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [formLoading, setFormLoading] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const navigate = useNavigate();
    
    // If user is already logged in and has a profile, redirect to dashboard
    useEffect(() => {
        if (userProfile && !showSuccessAnimation) {
            navigate('/dashboard');
        }
    }, [userProfile, showSuccessAnimation, navigate]);
    
    // Check password strength
    useEffect(() => {
        if (!password) {
            setPasswordStrength(0);
            return;
        }
        
        let strength = 0;
        // Length check
        if (password.length >= 8) strength += 25;
        // Uppercase check
        if (/[A-Z]/.test(password)) strength += 25;
        // Number check
        if (/[0-9]/.test(password)) strength += 25;
        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        
        setPasswordStrength(strength);
    }, [password]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormLoading(true);
        setError('');
        
        try {
            if (isLogin) {
                await login(email, password);
                // Redirect is handled by the useEffect that checks userProfile
            } else {
                if (password !== confirmPassword) {
                    setError('Passwords do not match');
                    setFormLoading(false);
                    return;
                }
                
                if (password.length < 6) {
                    setError('Password must be at least 6 characters');
                    setFormLoading(false);
                    return;
                }
                
                await register(email, password, name);
                // Success animation is handled by AuthContext
                // Redirect will happen after animation finishes
            }
        } catch (error) {
            console.error('Auth error:', error);
            setError(error instanceof Error ? error.message : 'Authentication failed');
        } finally {
            setFormLoading(false);
        }
    };

    const getPasswordStrengthLabel = (): string => {
        if (passwordStrength <= 25) return 'Weak';
        if (passwordStrength <= 50) return 'Fair';
        if (passwordStrength <= 75) return 'Good';
        return 'Strong';
    };
    
    const getPasswordStrengthColor = (): string => {
        if (passwordStrength <= 25) return '#ff4d4d';
        if (passwordStrength <= 50) return '#ffad4d';
        if (passwordStrength <= 75) return '#4dff88';
        return '#4d88ff';
    };

    return (
        <motion.div 
            className="auth-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="auth-card"
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    className='auth-form-box'
                >
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="auth-header"
                    >
                        <FaShieldAlt className="auth-logo" />
                        <Typography className='auth-title' variant="h5" align="center">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </Typography>
                    </motion.div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="auth-error"
                            >
                                <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                                    {error}
                                </Typography>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isLogin && (
                        <div className="input-with-icon">
                            <FaUser className="input-icon" />
                            <TextField
                                className='auth-input'
                                label="Full Name"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="John Doe"
                            />
                        </div>
                    )}
                    
                    <div className="input-with-icon">
                        <FaEnvelope className="input-icon" />
                        <TextField
                            className='auth-input'
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                        />
                    </div>
                    
                    <div className="input-with-icon">
                        <FaLock className="input-icon" />
                        <TextField
                            className='auth-input'
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    
                    {!isLogin && password && (
                        <motion.div 
                            className="password-strength"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="strength-bar-container">
                                <motion.div 
                                    className="strength-bar-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${passwordStrength}%` }}
                                    style={{ backgroundColor: getPasswordStrengthColor() }}
                                />
                            </div>
                            <Typography variant="caption" style={{ color: getPasswordStrengthColor() }}>
                                {getPasswordStrengthLabel()} Password
                            </Typography>
                        </motion.div>
                    )}
                    
                    {!isLogin && (
                        <div className="input-with-icon">
                            <FaLock className="input-icon" />
                            <TextField
                                className='auth-input'
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                error={confirmPassword !== '' && password !== confirmPassword}
                                helperText={confirmPassword !== '' && password !== confirmPassword ? "Passwords don't match" : ""}
                            />
                        </div>
                    )}

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button 
                            className='auth-button'
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={formLoading || isLoading}
                        >
                            {(formLoading || isLoading) ? (
                                <CircularProgress size={24} sx={{ color: 'white' }} />
                            ) : (
                                isLogin ? 'Sign In' : 'Create Account'
                            )}
                        </Button>
                    </motion.div>

                    <motion.div 
                        className="auth-switch-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Typography align="center" sx={{ mt: 2 }}>
                            <Link 
                                to={isLogin ? '/register' : '/login'}
                                className="auth-switch-text"
                            >
                                {isLogin 
                                    ? "Don't have an account? Sign up" 
                                    : 'Already have an account? Sign in'}
                            </Link>
                        </Typography>
                    </motion.div>
                </Box>
            </motion.div>
        </motion.div>
    );
};

export default AuthForm;
