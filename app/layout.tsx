import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "פייתון-בוסט (e4tx) | לימוד תכנות ופייתון בעברית",
  description: "פייתון-בוסט (PyBoost) - פלטפורמה אינטראקטיבית ללימוד תכנות ופייתון בעברית צעד אחר צעד עם מפת שלבים, תיקון באגים ומנטור אישי.",
  keywords: ["פייתון-בוסט", "PyBoost", "e4tx", "לימוד פייתון", "לימוד תכנות בעברית"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta name="google-site-verification" content="CtuEL7hWpELDFrx5zTcWFvNcgfD8Qtuao7tpurBgttE" />
      </head>
      <body className="bg-slate-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}