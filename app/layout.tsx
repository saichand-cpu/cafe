import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORGE ITALY — Crafted by Fire. Inspired by Italy.",
  description: "An immersive Italian café experience where handcrafted coffee, food, design and culture come together.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
