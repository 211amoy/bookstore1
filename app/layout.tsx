import type React from 'react';
import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import './globals.css';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-pt-sans',
});

export const metadata: Metadata = {
  title: 'BookStore - Your Digital Library',
  description: 'Modern online bookstore with comprehensive book management',
  generator: 'v0.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ptSans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
