export const metadata = {
  title: "Ankit Kumar | Portfolio",
  description:
    "Full Stack Developer portfolio – projects, skills, and AI-powered portfolio assistant."
};

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import MouseTrail from "@/components/MouseTrail";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <MouseTrail />
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Chatbot />
        </div>
      </body>
    </html>
  );
}
