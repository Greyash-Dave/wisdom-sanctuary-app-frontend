// components/Assessment.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assessmentQuestions, mentors } from '../data/mentors';

const Assessment = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showProgress, setShowProgress] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setShowProgress(true);
  }, []);

  const calculateMentorMatch = (answers) => {
    // Simple matching logic - in real app, this would be more sophisticated
    const preferences = Object.values(answers);
    
    if (preferences.includes('strategy') || preferences.includes('discipline') || preferences.includes('focus')) {
      return mentors[0]; // Musashi
    } else if (preferences.includes('emotional') || preferences.includes('acceptance') || preferences.includes('spiritual')) {
      return mentors[1]; // Rumi
    } else {
      return mentors[2]; // Chanakya
    }
  };

  const handleAnswer = (answer) => {
    setSelectedOption(answer);
    
    // Delay to show selection feedback
    setTimeout(() => {
      const newAnswers = { ...answers, [assessmentQuestions[currentQuestion].id]: answer };
      setAnswers(newAnswers);

      if (currentQuestion < assessmentQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Calculate mentor match based on answers
        const mentorMatch = calculateMentorMatch(newAnswers);
        setTimeout(() => onComplete(mentorMatch), 800);
      }
    }, 600);
  };

  const question = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Enhanced Background */}
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
              
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
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
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          >
            {['🧠', '💡', '🎯', '✨', '🔮', '📚', '🌟', '⚡'][i]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          
          {/* Header with Progress */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block bg-black/30 backdrop-blur-lg rounded-full px-6 py-2 border border-white/20 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                Finding Your Wisdom Guide
              </h2>
            </motion.div>
            
            <motion.p 
              className="text-white/80 text-lg mb-6 drop-shadow-lg"
              animate={{ opacity: showProgress ? 1 : 0 }}
            >
              Question {currentQuestion + 1} of {assessmentQuestions.length}
            </motion.p>

            {/* Enhanced Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-full h-3 border border-white/30 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                </motion.div>
              </div>
              <div className="flex justify-between text-white/60 text-sm mt-2">
                <span>Start</span>
                <span>Complete</span>
              </div>
            </div>
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              className="bg-black/30 backdrop-blur-lg rounded-3xl p-8 md:p-10 shadow-2xl border border-white/25 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="wisdom-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="2" fill="white" opacity="0.3"/>
                      <path d="M5 10 Q10 5 15 10 Q10 15 5 10" fill="white" opacity="0.2"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#wisdom-pattern)"/>
                </svg>
              </div>

              <motion.h3 
                className="font-serif text-xl md:text-2xl text-white mb-8 text-center leading-relaxed relative z-10 drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {question.question}
              </motion.h3>

              <div className="space-y-4 relative z-10">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full text-left p-5 md:p-6 rounded-2xl border transition-all duration-300 font-serif text-white relative overflow-hidden group ${
                      selectedOption === option.value
                        ? 'bg-gradient-to-r from-amber-500/30 to-yellow-500/30 border-amber-400/60 shadow-lg shadow-amber-500/20'
                        : 'bg-white/10 backdrop-blur-md border-white/25 hover:bg-white/20 hover:border-white/40'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={selectedOption !== null}
                  >
                    {/* Button shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: -100 }}
                      whileHover={{ x: 300 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Option number */}
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div className="flex-1">
                        <p className="text-base md:text-lg leading-relaxed drop-shadow-sm">
                          {option.text}
                        </p>
                      </div>
                    </div>

                    {/* Selection indicator */}
                    {selectedOption === option.value && (
                      <motion.div
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <motion.div 
            className="flex justify-center mt-8 space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {assessmentQuestions.map((_, index) => (
              <motion.div
                key={index}
                className={`rounded-full transition-all duration-500 ${
                  index < currentQuestion 
                    ? 'w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-500/30' 
                    : index === currentQuestion
                    ? 'w-5 h-5 bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/40'
                    : 'w-3 h-3 bg-white/30 backdrop-blur-sm border border-white/40'
                }`}
                whileHover={{ scale: 1.2 }}
                animate={index === currentQuestion ? { 
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(251, 191, 36, 0.7)',
                    '0 0 0 8px rgba(251, 191, 36, 0)',
                    '0 0 0 0 rgba(251, 191, 36, 0)'
                  ]
                } : {}}
                transition={index === currentQuestion ? { 
                  duration: 1.5, 
                  repeat: Infinity 
                } : {}}
              />
            ))}
          </motion.div>

          {/* Completion Message */}
          {currentQuestion === assessmentQuestions.length - 1 && selectedOption && (
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/30">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="w-12 h-12 mx-auto mb-4 text-emerald-400"
                >
                  ✨
                </motion.div>
                <p className="text-white font-serif text-lg">
                  Assessment complete! Finding your perfect wisdom guide...
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;