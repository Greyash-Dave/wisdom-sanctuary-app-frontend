// components/MentorIntroduction.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MentorIntroduction = ({ mentor, onContinue }) => {
  const [showContent, setShowContent] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setShowContent(true);
    const step1Timer = setTimeout(() => setCurrentStep(1), 1200);
    const step2Timer = setTimeout(() => setCurrentStep(2), 2400);
    const step3Timer = setTimeout(() => setCurrentStep(3), 3600);

    return () => {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
    };
  }, []);

  const getMentorAccent = () => {
    switch (mentor.id) {
      case 'musashi': return 'text-red-400';
      case 'rumi': return 'text-emerald-400';
      case 'chanakya': return 'text-amber-400';
      default: return 'text-blue-400';
    }
  };

  const getMentorBorder = () => {
    switch (mentor.id) {
      case 'musashi': return 'border-red-500/30';
      case 'rumi': return 'border-emerald-500/30';
      case 'chanakya': return 'border-amber-500/30';
      default: return 'border-blue-500/30';
    }
  };

  const getEnvironmentElements = () => {
    switch (mentor.id) {
      case 'musashi':
        return ['🌸', '⚔️', '🏯', '🎋', '🌊', '🗻'];
      case 'rumi':
        return ['🌹', '📜', '🕊️', '✨', '🌟', '💫'];
      case 'chanakya':
        return ['🏛️', '📚', '🪷', '🕉️', '⚖️', '💎'];
      default:
        return ['✨', '🌟', '💫'];
    }
  };

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Sanctuary Background - Same as Assessment */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("sanctuary_bg.jpg")',
          backgroundSize: 'cover'
        }}
        animate={{
          x: [0, 1, -1, 0, 2, -2, 0],
          y: [0, -1, 1, 0, -2, 2, 0],
          scale: [1, 1.002, 0.998, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating Cultural Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {getEnvironmentElements().map((element, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10 text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }}
          >
            {element}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center flex flex-col items-center justify-center space-y-6">

          {/* Mentor Avatar */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.5, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                rotate: [0, 1, -1, 0],
                scale: [1, 1.01, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Glowing Ring */}
              <motion.div
                className={`absolute inset-0 rounded-full ${getMentorBorder()} border-2`}
                style={{ padding: '15px' }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              <div className="relative bg-black/30 backdrop-blur-lg rounded-full p-6 border border-white/25">
                <motion.div 
                  className="text-6xl md:text-7xl"
                  // Consolidated all animations to this element
                  animate={currentStep >= 0 ? { 
                    scale: [1, 1.1, 1],
                    rotateY: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {mentor.avatar}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mentor Name and Title - Compact */}
          <AnimatePresence>
            {currentStep >= 1 && (
              <motion.div
                className="flex-shrink-0 space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="inline-block bg-black/30 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/25"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                >
                  <motion.h2 
                    className={`font-display text-3xl md:text-4xl font-bold text-white drop-shadow-lg ${getMentorAccent()}`}
                    animate={{ 
                      textShadow: [
                        '0 0 20px rgba(255, 255, 255, 0.5)',
                        '0 0 25px rgba(255, 255, 255, 0.7)',
                        '0 0 20px rgba(255, 255, 255, 0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {mentor.name}
                  </motion.h2>
                </motion.div>
                <motion.p 
                  className="font-serif text-lg md:text-xl text-white/90 drop-shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {mentor.title}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quote Section - Condensed */}
          <AnimatePresence>
            {currentStep >= 2 && (
              <motion.div
                className="flex-1 min-h-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/25 relative overflow-hidden max-w-3xl w-full"
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Quote background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <text x="10" y="30" fontSize="30" fill="white" opacity="0.1">"</text>
                      <text x="70" y="80" fontSize="30" fill="white" opacity="0.1">"</text>
                    </svg>
                  </div>

                  <motion.blockquote 
                    className="font-serif text-lg md:text-xl text-white italic mb-4 leading-relaxed relative z-10 drop-shadow-lg"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    "{mentor.quote}"
                  </motion.blockquote>

                  <motion.p 
                    className="text-white/80 text-base md:text-lg mb-4 leading-relaxed relative z-10 drop-shadow-sm"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {mentor.description}
                  </motion.p>

                  {/* Specialties - Compact */}
                  <motion.div 
                    className="flex flex-wrap justify-center gap-2 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {mentor.specialties.map((specialty, index) => (
                      <motion.span
                        key={index}
                        className="bg-gradient-to-r bg-black/30 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-serif border border-white/30 shadow-lg"
                        initial={{ opacity: 0, scale: 0, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: 0.6 + index * 0.1, 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: "rgba(255, 255, 255, 0.25)"
                        }}
                      >
                        {specialty}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Continue Button - Compact */}
          <AnimatePresence>
            {currentStep >= 3 && (
              <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1.1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
              >
                <motion.button
                  onClick={onContinue}
                  className="group relative inline-flex items-center px-8 py-3 text-lg font-serif font-semibold text-white transition-all duration-300 rounded-full overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${mentor.id === 'musashi' ? '#dc2626, #7f1d1d' : mentor.id === 'rumi' ? '#059669, #064e3b' : '#d97706, #92400e'})`
                  }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 8px 25px rgba(0, 0, 0, 0.3)',
                      '0 12px 35px rgba(0, 0, 0, 0.4)',
                      '0 8px 25px rgba(0, 0, 0, 0.3)'
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity },
                    scale: { duration: 0.2 },
                    y: { duration: 0.2 }
                  }}
                >
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: -100 }}
                    animate={{ x: 300 }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Begin Learning with {mentor.name}</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle, ${mentor.id === 'musashi' ? 'rgba(220, 38, 38, 0.3)' : mentor.id === 'rumi' ? 'rgba(5, 150, 105, 0.3)' : 'rgba(217, 119, 6, 0.3)'} 0%, transparent 70%)`
                    }}
                  />
                </motion.button>

                {/* Floating action hint */}
                <motion.p
                  className="text-white/70 text-sm mt-4"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to start your wisdom journey
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cultural Philosophy Badge */}
          <motion.div
            className="absolute top-8 right-8 bg-black/30 backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/25"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : 50 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <p className="text-white/90 text-sm font-serif">
              <span className="opacity-60">{mentor.culture}</span>
              <br />
              <span className={`font-semibold ${getMentorAccent()}`}>
                {mentor.philosophy}
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MentorIntroduction;