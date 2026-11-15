"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

interface Lesson {
  id: number;
  type?: string;
  title: string;
  explanation: string;
  example?: string;
  task: string;
  hint: string;
  solution?: string;
}

interface LessonViewProps {
  lesson: Lesson;
  totalLessons: number;
  code: string;
  setCode: (val: string) => void;
  output: string;
  showHint: boolean;
  setShowHint: (val: boolean) => void;
  feedback: { type: "success" | "error"; text: string } | null;
  isLoading: boolean;
  onRunCode: () => void;
  onResetCode: () => void;
  onBackToMap: () => void;
}

export default function LessonView({
  lesson,
  totalLessons,
  code,
  setCode,
  output,
  showHint,
  setShowHint,
  feedback,
  isLoading,
  onRunCode,
  onResetCode,
  onBackToMap,
}: LessonViewProps) {
  const [showSolution, setShowSolution] = useState(false);
  const isBugLevel = lesson.type === "bug";

  useEffect(() => {
    setShowSolution(false);
  }, [lesson.id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                שלב {lesson.id} מתוך {totalLessons}
              </span>
              {isBugLevel && (
                <span className="text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                  🐞 אתגר תיקון באגים
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold mt-1">{lesson.title}</h2>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-700 space-y-3">
            <div>
              <h3 className="text-sm font-bold text-sky-400 mb-1">📘 הסבר:</h3>
              <p style={{ unicodeBidi: "plaintext" }} className="text-slate-200 text-base leading-relaxed text-right">
                {lesson.explanation}
              </p>
            </div>

            {lesson.example && (
              <div className="pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold text-slate-400 block mb-1.5">💡 דוגמה למבנה הקוד:</span>
                <pre dir="ltr" className="bg-slate-950 text-emerald-300 font-mono text-sm p-3 rounded-lg border border-slate-800 overflow-x-auto">
                  {lesson.example}
                </pre>
              </div>
            )}
          </div>

          <div className={`p-4 rounded-lg border ${isBugLevel ? "bg-amber-950/30 border-amber-500/40" : "bg-indigo-950/50 border-indigo-500/40"}`}>
            <h3 className={`text-sm font-bold mb-1 ${isBugLevel ? "text-amber-300" : "text-indigo-300"}`}>
              {isBugLevel ? "🐞 המשימה שלך (תיקון הקוד):" : "🎯 המשימה שלך:"}
            </h3>
            <p style={{ unicodeBidi: "plaintext" }} className="text-white font-medium text-base leading-relaxed text-right">
              {lesson.task}
            </p>
          </div>

          {/* כפתורי רמז וגילוי תשובה */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              {!showHint && (
                <button onClick={() => setShowHint(true)} className="text-sm text-amber-400 hover:text-amber-300 underline cursor-pointer">
                  💡 נתקעת? קבל רמז
                </button>
              )}
              {!showSolution && lesson.solution && (
                <button onClick={() => setShowSolution(true)} className="text-sm text-rose-400 hover:text-rose-300 underline cursor-pointer">
                  👀 גלה את התשובה
                </button>
              )}
            </div>

            {showHint && (
              <div style={{ unicodeBidi: "plaintext" }} className="bg-amber-950/40 border border-amber-500/40 p-3 rounded-lg text-amber-200 text-sm text-right">
                <strong>רמז:</strong> {lesson.hint}
              </div>
            )}

            {showSolution && lesson.solution && (
              <div className="bg-slate-950 border border-rose-500/40 p-3 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-rose-300">✅ הפתרון המלא:</span>
                  <button
                    onClick={() => setCode(lesson.solution || "")}
                    className="text-xs bg-rose-600 hover:bg-rose-500 text-white px-2.5 py-1 rounded transition cursor-pointer"
                  >
                    📋 העתק לעורך
                  </button>
                </div>
                <pre dir="ltr" className="text-emerald-300 font-mono text-sm overflow-x-auto p-2 bg-slate-900 rounded">
                  {lesson.solution}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div>
          {feedback && (
            <div className={`mt-6 p-4 rounded-lg font-medium ${feedback.type === "success" ? "bg-emerald-900/50 border border-emerald-500 text-emerald-200" : "bg-rose-900/50 border border-rose-500 text-rose-200"}`}>
              {feedback.text}
            </div>
          )}

          {feedback?.type === "success" && (
            <button onClick={onBackToMap} className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-6 rounded-xl transition cursor-pointer">
              חזור למפה והמשך לשלב הבא 🗺️
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex-1 flex flex-col" dir="ltr">
          <div className="bg-slate-950 px-4 py-2 text-xs text-slate-400 border-b border-slate-800 flex justify-between items-center">
            <span>main.py {isBugLevel ? "(Contains Bugs 🐞)" : ""}</span>
            <button onClick={onResetCode} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded transition cursor-pointer">
              🔄 אפס קוד
            </button>
          </div>
          <div className="flex-1 min-h-[250px]">
            <Editor height="100%" defaultLanguage="python" theme="vs-dark" value={code} onChange={(val) => setCode(val || "")} options={{ minimap: { enabled: false }, fontSize: 16 }} />
          </div>
        </div>

        <button onClick={onRunCode} disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition cursor-pointer">
          {isLoading ? "טוען מנוע פייתון..." : "הרץ קוד ▶️"}
        </button>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[100px]" dir="ltr">
          <div className="text-xs text-slate-500 mb-1">Output:</div>
          <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
}