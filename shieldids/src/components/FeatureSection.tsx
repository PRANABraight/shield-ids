// FeaturesSection.tsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Feature.css';
// Import images directly
import realtimeImg from '../assets/services/service-2.png';
import comprehensiveImg from '../assets/services/service-3.png';
import scalableImg from '../assets/services/service-1.png';

const features = [
  {
    id: 1,
    className: "feature-1",
    title: "Real-Time Threat Detection",
    description: "Continuously monitors network traffic to identify and respond to potential threats instantly.",
    backgroundImage: realtimeImg
  },
  {
    id: 2,
    className: "feature-2",
    title: "Comprehensive Coverage",
    description: "Protects against a wide range of attack vectors, including malware, phishing, and zero-day exploits.",
    backgroundImage: comprehensiveImg
  },
  {
    id: 3,
    className: "feature-3",
    title: "Scalable Architecture",
    description: "Designed to scale seamlessly with your organization's growth, ensuring consistent security performance.",
    backgroundImage: scalableImg
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8,
            delay: index * 0.2 
          }
        }
      }}
      whileHover={{ 
        translateY: -10,
        transition: { duration: 0.3 }
      }}
      className={`feature-card ${feature.className}`}
      style={{
        backgroundImage: `url(${feature.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="feature-overlay" />
      <div className="feature-content">
        <h3>
          <span className="feature-icon" />
          {feature.title}
        </h3>
        <p>{feature.description}</p>
        <div className="feature-details">
          <span className="learn-more">Learn More →</span>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="features-section" id="features">
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Empowering Organizations with Advanced Intrusion Detection
      </motion.h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
