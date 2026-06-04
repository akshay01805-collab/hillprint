import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "HillPrint",
  description: "Online Document Printing Service",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable}`}
    >
      <body
        className="min-h-screen bg-slate-50 text-slate-900"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        {children}
      </body>
    </html>
  );
}