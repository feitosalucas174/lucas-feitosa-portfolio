'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiGithub, FiLinkedin, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

// Tipagem do formulário
type FormData = {
  name: string
  email: string
  projectType: string
  message: string
}

// Tipagem do estado de envio
type SubmitState = 'idle' | 'loading' | 'success' | 'error'

// Opções do dropdown de tipo de projeto
const projectTypeOptions = [
  { value: '', label: 'Selecione o tipo de projeto...' },
  { value: 'landing', label: 'Site / Landing Page' },
  { value: 'web', label: 'Sistema Web' },
  { value: 'mobile', label: 'App Mobile' },
  { value: 'api', label: 'API / Backend' },
  { value: 'ia', label: 'Integração com IA' },
  { value: 'outro', label: 'Outro' },
]

const initialFormData: FormData = {
  name: '',
  email: '',
  projectType: '',
  message: '',
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  // Validação básica do formulário
  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres'
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Informe um e-mail válido'
    }
    if (!formData.projectType) {
      newErrors.projectType = 'Selecione o tipo de projeto'
    }
    if (!formData.message.trim() || formData.message.trim().length < 20) {
      newErrors.message = 'Mensagem deve ter pelo menos 20 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Atualiza o campo do formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Envia o formulário
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate()) return

    setSubmitState('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Falha no envio')

      setSubmitState('success')
      setFormData(initialFormData)
    } catch {
      setSubmitState('error')
    }
  }

  // Reinicia o formulário após sucesso ou erro
  const handleReset = () => {
    setSubmitState('idle')
    setErrors({})
  }

  return (
    <section id="contato" className="py-24 sm:py-32 relative">
      {/* Divisor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Fundo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(59,130,246,0.08),transparent)]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase">
            Contato
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            Vamos trabalhar juntos?
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
            Entre em contato e responderei em até{' '}
            <strong className="text-white">24 horas</strong>.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Card do formulário */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/5">

            {/* Estado de sucesso */}
            <AnimatePresence mode="wait">
              {submitState === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle size={28} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Mensagem enviada!</h3>
                  <p className="text-white/50 text-sm mb-6">
                    Obrigado pelo contato! Responderei em breve.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 hover:text-white transition-all"
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              )}

              {/* Estado de erro */}
              {submitState === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                    <FiAlertCircle size={28} className="text-red-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Ops! Algo deu errado.</h3>
                  <p className="text-white/50 text-sm mb-6">
                    Tente novamente ou entre em contato pelo LinkedIn.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 hover:text-white transition-all"
                  >
                    Tentar novamente
                  </button>
                </motion.div>
              )}

              {/* Formulário */}
              {(submitState === 'idle' || submitState === 'loading') && (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Nome e E-mail lado a lado em telas maiores */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Campo Nome */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white/60 mb-1.5"
                      >
                        Nome <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/25 text-sm outline-none transition-all duration-200 focus:bg-white/8 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 ${
                          errors.name
                            ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                            : 'border-white/8 hover:border-white/15'
                        }`}
                        disabled={submitState === 'loading'}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Campo E-mail */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white/60 mb-1.5"
                      >
                        E-mail <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/25 text-sm outline-none transition-all duration-200 focus:bg-white/8 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 ${
                          errors.email
                            ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                            : 'border-white/8 hover:border-white/15'
                        }`}
                        disabled={submitState === 'loading'}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Tipo de projeto */}
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-white/60 mb-1.5"
                    >
                      Tipo de projeto <span className="text-blue-400">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm outline-none transition-all duration-200 focus:bg-white/8 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 appearance-none cursor-pointer ${
                        formData.projectType ? 'text-white' : 'text-white/30'
                      } ${
                        errors.projectType
                          ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                          : 'border-white/8 hover:border-white/15'
                      }`}
                      disabled={submitState === 'loading'}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 12px center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '20px',
                      }}
                    >
                      {projectTypeOptions.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className="bg-[#1a1a1a] text-white"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="text-red-400 text-xs mt-1">{errors.projectType}</p>
                    )}
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-white/60 mb-1.5"
                    >
                      Mensagem <span className="text-blue-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Descreva seu projeto, prazos e orçamento estimado..."
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/25 text-sm outline-none transition-all duration-200 focus:bg-white/8 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 resize-none ${
                        errors.message
                          ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                          : 'border-white/8 hover:border-white/15'
                      }`}
                      disabled={submitState === 'loading'}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Botão de envio */}
                  <button
                    type="submit"
                    disabled={submitState === 'loading'}
                    className="group w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-sm hover:opacity-95 hover:scale-[1.01] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200 shadow-lg shadow-blue-500/25"
                  >
                    {submitState === 'loading' ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FiSend
                          size={16}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                        Enviar mensagem
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Links sociais abaixo do formulário */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-6 mt-8"
          >
            <span className="text-white/30 text-sm">ou me encontre em</span>

            {/* TODO: Substituir pelos links reais se necessário */}
            <a
              href="https://github.com/feitosalucas174"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FiGithub
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-sm">GitHub</span>
            </a>

            <div className="w-px h-4 bg-white/15" />

            <a
              href="https://www.linkedin.com/in/lucas-feitosa-5b0932362"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-sm">LinkedIn</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
