'use client'

import { motion } from 'framer-motion'
import { FiCode, FiSmartphone, FiCpu, FiCalendar } from 'react-icons/fi'

// Estatísticas exibidas nos cards
const stats = [
  {
    value: '4+',
    label: 'Anos de Experiência',
    icon: FiCalendar,
    gradient: 'from-blue-500 to-blue-700',
    shadow: 'shadow-blue-500/20',
  },
  {
    value: '10+',
    label: 'Tecnologias Dominadas',
    icon: FiCode,
    gradient: 'from-blue-500 to-blue-700',
    shadow: 'shadow-blue-500/20',
  },
  {
    value: '✓',
    label: 'App Mobile',
    icon: FiSmartphone,
    gradient: 'from-blue-400 to-blue-600',
    shadow: 'shadow-blue-500/20',
  },
  {
    value: '✓',
    label: 'Integração com IA',
    icon: FiCpu,
    gradient: 'from-pink-500 to-rose-600',
    shadow: 'shadow-pink-500/20',
  },
]

// Variantes de animação reutilizáveis
const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export default function About() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="sobre" className="py-24 sm:py-32 relative">
      {/* Divisor sutil no topo */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase">
            Sobre mim
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            Quem sou eu?
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Coluna de texto */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="text-white/70 text-lg leading-relaxed mb-5">
              Sou um desenvolvedor{' '}
              <strong className="text-white font-semibold">Full-Stack e Mobile</strong>{' '}
              com mais de 4 anos de experiência, desde 2021, apaixonado por transformar
              ideias complexas em soluções digitais elegantes e funcionais.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-5">
              Tenho experiência em desenvolvimento web, criação de{' '}
              <strong className="text-white font-semibold">APIs robustas</strong>,
              aplicativos mobile com Flutter,{' '}
              <strong className="text-blue-400 font-semibold">
                integração com Inteligência Artificial
              </strong>{' '}
              e programação GPU com{' '}
              <strong className="text-white font-semibold">NVIDIA CUDA</strong>.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              🚀 Estou disponível para projetos{' '}
              <strong className="text-white font-semibold">freelance</strong> — seja
              um sistema web completo, um app mobile ou uma API com IA integrada.
              Vamos construir algo incrível juntos.
            </p>

            {/* Botões de ação */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('contato')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                Me contratar
              </button>
              {/* TODO: Substituir pelo link real do GitHub */}
              <a
                href="https://github.com/feitosalucas174"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl border border-white/15 text-white/80 font-semibold hover:bg-white/5 hover:border-white/30 hover:text-white transition-all duration-200"
              >
                Ver GitHub
              </a>
            </div>
          </motion.div>

          {/* Cards de estatísticas */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="group p-6 rounded-2xl bg-[#111111] border border-white/5 hover:border-blue-500/25 transition-all duration-300 cursor-default"
              >
                {/* Ícone com gradiente */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon size={22} className="text-white" />
                </div>

                {/* Valor */}
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 tabular-nums">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-white/45 text-sm leading-snug">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
