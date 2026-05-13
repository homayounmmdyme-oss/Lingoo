"use client";

import Link from "next/link";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#f74697]/5 to-[#4097f2]/5"
      dir="rtl"
    >
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-[#ffe073]/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🦜</span>
              <h1 className="text-2xl font-bold" style={{ color: "#f74697" }}>
                لینگو
              </h1>
            </div>
            <div className="text-sm text-gray-500">یادگیری زبان با لذت</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🌟</div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "#f74697" }}
          >
            به لینگو خوش آمدید!
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            با روشی سرگرم‌کننده و جذاب، اصطلاحات و گرامر انگلیسی را یاد بگیرید
          </p>
        </div>

        {/* Two Main Sections */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Trivia Section */}
          <Link href="/trivia" className="group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer border-t-4 border-[#f74697] h-full">
              <div className="p-8 text-center">
                <div className="text-7xl mb-4 group-hover:animate-bounce inline-block">
                  🎯
                </div>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: "#f74697" }}
                >
                  مسابقه زبان انگلیسی
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  دانش خود را با سوالات چهارگزینه‌ای محک بزنید و نکات جالب یاد
                  بگیرید!
                </p>
                <div
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all group-hover:gap-3"
                  style={{ color: "#f74697", backgroundColor: "#f7469710" }}
                >
                  <span>شروع مسابقه</span>
                  <span className="text-lg">←</span>
                </div>
              </div>
              {/* Features */}
              <div className="bg-gray-50 px-6 py-3 flex justify-around text-xs text-gray-500 border-t border-[#ffe073]/30">
                <span>📋 {">"} ۲۰ سوال</span>
                <span>💡 نکات آموزشی</span>
                <span>⭐ امتیازدهی</span>
              </div>
            </div>
          </Link>

          {/* Idioms Section */}
          <Link href="/idioms" className="group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer border-t-4 border-[#4097f2] h-full">
              <div className="p-8 text-center">
                <div className="text-7xl mb-4 group-hover:animate-bounce inline-block">
                  📚
                </div>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: "#4097f2" }}
                >
                  دیکشنری اصطلاحات
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  بیش از ۱۰۰ اصطلاح کاربردی انگلیسی با معنی فارسی و مثال‌های
                  واقعی!
                </p>
                <div
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all group-hover:gap-3"
                  style={{ color: "#4097f2", backgroundColor: "#4097f210" }}
                >
                  <span>مشاهده اصطلاحات</span>
                  <span className="text-lg">←</span>
                </div>
              </div>
              {/* Features */}
              <div className="bg-gray-50 px-6 py-3 flex justify-around text-xs text-gray-500 border-t border-[#ffe073]/30">
                <span>🔊 تلفظ صوتی</span>
                <span>📖 مثال‌های کاربردی</span>
                <span>🎲 حالت تصادفی</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Additional Info Cards */}
        <div className="mt-16 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🎓</div>
            <p className="text-sm text-gray-600">
              یادگیری تعاملی و سرگرم‌کننده
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🚀</div>
            <p className="text-sm text-gray-600">بدون نیاز به ثبت‌نام</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">💎</div>
            <p className="text-sm text-gray-600">کاملاً رایگان</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-[#ffe073]/30">
          <p className="text-sm text-gray-500">
            🤝 Open Source — با مشارکت شما بهتر می‌شویم
          </p>
          <p className="text-xs text-gray-400 mt-2">
            لینگو - یادگیری زبان انگلیسی به روش مدرن
          </p>
        </div>
      </main>

      {/* Add bounce animation */}
      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .group:hover .group-hover\\:animate-bounce {
          animation: bounce 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
