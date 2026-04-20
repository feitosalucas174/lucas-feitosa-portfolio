'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiClock, FiCheckCircle } from 'react-icons/fi'

// Tipagem para cada projeto
type Project = {
  id: number
  title: string
  description: string
  tags: string[]
  gradient: string
  iconBg: string
  icon: string
  githubUrl: string
  demoUrl: string
  status: 'Em breve' | 'Concluído' | 'Em desenvolvimento'
}

// Dados dos projetos
// TODO: Atualizar os links githubUrl e demoUrl quando os repositórios forem publicados
const projects: Project[] = [
  {
    id: 1,
    title: 'Chatbot com IA',
    description:
      'Assistente virtual inteligente integrado com LLM para atendimento automatizado com respostas contextuais e aprendizado contínuo.',
    tags: ['Python', 'Flask', 'LLM', 'API'],
    gradient: 'from-blue-900/80 to-blue-700/80',
    iconBg: 'from-blue-800 to-blue-600',
    icon: '🤖',
    githubUrl: 'https://github.com/feitosalucas174/chatbot-ia',
    demoUrl: 'https://chatbot-ia-mkmw.onrender.com',
    status: 'Concluído',
  },
  {
    id: 2,
    title: 'API REST Completa',
    description:
      'API robusta com autenticação JWT, documentação Swagger interativa, rate limiting e deploy em produção com CI/CD.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    gradient: 'from-blue-600/80 to-blue-700/80',
    iconBg: 'from-blue-500 to-blue-700',
    icon: '🔗',
    githubUrl: '#',
    demoUrl: '#',
    status: 'Em breve',
  },
  {
    id: 3,
    title: 'E-commerce Full-Stack',
    description:
      'Plataforma de vendas completa com painel administrativo, integração com pagamentos, gestão de estoque e relatórios.',
    tags: ['Next.js', 'Django', 'PostgreSQL', 'TypeScript'],
    gradient: 'from-emerald-600/80 to-green-700/80',
    iconBg: 'from-emerald-500 to-green-600',
    icon: '🛒',
    githubUrl: 'https://github.com/feitosalucas174/ecommerce-fullstack',
    demoUrl: 'https://ecommerce-fullstack-nine-olive.vercel.app/',
    status: 'Concluído',
  },
  {
    id: 4,
    title: 'App Mobile',
    description:
      'Aplicativo mobile multiplataforma (iOS/Android) com UI moderna, autenticação biométrica e integração com backend.',
    tags: ['Flutter', 'Dart', 'API REST'],
    gradient: 'from-orange-600/80 to-amber-700/80',
    iconBg: 'from-orange-500 to-amber-600',
    icon: '📱',
    githubUrl: '#',
    demoUrl: '#',
    status: 'Em breve',
  },
  {
    id: 5,
    title: 'Dashboard Analytics',
    description:
      'Painel de controle interativo com gráficos em tempo real, filtros avançados e relatórios exportáveis em PDF/Excel.',
    tags: ['React', 'TypeScript', 'Node.js', 'MySQL'],
    gradient: 'from-pink-600/80 to-rose-700/80',
    iconBg: 'from-pink-500 to-rose-600',
    icon: '📊',
    githubUrl: '#',
    demoUrl: '#',
    status: 'Em breve',
  },
]

// Cores para cada tecnologia nos badges
const tagColors: Record<string, string> = {
  Python: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  Flask: 'bg-white/5 text-white/60 border-white/10',
  LLM: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  API: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  'Node.js': 'bg-green-500/10 text-green-300 border-green-500/20',
  Express: 'bg-white/5 text-white/60 border-white/10',
  MongoDB: 'bg-green-500/10 text-green-300 border-green-500/20',
  JWT: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
  'Next.js': 'bg-white/5 text-white/60 border-white/10',
  Django: 'bg-green-500/10 text-green-300 border-green-500/20',
  PostgreSQL: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  TypeScript: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  Flutter: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  Dart: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  'API REST': 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  React: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  'Node.js ': 'bg-green-500/10 text-green-300 border-green-500/20',
  MySQL: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
}

const getTagColor = (tag: string) =>
  tagColors[tag] ?? 'bg-white/5 text-white/50 border-white/10'

export default function Projects() {
  return (
    <section id="projetos" className="py-24 sm:py-32 relative">
      {/* Divisor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Fundo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(37,99,235,0.06),transparent)]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase">
            Portfólio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-xl mx-auto">
            Soluções que desenvolvi combinando diferentes tecnologias do meu stack.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Grid de projetos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col rounded-2xl bg-[#111111] border border-white/5 hover:border-white/12 overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header do card com gradiente */}
              <div
                className={`relative h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
              >
                {/* Padrão de grade decorativo */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

                {/* Ícone central */}
                <div
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${project.iconBg} flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                >
                  {project.icon}
                </div>

                {/* Badge de status */}
                <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm border text-xs ${
                  project.status === 'Concluído'
                    ? 'bg-green-500/20 border-green-500/30 text-green-300'
                    : 'bg-black/40 border-white/10 text-white/70'
                }`}>
                  {project.status === 'Concluído'
                    ? <FiCheckCircle size={10} />
                    : <FiClock size={10} />
                  }
                  {project.status}
                </div>
              </div>

              {/* Corpo do card */}
              <div className="flex flex-col flex-1 p-5">
                {/* Título */}
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>

                {/* Descrição */}
                <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tags de tecnologias */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getTagColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Botões de ação */}
                {/* TODO: Substituir href="#" pelos links reais quando disponíveis */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-200"
                    aria-label={`Ver ${project.title} no GitHub`}
                  >
                    <FiGithub size={15} />
                    GitHub
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-200"
                    aria-label={`Ver demo de ${project.title}`}
                  >
                    <FiExternalLink size={15} />
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA para GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-white/40 text-sm mb-4">
            Quer ver mais projetos? Visite meu perfil no GitHub.
          </p>
          {/* TODO: Substituir pelo link real do GitHub */}
          <a
            href="https://github.com/feitosalucas174"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-200"
          >
            <FiGithub size={16} />
            Ver mais no GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
