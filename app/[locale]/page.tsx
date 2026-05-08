"use client"
import React, { useState, useEffect, useRef } from 'react';

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog.",
  "React is a JavaScript library for building user interfaces.",
  "TypeScript adds static typing to JavaScript for better tooling.",
  "Tailwind CSS provides utility classes for rapid UI development.",
  "Practice makes perfect when learning to type faster.",
  "Coding is fun and rewarding. Keep practicing every day.",
  "The early bird catches the worm, but the night owl stays wise.",
];

const TypingGame: React.FC = () => {
  const [textToType, setTextToType] = useState<string>(() => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_TEXTS.length);
    return SAMPLE_TEXTS[randomIndex];
  });
  const [userInput, setUserInput] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);

  // Focus input when clicking anywhere on the text area
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current && !isComplete) {
        inputRef.current.focus();
      }
    };

    const textDisplay = textDisplayRef.current;
    if (textDisplay) {
      textDisplay.addEventListener('click', handleClick);
    }

    return () => {
      if (textDisplay) {
        textDisplay.removeEventListener('click', handleClick);
      }
    };
  }, [isComplete]);

  // Auto-focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Calculate statistics in real-time
  useEffect(() => {
    if (!isActive || startTime === null || userInput.length === 0) return;

    const elapsedMinutes = (Date.now() - startTime) / 60000;
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const currentWpm = Math.round(wordsTyped / elapsedMinutes);
    setWpm(currentWpm > 0 ? currentWpm : 0);

    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === textToType[i]) correctChars++;
    }
    const accuracyPercent = (correctChars / userInput.length) * 100;
    setAccuracy(Math.min(100, Math.round(accuracyPercent)));
  }, [userInput, isActive, startTime, textToType]);

  // Update streak based on consecutive correct characters
  useEffect(() => {
    if (userInput.length > 0 && !isComplete) {
      const lastCharIndex = userInput.length - 1;
      if (userInput[lastCharIndex] === textToType[lastCharIndex]) {
        setStreak(prev => prev + 1);
      } else {
        setStreak(0);
      }
    }
  }, [userInput, textToType, isComplete]);

  // Check for completion
  useEffect(() => {
    if (userInput === textToType && userInput.length > 0 && isActive) {
      setIsComplete(true);
      setIsActive(false);
    }
  }, [userInput, textToType, isActive]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Prevent typing beyond the text length
    if (value.length <= textToType.length) {
      setUserInput(value);

      // Start timer on first character
      if (!isActive && !isComplete && value.length === 1) {
        setIsActive(true);
        setStartTime(Date.now());
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Prevent new lines
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const resetGame = () => {
    setUserInput("");
    setIsActive(false);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsComplete(false);
    setStreak(0);

    // Pick a new random text
    const newText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setTextToType(newText);

    // Focus the input after reset
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  // Render each character with proper styling
  const renderTextCharacters = () => {
    return textToType.split('').map((char, index) => {
      let status = 'pending';

      if (index < userInput.length) {
        if (userInput[index] === char) {
          status = 'correct';
        } else {
          status = 'incorrect';
        }
      }

      return (
          <span
              key={index}
              className={`
            inline-block font-mono text-2xl sm:text-3xl md:text-4xl font-bold
            transition-all duration-150 ease-out
            ${status === 'correct' ? 'text-green-500' : ''}
            ${status === 'incorrect' ? 'text-red-500 bg-red-100 rounded' : ''}
            ${status === 'pending' ? 'text-gray-400' : ''}
            ${index === userInput.length && !isComplete ? 'border-l-4 border-blue-500 animate-pulse' : ''}
          `}
              style={{
                minWidth: char === ' ' ? '0.5em' : 'auto',
              }}
          >
          {char}
        </span>
      );
    });
  };

  // Calculate progress percentage
  const progressPercentage = (userInput.length / textToType.length) * 100;

  // Get motivational message
  const getMotivationalMessage = () => {
    if (isComplete) return "🌟 Amazing! You're a typing master! 🌟";
    if (streak > 15) return "🔥 On fire! Keep going! 🔥";
    if (streak > 8) return "⚡ Great streak! You're doing awesome! ⚡";
    if (streak > 3) return "💪 Nice job! Keep it up! 💪";
    if (userInput.length > 0) return "🎯 You're doing great! 🎯";
    return "✨ Click here and start typing ✨";
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        {/* Header with Duolingo-style bar */}
        <div className="bg-white border-b-2 border-blue-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-4xl">⌨️</div>
                <h1 className="text-2xl font-bold text-blue-600">TypeFlow</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                  <span className="text-blue-600 font-bold">{streak}</span>
                  <span className="text-blue-600">🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Stats Cards - Duolingo style */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-5 text-center border-2 border-blue-100 hover:border-blue-300 transition-all">
              <div className="text-blue-400 text-sm font-bold uppercase tracking-wide mb-2">Speed</div>
              <div className="text-4xl font-black text-blue-600">{wpm}</div>
              <div className="text-xs text-gray-500 mt-1">words per minute</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 text-center border-2 border-green-100 hover:border-green-300 transition-all">
              <div className="text-green-400 text-sm font-bold uppercase tracking-wide mb-2">Accuracy</div>
              <div className="text-4xl font-black text-green-600">{accuracy}%</div>
              <div className="text-xs text-gray-500 mt-1">correct matches</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 text-center border-2 border-purple-100 hover:border-purple-300 transition-all">
              <div className="text-purple-400 text-sm font-bold uppercase tracking-wide mb-2">Progress</div>
              <div className="text-4xl font-black text-purple-600">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">text completed</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 text-center border-2 border-orange-100 hover:border-orange-300 transition-all">
              <div className="text-orange-400 text-sm font-bold uppercase tracking-wide mb-2">Characters</div>
              <div className="text-3xl font-black text-orange-600">
                {userInput.length} / {textToType.length}
              </div>
              <div className="text-xs text-gray-500 mt-1">typed / total</div>
            </div>
          </div>

          {/* Progress Bar - Duolingo style */}
          <div className="mb-8">
            <div className="bg-blue-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 relative"
                  style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Main Typing Area - Duolingo card style */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-white font-bold text-lg">
                  📝 Type this text:
                </h2>
                {!isActive && !isComplete && userInput.length === 0 && (
                    <div className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold animate-bounce">
                      ⭐ Start here!
                    </div>
                )}
                {isActive && !isComplete && (
                    <div className="bg-green-400 text-green-900 px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                      🟢 Typing in progress...
                    </div>
                )}
              </div>
            </div>

            <div
                ref={textDisplayRef}
                className="p-8 cursor-text min-h-[250px] bg-gray-50"
            >
              <div className="leading-loose break-all">
                {renderTextCharacters()}
              </div>

              {/* Hidden textarea for input */}
              <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  disabled={isComplete}
                  className="fixed opacity-0 pointer-events-none"
                  style={{ position: 'fixed', top: '-9999px', left: '-9999px' }}
                  spellCheck={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
              />
            </div>

            {/* Motivational message */}
            <div className="px-8 pb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                <p className="text-blue-800 font-semibold text-lg">
                  {getMotivationalMessage()}
                </p>
                {!isComplete && userInput.length > 0 && (
                    <div className="mt-2 text-sm text-blue-600">
                      💡 Keep typing! <span className="text-green-600 font-bold">Green</span> = correct |
                      <span className="text-red-600 font-bold ml-1"> Red</span> = mistake
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls & Completion Message */}
          <div className="flex justify-center gap-4 mt-8">
            <button
                onClick={resetGame}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transform hover:scale-105 flex items-center gap-2"
            >
              <span>🔄</span>
              <span>New Challenge</span>
            </button>

            {isComplete && (
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-bold animate-bounce shadow-lg flex items-center gap-2">
                  <span>🎉</span>
                  <span>{wpm} WPM with {accuracy}% accuracy!</span>
                  <span>🎉</span>
                </div>
            )}
          </div>

          {/* Leaderboard style footer */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">🏆</div>
              <h3 className="text-xl font-bold text-blue-600">Pro Tips</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <div className="text-blue-500 mt-1">✓</div>
                <div className="text-gray-700">Focus on accuracy first - speed will come naturally</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-blue-500 mt-1">✓</div>
                <div className="text-gray-700">Keep a steady rhythm while typing</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-blue-500 mt-1">✓</div>
                <div className="text-gray-700">Use all fingers for better speed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TypingGame;