// src/About.tsx
import React, { useState, useEffect } from 'react';
import './about.css';
import jo from '../assets/josaiah.jpg';
import po from '../assets/pranab.jpg';

const About = () => {
    const [imageErrors, setImageErrors] = useState({ jo: false, po: false });

    const handleImageError = (imageName: 'jo' | 'po') => {
        setImageErrors(prev => ({ ...prev, [imageName]: true }));
    };

    const scrollToSection = (elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const createParticle = () => {
            const particles = document.querySelector('.about-hero');
            if (!particles) return;

            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation
            particle.style.animation = `
                float ${3 + Math.random() * 4}s linear infinite,
                fade ${3 + Math.random() * 4}s ease-in-out infinite
            `;
            
            particles.appendChild(particle);
            setTimeout(() => particle.remove(), 5000);
        };

        const interval = setInterval(createParticle, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="about-section">
            <div className="about-content">
                <div className="about-hero">
                    <h1 className="about-title">About NetGuard</h1>
                    <p className="about-subtitle">
                        Pioneering the Future of Cybersecurity<br/>
                        through Intelligent Threat Detection and<br/>
                        Proactive Defense Systems
                    </p>
                    <button 
                        className="discover-btn"
                        onClick={() => scrollToSection('story')}
                    >
                        Discover Our Story
                    </button>
                </div>

                <div id="story" className="content-section">
                    <h2>Our Story</h2>
                    <p>
                        Founded in 2024, NetGuard emerged from a passionate commitment 
                        to cybersecurity excellence. Our journey began with a simple 
                        yet powerful vision: to create innovative solutions that protect 
                        digital assets in an increasingly connected world.
                    </p>
                    <p>
                        Today, we specialize in cutting-edge Intrusion Detection Systems 
                        that combine AI-powered analytics with real-time threat intelligence, 
                        safeguarding organizations across various sectors from evolving 
                        cyber threats.
                    </p>
                </div>

                <div className="content-section">
                    <h2>Our Team</h2>
                    <div className="team-grid">
                        {[
                            { name: 'Josaiah Murfeal Dkhar', role: 'PG-Scholar', image: jo, key: 'jo' },
                            { name: 'Pranab Rai', role: 'PG-Scholar', image: po, key: 'po' }
                        ].map((member) => (
                            <div className="team-card" key={member.key}>
                                <div className="team-image-container">
                                    {!imageErrors[member.key as 'jo' | 'po'] ? (
                                        <img 
                                            src={member.image}
                                            alt={member.name}
                                            className="team-image"
                                            onError={() => handleImageError(member.key as 'jo' | 'po')}
                                        />
                                    ) : (
                                        <div className="image-error">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    )}
                                </div>
                                <h3>{member.name}</h3>
                                <p>{member.role}<br />Christ University</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
