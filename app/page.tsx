"use client";

import React, { useState, useEffect } from "react";
import idiomsData from "@/public/community/idioms.json";

interface Idiom {
  idiom: string;
  fonetic: string;
  persian: string;
  example: string;
  exampleMeaning: string;
}

const HomePage: React.FC = () => {
  const [idioms] = useState<Idiom[]>(idiomsData);
  const [currentIdiom, setCurrentIdiom] = useState<Idiom | null>(null);

  useEffect(() => {
    if (idioms.length > 0) {
      const randomIndex = Math.floor(Math.random() * idioms.length);
      setCurrentIdiom(idioms[randomIndex]);
    }
  }, [idioms]);

  const nextIdiom = () => {
    if (idioms.length > 0) {
      const randomIndex = Math.floor(Math.random() * idioms.length);
      setCurrentIdiom(idioms[randomIndex]);
    }
  };

  if (!currentIdiom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📖</div>
          <p className="text-gray-600">Loading idioms...</p>
        </div>
      </div>
    );
  }

  // Function to render example with highlighted idiom
  const renderExample = (example: string) => {
    return { __html: example };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50" dir="rtl">
      {/* Header */}
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

      {/* Main Content - Learning Mode (Show Everything) */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Badge */}
          <div className="text-center mb-6">
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
              📚 Learning Mode
            </span>
          </div>

          {/* English Idiom */}
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 mb-2">English Idiom</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              {currentIdiom.idiom}
            </h2>
          </div>

          {/* Fonetic */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4 text-center">
            <div className="text-sm text-gray-500 mb-1">🔊 Pronunciation (Fonetic)</div>
            <p className="text-gray-700 font-mono">{currentIdiom.fonetic}</p>
          </div>

          {/* Persian Translation */}
          <div className="bg-purple-50 rounded-xl p-4 mb-4 text-center">
            <div className="text-sm text-gray-500 mb-1">🇮🇷 به فارسی</div>
            <p className="text-xl font-bold text-purple-800">{currentIdiom.persian}</p>
          </div>

          {/* Example Sentence */}
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <div className="text-sm text-gray-500 mb-2">💡 Example Sentence</div>
            <div 
              className="text-gray-800 italic leading-relaxed example-container"
              dangerouslySetInnerHTML={renderExample(currentIdiom.example)}
            />
          </div>

          {/* Example Meaning in Persian */}
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <div className="text-sm text-gray-500 mb-1">📝 معنی مثال</div>
            <p className="text-gray-700">{currentIdiom.exampleMeaning}</p>
          </div>

          {/* Next Button */}
          <button
            onClick={nextIdiom}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:scale-105 transition-transform"
          >
            Next Idiom → 🎯
          </button>

          {/* Counter */}
          <div className="text-center mt-4 text-xs text-gray-400">
            {idioms.indexOf(currentIdiom) + 1} of {idioms.length} idioms
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          🤝 Open Source — Add your favorite idioms to /community/idioms.json
        </div>
      </main>

      {/* Add custom styles for highlighted idiom in example */}
      <style jsx>{`
        :global(.idiom-highlight) {
          background-color: #fbbf24;
          color: #1f2937;
          font-weight: bold;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default HomePage;