"use client";

import { useState, useEffect } from "react";
import lessons from "../lessons.json";
import TutorChat from "./TutorChat";
import LevelMap from "./LevelMap";
import LessonView from "./LessonView";

declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string }) => Promise<any>;
  }
}

export default function Home() {
  const [view, setView] = useState<"map" | "lesson">("map");
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [xp, setXp] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentLesson = lessons[currentIndex];
  const isBugLevel = currentLesson.type === "bug";

  useEffect(() => {
    const savedLevel = localStorage.getItem("codefun_level");
    const savedXp = localStorage.getItem("codefun_xp");
    if (savedLevel) setUnlockedLevel(Number(savedLevel));
    if (savedXp) setXp(Number(savedXp));
  }, []);

  useEffect(() => {
    const loadEngine = async () => {
      if (window.loadPyodide) {
        const py = await window.loadPyodide({ indexURL: "/pyodide/" });
        setPyodide(py);
        setIsLoading(false);
        return;
      }

      const script = document.createElement("script");
      script.src = "/pyodide/pyodide.js";
      script.async = true;
      script.onload = async () => {
        const py = await window.loadPyodide({ indexURL: "/pyodide/" });
        setPyodide(py);
        setIsLoading(false);
      };
      document.body.appendChild(script);
    };

    loadEngine();
  }, []);

  const startLesson = (index: number) => {
    setCurrentIndex(index);
    setCode(lessons[index].starterCode);
    setOutput("");
    setFeedback(null);
    setShowHint(false);
    setView("lesson");
  };

  const resetCode = () => {
    setCode(currentLesson.starterCode);
    setOutput("");
    setFeedback(null);
  };

  const runCode = async () => {
    if (!pyodide) return;
    setFeedback(null);
    setOutput("");

    try {
      let capturedOutput = "";
      pyodide.setStdout({
        batched: (str: string) => {
          capturedOutput += str;
        },
      });

      await pyodide.runPythonAsync(code);
      const cleanOutput = capturedOutput.trim();
      setOutput(cleanOutput);

      if (cleanOutput === currentLesson.expectedOutput) {
        setFeedback({
          type: "success",
          text: isBugLevel ? "אלוף! תיקנת את הבאג בהצלחה! +10 XP 🐞🎉" : "כל הכבוד! פתרת את המשימה בהצלחה! +10 XP 🎉",
        });

        const newXp = xp + 10;
        setXp(newXp);
        localStorage.setItem("codefun_xp", String(newXp));

        if (currentLesson.id === unlockedLevel && unlockedLevel < lessons.length) {
          const nextUnlocked = unlockedLevel + 1;
          setUnlockedLevel(nextUnlocked);
          localStorage.setItem("codefun_level", String(nextUnlocked));
        }
      } else {
        setFeedback({
          type: "error",
          text: `הקוד רץ, אבל הפלט שהתקבל ("${cleanOutput || "ריק"}") עדיין לא תואם לדרישות המשימה. קרא שוב את ההסבר ונסה לתקן!`,
        });
      }
    } catch (err: any) {
      const errorMsg = err.message || "";
      if (errorMsg.includes("IndentationError")) {
        setFeedback({
          type: "error",
          text: "שגיאת הזחה: שכחת ללחוץ על מקש Tab בתחילת השורה שאחרי הנקודתיים (:) כדי לדחוף את הפקודה פנימה!",
        });
      } else {
        setFeedback({
          type: "error",
          text: isBugLevel
            ? "הבאג עדיין קיים בקוד! בדוק את הודעת השגיאה למטה ונסה לתקן."
            : "יש שגיאת תחביר בקוד שלך (בדוק מירכאות, נקודתיים, סוגריים או איות).",
        });
      }
      setOutput(errorMsg);
    }
  };

  return (
    <main className="min-h-screen flex flex-col p-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-center bg-slate-800 p-4 rounded-xl mb-6 border border-slate-700 shadow-lg">
        <div className="flex items-center gap-4">
          <h1 onClick={() => setView("map")} className="text-2xl font-bold text-emerald-400 cursor-pointer hover:opacity-80 flex items-center gap-2">
            <span>פייתון-בוסט 🚀</span>
            <span className="text-xs bg-slate-900 text-slate-400 px-2 py-0.5 rounded-md border border-slate-700 font-mono">
              e4tx
            </span>
          </h1>
          {view === "lesson" && (
            <button onClick={() => setView("map")} className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg text-slate-200 transition cursor-pointer">
              🗺️ חזרה למפת השלבים
            </button>
          )}
        </div>
        <span className="bg-slate-900 px-4 py-1.5 rounded-full font-bold text-amber-400 border border-amber-500/30">
          ⭐ {xp} XP
        </span>
      </header>

      {view === "map" && <LevelMap lessons={lessons} unlockedLevel={unlockedLevel} onSelectLesson={startLesson} />}

      {view === "lesson" && (
        <LessonView
          lesson={currentLesson}
          totalLessons={lessons.length}
          code={code}
          setCode={setCode}
          output={output}
          showHint={showHint}
          setShowHint={setShowHint}
          feedback={feedback}
          isLoading={isLoading}
          onRunCode={runCode}
          onResetCode={resetCode}
          onBackToMap={() => setView("map")}
        />
      )}

      {view === "lesson" && (
        <TutorChat
          lessonTitle={currentLesson.title}
          explanation={currentLesson.explanation}
          task={currentLesson.task}
          hint={currentLesson.hint}
          userCode={code}
        />
      )}
    </main>
  );
}