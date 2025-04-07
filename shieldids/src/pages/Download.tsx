import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiCheck, FiX, FiInfo, FiPackage, FiCode, FiShield, FiServer, FiArrowRight, FiCpu, FiHardDrive, FiTerminal, FiCopy, FiZap, FiGlobe, FiLock } from 'react-icons/fi';
import './Download.css';

const Download: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState('latest');
  const [selectedPlatform, setSelectedPlatform] = useState('windows');
  const [showInfo, setShowInfo] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedTab, setSelectedTab] = useState('download');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);

  // Generate particles for background animation
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1
      });
    }
    setParticles(newParticles);
  }, []);

  const versions = [
    { id: 'latest', label: 'Latest Version (v1.0.0)', date: '2023-04-07', size: '45.2 MB' },
    { id: 'beta', label: 'Beta Version (v0.9.5)', date: '2023-03-15', size: '42.8 MB' },
    { id: 'alpha', label: 'Alpha Version (v0.8.2)', date: '2023-02-01', size: '38.5 MB' }
  ];

  const platforms = [
    { id: 'windows', label: 'Windows', icon: <FiServer />, requirements: 'Windows 10/11, 4GB RAM, 500MB disk space' },
    { id: 'macos', label: 'macOS', icon: <FiServer />, requirements: 'macOS 11+, 4GB RAM, 600MB disk space' },
    { id: 'linux', label: 'Linux', icon: <FiServer />, requirements: 'Ubuntu 20.04+/CentOS 8+, 2GB RAM, 400MB disk space' }
  ];

  const features = [
    {
      icon: <FiShield />,
      title: 'Advanced Security',
      description: 'State-of-the-art intrusion detection algorithms to protect your network.'
    },
    {
      icon: <FiPackage />,
      title: 'Easy Installation',
      description: 'Simple installation process with guided setup wizard.'
    },
    {
      icon: <FiCode />,
      title: 'Open Source',
      description: 'Fully open source code for transparency and community contributions.'
    }
  ];

  const getSelectedVersion = () => versions.find(v => v.id === selectedVersion);
  const getSelectedPlatform = () => platforms.find(p => p.id === selectedPlatform);

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
      // and the URL would depend on the selected version and platform
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        
        // Create a download link
        const link = document.createElement('a');
        link.href = `/downloads/shield_ids-main.txt`; // Path to your zip file
        link.download = `shield_ids-${selectedVersion}-${selectedPlatform}.zip`;
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(null), 2000);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const selectedVersionInfo = getSelectedVersion();
  const selectedPlatformInfo = getSelectedPlatform();

  return (
    <div className="download-page">
      {/* Animated background particles */}
      <div className="particles-container">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="download-hero">
        <motion.div 
          className="download-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="download-header" variants={itemVariants}>
            <h1 style={{fontWeight: 'bold', marginTop:'2rem'}}>Download</h1>
            <p>Get started with the most advanced Intrusion Detection System</p>
          </motion.div>

          <motion.div className="download-tabs" variants={itemVariants}>
            <button 
              className={`tab-button ${selectedTab === 'download' ? 'active' : ''}`}
              onClick={() => setSelectedTab('download')}
            >
              <FiDownload className="tab-icon" />
              <span>Download</span>
            </button>
            <button 
              className={`tab-button ${selectedTab === 'installation' ? 'active' : ''}`}
              onClick={() => setSelectedTab('installation')}
            >
              <FiPackage className="tab-icon" />
              <span>Installation</span>
            </button>
            <button 
              className={`tab-button ${selectedTab === 'setup' ? 'active' : ''}`}
              onClick={() => setSelectedTab('setup')}
            >
              <FiTerminal className="tab-icon" />
              <span>Setup Guide</span>
            </button>
          </motion.div>

          {selectedTab === 'download' && (
            <motion.div className="download-options" variants={itemVariants}>
              <div className="version-selector">
                <h3>Select Version</h3>
                <div className="version-buttons">
                  {versions.map(version => (
                    <motion.button
                      key={version.id}
                      className={`version-button ${selectedVersion === version.id ? 'active' : ''}`}
                      onClick={() => setSelectedVersion(version.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {version.label}
                      <span className="version-date">{version.date}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="platform-selector">
                <h3>Select Platform</h3>
                <div className="platform-buttons">
                  {platforms.map(platform => (
                    <motion.button
                      key={platform.id}
                      className={`platform-button ${selectedPlatform === platform.id ? 'active' : ''}`}
                      onClick={() => setSelectedPlatform(platform.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {platform.icon}
                      <span>{platform.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="download-action">
                <motion.button
                  className={`download-button ${isDownloading ? 'downloading' : ''} ${downloadComplete ? 'success' : ''} ${downloadError ? 'error' : ''}`}
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
                      <FiCheck className="icon" />
                      <span>Downloaded!</span>
                    </>
                  ) : downloadError ? (
                    <>
                      <FiX className="icon" />
                      <span>Failed</span>
                    </>
                  ) : (
                    <>
                      <FiDownload className="icon" />
                      <span>Download for {getSelectedPlatform()?.label}</span>
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  className="info-button"
                  onClick={() => setShowInfo(!showInfo)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiInfo />
                  <span>Download Information</span>
                </motion.button>
              </div>

              <AnimatePresence>
                {showInfo && (
                  <motion.div 
                    className="download-info"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3>Download Information for {selectedVersionInfo?.label} ({selectedPlatformInfo?.label})</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <FiHardDrive className="info-icon" />
                        <div>
                          <h4>File Size</h4>
                          <p>{selectedVersionInfo?.size}</p>
                        </div>
                      </div>
                      <div className="info-item">
                        <FiCpu className="info-icon" />
                        <div>
                          <h4>System Requirements</h4>
                          <p>{selectedPlatformInfo?.requirements}</p>
                        </div>
                      </div>
                      <div className="info-item">
                        <FiArrowRight className="info-icon" />
                        <div>
                          <h4>After Download</h4>
                          <p>Extract the zip file and run the installer to begin setup.</p>
                        </div>
                      </div>
                    </div>
                    <div className="sha-info">
                      <p><strong>SHA-256:</strong> 8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b</p>
                      <p><strong>License:</strong> MIT License</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {selectedTab === 'installation' && (
            <motion.div 
              className="setup-instructions"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h2>Building Suricata</h2>
              <p className="installation-intro">Instead of including Suricata binaries in this repository, please follow these instructions to build it from source:</p>
              
              <div className="installation-section">
                <h3>Prerequisites</h3>
                <div className="code-block">
                  <div className="code-header">
                    <span>bash</span>
                    <button 
                      className="copy-button" 
                      onClick={() => copyToClipboard(`sudo apt update
sudo apt install -y build-essential libpcre3-dev libpcre3 libpcap-dev libnet1-dev libyaml-0-2 libyaml-dev pkg-config zlib1g zlib1g-dev libcap-ng-dev libcap-ng0 libmagic-dev libnss3-dev libgeoip-dev liblua5.1-0-dev libhtp-dev libjansson-dev libjansson4 libpython2.7-dev rustc cargo`)}
                    >
                      {copiedCommand === `sudo apt update
sudo apt install -y build-essential libpcre3-dev libpcre3 libpcap-dev libnet1-dev libyaml-0-2 libyaml-dev pkg-config zlib1g zlib1g-dev libcap-ng-dev libcap-ng0 libmagic-dev libnss3-dev libgeoip-dev liblua5.1-0-dev libhtp-dev libjansson-dev libjansson4 libpython2.7-dev rustc cargo` ? (
                        <span className="copied">Copied!</span>
                      ) : (
                        <><FiCopy /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre><code>{`# Install Suricata dependencies
sudo apt update
sudo apt install -y build-essential libpcre3-dev libpcre3 libpcap-dev libnet1-dev \\
  libyaml-0-2 libyaml-dev pkg-config zlib1g zlib1g-dev libcap-ng-dev libcap-ng0 \\
  libmagic-dev libnss3-dev libgeoip-dev liblua5.1-0-dev libhtp-dev libjansson-dev \\
  libjansson4 libpython2.7-dev rustc cargo`}</code></pre>
                </div>
              </div>
              
              <div className="installation-section">
                <h3>Download and Build</h3>
                <div className="code-block">
                  <div className="code-header">
                    <span>bash</span>
                    <button 
                      className="copy-button" 
                      onClick={() => copyToClipboard(`wget https://www.openinfosecfoundation.org/download/suricata-7.0.9.tar.gz
tar -xvzf suricata-7.0.9.tar.gz
cd suricata-7.0.9
./configure --prefix=/usr --sysconfdir=/etc --localstatedir=/var --enable-nfqueue --enable-lua --enable-geoip --enable-rust
make -j $(nproc)
sudo make install
sudo make install-conf
sudo suricata-update`)}
                    >
                      {copiedCommand === `wget https://www.openinfosecfoundation.org/download/suricata-7.0.9.tar.gz
tar -xvzf suricata-7.0.9.tar.gz
cd suricata-7.0.9
./configure --prefix=/usr --sysconfdir=/etc --localstatedir=/var --enable-nfqueue --enable-lua --enable-geoip --enable-rust
make -j $(nproc)
sudo make install
sudo make install-conf
sudo suricata-update` ? (
                        <span className="copied">Copied!</span>
                      ) : (
                        <><FiCopy /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre><code>{`# Download Suricata source (version 7.0.9)
wget https://www.openinfosecfoundation.org/download/suricata-7.0.9.tar.gz
tar -xvzf suricata-7.0.9.tar.gz
cd suricata-7.0.9

# Configure and build Suricata
./configure --prefix=/usr --sysconfdir=/etc --localstatedir=/var \\
  --enable-nfqueue --enable-lua --enable-geoip --enable-rust
make -j $(nproc)

# Install Suricata (optional, requires root)
sudo make install
sudo make install-conf

# Setup Suricata rules (optional)
sudo suricata-update`}</code></pre>
                </div>
              </div>
              
              <div className="installation-section">
                <h3>Verification</h3>
                <div className="code-block">
                  <div className="code-header">
                    <span>bash</span>
                    <button 
                      className="copy-button" 
                      onClick={() => copyToClipboard(`suricata --version`)}
                    >
                      {copiedCommand === `suricata --version` ? (
                        <span className="copied">Copied!</span>
                      ) : (
                        <><FiCopy /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre><code>{`suricata --version`}</code></pre>
                </div>
                <p>You should see output showing Suricata version 7.0.9.</p>
              </div>
            </motion.div>
          )}

          {selectedTab === 'setup' && (
            <motion.div 
              className="setup-instructions"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h2>Manual Startup Guide for SHIELD IDS</h2>
              <p className="installation-intro">This guide walks through the steps to manually start each component of the SHIELD IDS system.</p>
              
              <div className="installation-section">
                <h3>Prerequisites</h3>
                <p>Make sure you have:</p>
                <ul className="prerequisite-list">
                  <li>Node.js installed</li>
                  <li>Redis server installed and running</li>
                  <li>All dependencies installed in both server and client directories</li>
                </ul>
              </div>
              
              <div className="installation-section">
                <h3>Step 1: Stop Any Existing Processes</h3>
                <div className="code-block">
                  <div className="code-header">
                    <span>bash</span>
                    <button 
                      className="copy-button" 
                      onClick={() => copyToClipboard(`pkill -f "node.*server.js"
pkill -f "react-scripts start"
pkill -f "node.*eve-log-generator"`)}
                    >
                      {copiedCommand === `pkill -f "node.*server.js"
pkill -f "react-scripts start"
pkill -f "node.*eve-log-generator"` ? (
                        <span className="copied">Copied!</span>
                      ) : (
                        <><FiCopy /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre><code>{`# Kill any server or client processes
pkill -f "node.*server.js"
pkill -f "react-scripts start"
pkill -f "node.*eve-log-generator"`}</code></pre>
                </div>
              </div>
              
              <div className="installation-section">
                <h3>Step 2: Start Redis (if not already running)</h3>
                <div className="code-block">
                  <div className="code-header">
                    <span>bash</span>
                    <button 
                      className="copy-button" 
                      onClick={() => copyToClipboard(`# Check if Redis is running
redis-cli ping

# If not running, start it
sudo systemctl start redis`)}
                    >
                      {copiedCommand === `# Check if Redis is running
redis-cli ping

# If not running, start it
sudo systemctl start redis` ? (
                        <span className="copied">Copied!</span>
                      ) : (
                        <><FiCopy /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre><code>{`# Check if Redis is running
redis-cli ping

# If not running, start it
sudo systemctl start redis`}</code></pre>
                </div>
              </div>
              
              <div className="installation-section">
                <h3>Step 3: Generate Test Logs (for testing without Suricata)</h3>
                <div className="code-block">
                  <div className="code-header">
                    <span>bash</span>
                    <button 
                      className="copy-button" 
                      onClick={() => copyToClipboard(`cd ~/shield_ids
node web_interface/server/scripts/eve-log-generator.js ./test-eve.json 1000 &`)}
                    >
                      {copiedCommand === `cd ~/shield_ids
node web_interface/server/scripts/eve-log-generator.js ./test-eve.json 1000 &` ? (
                        <span className="copied">Copied!</span>
                      ) : (
                        <><FiCopy /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre><code>{`# Create a test log file
cd ~/shield_ids
node web_interface/server/scripts/eve-log-generator.js ./test-eve.json 1000 &`}</code></pre>
                </div>
              </div>
              
              <div className="installation-section">
                <h3>Step 4: Start the Server (in a new terminal)</h3>
                <div className="code-block">
                  <div className="code-header">
                    <span>bash</span>
                    <button 
                      className="copy-button" 
                      onClick={() => copyToClipboard(`cd ~/shield_ids/web_interface/server

# Using the test log file
SURICATA_EVE_LOG=~/shield_ids/test-eve.json PORT=5050 node server.js`)}
                    >
                      {copiedCommand === `cd ~/shield_ids/web_interface/server

# Using the test log file
SURICATA_EVE_LOG=~/shield_ids/test-eve.json PORT=5050 node server.js` ? (
                        <span className="copied">Copied!</span>
                      ) : (
                        <><FiCopy /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre><code>{`cd ~/shield_ids/web_interface/server

# Using the test log file
SURICATA_EVE_LOG=~/shield_ids/test-eve.json PORT=5050 node server.js`}</code></pre>
                </div>
              </div>
              
              <div className="installation-section">
                <h3>Step 5: Start the Client (in a new terminal)</h3>
                <div className="code-block">
                  <div className="code-header">
                    <span>bash</span>
                    <button 
                      className="copy-button" 
                      onClick={() => copyToClipboard(`cd ~/shield_ids/web_interface/client

# Set the API URL environment variable
export REACT_APP_API_URL=http://localhost:5050

# Start the development server
npm start`)}
                    >
                      {copiedCommand === `cd ~/shield_ids/web_interface/client

# Set the API URL environment variable
export REACT_APP_API_URL=http://localhost:5050

# Start the development server
npm start` ? (
                        <span className="copied">Copied!</span>
                      ) : (
                        <><FiCopy /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre><code>{`cd ~/shield_ids/web_interface/client

# Set the API URL environment variable
export REACT_APP_API_URL=http://localhost:5050

# Start the development server
npm start`}</code></pre>
                </div>
              </div>
              
              <div className="installation-section">
                <h3>Troubleshooting</h3>
                
                <h4>1. Socket.IO Connection Issues</h4>
                <div className="code-block">
                  <div className="code-header">
                    <span>bash</span>
                    <button 
                      className="copy-button" 
                      onClick={() => copyToClipboard(`# Edit the api.js file to use both websocket and polling transports
cd ~/shield_ids/web_interface/client/src
nano api.js

# Add/modify this code:
export const SOCKET_OPTIONS = {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000
};`)}
                    >
                      {copiedCommand === `# Edit the api.js file to use both websocket and polling transports
cd ~/shield_ids/web_interface/client/src
nano api.js

# Add/modify this code:
export const SOCKET_OPTIONS = {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000
};` ? (
                        <span className="copied">Copied!</span>
                      ) : (
                        <><FiCopy /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre><code>{`# Edit the api.js file to use both websocket and polling transports
cd ~/shield_ids/web_interface/client/src
nano api.js

# Add/modify this code:
export const SOCKET_OPTIONS = {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000
};`}</code></pre>
                </div>
                
                <h4>2. Port Already in Use</h4>
                <div className="code-block">
                  <div className="code-header">
                    <span>bash</span>
                    <button 
                      className="copy-button" 
                      onClick={() => copyToClipboard(`# Find what's using the port
lsof -i :5050
lsof -i :3000

# Kill the processes
kill -9 <PID>`)}
                    >
                      {copiedCommand === `# Find what's using the port
lsof -i :5050
lsof -i :3000

# Kill the processes
kill -9 <PID>` ? (
                        <span className="copied">Copied!</span>
                      ) : (
                        <><FiCopy /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre><code>{`# Find what's using the port
lsof -i :5050
lsof -i :3000

# Kill the processes
kill -9 <PID>`}</code></pre>
                </div>
                
                <h4>3. Graceful Shutdown</h4>
                <div className="code-block">
                  <div className="code-header">
                    <span>bash</span>
                    <button 
                      className="copy-button" 
                      onClick={() => copyToClipboard(`# Kill the client
pkill -f "react-scripts start"

# Kill the server
pkill -f "node.*server.js"

# Kill the log generator
pkill -f "node.*eve-log-generator"`)}
                    >
                      {copiedCommand === `# Kill the client
pkill -f "react-scripts start"

# Kill the server
pkill -f "node.*server.js"

# Kill the log generator
pkill -f "node.*eve-log-generator"` ? (
                        <span className="copied">Copied!</span>
                      ) : (
                        <><FiCopy /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre><code>{`# Kill the client
pkill -f "react-scripts start"

# Kill the server
pkill -f "node.*server.js"

# Kill the log generator
pkill -f "node.*eve-log-generator"`}</code></pre>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div className="download-features" variants={itemVariants}>
            <h2>Features</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="feature-card"
                  whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Download; 