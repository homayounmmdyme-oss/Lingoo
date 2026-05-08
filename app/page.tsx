"use client";

import React, { useState, useEffect } from "react";

interface Idiom {
  english: string;
  persian: string;
  meaning: string;
}

const HomePage: React.FC = () => {
  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const [currentIdiom, setCurrentIdiom] = useState<Idiom | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load idioms from JSON file
  useEffect(() => {
    const loadIdioms = async () => {
      try {
        console.log("Attempting to load idioms...");
        const response = await fetch("/community/idioms.json");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Loaded idioms:", data);
        
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No idioms found in file");
        }
        
        setIdioms(data);
        // Pick random idiom
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentIdiom(data[randomIndex]);
      } catch (error) {
        console.error("Error loading idioms:", error);
        setError(`Failed to load idioms: ${error instanceof Error ? error.message : String(error)}`);
        
        // Fallback idioms
        const fallbackIdioms = [
          { id: 1, english: "Break the ice", persian: "یخ را شکستن", meaning: "شروع مکالمه" },
          { id: 2, english: "Hit the sack", persian: "خوابیدن", meaning: "رفتن به رختخواب" },
          { id: 3, english: "Piece of cake", persian: "خیلی آسان", meaning: "کار آسان" },
        ];
        setIdioms(fallbackIdioms);
        setCurrentIdiom(fallbackIdioms[0]);
      } finally {
        setIsLoading(false);
      }
    };

    loadIdioms();
  }, []);

  const nextIdiom = () => {
    if (idioms.length > 0) {
      const randomIndex = Math.floor(Math.random() * idioms.length);
      setCurrentIdiom(idioms[randomIndex]);
      setShowAnswer(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📖</div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-lg font-bold text-red-700 mb-2">خطا در بارگذاری</h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <p className="text-gray-600 text-xs">مسیر فایل: /public/community/idioms.json</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50" dir="rtl">
      {/* Simple Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🦜</span>
              <h1 className="text-2xl font-bold text-blue-600">لینگو</h1>
            </div>
            <p className="text-sm text-gray-500">یادگیری اصطلاحات انگلیسی</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentIdiom && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* English Idiom */}
            <div className="text-center mb-8">
              <div className="text-sm text-gray-500 mb-2">English Idiom</div>
              <h2 className="text-4xl font-bold text-gray-800">
                {currentIdiom.english}
              </h2>
            </div>

            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full py-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-xl hover:scale-105 transition-transform"
              >
                ✨ نمایش معنی ✨
              </button>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <div className="text-sm text-gray-500 mb-2">به فارسی</div>
                  <p className="text-2xl font-bold text-green-700">
                    {currentIdiom.persian}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <div className="text-sm text-gray-500 mb-2">معنی</div>
                  <p className="text-lg text-purple-800">
                    {currentIdiom.meaning}
                  </p>
                </div>
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={nextIdiom}
              className="mt-6 w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              اصطلاح بعدی →
            </button>
          </div>
        )}

        {/* Simple counter */}
        <div className="text-center mt-6 text-sm text-gray-500">
          {idioms.length} اصطلاح در مجموعه
        </div>
      </main>
    </div>
  );
};

export default HomePage;