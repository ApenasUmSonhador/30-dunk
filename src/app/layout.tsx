import type { Metadata } from "next";

import "./globals.css";

import { GameProvider } from "@/context/GameContext";

export const metadata: Metadata = {
  authors: [
    {
      name: "Arthur Nunes ",
      url: "https://github.com/ApenasUmSonhador"
    }
  ],
  title: "30 Dunk - Scoreboard",
  description: "Basketball Scoreboard App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}