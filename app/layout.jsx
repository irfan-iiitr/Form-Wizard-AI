import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from '../components/ui/sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Form Wizard",
  description: "Generated Forms in Seconds",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en"  >

      <body className={inter.className}>
        <Header></Header>
      
        {children}
        
        <Toaster />
        
        </body>
    </html>
    </ClerkProvider>
  );
}
