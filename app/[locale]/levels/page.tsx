'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Type definitions
interface Level {
    id: number;
    name: string;
    description: string;
    xpRequired: number;
    isLocked: boolean;
    isCompleted: boolean;
    slug: string;
}

// Mock user progress - in real app, this would come from context/state management or API
interface UserProgress {
    currentXP: number;
    completedLevels: number[];
}

const LevelsJourney: React.FC = () => {
    const router = useRouter();

    // Mock user progress state
    const [userProgress, setUserProgress] = useState<UserProgress>({
        currentXP: 350,
        completedLevels: [1, 2]
    });

    // Level data configuration
    const levels: Level[] = [
        {
            id: 1,
            name: "Basics",
            description: "Learn fundamental concepts",
            xpRequired: 0,
            isLocked: false,
            isCompleted: userProgress.completedLevels.includes(1),
            slug: "basics"
        },
        {
            id: 2,
            name: "Beginner",
            description: "Start your journey",
            xpRequired: 100,
            isLocked: !userProgress.completedLevels.includes(1),
            isCompleted: userProgress.completedLevels.includes(2),
            slug: "beginner"
        },
        {
            id: 3,
            name: "Elementary",
            description: "Build your foundation",
            xpRequired: 250,
            isLocked: !userProgress.completedLevels.includes(2),
            isCompleted: userProgress.completedLevels.includes(3),
            slug: "elementary"
        },
        {
            id: 4,
            name: "Intermediate",
            description: "Take next steps",
            xpRequired: 450,
            isLocked: !userProgress.completedLevels.includes(3),
            isCompleted: userProgress.completedLevels.includes(4),
            slug: "intermediate"
        },
        {
            id: 5,
            name: "Upper Intermediate",
            description: "Advance your skills",
            xpRequired: 700,
            isLocked: !userProgress.completedLevels.includes(4),
            isCompleted: userProgress.completedLevels.includes(5),
            slug: "upper-intermediate"
        },
        {
            id: 6,
            name: "Advanced",
            description: "Master complex topics",
            xpRequired: 1000,
            isLocked: !userProgress.completedLevels.includes(5),
            isCompleted: userProgress.completedLevels.includes(6),
            slug: "advanced"
        },
        {
            id: 7,
            name: "Expert",
            description: "Achieve proficiency",
            xpRequired: 1400,
            isLocked: !userProgress.completedLevels.includes(6),
            isCompleted: userProgress.completedLevels.includes(7),
            slug: "expert"
        },
        {
            id: 8,
            name: "Master",
            description: "Become a master",
            xpRequired: 1900,
            isLocked: !userProgress.completedLevels.includes(7),
            isCompleted: userProgress.completedLevels.includes(8),
            slug: "master"
        }
    ];

    // Calculate next unlockable level
    const getNextUnlockableLevel = () => {
        return levels.find(level => level.isLocked && !level.isCompleted);
    };

    const nextLevel = getNextUnlockableLevel();
    const nextLevelXP = nextLevel?.xpRequired || 0;
    const xpProgress = Math.min((userProgress.currentXP / nextLevelXP) * 100, 100);
    const xpToNextLevel = Math.max(0, nextLevelXP - userProgress.currentXP);

    // Handle level click - Next.js navigation
    const handleLevelClick = (level: Level) => {
        if (!level.isLocked) {
            router.push(`/level/${level.slug}`);
        }
    };

    // Calculate level status icon and styling
    const getLevelStatus = (level: Level) => {
        if (level.isCompleted) {
            return {
                icon: "✓",
                bgColor: "bg-emerald-500",
                borderColor: "border-emerald-600",
                textColor: "text-white",
                shadowColor: "shadow-emerald-500/30"
            };
        }
        if (!level.isLocked) {
            return {
                icon: "🔓",
                bgColor: "bg-blue-500",
                borderColor: "border-blue-600",
                textColor: "text-white",
                shadowColor: "shadow-blue-500/30"
            };
        }
        return {
            icon: "🔒",
            bgColor: "bg-gray-400",
            borderColor: "border-gray-500",
            textColor: "text-gray-300",
            shadowColor: "shadow-gray-400/20"
        };
    };

    // Calculate if level is currently available
    const isLevelAvailable = (level: Level) => {
        return !level.isLocked;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto mb-12">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-blue-900 mb-2 flex items-center justify-center gap-3">
                        <span className="text-6xl">🏆</span>
                        Language Journey
                        <span className="text-6xl">🌟</span>
                    </h1>
                    <p className="text-blue-600 text-lg">Master languages one level at a time</p>
                </div>

                {/* XP Progress Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-blue-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                {Math.floor(userProgress.currentXP)}
                            </div>
                            <div>
                                <p className="text-gray-600 font-medium">Total XP</p>
                                <p className="text-2xl font-bold text-blue-900">{userProgress.currentXP} XP</p>
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                                <span>Progress to {nextLevel?.name}</span>
                                <span>{xpToNextLevel} XP needed</span>
                            </div>
                            <div className="relative">
                                <div className="overflow-hidden h-4 text-xs flex rounded-full bg-gray-200">
                                    <div
                                        style={{ width: `${xpProgress}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">Current Streak</p>
                            <p className="text-2xl font-bold text-blue-900">7 🔥</p>
                        </div>
                    </div>
                </div>

                {/* Levels Journey Path */}
                <div className="relative">
                    {/* Vertical connecting line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-300 h-full -z-10 hidden md:block"
                         style={{ top: '60px', height: 'calc(100% - 60px)' }} />

                    <div className="space-y-8">
                        {levels.map((level, index) => {
                            const status = getLevelStatus(level);
                            const isAvailable = isLevelAvailable(level);

                            return (
                                <div key={level.id} className="relative">
                                    {/* Connecting dots line for mobile */}
                                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-300 -z-10 md:hidden"
                                         style={{ display: index === levels.length - 1 ? 'none' : 'block' }} />

                                    <div className={`flex items-center justify-center ${!isAvailable ? 'opacity-60' : ''}`}>
                                        {/* Level Card */}
                                        <div
                                            onClick={() => handleLevelClick(level)}
                                            className={`
                        relative group w-full max-w-2xl mx-auto
                        transform transition-all duration-300 hover:scale-105 cursor-pointer
                        ${isAvailable ? 'hover:shadow-2xl' : 'cursor-not-allowed'}
                      `}
                                        >
                                            <div className={`
                        bg-white rounded-2xl shadow-lg border-2 ${status.borderColor}
                        overflow-hidden transition-all duration-300
                        ${isAvailable ? 'hover:border-blue-400' : ''}
                      `}>
                                                <div className="flex items-center p-4 md:p-6">
                                                    {/* Level Number Circle */}
                                                    <div className={`
                            w-16 h-16 rounded-full flex items-center justify-center
                            text-2xl font-bold shadow-lg ${status.bgColor} ${status.textColor}
                            ${status.shadowColor} flex-shrink-0
                            transition-all duration-300 group-hover:shadow-xl
                          `}>
                                                        {status.icon === "✓" ? "✓" : level.id}
                                                    </div>

                                                    {/* Level Info */}
                                                    <div className="flex-1 ml-4 md:ml-6">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                                                                Level {level.id}: {level.name}
                                                            </h3>
                                                            {status.icon === "✓" && (
                                                                <span className="text-emerald-500 text-sm font-semibold bg-emerald-50 px-2 py-1 rounded-full">
                                  Completed!
                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-600 mb-2">{level.description}</p>
                                                        <div className="flex items-center gap-4 text-sm">
                              <span className="text-blue-600 font-medium">
                                🎯 {level.xpRequired} XP required
                              </span>
                                                            {!level.isLocked && !level.isCompleted && (
                                                                <span className="text-emerald-600 font-medium">
                                  ✨ Ready to start!
                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Arrow Icon */}
                                                    {isAvailable && (
                                                        <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Progress bar for active level */}
                                                {!level.isLocked && !level.isCompleted && (
                                                    <div className="h-1 bg-gray-200">
                                                        <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: '0%' }} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Left side connecting dot for desktop */}
                                            <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <div className={`
                          w-4 h-4 rounded-full border-2 border-white
                          ${status.bgColor} shadow-md
                        `} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Motivational Message */}
                {nextLevel && !nextLevel.isCompleted && (
                    <div className="mt-12 text-center">
                        <div className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg">
                            <p className="font-semibold">
                                🎯 {xpToNextLevel} XP to unlock {nextLevel.name} level!
                            </p>
                        </div>
                    </div>
                )}

                {/* Completion Message */}
                {levels.every(level => level.isCompleted) && (
                    <div className="mt-12 text-center animate-bounce">
                        <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-xl">
                            <p className="text-xl font-bold">🎉 Congratulations Master! You've completed all levels! 🎉</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Floating Action Button for motivation */}
            <button
                onClick={() => {
                    alert("Complete a lesson to earn XP and unlock more levels! 🌟");
                }}
                className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
        </div>
    );
};

export default LevelsJourney;