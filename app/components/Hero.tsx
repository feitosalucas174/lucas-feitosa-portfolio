'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiInstagram, FiArrowDown } from 'react-icons/fi'
import NeuralBackground from './NeuralBackground'

// Textos alternados no efeito typewriter
const TYPEWRITER_TEXTS = [
  'Desenvolvedor Full-Stack',
  'Desenvolvedor Mobile',
  'Especialista em APIs & IA',
]

// Hook personalizado para efeito de digitação (typewriter)
function useTypewriter(
  texts: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2200
) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPausing, setIsPausing] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]

    // Estado de pausa ao terminar de digitar
    if (isPausing) {
      const timeout = setTimeout(() => {
        setIsPausing(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(timeout)
    }

    if (!isDeleting) {
      // Digitando caractere por caractere
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Texto completo — pausa antes de apagar
        setIsPausing(true)
      }
    } else {
      // Apagando caractere por caractere
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Apagado completamente — próximo texto
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % texts.length)
      }
    }
  }, [displayText, isDeleting, isPausing, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration])

  return displayText
}

export default function Hero() {
  const displayText = useTypewriter(TYPEWRITER_TEXTS)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Fundo: rede neural animada ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Canvas com neurônios, axônios e pulsos de sinal */}
        <NeuralBackground />

        {/* Vinheta nas bordas para suavizar e destacar o conteúdo central */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,transparent_40%,rgba(10,10,10,0.85)_100%)]" />

        {/* Gradiente sutil no topo para fundir com a navbar */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent" />

        {/* Gradiente no fundo para fundir com a próxima seção */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* ── Conteúdo principal ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge de status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
          </span>
          Disponível para novos projetos
        </motion.div>

        {/* Nome */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4"
        >
          <span className="text-white">Lucas </span>
          <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            Feitosa
          </span>
        </motion.h1>

        {/* Efeito typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center gap-1 text-xl sm:text-3xl font-semibold text-white/60 mb-6 h-10 sm:h-12"
          aria-label="Título profissional"
        >
          <span>{displayText}</span>
          <span className="typewriter-cursor inline-block w-0.5 h-6 sm:h-8 bg-blue-400 ml-0.5" />
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-white/45 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Transformo ideias em sistemas reais. Disponível para freelance.
        </motion.p>

        {/* Botões CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {/* Botão primário */}
          <button
            onClick={() => scrollToSection('projetos')}
            className="group relative w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-sm sm:text-base hover:opacity-95 hover:scale-105 active:scale-100 transition-all duration-200 shadow-lg shadow-blue-500/30"
          >
            Ver Projetos
            <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Botão secundário */}
          <button
            onClick={() => scrollToSection('contato')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/15 text-white/80 font-semibold text-sm sm:text-base hover:bg-white/5 hover:border-white/30 hover:text-white hover:scale-105 active:scale-100 transition-all duration-200"
          >
            Entrar em Contato
          </button>
        </motion.div>

        {/* Links sociais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex items-center justify-center gap-6"
        >
          {/* GitHub */}
          {/* TODO: Substituir pelo link real do GitHub se necessário */}
          <a
            href="https://github.com/feitosalucas174"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 text-white/40 hover:text-white transition-colors duration-200"
            aria-label="GitHub de Lucas Feitosa"
          >
            <FiGithub
              size={22}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm font-medium">GitHub</span>
          </a>

          <div className="w-px h-5 bg-white/15" />

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/lucas-feitosa-5b0932362"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 text-white/40 hover:text-white transition-colors duration-200"
            aria-label="LinkedIn de Lucas Feitosa"
          >
            <FiLinkedin
              size={22}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>

          <div className="w-px h-5 bg-white/15" />

          {/* Instagram */}
          <a
            href="https://www.instagram.com/lucas.feitosa121/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 text-white/40 hover:text-white transition-colors duration-200"
            aria-label="Instagram de Lucas Feitosa"
          >
            <FiInstagram
              size={22}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm font-medium">Instagram</span>
          </a>
        </motion.div>
      </div>

      {/* Seta de scroll para baixo */}
      <motion.button
        onClick={() => scrollToSection('sobre')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/25 hover:text-white/60 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Rolar para a seção Sobre"
      >
        <FiArrowDown size={26} />
      </motion.button>
    </section>
  )
}
