import type { Metadata } from "next";

import "./globals.css";

import { GameProvider } from "@/context/GameContext";

export const metadata: Metadata = {
  title: "Basketball Scoreboard",
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