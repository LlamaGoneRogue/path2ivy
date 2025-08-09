import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/hooks/useAuth'
import AIChatbot from '@/components/AIChatbot'
import { ToastProvider } from '@/components/ToastProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Path2Ivy - Your Journey to Elite Colleges Starts Here',
  description: 'Democratizing college admissions with AI-powered guidance, personalized action plans, and expert mentorship—completely free for students from all backgrounds.',
  keywords: ['college admissions', 'AI guidance', 'scholarships', 'elite colleges', 'student support'],
  authors: [{ name: 'Path2Ivy Team' }],
  openGraph: {
    title: 'Path2Ivy - Your Journey to Elite Colleges',
    description: 'Get personalized college guidance with AI-powered daily plans, college matching, and scholarship finder.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Path2Ivy - Your Journey to Elite Colleges',
    description: 'Get personalized college guidance with AI-powered daily plans, college matching, and scholarship finder.',
  },
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>
            {children}
            <AIChatbot />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}