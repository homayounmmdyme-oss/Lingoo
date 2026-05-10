"use client";

import React, { useState, useEffect } from "react";
import triviaData from "@/public/community/english-trivia.json";
import fixRTL from "rtl-text-tools";

interface TriviaQuestion {
    question: string;
    answers: string[];
    correctIndex: number;
    funFact: string;
}

const TriviaPage: React.FC = () => {
    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState<TriviaQuestion[]>([]);

    // Load trivia from imported JSON
    useEffect(() => {
        setQuestions(triviaData);
        setShuffledQuestions(shuffleArray([...triviaData]));
    }, []);

    const shuffleArray = <T,>(arr: T[]): T[] => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const handleAnswer = (answerIndex: number) => {
        if (showResult) return;

        const currentQuestion = shuffledQuestions[currentIndex];
        const isCorrect = answerIndex === currentQuestion.correctIndex;

        setSelectedAnswer(answerIndex);
        setShowResult(true);

        if (isCorrect) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < shuffledQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const restartQuiz = () => {
        setShuffledQuestions(shuffleArray([...questions]));
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setQuizCompleted(false);
    };

    const currentQ = shuffledQuestions[currentIndex];

    if (!currentQ) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#f74697]/5 to-[#4097f2]/5 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl animate-spin mb-4">🎲</div>
                    <p className="text-gray-500">در حال بارگیری سوالات...</p>
                </div>
            </div>
        );
    }

    // Completion Screen
    if (quizCompleted) {
        const percentage = Math.round((score / shuffledQuestions.length) * 100);
        let message = "";
        let emoji = "";

        if (percentage === 100) {
            message = "فوق‌العاده! شما یک استاد انگلیسی هستید!";
            emoji = "👑";
        } else if (percentage >= 80) {
            message = "عالی! شما خیلی خوب بلدید!";
            emoji = "🎉";
        } else if (percentage >= 60) {
            message = "خوب! کمی تمرین بیشتر عالی می‌شوید!";
            emoji = "👍";
        } else if (percentage >= 40) {
            message = "خوب بود! دوباره امتحان کنید بهتر می‌شوید!";
            emoji = "📚";
        } else {
            message = "اشکال نداره! با تمرین بیشتر پیشرفت می‌کنید!";
            emoji = "💪";
        }

        return (
            <div className="min-h-screen bg-gradient-to-br from-[#f74697]/5 to-[#4097f2]/5" dir="rtl">
                <div className="max-w-2xl mx-auto px-4 py-12">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-[#f74697]">
                        <div className="text-7xl mb-4">{emoji}</div>
                        <h1 className="text-3xl font-bold mb-2" style={{ color: "#f74697" }}>
                            مسابقه تمام شد!
                        </h1>
                        <p className="text-gray-600 mb-4">{message}</p>
                        <p className="text-2xl font-bold mb-6">
                            امتیاز شما: {score} از {shuffledQuestions.length}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                            <div
                                className="h-4 rounded-full transition-all duration-500"
                                style={{
                                    width: `${percentage}%`,
                                    background: "linear-gradient(90deg, #f74697, #4097f2)",
                                }}
                            />
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={restartQuiz}
                                className="w-full px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                                style={{ backgroundColor: "#f74697", color: "white" }}
                            >
                                🔄 شروع مجدد
                            </button>
                            <a
                                href="/"
                                className="block w-full px-6 py-3 rounded-lg font-bold transition-all duration-300 bg-gray-100 hover:bg-[#ffe073] text-gray-600 hover:text-gray-800"
                            >
                                🏠 بازگشت به صفحه اصلی
                            </a>
                        </div>
                    </div>
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
                            <div className="bg-[#ffe073]/20 px-3 py-1 rounded-full">
                <span className="text-sm font-bold" style={{ color: "#f74697" }}>
                  ⭐ {score}
                </span>
                            </div>
                            <a
                                href="/"
                                className="text-sm px-3 py-1 rounded-lg bg-gray-100 hover:bg-[#ffe073] transition-all duration-300"
                            >
                                خروج
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">
                {/* Progress */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>
              سوال {currentIndex + 1} از {shuffledQuestions.length}
            </span>
                        <span>پیشرفت</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%`,
                                background: "linear-gradient(90deg, #f74697, #4097f2)",
                            }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-4 border-t-4 border-[#4097f2]">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed text-center">
                        {currentQ.question}
                    </h2>

                    {/* Answers as buttons */}
                    <div className="space-y-3">
                        {currentQ.answers.map((answer, idx) => {
                            let buttonClass = "w-full p-4 rounded-xl text-right font-medium transition-all duration-300 bg-gray-50 hover:bg-[#ffe073]/30 text-gray-700 hover:scale-102 cursor-pointer";

                            if (showResult) {
                                if (idx === currentQ.correctIndex) {
                                    buttonClass = "w-full p-4 rounded-xl text-right font-medium transition-all duration-300 bg-green-500 text-white transform scale-102";
                                } else if (idx === selectedAnswer && idx !== currentQ.correctIndex) {
                                    buttonClass = "w-full p-4 rounded-xl text-right font-medium transition-all duration-300 bg-red-400 text-white";
                                } else {
                                    buttonClass = "w-full p-4 rounded-xl text-right font-medium transition-all duration-300 bg-gray-100 text-gray-400 opacity-50 cursor-default";
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
                  {selectedAnswer === currentQ.correctIndex ? "✅" : "❌"}
                </span>
                                <div className="flex-1">
                                    <p className="font-bold mb-1">
                                        {selectedAnswer === currentQ.correctIndex
                                            ? "درست است! 🎉"
                                            : `پاسخ صحیح: ${currentQ.answers[currentQ.correctIndex]}`}
                                    </p>
                                    <div className="mt-2 pt-2 border-t border-[#ffe073]/30">
                                        <p className="text-sm text-gray-500 flex items-start gap-1">
                                            <span>💡</span>
                                            <span>{fixRTL(currentQ.funFact)}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={nextQuestion}
                            className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-102 shadow-lg"
                            style={{
                                background: "linear-gradient(135deg, #f74697, #4097f2)",
                            }}
                        >
                            {currentIndex < shuffledQuestions.length - 1 ? "سوال بعدی ←" : "🏁 مشاهده نتیجه"}
                        </button>
                    </div>
                )}

                {/* Fun Footer */}
                <div className="text-center mt-8 text-xs text-gray-400">
                    🤔 هر سوال یک نکته جالب یاد می‌گیرید!
                </div>
            </main>
        </div>
    );
};

export default TriviaPage;