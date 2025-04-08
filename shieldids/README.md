# NetGuard IDS - Network Intrusion Detection System

![Shield IDS Logo](./src/assets/NetGuard-removebg-preview.png)

## Overview

Shield IDS (formerly NetGuard) is a modern, user-friendly Intrusion Detection System designed to protect networks from malicious activities. The platform provides real-time monitoring, comprehensive analytics, and scalable security solutions for organizations of all sizes.

## Features

### 🔒 Security Monitoring
- Real-time threat detection and monitoring
- Comprehensive analytics dashboard
- Advanced packet inspection

### 🚀 User Experience
- Modern, responsive UI built with React and Framer Motion
- Interactive visualizations for security data
- Personalized user profiles and settings

### 🔧 Technical Features
- User authentication with Firebase
- Profile management
- Customizable security settings
- Multi-platform support (Windows, Linux, macOS)
- Scalable architecture for enterprise deployments

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shield-ids.git
   cd shield-ids
   ```

2. Install dependencies:
   ```bash
   cd shieldids
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Add your Firebase configuration to `src/components/auth/firebase.js`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

### Account Management
- Register a new account or login with existing credentials
- Update your profile information in the Profile page
- Manage security settings like password changes and two-factor authentication

### Dashboard
- View real-time security alerts and statistics
- Monitor network traffic patterns
- Analyze threat intelligence data

### Download & Installation
- Download the Shield IDS engine for your platform
- Follow the setup instructions to install Suricata and configure the system
- Verify installation using provided commands

## Development

### Project Structure
- `/src` - Source code
  - `/components` - React components
  - `/pages` - Page components
  - `/hooks` - Custom React hooks
  - `/services` - API and service integrations
  - `/assets` - Static assets like images
  - `/lib` - Utility functions and helpers

### Technology Stack
- React
- TypeScript
- Framer Motion for animations
- Firebase (Authentication, Firestore)
- Vite as build tool
- Tailwind CSS

## Contributing

We welcome contributions to Shield IDS! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Suricata](https://suricata.io/) - The powerful open source IDS/IPS engine
- [React](https://reactjs.org/) - Front-end library
- [Firebase](https://firebase.google.com/) - Backend-as-a-Service
- All contributors and security researchers who have helped improve this project
