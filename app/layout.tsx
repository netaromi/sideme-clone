import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "קוד-כיף | לימוד תכנות ופייתון בעברית בחינם",
  description: "למדו לתכנת בפייתון צעד אחר צעד בעברית! פלטפורמה אינטראקטיבית בסגנון משחק עם תרגול קוד חי, תיקון באגים ומנטור אישי.",
  verification: {
    google: "CtuEL7hWpELDFrx5zTcWfVNcgfDBQtuao7tpurBgttE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="bg-slate-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}