// components/MentorAvatar.js
import React, { useState } from 'react';

const MentorAvatar = ({ mentor, isSpeaking }) => {
  const [useImage, setUseImage] = useState(true);

  const getAvatarImage = () => {
    switch (mentor.id) {
      case 'musashi':
        return 'Miyamoto Musashi Avatar.png';
      case 'rumi':
        return 'Jalal ad-Din Rumi Avatar.png';
      case 'chanakya':
        return 'Chanakya Avatar.png';
      default:
        return null;
    }
  };

  const getAvatarSVG = () => {
    switch (mentor.id) {
      case 'musashi':
        return (
          <svg viewBox="0 0 200 280" className={`mentor-avatar ${isSpeaking ? 'speaking-animation avatar-glow' : ''}`}>
            {/* Background circle */}
            <circle cx="100" cy="140" r="90" fill="rgba(139, 38, 53, 0.1)" />
            
            {/* Head */}
            <circle cx="100" cy="80" r="35" fill="#f4c2a1" stroke="#d4af37" strokeWidth="2"/>
            
            {/* Hair */}
            <path d="M65 60 Q100 45 135 60 Q135 45 100 40 Q65 45 65 60" fill="#2c1810"/>
            
            {/* Eyes */}
            <circle cx="90" cy="75" r="3" fill="#2c1810"/>
            <circle cx="110" cy="75" r="3" fill="#2c1810"/>
            
            {/* Nose */}
            <line x1="100" y1="80" x2="100" y2="85" stroke="#d4af37" strokeWidth="1"/>
            
            {/* Mouth */}
            <path d="M95 90 Q100 93 105 90" stroke="#8b2635" strokeWidth="2" fill="none"/>
            
            {/* Body - Traditional Kimono */}
            <rect x="70" y="115" width="60" height="120" fill="#8b2635" rx="10"/>
            <rect x="75" y="120" width="50" height="110" fill="#2c1810" rx="5"/>
            
            {/* Arms */}
            <rect x="45" y="130" width="25" height="60" fill="#8b2635" rx="12" transform="rotate(-15 57.5 160)"/>
            <rect x="130" y="130" width="25" height="60" fill="#8b2635" rx="12" transform="rotate(15 142.5 160)"/>
            
            {/* Hands */}
            <circle cx="50" cy="190" r="8" fill="#f4c2a1"/>
            <circle cx="150" cy="190" r="8" fill="#f4c2a1"/>
            
            {/* Sword */}
            <rect x="145" y="160" width="3" height="40" fill="#silver" transform="rotate(20 146.5 180)"/>
            <rect x="142" y="155" width="9" height="8" fill="#d4af37" transform="rotate(20 146.5 159)"/>
            
            {/* Belt */}
            <rect x="75" y="160" width="50" height="8" fill="#d4af37"/>
          </svg>
        );
        
      case 'rumi':
        return (
          <svg viewBox="0 0 200 280" className={`mentor-avatar ${isSpeaking ? 'speaking-animation avatar-glow' : ''}`}>
            {/* Background circle */}
            <circle cx="100" cy="140" r="90" fill="rgba(156, 175, 136, 0.1)" />
            
            {/* Head */}
            <circle cx="100" cy="80" r="35" fill="#e6c2a6" stroke="#9caf88" strokeWidth="2"/>
            
            {/* Beard */}
            <ellipse cx="100" cy="105" rx="25" ry="15" fill="#f0f0f0"/>
            
            {/* Hair/Turban */}
            <ellipse cx="100" cy="55" rx="35" ry="25" fill="#9caf88"/>
            <ellipse cx="100" cy="50" rx="30" ry="15" fill="#f7f3e9"/>
            
            {/* Eyes */}
            <circle cx="90" cy="72" r="3" fill="#2c1810"/>
            <circle cx="110" cy="72" r="3" fill="#2c1810"/>
            
            {/* Nose */}
            <line x1="100" y1="77" x2="100" y2="82" stroke="#9caf88" strokeWidth="1"/>
            
            {/* Mouth (gentle smile) */}
            <path d="M95 87 Q100 90 105 87" stroke="#8b7355" strokeWidth="2" fill="none"/>
            
            {/* Robes */}
            <ellipse cx="100" cy="180" rx="65" ry="80" fill="#9caf88"/>
            <ellipse cx="100" cy="175" rx="55" ry="70" fill="#sage"/>
            
            {/* Arms */}
            <ellipse cx="65" cy="150" rx="18" ry="35" fill="#9caf88" transform="rotate(-20 65 150)"/>
            <ellipse cx="135" cy="150" rx="18" ry="35" fill="#9caf88" transform="rotate(20 135 150)"/>
            
            {/* Hands in prayer position */}
            <ellipse cx="100" cy="170" rx="12" ry="8" fill="#e6c2a6"/>
            
            {/* Rose */}
            <circle cx="125" cy="145" r="5" fill="#ff6b9d"/>
            <path d="M120 140 Q125 138 130 140 Q128 145 125 147 Q122 145 120 140" fill="#ff8fab"/>
          </svg>
        );
        
      case 'chanakya':
        return (
          <svg viewBox="0 0 200 280" className={`mentor-avatar ${isSpeaking ? 'speaking-animation avatar-glow' : ''}`}>
            {/* Background circle */}
            <circle cx="100" cy="140" r="90" fill="rgba(212, 175, 55, 0.1)" />
            
            {/* Head */}
            <circle cx="100" cy="80" r="35" fill="#d2b48c" stroke="#d4af37" strokeWidth="2"/>
            
            {/* Bald head with top knot */}
            <circle cx="100" cy="50" r="8" fill="#2c1810"/>
            <line x1="100" y1="45" x2="100" y2="35" stroke="#2c1810" strokeWidth="3"/>
            
            {/* Eyes (wise) */}
            <circle cx="90" cy="75" r="3" fill="#2c1810"/>
            <circle cx="110" cy="75" r="3" fill="#2c1810"/>
            <path d="M85 70 Q90 68 95 70" stroke="#8b7355" strokeWidth="1" fill="none"/>
            <path d="M105 70 Q110 68 115 70" stroke="#8b7355" strokeWidth="1" fill="none"/>
            
            {/* Mustache */}
            <path d="M90 85 Q100 88 110 85" stroke="#2c1810" strokeWidth="3" fill="none"/>
            
            {/* Simple robes */}
            <rect x="65" y="115" width="70" height="130" fill="#d4af37" rx="15"/>
            <rect x="70" y="120" width="60" height="120" fill="#f7f3e9" rx="10"/>
            
            {/* Arms */}
            <ellipse cx="55" cy="145" rx="15" ry="30" fill="#d4af37" transform="rotate(-10 55 145)"/>
            <ellipse cx="145" cy="145" rx="15" ry="30" fill="#d4af37" transform="rotate(10 145 145)"/>
            
            {/* Hands */}
            <circle cx="50" cy="175" r="8" fill="#d2b48c"/>
            <circle cx="150" cy="175" r="8" fill="#d2b48c"/>
            
            {/* Scroll */}
            <rect x="140" y="160" width="20" height="30" fill="#f7f3e9" rx="2"/>
            <line x1="142" y1="165" x2="158" y2="165" stroke="#8b7355" strokeWidth="1"/>
            <line x1="142" y1="170" x2="158" y2="170" stroke="#8b7355" strokeWidth="1"/>
            <line x1="142" y1="175" x2="158" y2="175" stroke="#8b7355" strokeWidth="1"/>
            
            {/* Sacred thread */}
            <path d="M85 120 Q100 115 115 120 Q100 250 85 120" stroke="#f7f3e9" strokeWidth="2" fill="none"/>
          </svg>
        );
        
      default:
        return null;
    }
  };

  const imageSrc = getAvatarImage();

  return (
    <div className="flex justify-center">
      {useImage && imageSrc ? (
        <img
          src={imageSrc}
          alt={`${mentor.name} Avatar`}
          className={`mentor-avatar ${isSpeaking ? 'speaking-animation avatar-glow' : ''}`}
          style={{
            width: '200px',
            height: '280px',
            objectFit: 'contain',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease'
          }}
          onError={() => {
            console.log(`PNG not found: ${imageSrc}, falling back to SVG`);
            setUseImage(false);
          }}
        />
      ) : (
        getAvatarSVG()
      )}
    </div>
  );
};

export default MentorAvatar;