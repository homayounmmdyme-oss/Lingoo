'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

interface LevelContent {
    title: string;
    description: string;
    lessons: {
        id: number;
        title: string;
        completed: boolean;
    }[];
}

const levelContents: Record<string, LevelContent> = {
    basics: {
        title: "Basics Level",
        description: "Learn the fundamental concepts",
        lessons: [
            { id: 1, title: "Introduction", completed: false },
            { id: 2, title: "Basic Vocabulary", completed: false },
            { id: 3, title: "Simple Phrases", completed: false },
        ]
    },
    beginner: {
        title: "Beginner Level",
        description: "Start your language journey",
        lessons: [
            { id: 1, title: "Greetings", completed: false },
            { id: 2, title: "Numbers", completed: false },
            { id: 3, title: "Common Verbs", completed: false },
        ]
    },
    elementary: {
        title: "Elementary Level",
        description: "Build your foundation",
        lessons: [
            { id: 1, title: "Present Tense", completed: false },
            { id: 2, title: "Daily Routines", completed: false },
            { id: 3, title: "Food & Dining", completed: false },
        ]
    },
    intermediate: {
        title: "Intermediate Level",
        description: "Take next steps",
        lessons: [
            { id: 1, title: "Past Tense", completed: false },
            { id: 2, title: "Future Plans", completed: false },
            { id: 3, title: "Travel Vocabulary", completed: false },
        ]
    },
    'upper-intermediate': {
        title: "Upper Intermediate Level",
        description: "Advance your skills",
        lessons: [
            { id: 1, title: "Complex Sentences", completed: false },
            { id: 2, title: "Idioms", completed: false },
            { id: 3, title: "Business Language", completed: false },
        ]
    },
    advanced: {
        title: "Advanced Level",
        description: "Master complex topics",
        lessons: [
            { id: 1, title: "Subjunctive Mood", completed: false },
            { id: 2, title: "Literature", completed: false },
            { id: 3, title: "Debate Skills", completed: false },
        ]
    },
    expert: {
        title: "Expert Level",
        description: "Achieve proficiency",
        lessons: [
            { id: 1, title: "Advanced Grammar", completed: false },
            { id: 2, title: "Cultural Nuances", completed: false },
            { id: 3, title: "Professional Writing", completed: false },
        ]
    },
    master: {
        title: "Master Level",
        description: "Become a master",
        lessons: [
            { id: 1, title: "Fluency Practice", completed: false },
            { id: 2, title: "Native Expressions", completed: false },
            { id: 3, title: "Final Assessment", completed: false },
        ]
    }
};

export default function LevelPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const content = levelContents[slug];
    const [lessons, setLessons] = useState(content?.lessons || []);

    if (!content) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Level Not Found</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Back to Journey
                    </button>
                </div>
            </div>
        );
    }

    const completedCount = lessons.filter(l => l.completed).length;
    const progress = (completedCount / lessons.length) * 100;

    const handleLessonClick = (lessonId: number) => {
        setLessons(prev =>
            prev.map(lesson =>
                lesson.id === lessonId
                    ? { ...lesson, completed: !lesson.completed }
                    : lesson
            )
        );
    };

    const handleBackToJourney = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={handleBackToJourney}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Journey
                    </button>

                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
                        <h1 className="text-4xl font-bold text-blue-900 mb-2">{content.title}</h1>
                        <p className="text-gray-600 text-lg">{content.description}</p>

                        {/* Progress Bar */}
                        <div className="mt-6">
                            <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                                <span>Level Progress</span>
                                <span>{completedCount} / {lessons.length} lessons</span>
                            </div>
                            <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200">
                                <div
                                    style={{ width: `${progress}%` }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lessons List */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Lessons</h2>
                    {lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            onClick={() => handleLessonClick(lesson.id)}
                            className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-xl
                    ${lesson.completed
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'}
                    transition-colors duration-300
                  `}>
                                        {lesson.completed ? '✓' : lesson.id}
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-semibold ${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                            {lesson.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">Click to mark as {lesson.completed ? 'incomplete' : 'complete'}</p>
                                    </div>
                                </div>
                                {!lesson.completed && (
                                    <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Completion Message */}
                {completedCount === lessons.length && (
                    <div className="mt-8 text-center animate-bounce">
                        <div className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg">
                            <p className="font-semibold">🎉 Amazing! You've completed this level! 🎉</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}