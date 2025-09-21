import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeScreen = ({ onStart = () => console.log('Journey begins...') }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showBars, setShowBars] = useState(true);

  const handleBeginJourney = () => {
    setIsTransitioning(true);
    
    // Remove bars first to signify transition from spectator to participant
    setTimeout(() => {
      setShowBars(false);
    }, 500);
    
    // Call the actual start function after animation
    setTimeout(() => {
      onStart();
    }, 2000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Cinematic Black Bars with exit animation */}
      <AnimatePresence>
        {showBars && (
          <>
            <motion.div 
              className="absolute top-0 left-0 right-0 h-12 bg-black z-50"
              exit={{ y: -48 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-12 bg-black z-50"
              exit={{ y: 48 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Background Image with Camera Shake Effect */}
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
      
      {/* Main Content Container with Glassmorphism Background */}
      <div className="relative z-10 h-full flex items-center justify-center px-4" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <motion.div 
          className="text-center max-w-5xl bg-black/30 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          
          {/* Title with floating animation */}
          <motion.div 
            className="mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ 
              y: [0, -8, 0],
              opacity: 1,
            }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1 }
            }}
          >
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-wider drop-shadow-2xl" 
              style={{ fontFamily: 'Georgia, serif' }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0px 0px 30px rgba(255, 255, 255, 0.8)" 
              }}
              animate={isTransitioning ? {
                scale: [1, 1.2, 1],
                textShadow: "0px 0px 40px rgba(255, 255, 255, 1)"
              } : {}}
            >
              WISDOM
            </motion.h1>
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-amber-100 tracking-widest drop-shadow-2xl" 
              style={{ fontFamily: 'Georgia, serif' }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0px 0px 30px rgba(255, 255, 255, 0.6)" 
              }}
              animate={isTransitioning ? {
                scale: [1, 1.2, 1],
                textShadow: "0px 0px 40px rgba(255, 255, 255, 0.8)"
              } : {}}
            >
              SEEKERS
            </motion.h2>
          </motion.div>
          
          {/* Animated Emojis */}
          <motion.div 
            className="text-4xl md:text-5xl mb-8 space-x-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.6 }}
          >
            <motion.span
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >📜</motion.span>
            <motion.span
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                delay: 0.3
              }}
            >✨</motion.span>
            <motion.span
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                delay: 0.6,
                ease: "easeInOut"
              }}
            >🧘‍♀️</motion.span>
          </motion.div>
          
          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-lg" 
            style={{ fontFamily: 'Georgia, serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            whileHover={{ scale: 1.02 }}
          >
            Journey with history's greatest minds to discover inner strength, 
            clarity, and wisdom for modern challenges.
          </motion.p>
          
          {/* Features Section with Glassmorphism */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.h3 
              className="text-xl md:text-2xl font-semibold text-white mb-8 tracking-wide drop-shadow-lg" 
              style={{ fontFamily: 'Georgia, serif' }}
              animate={{ 
                textShadow: ["0px 0px 10px rgba(255, 255, 255, 0.3)", "0px 0px 20px rgba(255, 255, 255, 0.6)", "0px 0px 10px rgba(255, 255, 255, 0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              What Makes This Different?
            </motion.h3>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
              {[
                { icon: "🎭", text: "Historical Mentors" },
                { icon: "🔒", text: "Complete Privacy" },
                { icon: "🌱", text: "Growth-Focused" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-xl border border-white/25 shadow-lg"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ 
                    y: [0, -3, 0],
                    opacity: 1
                  }}
                  transition={{ 
                    y: { duration: 2.5, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" },
                    opacity: { delay: 2 + index * 0.2, duration: 0.6 }
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    boxShadow: "0px 8px 25px rgba(255, 255, 255, 0.2)"
                  }}
                >
                  <motion.span 
                    className="text-2xl"
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.6 }}
                  >
                    {feature.icon}
                  </motion.span>
                  <span className="text-white font-semibold drop-shadow-lg">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Call to Action Button with Glassmorphism */}
          <motion.div className="relative">
            <motion.button
              onClick={handleBeginJourney}
              disabled={isTransitioning}
              className="z-10 bg-white/20 backdrop-blur-md text-white font-bold py-6 px-12 rounded-full text-2xl shadow-2xl border-2 border-white/40 relative overflow-hidden cursor-pointer hover:cursor-pointer"
              style={{ fontFamily: 'Georgia, serif' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isTransitioning ? {
                scale: [1, 1.3, 1.6, 2],
                opacity: [1, 1, 1, 0],
                background: "rgba(255, 255, 255, 0.4)"
              } : {
                scale: 1,
                opacity: 1,
                y: [0, -6, 0]
              }}
              transition={isTransitioning ? 
                { duration: 2, ease: "easeInOut" } : 
                { 
                  scale: { delay: 2.5, duration: 0.8, type: "spring", bounce: 0.4 },
                  opacity: { delay: 2.5, duration: 0.8 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }
              }
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0px 15px 40px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Inner glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 via-white/30 to-white/20"
                animate={{
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                animate={{ x: [-150, 350] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
              />
              
              <motion.span
                className="relative z-10 drop-shadow-2xl"
                animate={isTransitioning ? { 
                  fontSize: ["1.5rem", "1.75rem", "2rem"],
                  letterSpacing: ["0.05em", "0.1em", "0.15em"]
                } : {}}
              >
                🎬 Begin Your Journey ✨
              </motion.span>
            </motion.button>
            
            {/* Pulsing ring around button */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{
                scale: [1, 1.15, 1.3],
                opacity: [0.6, 0.3, 0]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Transition overlay effect */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                className="fixed inset-0 z-50 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Radial light burst from button */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 4, opacity: [0, 0.8, 0] }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  style={{
                    background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 70%)"
                  }}
                />
                
                {/* Sparkle burst effect */}
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-white rounded-full shadow-lg"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 500],
                      y: [0, (Math.random() - 0.5) * 500],
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 0.8,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;