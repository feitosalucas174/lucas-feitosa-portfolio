import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Fonte Inter do Google Fonts via next/font (otimizado)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Metadados da página para SEO
export const metadata: Metadata = {
  title: 'Lucas Feitosa | Desenvolvedor Full-Stack Freelance',
  description:
    'Desenvolvedor Full-Stack, Mobile e especialista em IA. Transformo ideias em sistemas reais. Disponível para projetos freelance.',
  keywords: [
    'desenvolvedor freelance',
    'full-stack',
    'mobile',
    'inteligência artificial',
    'web',
    'Next.js',
    'React',
    'Python',
    'Flutter',
  ],
  authors: [{ name: 'Lucas Feitosa' }],
  creator: 'Lucas Feitosa',
  openGraph: {
    title: 'Lucas Feitosa | Desenvolvedor Full-Stack Freelance',
    description:
      'Desenvolvedor Full-Stack, Mobile e especialista em IA. Disponível para projetos freelance.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucas Feitosa | Desenvolvedor Full-Stack Freelance',
    description: 'Desenvolvedor Full-Stack, Mobile e especialista em IA.',
  },
  robots: {
    index: true,
    follow: true,
  },
  // TODO: Adicionar URL do site após o deploy na Vercel
  // metadataBase: new URL('https://lucasfeitosa.dev'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${inter.variable} font-sans bg-[#0a0a0a] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
