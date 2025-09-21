import { useState, useEffect, useRef } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Assessment from './components/Assessment';
import MentorIntroduction from './components/MentorIntroduction';
import ChatInterface from './components/ChatInterface';
import logo from '/logo.png';
import './App.css';
import './index.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    // This function creates the YouTube player
    const createPlayer = () => {
      // Create the player only if YT is available
      if (window.YT) {
        playerRef.current = new window.YT.Player('youtube-player', {
          videoId: 'TXcg25C56xM', // NEFFEX - Hope
          playerVars: {
            autoplay: 1, // Autoplay the video
            loop: 1,     // Loop the video
            controls: 0, // Hide video controls
            mute: 1,     // Start muted to comply with browser policy
            playlist: 'TXcg25C56xM', // Required for looping
          },
          events: {
            onReady: (event) => {
              // The player is ready, but we'll manage mute state with our button
              // event.target.mute();
            },
            onStateChange: (event) => {
              // If the video ends and we're looping, it will automatically restart.
            }
          }
        });
      }
    };

    // Load the YouTube IFrame Player API script
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // This function is called by the YouTube API once it's loaded
    window.onYouTubeIframeAPIReady = createPlayer;

    // Cleanup function to destroy the player when the component unmounts
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(prevState => {
      const newState = !prevState;
      if (playerRef.current) {
        // Check if the mute/unMute functions exist before calling them
        if (typeof playerRef.current.mute === 'function' && typeof playerRef.current.unMute === 'function') {
          if (newState) {
            playerRef.current.mute();
          } else {
            playerRef.current.unMute();
          }
        }
      }
      return newState;
    });
  };

  const screens = {
    welcome: () => <WelcomeScreen onStart={() => setCurrentScreen('assessment')} />,
    assessment: () => (
      <Assessment 
        onComplete={(mentor) => {
          setSelectedMentor(mentor);
          setCurrentScreen('mentorIntro');
        }} 
      />
    ),
    mentorIntro: () => (
      <MentorIntroduction 
        mentor={selectedMentor}
        onContinue={() => setCurrentScreen('chat')}
      />
    ),
    chat: () => (
      <ChatInterface 
        mentor={selectedMentor}
        onBack={() => setCurrentScreen('welcome')}
      />
    )
  };

  return (
    <div className="relative min-h-screen">
      
      {/* Background YouTube player (invisible) */}
      <div id="youtube-player" className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0"></div>

      <div className="absolute top-4 left-4 z-[9999] flex items-center space-x-4">
        {/* The always-visible circular logo button */}
        <a
          href="https://gresham-dave-portfolio.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        >
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </a>
        {/* Mute toggle button */}
        <button
          onClick={toggleMute}
          className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* The rest of the app's content */}
      {screens[currentScreen]()}
    </div>
  );
}

export default App;