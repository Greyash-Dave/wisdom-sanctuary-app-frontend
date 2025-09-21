// components/ChatInterface.js
import React, { useState, useEffect, useRef } from 'react';
import ChatEnvironment from './ChatEnvironment';
import MentorAvatar from './MentorAvatar';

const ChatInterface = ({ mentor, onBack }) => {
  const [messages, setMessages] = useState([
    {
      type: 'mentor',
      content: `Greetings, seeker. I am ${mentor.name}. I sense you carry burdens that many before you have faced. Tell me, what weighs most heavily on your mind today?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mentorSpeaking, setMentorSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Backend API configuration
//   const API_BASE_URL = 'http://localhost:5000'; // Adjust this to your Flask server URL
   const API_BASE_URL = '  https://wisdom-sanctuary-app-backend-production.up.railway.app';

  // Map mentor IDs to backend mentor options
  const getMentorOption = (mentorId) => {
    const mentorMap = {
      'musashi': 0,
      'rumi': 1, 
      'chanakya': 2
    };
    return mentorMap[mentorId] !== undefined ? mentorMap[mentorId] : 0;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const callBackendAPI = async (question, mentorOption) => {
    try {
      const response = await fetch(`${API_BASE_URL}/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          mentor_option: mentorOption
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.response;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);
    setError(null);

    try {
      setMentorSpeaking(true);
      
      // Get the mentor option based on the current mentor
      const mentorOption = getMentorOption(mentor.id);
      
      // Call the backend API
      const response = await callBackendAPI(currentInput, mentorOption);

      const mentorMessage = {
        type: 'mentor',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, mentorMessage]);
      setIsTyping(false);
      
      // Stop speaking animation after message appears
      setTimeout(() => setMentorSpeaking(false), 1000);

    } catch (error) {
      setIsTyping(false);
      setMentorSpeaking(false);
      setError(error.message);
      
      // Add error message to chat
      const errorMessage = {
        type: 'mentor',
        content: `I apologize, but I'm having trouble connecting to my wisdom right now. ${error.message}. Please try again.`,
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getQuickStarters = () => {
    switch (mentor.id) {
      case 'musashi':
        return [
          { text: "About discipline", message: "I'm struggling with staying disciplined in my daily routine." },
          { text: "Need focus", message: "I feel overwhelmed and need to focus better." }
        ];
      case 'rumi':
        return [
          { text: "Self-acceptance", message: "I'm having trouble accepting myself and my flaws." },
          { text: "Emotional healing", message: "I'm going through emotional pain right now." }
        ];
      case 'chanakya':
        return [
          { text: "Decision making", message: "I have an important decision to make but I'm confused." },
          { text: "Life strategy", message: "I need practical advice for handling life challenges." }
        ];
      default:
        return [];
    }
  };

  return (
    <ChatEnvironment mentor={mentor}>
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Header - Fixed height */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-sepia/20 p-4 flex-shrink-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={onBack}
              className="text-sepia hover:text-sepia/70 transition-colors font-serif"
            >
              ← Back to Journey
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{mentor.avatar}</span>
              <div className="text-center">
                <h3 className="font-display font-semibold text-sepia">{mentor.name}</h3>
                <p className="text-sm text-sepia/70">{mentor.philosophy}</p>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mt-2 rounded relative">
            <span className="block sm:inline">Connection Error: {error}</span>
            <button
              onClick={() => setError(null)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="sr-only">Dismiss</span>
              ×
            </button>
          </div>
        )}

        {/* Main Content Area - Flex container */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Avatar Sidebar - Fixed width, hidden on mobile */}
          <div className="hidden lg:flex lg:w-80 bg-white/50 backdrop-blur-sm border-r border-sepia/10 p-6 flex-col items-center justify-center flex-shrink-0">
            <div className="flex flex-col items-center">
              <MentorAvatar mentor={mentor} isSpeaking={mentorSpeaking || isTyping} />
              <div className="text-center mt-4">
                <p className="font-display text-lg font-semibold text-sepia mb-2">
                  {mentor.name}
                </p>
                <div className="flex flex-wrap justify-center gap-1">
                  {mentor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-white/20 text-sepia px-2 py-1 rounded-full text-xs font-serif"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                {(isTyping || mentorSpeaking) && (
                  <div className="mt-4 text-center">
                    <p className="text-sepia/60 font-serif text-sm italic">
                      {mentor.name} is reflecting...
                    </p>
                    <div className="flex justify-center space-x-1 mt-2">
                      <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gold rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-gold rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Messages and Input Area - Flex container */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Messages Area - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(139, 69, 19, 0.3) rgba(0,0,0,0.1)' }}>
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} message-appear`}
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className="flex max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                      {/* Mentor avatar on mobile */}
                      {message.type === 'mentor' && (
                        <div className="lg:hidden mr-3 mt-2 flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-sepia/20 flex items-center justify-center text-lg">
                            {mentor.avatar}
                          </div>
                        </div>
                      )}
                      
                      <div className={`${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-blue-100/90 to-blue-50/90 text-gray-800 rounded-l-xl rounded-tr-xl border border-blue-200/50'
                            : message.isError
                            ? 'bg-red-50/80 backdrop-blur-md text-red-800 rounded-r-xl rounded-tl-xl border border-red-200/50 shadow-lg'
                            : 'bg-white/80 backdrop-blur-md text-sepia rounded-r-xl rounded-tl-xl border border-white/50 shadow-lg'
                        } p-4`}>
                        {message.type === 'mentor' && (
                          <div className="hidden lg:flex items-center space-x-2 mb-3 pb-2 border-b border-sepia/10">
                            <span className="text-lg">{mentor.avatar}</span>
                            <span className="font-serif font-medium text-sepia text-sm">
                              {mentor.name}
                            </span>
                          </div>
                        )}
                        <p className="font-serif leading-relaxed text-sm md:text-base">
                          {message.content}
                        </p>
                        <div className="text-xs text-sepia/50 mt-3 text-right">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start message-appear">
                    <div className="flex max-w-sm">
                      <div className="lg:hidden mr-3 mt-2 flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-sepia/20 flex items-center justify-center text-lg">
                          {mentor.avatar}
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-md rounded-r-xl rounded-tl-xl p-4 shadow-lg border border-white/50">
                        <div className="hidden lg:flex items-center space-x-2 mb-3 pb-2 border-b border-sepia/10">
                          <span className="text-lg">{mentor.avatar}</span>
                          <span className="font-serif font-medium text-sepia text-sm">
                            {mentor.name}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-sepia/40 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-sepia/40 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-sepia/40 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="bg-white/50 backdrop-blur-sm border-t border-sepia/20 p-4 flex-shrink-0">
              <div className="max-w-4xl mx-auto">
                <div className="flex space-x-3">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Share your thoughts with ${mentor.name}...`}
                    className="flex-1 border border-sepia/20 rounded-xl p-4 font-serif resize-none focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white/40 backdrop-blur-sm shadow-sm text-sepia"
                    rows={2}
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold disabled:from-gray-300 disabled:to-gray-300 text-white px-6 py-3 rounded-xl transition-all duration-300 font-serif font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none flex-shrink-0"
                  >
                    {isTyping ? 'Sending...' : 'Send'}
                  </button>
                </div>
                
                {/* Quick suggestions */}
                {messages.length === 1 && (
                  <div className="mt-4">
                    <p className="text-xs text-sepia/60 font-serif mb-2">Quick conversation starters:</p>
                    <div className="flex flex-wrap gap-2">
                      {getQuickStarters().map((starter, index) => (
                        <button
                          key={index}
                          onClick={() => setInputValue(starter.message)}
                          className="text-xs bg-white/20 hover:bg-white/30 text-sepia px-3 py-1 rounded-full font-serif transition-colors backdrop-blur-sm"
                          disabled={isTyping}
                        >
                          {starter.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom scrollbar styling */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(139, 69, 19, 0.3);
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 69, 19, 0.5);
        }
      `}</style>
    </ChatEnvironment>
  );
};

export default ChatInterface;