// components/ChatEnvironment.js
import React from 'react';

const ChatEnvironment = ({ mentor, children }) => {
  const getEnvironmentClass = () => {
    switch (mentor.id) {
      case 'musashi': return 'japanese-bg';
      case 'rumi': return 'persian-bg';
      case 'chanakya': return 'indian-bg';
      default: return 'chat-environment';
    }
  };

  const getEnvironmentPattern = () => {
    switch (mentor.id) {
      case 'musashi':
        return (
          <div className="environment-overlay">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="bamboo" x="0" y="0" width="20" height="40" patternUnits="userSpaceOnUse">
                  <line x1="10" y1="0" x2="10" y2="40" stroke="#8b2635" strokeWidth="0.5" opacity="0.1"/>
                  <circle cx="10" cy="10" r="1" fill="#8b2635" opacity="0.1"/>
                  <circle cx="10" cy="30" r="1" fill="#8b2635" opacity="0.1"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#bamboo)"/>
            </svg>
          </div>
        );
      case 'rumi':
        return (
          <div className="environment-overlay">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="roses" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                  <circle cx="12.5" cy="12.5" r="2" fill="#9caf88" opacity="0.1"/>
                  {/* Corrected 'sage' to a valid hex or rgba for fill */}
                  <path d="M10 10 Q12.5 8 15 10 Q13 15 12.5 17 Q12 15 10 10" fill="#8A9A5B" opacity="0.08"/> 
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#roses)"/>
            </svg>
          </div>
        );
      case 'chanakya':
        return (
          <div className="environment-overlay">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="lotus" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="15" cy="15" r="3" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.1"/>
                  <path d="M12 15 Q15 12 18 15 Q15 18 12 15" fill="#d4af37" opacity="0.06"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#lotus)"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`chat-environment ${getEnvironmentClass()} relative w-full h-full`} 
      style={{
        backgroundImage: 'url("sanctuary_inside_bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background overlay for patterns */}
      <div className="absolute inset-0 z-0 opacity-40"> {/* Adjust opacity as needed */}
        {getEnvironmentPattern()}
      </div>
      
      {/* Children content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default ChatEnvironment;