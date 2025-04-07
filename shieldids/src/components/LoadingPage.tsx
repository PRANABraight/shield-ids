import React from 'react';

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="geometric-lines"></div>
      <div className="geometric-loader">
        <div className="hex-grid">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="hex"
              style={{
                '--delay': i,
                transform: `translateZ(${Math.sin(i * 0.5) * 20}px)`
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
      <div className="loading-text">
        Initializing NetGuard
      </div>
    </div>
  );
};

export default LoadingPage;
