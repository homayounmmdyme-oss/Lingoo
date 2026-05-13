"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import triviaData from "@/public/community/english-trivia.json";
import fixRTL from "rtl-text-tools";

interface TriviaQuestion {
  question: string;
  answers: string[];
  correctIndex: number;
  funFact: string;
}

// Helper to shuffle array (for random order display)
const shuffleArray = <T,>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const TriviaGridPage: React.FC = () => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<TriviaQuestion[]>([]);

  // Load trivia from imported JSON
  useEffect(() => {
    setQuestions(triviaData);
    setShuffledQuestions(shuffleArray([...triviaData]));
  }, []);

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f74697]/5 to-[#4097f2]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-spin mb-4">🎲</div>
          <p className="text-gray-500">در حال بارگیری سوالات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f74697]/5 to-[#4097f2]/5" dir="rtl">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-[#ffe073]/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🎯</span>
              <h1 className="text-xl md:text-2xl font-bold" style={{ color: "#f74697" }}>
                مسابقه زبان انگلیسی
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#ffe073]/20 px-3 py-1 rounded-full">
                <span className="text-sm font-bold" style={{ color: "#f74697" }}>
                  📋 {shuffledQuestions.length} سوال
                </span>
              </div>
              <Link
                href="/"
                className="text-sm px-3 py-1 rounded-lg bg-gray-100 hover:bg-[#ffe073] transition-all duration-300"
              >
                خروج
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Grid of questions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {shuffledQuestions.map((q, idx) => (
            <Link
              key={idx}
              href={`/trivia/question/${idx}`}
              className="block group"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border-t-4 border-[#f74697] h-full">
                <div className="p-5">
                  {/* Question number badge */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f74697]/10 text-[#f74697] font-bold text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-gray-400">📖</span>
                  </div>
                  
                  {/* Question text (truncated if too long) */}
                  <p className="text-gray-800 font-medium leading-relaxed line-clamp-3 min-h-[4.5rem]">
                    {q.question}
                  </p>
                  
                  {/* Hint that clicking opens details */}
                  <div className="mt-4 flex items-center justify-end text-xs text-[#4097f2] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>برای پاسخ کلیک کنید</span>
                    <span className="mr-1">←</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Fun Footer */}
        <div className="text-center mt-12 text-xs text-gray-400">
          🤔 روی هر کارت کلیک کنید تا به صفحه سوال بروید و پاسخ را ببینید!
        </div>
      </main>
    </div>
  );
};

export default TriviaGridPage;
