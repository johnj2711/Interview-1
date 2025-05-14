import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "光场面试题",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="w-auto h-auto overflow-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
