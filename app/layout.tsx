import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "קוד-כיף - לומדים תכנות בעברית",
  description: "פלטפורמה אינטראקטיבית ללימוד פייתון בעברית",
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