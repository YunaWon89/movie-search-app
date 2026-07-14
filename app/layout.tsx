import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GenreProvider } from "@/components/GenreContext";
import { getGenres } from "@/lib/tmdb";
import type { Genre } from "@/types/movie";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Search",
  description: "Search and browse movies powered by TMDB",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let genres: Genre[];
  try {
    genres = await getGenres();
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    genres = [];
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AntdRegistry>
          <ThemeProvider>
            <GenreProvider genres={genres}>{children}</GenreProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
