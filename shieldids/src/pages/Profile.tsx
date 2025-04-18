import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Avatar, IconButton, Badge, CircularProgress, Tooltip } from '@mui/material';
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaClock, 
  FaCamera,
  FaKey, 
  FaEdit, 
  FaCheckCircle,
  FaShieldAlt,
  FaExclamationTriangle,
  FaBell,
  FaLock,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaBriefcase,
  FaIdCard,
  FaStickyNote
} from 'react-icons/fa';
import Layout from '../components/Layout';
import './Profile.css';

const Profile: React.FC = () => {
  const { user, userProfile, isLoading, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [photoURL, setPhotoURL] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'personal' | 'security'>('personal');
  
  // New profile fields
  const [jobRole, setJobRole] = useState<string>('Security Professional');
  const [location, setLocation] = useState<string>('Bangalore, India');
  const [bio, setBio] = useState<string>('Passionate about cybersecurity and protecting systems from intrusions. Experienced in network security and threat detection.');
  
  // Create a temporary profile if user exists but userProfile doesn't
  const effectiveUserProfile = React.useMemo(() => {
    if (userProfile) return userProfile;
    
    // If user exists but profile doesn't, create a temporary one
    if (user) {
      return {
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || user.email?.split('@')[0] || 'User',
        createdAt: new Date(),
        lastLogin: new Date(),
        photoURL: user.photoURL || '',
      };
    }
    
    return null;
  }, [user, userProfile]);
  
  useEffect(() => {
    // Redirect if not logged in
    if (!isLoading && !user) {
      navigate('/login');
    }
    
    // Set initial values from profile
    if (effectiveUserProfile) {
      setName(effectiveUserProfile.name || '');
      setEmail(effectiveUserProfile.email || '');
      setPhotoURL(effectiveUserProfile.photoURL || '');
      
      // In a real app, these would come from the profile too
      // For demo, we're using defaults
      // Type assertion to access additional profile fields
      const extendedProfile = effectiveUserProfile as any;
      setJobRole(extendedProfile?.jobRole || 'Security Professional');
      setLocation(extendedProfile?.location || 'Bangalore, India');
      setBio(extendedProfile?.bio || 'Passionate about cybersecurity and protecting systems from intrusions. Experienced in network security and threat detection.');
    }
  }, [user, effectiveUserProfile, isLoading, navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdateSuccess(false);
    setError('');
  };
  
  const handleCancelEdit = () => {
    // Reset form to current profile values
    if (effectiveUserProfile) {
      setName(effectiveUserProfile.name || '');
      setEmail(effectiveUserProfile.email || '');
      // Type assertion to access additional profile fields
      const extendedProfile = effectiveUserProfile as any;
      setJobRole(extendedProfile?.jobRole || 'Security Professional');
      setLocation(extendedProfile?.location || 'Bangalore, India');
      setBio(extendedProfile?.bio || 'Passionate about cybersecurity and protecting systems from intrusions. Experienced in network security and threat detection.');
    }
    setError('');
    setSelectedImage(null);
    setIsEditing(false);
  };
  
  const handleSaveChanges = async () => {
    if (!name.trim()) {
      setError('Name cannot be empty');
      return;
    }
    
    try {
      setUpdateLoading(true);
      setError('');
      
      // Mock file upload (in a real app, you'd upload to storage)
      let updatedPhotoURL = photoURL;
      if (selectedImage) {
        // In a real app: Upload the image to Firebase Storage
        // For this demo, we'll use a mock URL based on the file name
        updatedPhotoURL = `https://example.com/photos/${selectedImage.name}`;
      }
      
      await updateUserProfile({
        name,
        photoURL: updatedPhotoURL,
        // Use a type-safe approach for custom fields
        ...(jobRole ? { jobRole } as any : {}),
        ...(location ? { location } as any : {}),
        bio
      });
      
      setIsEditing(false);
      setUpdateSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setUpdateLoading(false);
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoURL(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    
    const nameParts = name.split(' ');
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
  
  if (isLoading) {
    return (
      <Layout>
        <div className="profile-loading">
          <CircularProgress size={60} />
          <p>Loading profile...</p>
        </div>
      </Layout>
    );
  }
  
  // Only redirect to login if both user and effectiveUserProfile are null
  if (!user) {
    return (
      <Layout>
        <div className="profile-error">
          <FaExclamationTriangle className="error-icon" />
          <h2>Authentication Required</h2>
          <p>Please log in to view your profile.</p>
          <Button 
            variant="contained" 
            onClick={() => navigate('/login')}
            className="profile-login-btn"
          >
            Go to Login
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-container">
        <motion.div 
          className="profile-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaShieldAlt className="profile-shield-icon" />
          <h1>My Profile</h1>
          <p>Manage your personal information and account settings</p>
        </motion.div>
        
        <div className="profile-tabs">
          <motion.button
            className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('personal')}
          >
            <FaUser />
            <span>Personal Info</span>
          </motion.button>
          <motion.button
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('security')}
          >
            <FaLock />
            <span>Security</span>
          </motion.button>
        </div>
        
        <div className="profile-content">
          <AnimatePresence mode="wait">
            {activeTab === 'personal' && (
              <motion.div 
                key="personal"
                className="profile-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="profile-card-header">
                  <h2>Personal Information</h2>
                  {!isEditing ? (
                    <motion.button 
                      className="edit-button"
                      onClick={handleEditClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEdit /> Edit
                    </motion.button>
                  ) : (
                    <motion.button 
                      className="cancel-button"
                      onClick={handleCancelEdit}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
                
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      className="profile-error-message"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <FaExclamationTriangle />
                      <span>{error}</span>
                    </motion.div>
                  )}
                  
                  {updateSuccess && (
                    <motion.div 
                      className="profile-success-message"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <FaCheckCircle />
                      <span>Profile updated successfully!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="profile-avatar-section">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      isEditing ? (
                        <div className="avatar-upload-badge">
                          <input
                            accept="image/*"
                            type="file"
                            id="avatar-upload"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                          />
                          <label htmlFor="avatar-upload">
                            <IconButton component="span" className="upload-button">
                              <FaCamera />
                            </IconButton>
                          </label>
                        </div>
                      ) : null
                    }
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Avatar 
                        src={photoURL}
                        alt={name}
                        className="profile-avatar"
                      >
                        {getInitials(name)}
                      </Avatar>
                    </motion.div>
                  </Badge>
                  {!isEditing && (
                    <motion.div 
                      className="member-since"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Member since {new Date(effectiveUserProfile?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </motion.div>
                  )}
                </div>
                
                <div className="profile-form">
                  <div className="profile-field">
                    <div className="field-icon">
                      <FaIdCard />
                    </div>
                    <div className="field-content">
                      <label>Full Name</label>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="edit-field"
                          placeholder="Your Full Name"
                        />
                      ) : (
                        <div className="field-value">{effectiveUserProfile?.name}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <div className="field-icon">
                      <FaBriefcase />
                    </div>
                    <div className="field-content">
                      <label>Job Role</label>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={jobRole}
                          onChange={(e) => setJobRole(e.target.value)}
                          className="edit-field"
                          placeholder="Your Job Role"
                        />
                      ) : (
                        <div className="field-value">{jobRole}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <div className="field-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="field-content">
                      <label>Location</label>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="edit-field"
                          placeholder="Your Location"
                        />
                      ) : (
                        <div className="field-value">{location}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <div className="field-icon">
                      <FaEnvelope />
                    </div>
                    <div className="field-content">
                      <label>Email</label>
                      <div className="field-value with-badge">
                        {effectiveUserProfile?.email}
                        <Tooltip title="Your email is verified and secure" arrow placement="top">
                          <span className="verified-badge">Verified</span>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  
                  <div className="profile-field bio-field">
                    <div className="field-icon">
                      <FaStickyNote />
                    </div>
                    <div className="field-content full-width">
                      <label>Bio</label>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="edit-field"
                          placeholder="Tell us a bit about yourself"
                          multiline
                          rows={4}
                        />
                      ) : (
                        <div className="field-value bio-text">{bio}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <div className="field-icon">
                      <FaCalendarAlt />
                    </div>
                    <div className="field-content">
                      <label>Account Created</label>
                      <div className="field-value">
                        {formatDate(effectiveUserProfile?.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <div className="field-icon">
                      <FaClock />
                    </div>
                    <div className="field-content">
                      <label>Last Login</label>
                      <div className="field-value">
                        {formatDate(effectiveUserProfile?.lastLogin)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {isEditing && (
                  <motion.div 
                    className="profile-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleSaveChanges}
                      className="save-button"
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <>Save Changes</>
                      )}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
            
            {activeTab === 'security' && (
              <motion.div 
                key="security"
                className="profile-card security-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="profile-card-header">
                  <h2>Security Settings</h2>
                  <div className="security-status">
                    <span className="security-status-badge">
                      <FaShieldAlt /> Secure
                    </span>
                  </div>
                </div>
                
                <div className="security-option">
                  <div className="security-icon">
                    <FaKey />
                  </div>
                  <div className="security-content">
                    <h3>Password</h3>
                    <p>Change your account password</p>
                    <div className="last-changed">
                      <FaInfoCircle /> Last changed: 30 days ago
                    </div>
                  </div>
                  <motion.button 
                    className="security-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Change
                  </motion.button>
                </div>
                
                <div className="security-option">
                  <div className="security-icon secure">
                    <FaShieldAlt />
                  </div>
                  <div className="security-content">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                    <div className="security-status-inline">
                      <span className="status-badge disabled">Not Enabled</span>
                    </div>
                  </div>
                  <motion.button 
                    className="security-button primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enable
                  </motion.button>
                </div>
                
                <div className="security-option">
                  <div className="security-icon notification">
                    <FaBell />
                  </div>
                  <div className="security-content">
                    <h3>Security Notifications</h3>
                    <p>Get alerts about suspicious login attempts</p>
                    <div className="security-status-inline">
                      <span className="status-badge enabled">Enabled</span>
                    </div>
                  </div>
                  <motion.button 
                    className="security-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Disable
                  </motion.button>
                </div>
                
                <div className="security-tip">
                  <FaInfoCircle className="tip-icon" />
                  <div>
                    <h4>Security Tip</h4>
                    <p>Enable two-factor authentication to significantly improve your account security.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;