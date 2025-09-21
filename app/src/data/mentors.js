// data/mentors.js
export const mentors = [
  {
    id: 'musashi',
    name: 'Miyamoto Musashi',
    title: 'The Legendary Swordsman',
    culture: 'Japanese',
    philosophy: 'The Way of Strategy',
    specialties: ['Focus', 'Discipline', 'Self-Mastery'],
    quote: "Today is victory over yourself of yesterday; tomorrow is your victory over lesser men.",
    color: 'crimson',
    description: 'Master of discipline and strategic thinking, Musashi teaches the path of focused determination.',
    avatar: '⚔️'
  },
  {
    id: 'rumi',
    name: 'Jalal ad-Din Rumi',
    title: 'The Mystic Poet',
    culture: 'Persian',
    philosophy: 'Divine Love & Inner Journey',
    specialties: ['Self-Acceptance', 'Emotional Healing', 'Spiritual Growth'],
    quote: "The wound is the place where the Light enters you.",
    color: 'sage',
    description: 'Poet of the heart, Rumi guides through love, acceptance, and inner transformation.',
    avatar: '🌹'
  },
  {
    id: 'chanakya',
    name: 'Chanakya',
    title: 'The Ancient Strategist',
    culture: 'Indian',
    philosophy: 'Practical Wisdom',
    specialties: ['Decision Making', 'Confidence', 'Life Strategy'],
    quote: "A person should not be too honest. Straight trees are cut first.",
    color: 'gold',
    description: 'Master strategist who teaches practical wisdom for navigating life\'s challenges.',
    avatar: '🏛️'
  }
];

export const assessmentQuestions = [
  {
    id: 1,
    question: "What challenges do you face most in your daily life?",
    type: "multiple",
    options: [
      { text: "Staying focused and motivated", value: "focus" },
      { text: "Managing anxiety and overthinking", value: "anxiety" },
      { text: "Making difficult decisions", value: "decisions" },
      { text: "Accepting myself and my emotions", value: "acceptance" }
    ]
  },
  {
    id: 2,
    question: "When facing setbacks, what would help you most?",
    type: "multiple",
    options: [
      { text: "Clear strategies and discipline", value: "strategy" },
      { text: "Emotional support and understanding", value: "emotional" },
      { text: "Practical advice and solutions", value: "practical" },
      { text: "Spiritual perspective and inner peace", value: "spiritual" }
    ]
  },
  {
    id: 3,
    question: "How do you prefer to learn and grow?",
    type: "multiple",
    options: [
      { text: "Through disciplined practice and repetition", value: "discipline" },
      { text: "Through reflection and emotional exploration", value: "reflection" },
      { text: "Through strategic thinking and planning", value: "planning" },
      { text: "Through storytelling and wisdom tales", value: "stories" }
    ]
  }
];

export const mentorResponses = {
  musashi: [
    "I see. The path of discipline is not about perfection, but about showing up each day despite the storm within. What small action can you take today to honor your commitment to growth?",
    "Anxiety is like an untrained warrior - chaotic and destructive. But observe it, do not become it. What patterns do you notice in your anxious thoughts?",
    "Strategy begins with knowing yourself. When you feel overwhelmed, you must first establish your ground. What gives you stability in uncertain times?",
    "The way of the sword teaches us that hesitation is defeat. In life, decisive action often matters more than perfect planning. What decision have you been avoiding?",
    "True strength is not the absence of fear, but action in spite of it. Fear is information, not instruction. How can you use your fear as a guide today?"
  ],
  rumi: [
    "My dear friend, pain is not your enemy - it is the teacher you never asked for but desperately need. What is this pain trying to teach you about yourself?",
    "You speak of struggle, but I hear the voice of someone becoming. The butterfly never cursed the caterpillar. How might your struggles be preparing you for transformation?",
    "Love yourself first, not last. The heart that judges itself harshly cannot offer genuine compassion to others. What would you say to a dear friend facing your situation?",
    "In your light I learn how to love. In your beauty, how to make poems. You dance inside my chest where no one sees you, but sometimes I do, and that sight becomes this art, this music, this form.",
    "The wound is where the light enters you. Every scar is a place where healing has occurred. What light is trying to enter through your current challenges?"
  ],
  chanakya: [
    "Wisdom lies in understanding that every problem contains the seed of its solution. You must water that seed with action, not worry. What specific step will you take tomorrow?",
    "The mind that dwells on problems grows more problems. The mind that focuses on solutions finds a way. What resources and strengths do you already possess?",
    "A wise person adapts to circumstances while working to change them. You cannot control the storm, but you can adjust your sails. What is within your control right now?",
    "Before you embark on a journey of revenge, dig two graves. But before you embark on a journey of growth, plant two seeds. What seeds of wisdom will you plant today?",
    "The serpent that cannot shed its skin perishes. The same applies to minds that cannot change their opinions. What old belief is it time for you to release?"
  ]
};