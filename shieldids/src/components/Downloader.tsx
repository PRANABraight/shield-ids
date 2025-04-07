import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaCheck, FaTimes } from 'react-icons/fa';
import './Downloader.css';

interface DownloaderProps {
  className?: string;
}

const Downloader: React.FC<DownloaderProps> = ({ className = '' }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadError(false);
      setProgress(0);
      
      // Simulate download progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      // In a real implementation, you would use fetch or axios to download the file
      // For this example, we'll simulate a download
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        
        // Create a download link
        const link = document.createElement('a');
        link.href = '/downloads/shield_ids-main.txt'; // Using the text file as a placeholder
        link.download = 'shield_ids-main.zip'; // Still download as zip for user experience
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setDownloadComplete(true);
        setIsDownloading(false);
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setDownloadComplete(false);
        }, 3000);
      }, 3000);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadError(true);
      setIsDownloading(false);
      
      // Reset error state after 3 seconds
      setTimeout(() => {
        setDownloadError(false);
      }, 3000);
    }
  };

  return (
    <div className={`downloader-container ${className}`}>
      <motion.button
        className={`downloader-button ${isDownloading ? 'downloading' : ''} ${downloadComplete ? 'success' : ''} ${downloadError ? 'error' : ''}`}
        onClick={handleDownload}
        disabled={isDownloading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDownloading ? (
          <>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>Downloading... {progress}%</span>
          </>
        ) : downloadComplete ? (
          <>
            <FaCheck className="icon" />
            <span>Downloaded!</span>
          </>
        ) : downloadError ? (
          <>
            <FaTimes className="icon" />
            <span>Failed</span>
          </>
        ) : (
          <>
            <FaDownload className="icon" />
            <span>Download</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default Downloader; 