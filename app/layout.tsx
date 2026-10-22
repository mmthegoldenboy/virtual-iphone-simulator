import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virtual iPhone Simulator",
  description: "A fictional iPhone home screen and app experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
