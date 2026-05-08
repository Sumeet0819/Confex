import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Variable } from "lucide-react";
import { Toaster } from "@/components/ui/sonner"


export const metadata: Metadata = {
  title: "Confex",
  description: "Video conferencing made simple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}
    >
      <ClerkProvider appearance={{
        variables: {
          colorText: '#fff',
          colorPrimary: '#7C3AED',
          colorTextOnPrimaryBackground: '#fff',
          colorTextSecondary: '#9ca3af',
          colorInputBackground: '#2d2d2d',
          colorButtonPrimaryBackground: '#7C3AED',
          colorButtonPrimaryText: '#fff',
          colorButtonPrimaryHoverBackground: '#6d28d9',

        }
      }}>
        <body className="min-h-full flex flex-col bg-[#1c1c1c] text-white">
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
