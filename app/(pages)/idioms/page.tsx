"use client";

import React, { useState, useEffect } from "react";
import idiomsData from "@/public/community/idioms.json";
import Link from "next/link";

interface Idiom {
  idiom: string;
  fonetic: string;
  persian: string;
  example: string;
  exampleMeaning: string;
}

const IdiomsPage: React.FC = () => {
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
  return (
      <div className="min-h-screen bg-gradient-to-br from-[#f74697]/5 to-[#4097f2]/5" dir="rtl">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-[#ffe073]/30">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-3xl">🦜</span>
                <h1 className="text-2xl font-bold" style={{ color: '#f74697' }}>لینگو</h1>
              </Link>

              {/* Sort Controls */}
              <div className="flex gap-2">
                <button
                    onClick={() => handleSortChange("order")}
                    className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                        sortOrder === "order"
                            ? "bg-[#f74697] text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-600 hover:bg-[#ffe073] hover:text-gray-800"
                    }`}
                >
                  📋 الفبا
                </button>
                <button
                    onClick={() => handleSortChange("random")}
                    disabled={isRandomizing}
                    className={`
                  px-4 py-2 rounded-lg font-bold transition-all duration-300 relative
                  ${sortOrder === "random"
                        ? "bg-[#f74697] text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-[#ffe073] hover:text-gray-800"}
                  ${isRandomizing ? "cursor-wait opacity-75" : ""}
                `}
                >
                <span className={`inline-block transition-transform ${diceRolling ? "animate-dice-roll" : ""}`}>
                  🎲
                </span>
                  {isRandomizing ? " برزدن..." : " تصادفی"}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 pt-8">
          {/* Search Bar */}
          <div className="mb-6">
            <input
                type="text"
                placeholder="🔍 اصطلاحات خود را به فارسی یا انگلیسی اینجا جستجو کنید..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#ffe073]/50 focus:border-[#f74697] focus:outline-none bg-white shadow-sm transition-all duration-300"
            />
          </div>

          {/* Loading Overlay for Random Mode */}
          {isRandomizing && (
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 shadow-2xl text-center border-t-4 border-[#f74697]">
                  <div className="text-6xl mb-4 animate-bounce">🎲</div>
                  <div className="text-2xl font-bold mb-2" style={{ color: '#f74697' }}>برزدن اصطلاحات!</div>
                  <div className="text-gray-500">تصادفی کردن تجربه یادگیری شما...</div>
                  <div className="mt-4 flex justify-center gap-1">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#f74697' }}></div>
                    <div className="w-2 h-2 rounded-full animate-pulse delay-100" style={{ backgroundColor: '#ffe073' }}></div>
                    <div className="w-2 h-2 rounded-full animate-pulse delay-200" style={{ backgroundColor: '#4097f2' }}></div>
                  </div>
                </div>
              </div>
          )}

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Side: Grid of Idioms */}
            <div className="bg-white rounded-2xl shadow-xl p-4 border-t-4 border-[#f74697]">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#ffe073]/30">
                <h2 className="font-bold" style={{ color: '#f74697' }}>📚 لیست اصطلاحات</h2>
                <span className="text-sm text-gray-500">{displayedIdioms.length} اصطلاحات</span>
              </div>

              <div className="p-4 max-h-150 overflow-y-scroll flex flex-col gap-3 overflow-x-hidden">
                {displayedIdioms.map((idiom, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedIdiom(idiom)}
                        className={`cursor-pointer w-full  p-3 rounded-lg transition-all duration-300
                    ${selectedIdiom?.idiom === idiom.idiom
                            ? "text-white shadow-md scale-102"
                            : "bg-gray-50 hover:bg-[#ffe073]/30 text-gray-700 hover-scale"}
                  `}
                        style={{
                          backgroundColor: selectedIdiom?.idiom === idiom.idiom ? '#f74697' : undefined,
                          animation: isRandomizing ? `slideIn 0.3s ease-out ${index * 0.02}s` : "none"
                        }}
                    >
                      <div className="font-bold text-left">{idiom.idiom}</div>
                      <div className={`text-sm text-right ${selectedIdiom?.idiom === idiom.idiom ? "text-pink-100" : "text-gray-500"}`}>
                        {idiom.persian}
                      </div>
                    </button>
                ))}

                {displayedIdioms.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      هیچ اصطلاحاتی برای  &quot;{searchTerm}&quot; پیدا نشد
                    </div>
                )}
              </div>
            </div>

            {/* Right Side: Selected Idiom Details */}
            <div className="bg-white rounded-2xl shadow-xl p-6 detail-card transition-all duration-300 border-t-4 border-[#4097f2]">
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
                              : "hover:bg-[#ffe073]/30"}
                    `}
                      >
                        → قبلی
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
                              : "hover:bg-[#ffe073]/30"}
                    `}
                      >
                     بعدی  ←  
                      </button>
                    </div>

                    {/* Idiom Content */}
                    <div className="space-y-4">
                      {/* English Idiom */}
                      <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#f74697' }}>
                          {selectedIdiom.idiom}
                        </h2>
                      </div>

                      {/* Fonetic */}
                      <div className="rounded-xl p-4 text-center" style={{ backgroundColor: '#ffe07320' }}>
                        <div className="text-sm text-gray-500 mb-1">🔊 Pronunciation</div>
                        <p className="text-gray-700 font-mono text-sm">{selectedIdiom.fonetic}</p>
                      </div>

                      {/* Persian Translation */}
                      <div className="rounded-xl p-4 text-center" style={{ backgroundColor: '#f7469720' }}>
                        <div className="text-sm text-gray-500 mb-1">معنی</div>
                        <p className="text-xl font-bold" style={{ color: '#f74697' }}>{selectedIdiom.persian}</p>
                      </div>

                      {/* Example Sentence */}
                      <div className="rounded-xl p-4" style={{ backgroundColor: '#4097f210' }}>
                        <div className="text-sm text-gray-500 mb-2">💡 مثال انگلیسی</div>
                        <div className="text-gray-800 italic leading-relaxed" style={{direction: 'ltr'}}
                        >{selectedIdiom.example}</div>
                      </div>

                      {/* Example Meaning */}
                      <div className="rounded-xl p-4" style={{ backgroundColor: '#ffe07320' }}>
                        <div className="text-sm text-gray-500 mb-1">📝 معنی مثال</div>
                        <p className="text-gray-700">{selectedIdiom.exampleMeaning}</p>
                      </div>
                    </div>
                  </>
              ) : (
                  <div className="flex items-center justify-center h-96 text-center">
                    <div>
                      <div className="text-6xl mb-4">📖</div>
                      <p className="text-gray-500">در حال بارگیری اصطلاحات...</p>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </main>
      </div>
  );
};

export default IdiomsPage;