import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Operion | PMO & Operations Transformation',
  description: 'Operion builds world-class PMO systems, governance frameworks, and agile operating models — enabling enterprises to execute strategy with precision, speed, and clarity.',
  keywords: 'PMO consulting, project management office, operations transformation, agile, portfolio governance',
  openGraph: {
    title: 'Operion | PMO & Operations Transformation',
    description: 'Transform how your organization delivers. Enterprise PMO consulting and operations excellence.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
