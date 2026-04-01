import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingButton from "@/components/floating";
// import ScholarshipPopup from "@/components/ScholarshipPopup";
import InitialLoadPopup from "@/components/Popup";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skill Mantra",
  description: "Why Choose Skill Mantra? Expert Instructors. Learn from industry professionals with extensive experience and expertise in their respective fields.",
  icons:"/favicon.ico"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M0TC8CLB92"
        ></Script>
        <Script id="google-analytics">
          {`
      window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());

     gtag('config', 'G-M0TC8CLB92');
    `}
        </Script>
      </head>
      <body className={inter.className}>
        
        <Navbar />
        <main className="">
          <FloatingButton />
          <InitialLoadPopup />
          {children}
        </main>
        <Footer />
        {/* <ScholarshipPopup /> */}
        <ToastContainer />
      </body>
    </html>
  );
}
