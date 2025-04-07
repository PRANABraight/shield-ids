import React, { useState } from 'react';
import { motion } from 'framer-motion';
import paper from '../assets/IDS (1).pdf';

const Research = () => {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen  bg-gradient-to-b from-black to-indigo-950 text-white overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(0,0,0,0))]" />
            
            <div className="container mx-auto px-4 py-24 relative z-10">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto space-y-12"
                >
                    <header className="text-center mb-16 mt-7">
                        <motion.h1 
                            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Redefining Cybersecurity with Intelligent Threat Detection
                        </motion.h1>
                        
                        <motion.div 
                            className="text-xl mb-4"
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <span className="font-medium text-blue-300">Pranab Rai</span>,{' '}
                            <span className="font-medium text-blue-300">Josaiah Murfeal Dkhar</span>,{' '}
                            <span className="font-medium text-blue-300">Dr. Tegil John</span>
                        </motion.div>
                        
                        <motion.p 
                            className="text-gray-400"
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Department of Computer Science, Christ University, Bengaluru, India
                        </motion.p>
                    </header>

                    <motion.section 
                        className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors duration-300"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Abstract</h2>
                        <p className="text-gray-200 leading-relaxed">
                            Intrusion Detection Systems (IDS) are essential for safeguarding modern networks against sophisticated cyber threats. Traditional IDS approaches, such as signature-based and anomaly-based methods, struggle with scalability and adaptability. This research introduces RNN-IDS, a deep learning-based framework that enhances detection accuracy and reduces false positives. By leveraging Recurrent Neural Networks (RNNs) and training on the NSL-KDD dataset, the proposed model outperforms traditional classifiers in both binary and multiclass intrusion detection tasks.
                        </p>
                    </motion.section>

                    <motion.section 
                        className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors duration-300"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Introduction</h2>
                        <p className="text-gray-200 leading-relaxed">
                            As cyber threats evolve, conventional IDS methods often fail to adapt to new attack patterns due to their reliance on predefined signatures. Machine Learning (ML) and Deep Learning (DL) techniques have shown significant promise in addressing these challenges by enabling real-time and adaptive threat detection. This study presents RNN-IDS, a robust intrusion detection framework that efficiently classifies network traffic anomalies while maintaining high performance in handling imbalanced datasets and high-dimensional traffic data. The research highlights the potential of deep learning-based IDS in securing IoT, IIoT, and industrial networks.
                        </p>
                    </motion.section>

                    <motion.section 
                        className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors duration-300"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Key Research Findings</h2>
                        <h3 className="text-xl font-semibold mb-3 text-blue-200">Proposed Methodology: RNN-IDS Framework</h3>
                        <ul className="list-disc pl-6 text-gray-200 space-y-4">
                            <li>
                                <strong className="text-blue-200">Data Preprocessing:</strong>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>Uses the NSL-KDD dataset with 41 network traffic features.</li>
                                    <li>Converts categorical data into numerical values.</li>
                                    <li>Normalizes feature values for better training efficiency.</li>
                                </ul>
                            </li>
                            <li>
                                <strong className="text-blue-200">RNN Model Architecture:</strong>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>Input Layer: Converts feature vectors into a high-dimensional representation.</li>
                                    <li>Hidden Layers: Employ recurrent units (LSTM/GRU) to capture temporal dependencies in network traffic.</li>
                                    <li>Output Layer: Uses Softmax activation for binary and multiclass classification.</li>
                                </ul>
                            </li>
                        </ul>
                    </motion.section>

                    <motion.section 
                        className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-blue-400">Performance Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse bg-black/50">
                                <thead>
                                    <tr className="bg-black/70">
                                        <th className="px-6 py-3 border border-gray-700 text-blue-200">Model</th>
                                        <th className="px-6 py-3 border border-gray-700 text-blue-200">Accuracy (%)</th>
                                        <th className="px-6 py-3 border border-gray-700 text-blue-200">False Positive Rate (%)</th>
                                        <th className="px-6 py-3 border border-gray-700 text-blue-200">Detection Rate (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr 
                                        className={`hover:bg-black/40 transition-colors ${hoveredRow === 0 ? 'bg-blue-500/10' : ''}`}
                                        onMouseEnter={() => setHoveredRow(0)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                    >
                                        <td className="px-6 py-3 border border-gray-700">Random Forest</td>
                                        <td className="px-6 py-3 border border-gray-700">75.4</td>
                                        <td className="px-6 py-3 border border-gray-700">12.6</td>
                                        <td className="px-6 py-3 border border-gray-700">76.2</td>
                                    </tr>
                                    <tr 
                                        className={`hover:bg-black/40 transition-colors ${hoveredRow === 1 ? 'bg-blue-500/10' : ''}`}
                                        onMouseEnter={() => setHoveredRow(1)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                    >
                                        <td className="px-6 py-3 border border-gray-700">SVM</td>
                                        <td className="px-6 py-3 border border-gray-700">78.1</td>
                                        <td className="px-6 py-3 border border-gray-700">11.3</td>
                                        <td className="px-6 py-3 border border-gray-700">79.5</td>
                                    </tr>
                                    <tr 
                                        className={`hover:bg-black/40 transition-colors ${hoveredRow === 2 ? 'bg-blue-500/10' : ''}`}
                                        onMouseEnter={() => setHoveredRow(2)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                    >
                                        <td className="px-6 py-3 border border-gray-700">ANN</td>
                                        <td className="px-6 py-3 border border-gray-700">81.7</td>
                                        <td className="px-6 py-3 border border-gray-700">9.8</td>
                                        <td className="px-6 py-3 border border-gray-700">82.6</td>
                                    </tr>
                                    <tr 
                                        className={`hover:bg-black/40 transition-colors ${hoveredRow === 3 ? 'bg-blue-500/10' : ''}`}
                                        onMouseEnter={() => setHoveredRow(3)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                    >
                                        <td className="px-6 py-3 border border-gray-700">RNN-IDS</td>
                                        <td className="px-6 py-3 border border-gray-700">99.81</td>
                                        <td className="px-6 py-3 border border-gray-700">1.2</td>
                                        <td className="px-6 py-3 border border-gray-700">98.9</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.section>

                    <motion.section 
                        className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors duration-300"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Future Research Directions</h2>
                        <ul className="list-disc pl-6 text-gray-200 space-y-2">
                            <li>Integrating IDS with Blockchain for tamper-proof logging.</li>
                            <li>Federated Learning for IDS to enable decentralized training across multiple network nodes.</li>
                            <li>Explainable AI (XAI) in IDS for better transparency and trust in IDS decision-making.</li>
                            <li>Optimized Lightweight IDS Models for IoT and IIoT networks with limited computational resources.</li>
                        </ul>
                    </motion.section>

                    <motion.div 
                        className="flex justify-center mt-12"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            href={paper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                                     font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300
                                     flex items-center gap-2"
                        >
                            <span>Download Full Paper</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Research;
