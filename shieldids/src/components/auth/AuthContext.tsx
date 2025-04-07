// auth/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  User, 
  updateProfile 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp, 
  updateDoc 
} from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheckCircle, FaBell, FaClock, FaUserCircle, FaShieldAlt, FaEnvelope, FaCalendarAlt, FaTimes } from 'react-icons/fa';

interface UserProfile {
  uid: string;
  email: string;
  name: string;
  createdAt: Date | null;
  lastLogin: Date | null;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  showSuccessAnimation: boolean;
  setShowSuccessAnimation: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState<boolean>(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);
  const [isUserNew, setIsUserNew] = useState<boolean>(false);
  const [previousLoginTime, setPreviousLoginTime] = useState<Date | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserProfile;
            setUserProfile(userData);
            
            // Store previous login time before updating
            setPreviousLoginTime(userData.lastLogin);
            
            // Update last login time
            await updateDoc(doc(db, 'users', user.uid), {
              lastLogin: serverTimestamp()
            });
            
            // Show welcome modal if user wasn't previously logged in
            // and this isn't part of the initial registration flow
            if (!showSuccessAnimation && !isUserNew) {
              setShowWelcomeModal(true);
              // Modal will be closed by user clicking the close button
            }
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
        setPreviousLoginTime(null);
      }
      
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [showSuccessAnimation, isUserNew]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setIsUserNew(true);
      // Create the user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Set display name
      await updateProfile(user, { displayName: name });
      
      // Store additional user data in Firestore
      const newProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        name: name,
        createdAt: new Date(),
        lastLogin: new Date(),
        photoURL: user.photoURL || '',
      };
      
      await setDoc(doc(db, 'users', user.uid), newProfile);
      setUserProfile(newProfile);
      
      // Show success animation
      setShowSuccessAnimation(true);
      // Hide animation after 3 seconds
      setTimeout(() => {
        setShowSuccessAnimation(false);
        // Reset isUserNew after 1 more second to allow login detection in the next auth state change
        setTimeout(() => setIsUserNew(false), 1000);
      }, 3000);
      
    } catch (error) {
      setIsUserNew(false);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error('Logout failed');
    }
  };
  
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user || !userProfile) throw new Error('No authenticated user');
    
    try {
      // Update Firestore document
      await updateDoc(doc(db, 'users', user.uid), {
        ...data,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setUserProfile(prevProfile => ({
        ...prevProfile!,
        ...data
      }));
      
      // Update auth profile if name is changed
      if (data.name) {
        await updateProfile(user, { displayName: data.name });
      }
      
      // Update photo URL if provided
      if (data.photoURL) {
        await updateProfile(user, { photoURL: data.photoURL });
      }
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  };

  // Format the last login time in a friendly way
  const getLastLoginText = () => {
    if (!previousLoginTime) return '';
    
    const now = new Date();
    const lastLogin = new Date(previousLoginTime);
    const diffMs = now.getTime() - lastLogin.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return lastLogin.toLocaleDateString();
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!userProfile?.name) return 'U';
    
    const nameParts = userProfile.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  // Format date in a user-friendly way
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      isLoading,
      login,
      register,
      logout,
      updateUserProfile,
      showSuccessAnimation,
      setShowSuccessAnimation
    }}>
      {children}
      
      {/* Success Animation Portal */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div 
            className="success-animation-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="success-animation-content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div 
                className="success-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <motion.svg 
                  viewBox="0 0 24 24" 
                  width="64" 
                  height="64"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.path
                    fill="none"
                    stroke="#4CAF50"
                    strokeWidth="3"
                    d="M 3,12 l 6,6 l 12,-12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </motion.svg>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Welcome to Shield IDS!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Your account has been created successfully
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Enhanced Welcome Modal */}
      <AnimatePresence>
        {showWelcomeModal && userProfile && (
          <motion.div 
            className="welcome-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWelcomeModal(false)}
          >
            <motion.div 
              className="welcome-modal"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                className="modal-close-btn"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowWelcomeModal(false)}
              >
                <FaTimes />
              </motion.button>
              
              <div className="modal-header">
                <motion.div 
                  className="welcome-avatar-large"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  {userProfile.photoURL ? (
                    <img src={userProfile.photoURL} alt={userProfile.name} />
                  ) : (
                    <div className="welcome-initials-large">
                      {getInitials()}
                    </div>
                  )}
                </motion.div>
                
                <motion.div
                  className="welcome-title"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2>Welcome back, {userProfile.name.split(' ')[0]}!</h2>
                  <p className="welcome-subtitle">We're glad to see you again</p>
                </motion.div>
              </div>
              
              <motion.div 
                className="welcome-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="section-title">
                  <FaUserCircle className="section-icon" />
                  Your Profile
                </h3>
                
                <div className="profile-detail">
                  <div className="detail-label">
                    <FaUserCircle className="detail-icon" /> Full Name
                  </div>
                  <div className="detail-value">{userProfile.name}</div>
                </div>
                
                <div className="profile-detail">
                  <div className="detail-label">
                    <FaEnvelope className="detail-icon" /> Email Address
                  </div>
                  <div className="detail-value">{userProfile.email}</div>
                </div>
                
                <div className="profile-detail">
                  <div className="detail-label">
                    <FaCalendarAlt className="detail-icon" /> Account Created
                  </div>
                  <div className="detail-value">{formatDate(userProfile.createdAt)}</div>
                </div>
                
                {previousLoginTime && (
                  <div className="profile-detail highlight">
                    <div className="detail-label">
                      <FaClock className="detail-icon" /> Last Login
                    </div>
                    <div className="detail-value accent">{getLastLoginText()}</div>
                  </div>
                )}
              </motion.div>
              
              <motion.div 
                className="welcome-card security-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="section-title">
                  <FaShieldAlt className="section-icon" />
                  Security Status
                </h3>
                <div className="security-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '65%' }}></div>
                  </div>
                  <div className="progress-text">Your account security is at 65%</div>
                </div>
                <div className="security-tip">
                  <FaBell className="tip-icon" />
                  <div className="tip-text">Consider enabling two-factor authentication to improve your security</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="modal-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button 
                  className="modal-action-btn secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowWelcomeModal(false)}
                >
                  Close
                </motion.button>
                <motion.button 
                  className="modal-action-btn primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowWelcomeModal(false);
                    window.location.href = '/profile';
                  }}
                >
                  View Profile
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
