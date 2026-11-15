"use client";

import { useState } from "react";

interface TutorChatProps {
  lessonTitle: string;
  explanation: string;
  task: string;
  hint: string;
  userCode: string;
}

export default function TutorChat({
  lessonTitle,
  explanation,
  task,
  hint,
  userCode,
}: TutorChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([
    {
      sender: "bot",
      text: "היי! אני המנטור שלך 🤖. נתקעת או לא הבנת משהו במשימה? שאל אותי חופשי!",
    },
  ]);

  const generateReply = (question: string) => {
    const q = question.toLowerCase();

    if (q.includes("פתרון") || q.includes("תשובה") || q.includes("תגלה") || q.includes("תכתוב לי")) {
      return `אני לא מגלה את הקוד המלא כדי שתלמד בעצמך 😉, אבל הנה כיוון: ${hint}`;
    }

    if (q.includes("רמז") || q.includes("עזרה") || q.includes("נתקעתי") || q.includes("לא מצליח")) {
      return `בשמחה! הנה טיפ לשלב "${lessonTitle}": ${hint}`;
    }

    if (q.includes("בדוק") || q.includes("הקוד שלי") || q.includes("טעות") || q.includes("שגיאה")) {
      if (!userCode.toLowerCase().includes("print")) {
        return "הצצתי בקוד שלך 👀 — שים לב שעדיין לא השתמשת בפקודה print כדי להציג פלט על המסך!";
      }
      if ((userCode.match(/\(/g) || []).length !== (userCode.match(/\)/g) || []).length) {
        return "בדקתי את הקוד שלך 👀 — נראה שפתחת סוגריים ( אבל שכחת לסגור אותם )!";
      }
      return "המבנה הכללי של הקוד שלך נראה בכיוון הנכון! ודא שאין שגיאות כתיב, שיש מירכאות סביב טקסט, ולחץ על 'הרץ קוד'.";
    }

    if (q.includes("איך") || q.includes("מה עושים") || q.includes("לא הבנתי") || q.includes("הסבר")) {
      return `בוא נעשה סדר: ${explanation} המטרה שלך כרגע היא: ${task}`;
    }

    return `שאלה טובה! לגבי "${lessonTitle}", זכור ש-${hint}. אם תרצה שאבדוק מה כתבת עד עכשיו, פשוט כתוב לי "תבדוק את הקוד שלי".`;
  };

  const handleSend = (e?: React.FormEvent, quickText?: string) => {
    if (e) e.preventDefault();
    const textToSend = quickText || input;
    if (!textToSend.trim()) return;

    const userMsg = { sender: "user" as const, text: textToSend };
    const botReply = { sender: "bot" as const, text: generateReply(textToSend) };

    setMessages((prev) => [...prev, userMsg, botReply]);
    if (!quickText) setInput("");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50" dir="rtl">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-5 rounded-full shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
        >
          <span className="text-xl">🤖</span>
          <span>התייעץ עם המנטור</span>
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-slate-900 p-3.5 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <h4 className="font-bold text-sm text-emerald-400">המנטור האישי שלך</h4>
                <span className="text-xs text-slate-400">מחובר ומוכן לעזור</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white font-bold px-2 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="p-4 h-64 overflow-y-auto flex flex-col gap-3 bg-slate-850">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-sm leading-relaxed max-w-[85%] ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white self-start rounded-br-none"
                    : "bg-slate-700 text-slate-100 self-end rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="px-3 py-2 bg-slate-900/60 flex gap-2 overflow-x-auto border-t border-slate-700/50">
            <button
              onClick={() => handleSend(undefined, "תבדוק את הקוד שלי")}
              className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer"
            >
              🔍 בדוק את הקוד שלי
            </button>
            <button
              onClick={() => handleSend(undefined, "לא הבנתי מה עושים")}
              className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer"
            >
              ❓ לא הבנתי
            </button>
          </div>

          <form onSubmit={handleSend} className="p-2.5 bg-slate-900 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="שאל שאלה..."
              className="flex-1 bg-slate-800 text-white text-sm px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-sm cursor-pointer"
            >
              שלח
            </button>
          </form>
        </div>
      )}
    </div>
  );
}