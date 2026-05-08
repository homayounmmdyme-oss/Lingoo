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
  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const [selectedIdiom, setSelectedIdiom] = useState<Idiom | null>(null);
  const [sortOrder, setSortOrder] = useState<"order" | "random">("order");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [diceRolling, setDiceRolling] = useState(false);
  const [displayedIdioms, setDisplayedIdioms] = useState<Idiom[]>([]);

  // Load and sort idioms alphabetically by English on mount
  useEffect(() => {
    const sortedIdioms = [...idiomsData].sort((a, b) =>
        a.idiom.localeCompare(b.idiom)
    );
    setIdioms(sortedIdioms);
    setDisplayedIdioms(sortedIdioms);
    if (sortedIdioms.length > 0) {
      setSelectedIdiom(sortedIdioms[0]);
    }
  }, []);

  // Filter idioms based on search
  useEffect(() => {
    const filtered = idioms.filter(idiom =>
        idiom.idiom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idiom.persian.includes(searchTerm)
    );

    if (sortOrder === "order") {
      setDisplayedIdioms(filtered);
    } else {
      // For random, shuffle but keep filter
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      setDisplayedIdioms(shuffled);
    }
  }, [searchTerm, idioms, sortOrder]);

  const randomizeOrder = () => {
    // Start animations
    setDiceRolling(true);
    setIsRandomizing(true);

    // Play dice rolling sound effect (optional)
    // const audio = new Audio('/dice-roll.mp3');
    // audio.play();

    // Animate the idiom grid items
    const gridItems = document.querySelectorAll('.idiom-item');
    gridItems.forEach((item, index) => {
      setTimeout(() => {
        (item as HTMLElement).style.transform = 'scale(0.95)';
        setTimeout(() => {
          (item as HTMLElement).style.transform = 'scale(1)';
        }, 150);
      }, index * 20);
    });

    // Simulate loading time for random shuffle
    setTimeout(() => {
      const filtered = idioms.filter(idiom =>
          idiom.idiom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          idiom.persian.includes(searchTerm)
      );

      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      setDisplayedIdioms(shuffled);

      // If there's a selected idiom, find it in new order or select first
      if (selectedIdiom) {
        const found = shuffled.find(i => i.idiom === selectedIdiom.idiom);
        if (found) {
          setSelectedIdiom(found);
        } else if (shuffled.length > 0) {
          setSelectedIdiom(shuffled[0]);
        }
      } else if (shuffled.length > 0) {
        setSelectedIdiom(shuffled[0]);
      }

      // Stop animations
      setTimeout(() => {
        setDiceRolling(false);
        setIsRandomizing(false);
      }, 300);
    }, 600);
  };

  const handleSortChange = (mode: "order" | "random") => {
    setSortOrder(mode);

    if (mode === "order") {
      // Back to alphabetical order
      const filtered = idioms.filter(idiom =>
          idiom.idiom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          idiom.persian.includes(searchTerm)
      );
      setDisplayedIdioms(filtered);
    } else {
      // Random mode with animation
      randomizeOrder();
    }
  };

  const nextIdiom = () => {
    const currentIndex = displayedIdioms.findIndex(i => i.idiom === selectedIdiom?.idiom);
    if (currentIndex < displayedIdioms.length - 1) {
      // Animate transition
      const detailCard = document.querySelector('.detail-card');
      if (detailCard) {
        detailCard.classList.add('animate-fadeOut');
        setTimeout(() => {
          setSelectedIdiom(displayedIdioms[currentIndex + 1]);
          detailCard.classList.remove('animate-fadeOut');
          detailCard.classList.add('animate-fadeIn');
          setTimeout(() => {
            detailCard.classList.remove('animate-fadeIn');
          }, 300);
        }, 150);
      } else {
        setSelectedIdiom(displayedIdioms[currentIndex + 1]);
      }
    }
  };

  const prevIdiom = () => {
    const currentIndex = displayedIdioms.findIndex(i => i.idiom === selectedIdiom?.idiom);
    if (currentIndex > 0) {
      // Animate transition
      const detailCard = document.querySelector('.detail-card');
      if (detailCard) {
        detailCard.classList.add('animate-fadeOut');
        setTimeout(() => {
          setSelectedIdiom(displayedIdioms[currentIndex - 1]);
          detailCard.classList.remove('animate-fadeOut');
          detailCard.classList.add('animate-fadeIn');
          setTimeout(() => {
            detailCard.classList.remove('animate-fadeIn');
          }, 300);
        }, 150);
      } else {
        setSelectedIdiom(displayedIdioms[currentIndex - 1]);
      }
    }
  };

  // Function to render example with highlighted idiom
  const renderExample = (example: string) => {
    return { __html: example };
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50" dir="rtl">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🦜</span>
                <h1 className="text-2xl font-bold text-blue-600">لینگو</h1>
              </div>

              {/* Sort Controls */}
              <div className="flex gap-2">
                <button
                    onClick={() => handleSortChange("order")}
                    className={`px-4 py-2 rounded-lg font-bold transition ${
                        sortOrder === "order"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  📋 Alphabetical
                </button>
                <button
                    onClick={() => handleSortChange("random")}
                    disabled={isRandomizing}
                    className={`
                  px-4 py-2 rounded-lg font-bold transition relative
                  ${sortOrder === "random"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
                  ${isRandomizing ? "cursor-wait opacity-75" : ""}
                `}
                >
                <span className={`inline-block transition-transform ${diceRolling ? "animate-dice-roll" : ""}`}>
                  🎲
                </span>
                  {isRandomizing ? " Shuffling..." : " Random"}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Search Bar */}
          <div className="mb-6">
            <input
                type="text"
                placeholder="🔍 Search idioms in English or Persian..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none bg-white"
            />
          </div>

          {/* Loading Overlay for Random Mode */}
          {isRandomizing && (
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
                  <div className="text-6xl mb-4 animate-bounce">🎲</div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">Shuffling Idioms!</div>
                  <div className="text-gray-500">Randomizing your learning experience...</div>
                  <div className="mt-4 flex justify-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
          )}

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Side: Grid of Idioms */}
            <div className="bg-white rounded-2xl shadow-xl p-4">
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h2 className="font-bold text-gray-700">📚 Idioms Collection</h2>
                <span className="text-sm text-gray-500">{displayedIdioms.length} idioms</span>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {displayedIdioms.map((idiom, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedIdiom(idiom)}
                        className={`
                    idiom-item w-full text-right p-3 rounded-lg transition-all duration-300
                    ${selectedIdiom?.idiom === idiom.idiom
                            ? "bg-blue-500 text-white shadow-md scale-102"
                            : "bg-gray-50 hover:bg-blue-50 text-gray-700 hover-scale"}
                  `}
                        style={{
                          animation: isRandomizing ? `slideIn 0.3s ease-out ${index * 0.02}s` : "none"
                        }}
                    >
                      <div className="font-bold">{idiom.idiom}</div>
                      <div className={`text-sm ${selectedIdiom?.idiom === idiom.idiom ? "text-blue-100" : "text-gray-500"}`}>
                        {idiom.persian}
                      </div>
                    </button>
                ))}

                {displayedIdioms.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No idioms found matching "{searchTerm}"
                    </div>
                )}
              </div>
            </div>

            {/* Right Side: Selected Idiom Details */}
            <div className="bg-white rounded-2xl shadow-xl p-6 detail-card transition-all duration-300">
              {selectedIdiom ? (
                  <>
                    {/* Navigation Arrows */}
                    <div className="flex justify-between items-center mb-6">
                      <button
                          onClick={prevIdiom}
                          disabled={displayedIdioms.findIndex(i => i.idiom === selectedIdiom.idiom) === 0}
                          className={`
                      p-2 rounded-lg transition transform hover:scale-110
                      ${displayedIdioms.findIndex(i => i.idiom === selectedIdiom.idiom) === 0
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-600 hover:bg-gray-100"}
                    `}
                      >
                        ← Previous
                      </button>
                      <span className="text-sm text-gray-500">
                    {displayedIdioms.findIndex(i => i.idiom === selectedIdiom.idiom) + 1} / {displayedIdioms.length}
                  </span>
                      <button
                          onClick={nextIdiom}
                          disabled={displayedIdioms.findIndex(i => i.idiom === selectedIdiom.idiom) === displayedIdioms.length - 1}
                          className={`
                      p-2 rounded-lg transition transform hover:scale-110
                      ${displayedIdioms.findIndex(i => i.idiom === selectedIdiom.idiom) === displayedIdioms.length - 1
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-600 hover:bg-gray-100"}
                    `}
                      >
                        Next →
                      </button>
                    </div>

                    {/* Idiom Content */}
                    <div className="space-y-4">
                      {/* English Idiom */}
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-2">English Idiom</div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                          {selectedIdiom.idiom}
                        </h2>
                      </div>

                      {/* Fonetic */}
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <div className="text-sm text-gray-500 mb-1">🔊 Pronunciation</div>
                        <p className="text-gray-700 font-mono text-sm">{selectedIdiom.fonetic}</p>
                      </div>

                      {/* Persian Translation */}
                      <div className="bg-purple-50 rounded-xl p-4 text-center">
                        <div className="text-sm text-gray-500 mb-1">🇮🇷 به فارسی</div>
                        <p className="text-xl font-bold text-purple-800">{selectedIdiom.persian}</p>
                      </div>

                      {/* Example Sentence */}
                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-2">💡 Example Sentence</div>
                        <div
                            className="text-gray-800 italic leading-relaxed"
                            dangerouslySetInnerHTML={renderExample(selectedIdiom.example)}
                        />
                      </div>

                      {/* Example Meaning */}
                      <div className="bg-green-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-1">📝 معنی مثال</div>
                        <p className="text-gray-700">{selectedIdiom.exampleMeaning}</p>
                      </div>
                    </div>
                  </>
              ) : (
                  <div className="flex items-center justify-center h-96 text-center">
                    <div>
                      <div className="text-6xl mb-4">📖</div>
                      <p className="text-gray-500">Loading idioms...</p>
                    </div>
                  </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            🤝 Open Source — Add your favorite idioms to /community/idioms.json
          </div>
        </main>

        {/* Custom Styles */}
        <style jsx global>{`
          .idiom-highlight {
            background-color: #fbbf24;
            color: #1f2937;
            font-weight: bold;
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
            display: inline-block;
          }

          @keyframes diceRoll {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(90deg) scale(1.2); }
            50% { transform: rotate(180deg) scale(1); }
            75% { transform: rotate(270deg) scale(1.2); }
            100% { transform: rotate(360deg) scale(1); }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeOut {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(-10px);
            }
          }

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

          .animate-dice-roll {
            animation: diceRoll 0.6s ease-in-out;
          }

          .animate-fadeOut {
            animation: fadeOut 0.15s ease-out forwards;
          }

          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }

          .scale-102 {
            transform: scale(1.02);
          }

          .hover-scale {
            transition: transform 0.2s ease;
          }

          .hover-scale:hover {
            transform: scale(1.02);
          }

          .delay-100 {
            animation-delay: 100ms;
          }

          .delay-200 {
            animation-delay: 200ms;
          }

          .scrollbar-custom::-webkit-scrollbar {
            width: 8px;
          }

          .scrollbar-custom::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }

          .scrollbar-custom::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }
        `}</style>
      </div>
  );
};

export default HomePage;