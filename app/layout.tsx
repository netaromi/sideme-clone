import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "e4tx | קוד-כיף - לימוד תכנות ופייתון בעברית",
  description: "e4tx (קוד-כיף) - פלטפורמה אינטראקטיבית ללימוד תכנות ופייתון בעברית צעד אחר צעד.",
  keywords: ["e4tx", "קוד-כיף", "לימוד פייתון", "לימוד תכנות בעברית"],
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