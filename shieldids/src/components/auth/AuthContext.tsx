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
import { FaCheckCircle, FaBell } from 'react-icons/fa';

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
  const [showWelcomeToast, setShowWelcomeToast] = useState<boolean>(false);
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
            
            // Show welcome toast if user wasn't previously logged in
            // and this isn't part of the initial registration flow
            if (!showSuccessAnimation && !isUserNew) {
              setShowWelcomeToast(true);
              setTimeout(() => setShowWelcomeToast(false), 5000);
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
      
      {/* Welcome Back Toast */}
      <AnimatePresence>
        {showWelcomeToast && userProfile && (
          <motion.div 
            className="welcome-toast"
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="welcome-toast-icon">
              <FaBell />
            </div>
            <div className="welcome-toast-content">
              <div className="welcome-toast-title">
                Welcome back, {userProfile.name.split(' ')[0]}!
              </div>
              <div className="welcome-toast-message">
                {previousLoginTime ? (
                  <>Last login: {getLastLoginText()}</>
                ) : (
                  <>Glad to see you again</>
                )}
              </div>
            </div>
            <button 
              className="welcome-toast-close"
              onClick={() => setShowWelcomeToast(false)}
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
