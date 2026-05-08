"use client";
import React, { useEffect, useState } from "react";
import MainTypingArea from "../components/MainTypingArea";
import Link from "next/link";

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
  const [showStats, setShowStats] = useState<boolean>(false);

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
        setStreak((prev) => prev + 1);
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
      setShowStats(true);
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

  const resetGame = () => {
    setUserInput("");
    setIsActive(false);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsComplete(false);
    setStreak(0);
    setShowStats(false);

    // Pick a new random text
    const newText =
        SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setTextToType(newText);
  };

  // Render each character with proper styling
  const renderTextCharacters = () => {
    return textToType.split("").map((char, index) => {
      let status = "pending";

      if (index < userInput.length) {
        if (userInput[index] === char) {
          status = "correct";
        } else {
          status = "incorrect";
        }
      }

      return (
          <span
              key={index}
              className={`
            inline-block font-mono text-2xl sm:text-3xl md:text-4xl font-bold
            transition-all duration-150 ease-out
            ${status === "correct" ? "text-green-500" : ""}
            ${status === "incorrect" ? "text-red-500 bg-red-100 rounded" : ""}
            ${status === "pending" ? "text-gray-400" : ""}
            ${index === userInput.length && !isComplete ? "border-l-4 border-blue-500 animate-pulse" : ""}
          `}
              style={{
                minWidth: char === " " ? "0.5em" : "auto",
              }}
          >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  // Calculate progress percentage
  const progressPercentage = (userInput.length / textToType.length) * 100;
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
        <div className="bg-white border-b-2 border-blue-200 shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-4xl">⌨️</div>
                <h1 className="text-2xl font-bold text-blue-600">TypeFlow</h1>
              </div>
              <Link href="/levels" className="bg-blue-100 px-4 py-2 rounded-full">
                🏆
              </Link>
            </div>
          </div>
        </div>

        {/* Progress Bar - Top of page under header */}
        <div className="sticky top-[73px] z-10 bg-blue-50/95 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 pt-4 pb-2">
            <div className="bg-blue-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 relative"
                  style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Main Typing Area - Duolingo card style */}
          <MainTypingArea
              handleInputChange={handleInputChange}
              isComplete={isComplete}
              renderTextCharacters={renderTextCharacters}
              userInput={userInput}
          />

          {/* Stats Modal - Shows only after completion */}
          {showStats && isComplete && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scaleIn">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-3">🎉</div>
                    <h2 className="text-3xl font-bold text-blue-600 mb-2">
                      Great Job!
                    </h2>
                    <p className="text-gray-600">{getMotivationalMessage()}</p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <div className="text-blue-400 text-sm font-bold uppercase tracking-wide mb-1">
                        Speed
                      </div>
                      <div className="text-3xl font-black text-blue-600">{wpm}</div>
                      <div className="text-xs text-gray-500">WPM</div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <div className="text-green-400 text-sm font-bold uppercase tracking-wide mb-1">
                        Accuracy
                      </div>
                      <div className="text-3xl font-black text-green-600">
                        {accuracy}%
                      </div>
                      <div className="text-xs text-gray-500">Correct matches</div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <div className="text-purple-400 text-sm font-bold uppercase tracking-wide mb-1">
                        Characters
                      </div>
                      <div className="text-3xl font-black text-purple-600">
                        {userInput.length}
                      </div>
                      <div className="text-xs text-gray-500">Typed</div>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-4 text-center">
                      <div className="text-orange-400 text-sm font-bold uppercase tracking-wide mb-1">
                        Streak
                      </div>
                      <div className="text-3xl font-black text-orange-600">
                        {streak}
                      </div>
                      <div className="text-xs text-gray-500">Best streak 🔥</div>
                    </div>
                  </div>

                  <button
                      onClick={resetGame}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Try Again 🚀
                  </button>
                </div>
              </div>
          )}
        </div>

        {/* Add CSS animations */}
        <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
      </div>
  );
};

export default TypingGame;