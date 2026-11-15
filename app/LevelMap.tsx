"use client";

import React from "react";

interface Lesson {
  id: number;
  type?: string;
  title: string;
}

interface LevelMapProps {
  lessons: Lesson[];
  unlockedLevel: number;
  onSelectLesson: (index: number) => void;
}

export default function LevelMap({ lessons, unlockedLevel, onSelectLesson }: LevelMapProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">מסלול לימוד פייתון 🐍</h2>
        <p className="text-slate-400">בחר שלב פתוח כדי ללמוד ולפתור אתגרים</p>
      </div>

      <div className="flex flex-col items-center gap-6 relative">
        {lessons.map((lesson, index) => {
          const isCompleted = lesson.id < unlockedLevel;
          const isCurrent = lesson.id === unlockedLevel;
          const isLocked = lesson.id > unlockedLevel;
          const isBug = lesson.type === "bug";

          const offsetClass =
            index % 4 === 1 ? "translate-x-10" : index % 4 === 3 ? "-translate-x-10" : "";

          return (
            <div key={lesson.id} className={`flex flex-col items-center ${offsetClass}`}>
              <button
                disabled={isLocked}
                onClick={() => onSelectLesson(index)}
                className={`w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold text-2xl shadow-xl transition-transform border-b-8 ${
                  isCompleted
                    ? "bg-emerald-500 border-emerald-700 text-slate-950 hover:scale-105 cursor-pointer"
                    : isCurrent
                    ? isBug
                      ? "bg-amber-500 border-amber-700 text-slate-950 hover:scale-105 animate-pulse cursor-pointer ring-4 ring-amber-400/50"
                      : "bg-indigo-600 border-indigo-800 text-white hover:scale-105 animate-pulse cursor-pointer ring-4 ring-indigo-400/50"
                    : "bg-slate-800 border-slate-950 text-slate-600 cursor-not-allowed"
                }`}
              >
                {isCompleted ? "✔️" : isLocked ? "🔒" : isBug ? "🐞" : lesson.id}
              </button>

              <div className="mt-2 flex flex-col items-center gap-1">
                {isBug && !isLocked && (
                  <span className="text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                    🐞 תיקון באג
                  </span>
                )}
                <span
                  className={`font-semibold text-sm px-3 py-1 rounded-full ${
                    isLocked ? "text-slate-500" : "text-slate-200 bg-slate-800/80"
                  }`}
                >
                  {lesson.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}