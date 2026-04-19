'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiArrowUp } from 'react-icons/fi'

// Links de navegação rápida
const quickLinks = [
  { label: 'Início',       href: '#inicio' },
  { label: 'Sobre',        href: '#sobre' },
  { label: 'Habilidades',  href: '#habilidades' },
  { label: 'Projetos',     href: '#projetos' },
  { label: 'Contato',      href: '#contato' },
]

// Links sociais
// TODO: Substituir pelos dados reais se necessário
const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/feitosalucas174',
    icon: FiGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lucas-feitosa-5b0932362',
    icon: FiLinkedin,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lucas.feitosa121/',
    icon: FiInstagram,
  },
  {
    label: 'E-mail',
    href: 'mailto:feitosalucas174@gmail.com',
    icon: FiMail,
  },
]

export default function Footer() {
  const scrollToSection = (href: string) => {
    const id = href.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8">
      {/* Linha de luz no topo */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Bloco principal — centralizado */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-8 mb-12"
        >
          {/* Identidade */}
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30 mx-auto mb-3">
              LF
            </div>
            <h3 className="text-white font-bold text-lg">Lucas Feitosa</h3>
            <p className="text-white/40 text-sm mt-1 max-w-xs mx-auto leading-relaxed">
              Desenvolvedor Full-Stack &amp; Mobile disponível para projetos freelance.
            </p>
          </div>

          {/* Links sociais — ícones grandes */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 text-white/45 text-sm hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200"
              >
                <s.icon size={16} className="group-hover:scale-110 transition-transform" />
                <span>{s.label}</span>
              </a>
            ))}
          </div>

          {/* Links de navegação rápida */}
          <nav aria-label="Navegação rápida" className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                className="text-white/30 hover:text-white/70 text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Divisor */}
        <div className="h-px bg-white/5 mb-6" />

        {/* Rodapé inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-white/20 text-xs">
            © 2025 Lucas Feitosa. Todos os direitos reservados.
          </p>

          {/* Botão voltar ao topo inline no footer */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 text-white/20 hover:text-white/60 text-xs transition-colors duration-200"
            aria-label="Voltar ao topo"
          >
            <FiArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
            Voltar ao topo
          </button>
        </motion.div>

      </div>
    </footer>
  )
}
