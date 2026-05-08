"use client";
import React, { useEffect, useState } from "react";
import MainTypingArea from "../components/MainTypingArea";
import Link from "next/link";
import ProgressBar from "../components/ProgressBar";
import { usePathname } from "next/navigation";

const TypingGame: React.FC = () => {
  const [textToType, setTextToType] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [sampleTexts, setSampleTexts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentLang, setCurrentLang] = useState<string>("en");

  const route = usePathname();

  // Extract language from pathname (e.g., '/en/typing-game' -> 'en')
  const getLanguageFromPath = (pathname: string): string => {
    const pathParts = pathname.split('/').filter(part => part.length > 0);
    // Assuming first part is language code (en, fa, es, etc.)
    return pathParts[0] || 'en';
  };

  // Load sample texts based on language
  useEffect(() => {
    const lang = getLanguageFromPath(route);
    setCurrentLang(lang);

    const loadSampleTexts = async () => {
      setIsLoading(true);
      try {
        // Try to load language-specific file
        const response = await fetch(`/content/${lang}/sample-texts.json`);

        if (!response.ok) {
          // Fallback to English if language file doesn't exist
          console.warn(`No texts found for language: ${lang}, falling back to English`);
          const fallbackResponse = await fetch(`/content/en/sample-texts.json`);
          if (!fallbackResponse.ok) {
            throw new Error('No text files found');
          }
          const fallbackData = await fallbackResponse.json();
          setSampleTexts(fallbackData);
          const randomIndex = Math.floor(Math.random() * fallbackData.length);
          setTextToType(fallbackData[randomIndex]);
        } else {
          const data = await response.json();
          setSampleTexts(data);
          const randomIndex = Math.floor(Math.random() * data.length);
          setTextToType(data[randomIndex]);
        }
      } catch (error) {
        console.error('Error loading sample texts:', error);
        // Emergency fallback texts
        const emergencyTexts = [
          "The quick brown fox jumps over the lazy dog.",
          "Practice makes perfect when learning to type faster."
        ];
        setSampleTexts(emergencyTexts);
        setTextToType(emergencyTexts[0]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSampleTexts();
  }, [route]); // Re-run when route changes

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

    // Pick a new random text from loaded sample texts
    if (sampleTexts.length > 0) {
      const newText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      setTextToType(newText);
    }
  };

  // Get dynamic messages based on language
  const getMotivationalMessage = () => {
    const messages: Record<string, Record<string, string>> = {
      en: {
        complete: "🌟 Amazing! You're a typing master! 🌟",
        fire: "🔥 On fire! Keep going! 🔥",
        great: "⚡ Great streak! You're doing awesome! ⚡",
        nice: "💪 Nice job! Keep it up! 💪",
        doing: "🎯 You're doing great! 🎯",
        start: "✨ Click here and start typing ✨"
      },
      fa: {
        complete: "🌟 عالی! تو یک استاد تایپ هستی! 🌟",
        fire: "🔥 فوق‌العاده! ادامه بده! 🔥",
        great: "⚡ روند عالی! خیلی عالی کار می‌کنی! ⚡",
        nice: "💪 آفرین! ادامه بده! 💪",
        doing: "🎯 عالی کار می‌کنی! 🎯",
        start: "✨ اینجا کلیک کن و تایپ را شروع کن ✨"
      }
    };

    const langMessages = messages[currentLang] || messages.en;

    if (isComplete) return langMessages.complete;
    if (streak > 15) return langMessages.fire;
    if (streak > 8) return langMessages.great;
    if (streak > 3) return langMessages.nice;
    if (userInput.length > 0) return langMessages.doing;
    return langMessages.start;
  };

  // Apply RTL for Persian/Farsi and Arabic
  const isRTL = currentLang === 'fa' || currentLang === 'ar';
  const containerDir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  // Show loading state
  if (isLoading) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">⌨️</div>
            <div className="text-xl text-blue-600">
              {currentLang === 'fa' ? 'در حال بارگذاری متون...' : 'Loading texts...'}
            </div>
          </div>
        </div>
    );
  }

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

  return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100" dir={containerDir}>
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

        <ProgressBar progress={progressPercentage}/>

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
                      {currentLang === 'fa' ? 'آفرین!' : 'Great Job!'}
                    </h2>
                    <p className="text-gray-600">{getMotivationalMessage()}</p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <div className="text-blue-400 text-sm font-bold uppercase tracking-wide mb-1">
                        {currentLang === 'fa' ? 'سرعت' : 'Speed'}
                      </div>
                      <div className="text-3xl font-black text-blue-600">{wpm}</div>
                      <div className="text-xs text-gray-500">WPM</div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <div className="text-green-400 text-sm font-bold uppercase tracking-wide mb-1">
                        {currentLang === 'fa' ? 'دقت' : 'Accuracy'}
                      </div>
                      <div className="text-3xl font-black text-green-600">
                        {accuracy}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {currentLang === 'fa' ? 'تطابق صحیح' : 'Correct matches'}
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <div className="text-purple-400 text-sm font-bold uppercase tracking-wide mb-1">
                        {currentLang === 'fa' ? 'کاراکترها' : 'Characters'}
                      </div>
                      <div className="text-3xl font-black text-purple-600">
                        {userInput.length}
                      </div>
                      <div className="text-xs text-gray-500">
                        {currentLang === 'fa' ? 'تایپ شده' : 'Typed'}
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-4 text-center">
                      <div className="text-orange-400 text-sm font-bold uppercase tracking-wide mb-1">
                        {currentLang === 'fa' ? 'رکورد' : 'Streak'}
                      </div>
                      <div className="text-3xl font-black text-orange-600">
                        {streak}
                      </div>
                      <div className="text-xs text-gray-500">
                        {currentLang === 'fa' ? 'بهترین رکورد 🔥' : 'Best streak 🔥'}
                      </div>
                    </div>
                  </div>

                  <button
                      onClick={resetGame}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    {currentLang === 'fa' ? 'دوباره امتحان کن 🚀' : 'Try Again 🚀'}
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