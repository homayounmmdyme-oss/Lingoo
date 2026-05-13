"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import triviaData from "@/public/community/english-trivia.json";
import fixRTL from "rtl-text-tools";

interface TriviaQuestion {
  question: string;
  answers: string[];
  correctIndex: number;
  funFact: string;
}

const TriviaQuestionPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const questionId = params?.id ? parseInt(params.id as string) : null;

  const [question, setQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [allQuestions, setAllQuestions] = useState<TriviaQuestion[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    setAllQuestions(triviaData);
    setTotalQuestions(triviaData.length);

    if (questionId !== null && questionId >= 0 && questionId < triviaData.length) {
      setQuestion(triviaData[questionId]);
    } else if (questionId !== null) {
      // Invalid ID, redirect to grid
      router.push("/trivia");
    }
  }, [questionId, router]);

  const handleAnswer = (answerIndex: number) => {
    if (showResult || !question) return;

    const correct = answerIndex === question.correctIndex;
    setIsCorrect(correct);
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const goToNextQuestion = () => {
    if (questionId !== null && questionId + 1 < totalQuestions) {
      router.push(`/trivia/question/${questionId + 1}`);
      // Reset state for new question
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const goToPreviousQuestion = () => {
    if (questionId !== null && questionId > 0) {
      router.push(`/trivia/question/${questionId - 1}`);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const goToRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * totalQuestions);
    router.push(`/trivia/question/${randomIndex}`);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f74697]/5 to-[#4097f2]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-spin mb-4">🎲</div>
          <p className="text-gray-500">در حال بارگیری سوال...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f74697]/5 to-[#4097f2]/5" dir="rtl">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-[#ffe073]/30">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🎯</span>
              <h1 className="text-xl md:text-2xl font-bold" style={{ color: "#f74697" }}>
                مسابقه زبان انگلیسی
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/trivia"
                className="text-sm px-3 py-1 rounded-lg bg-gray-100 hover:bg-[#ffe073] transition-all duration-300"
              >
                ← بازگشت به لیست
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress Info */}
        <div className="mb-6 flex justify-between items-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <span className="text-sm font-medium text-gray-600">
              📋 سوال {questionId !== null ? questionId + 1 : "?"} از {totalQuestions}
            </span>
          </div>
          <button
            onClick={goToRandomQuestion}
            className="bg-[#ffe073]/30 hover:bg-[#ffe073]/50 transition-all duration-300 rounded-full px-4 py-2 text-sm font-medium text-gray-700 flex items-center gap-1"
          >
            <span>🎲</span>
            <span>سوال تصادفی</span>
          </button>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-4 border-t-4 border-[#4097f2]">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed text-center">
            {question.question}
          </h2>

          {/* Answers as buttons */}
          <div className="space-y-3">
            {question.answers.map((answer, idx) => {
              let buttonClass =
                "w-full p-4 rounded-xl text-right font-medium transition-all duration-300 bg-gray-50 hover:bg-[#ffe073]/30 text-gray-700 hover:scale-102 cursor-pointer";

              if (showResult) {
                if (idx === question.correctIndex) {
                  buttonClass =
                    "w-full p-4 rounded-xl text-right font-medium transition-all duration-300 bg-green-500 text-white transform scale-102 shadow-md";
                } else if (idx === selectedAnswer && idx !== question.correctIndex) {
                  buttonClass =
                    "w-full p-4 rounded-xl text-right font-medium transition-all duration-300 bg-red-400 text-white";
                } else {
                  buttonClass =
                    "w-full p-4 rounded-xl text-right font-medium transition-all duration-300 bg-gray-100 text-gray-400 opacity-50 cursor-default";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => !showResult && handleAnswer(idx)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <span className="inline-block w-8 h-8 rounded-full bg-white/50 text-center leading-8 ml-3 font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {answer}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result and Fun Fact */}
        {showResult && (
          <div className="animate-fadeIn">
            <div className="bg-white rounded-xl shadow-lg p-5 mb-4 border-r-4 border-[#ffe073]">
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {isCorrect ? "✅" : "❌"}
                </span>
                <div className="flex-1">
                  <p className="font-bold mb-1">
                    {isCorrect
                      ? "درست است! 🎉"
                      : `پاسخ صحیح: ${question.answers[question.correctIndex]}`}
                  </p>
                  <div className="mt-2 pt-2 border-t border-[#ffe073]/30">
                    <p className="text-sm text-gray-500 flex items-start gap-1">
                      <span>💡</span>
                      <span>{fixRTL(question.funFact)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {questionId !== null && questionId > 0 && (
                <button
                  onClick={goToPreviousQuestion}
                  className="flex-1 py-3 rounded-xl font-bold transition-all duration-300 bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  → سوال قبلی
                </button>
              )}
              {questionId !== null && questionId + 1 < totalQuestions ? (
                <button
                  onClick={goToNextQuestion}
                  className="flex-1 py-3 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-102 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #f74697, #4097f2)",
                  }}
                >
                  سوال بعدی ←
                </button>
              ) : (
                <Link
                  href="/trivia"
                  className="flex-1 py-3 rounded-xl font-bold text-white transition-all duration-300 text-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #f74697, #4097f2)",
                  }}
                >
                  🏁 بازگشت به لیست سوالات
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Fun Footer */}
        <div className="text-center mt-8 text-xs text-gray-400">
          🤔 هر سوال یک نکته جالب یاد می‌گیرید!
        </div>
      </main>

      {/* Add fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TriviaQuestionPage;