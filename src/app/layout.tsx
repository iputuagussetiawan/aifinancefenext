import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // Useful if using Tailwind
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      {/* Apply the font to the body */}
      <body className={inter.className}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
