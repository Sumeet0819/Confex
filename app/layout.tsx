import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Variable } from "lucide-react";
import '@stream-io/video-react-sdk/dist/css/styles.css';
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
      className="h-full antialiased dark"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <ClerkProvider appearance={{
        variables: {
          colorText: '#fff',
          colorPrimary: '#ffffff',
          colorTextOnPrimaryBackground: '#000',
          colorTextSecondary: 'rgba(255,255,255,0.4)',
          colorInputBackground: '#1e1e1e',
          colorButtonPrimaryBackground: '#ffffff',
          colorButtonPrimaryText: '#000',
          colorButtonPrimaryHoverBackground: 'rgba(255,255,255,0.8)',
        }
      }}>
        <body
          className="min-h-full flex flex-col bg-[#080808] text-white"
          suppressHydrationWarning
        >
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
