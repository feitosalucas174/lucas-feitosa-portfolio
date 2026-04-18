'use client'

import { motion } from 'framer-motion'
import {
  SiPhp,
  SiPython,
  SiDjango,
  SiFlask,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiDart,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiOpenai,
  SiGooglecloud,
  SiHtml5,
  SiCss,
  SiPostman,
  SiInsomnia,
  SiGnubash,
  SiGit,
  SiLinux,
  SiDocker,
} from 'react-icons/si'
import {
  FiServer,
  FiLayout,
  FiSmartphone,
  FiDatabase,
  FiCloud,
  FiCpu,
  FiTool,
  FiTerminal,
} from 'react-icons/fi'
import { FaJava } from 'react-icons/fa'
import { SiDotnet, SiKotlin } from 'react-icons/si'
import { IconType } from 'react-icons'

// Tipagem para cada habilidade
type Skill = {
  name: string
  icon: IconType
  color: string
}

// Tipagem para categoria de habilidades
type SkillCategory = {
  title: string
  description: string
  categoryIcon: IconType
  accentColor: string
  borderColor: string
  skills: Skill[]
}

// Dados das categorias de habilidades
const skillCategories: SkillCategory[] = [
  {
    title: 'Backend',
    description: 'Construção de APIs, servidores e lógica de negócio',
    categoryIcon: FiServer,
    accentColor: 'from-blue-500 to-blue-700',
    borderColor: 'hover:border-blue-500/30',
    skills: [
      { name: 'PHP', icon: SiPhp, color: '#777BB4' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Django', icon: SiDjango, color: '#44B78B' },
      { name: 'Flask', icon: SiFlask, color: '#FFFFFF' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Java', icon: FaJava, color: '#ED8B00' },
      { name: 'C#', icon: SiDotnet, color: '#512BD4' },
      { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF' },
    ],
  },
  {
    title: 'Frontend',
    description: 'Interfaces modernas, responsivas e performáticas',
    categoryIcon: FiLayout,
    accentColor: 'from-blue-500 to-blue-700',
    borderColor: 'hover:border-blue-500/30',
    skills: [
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
    ],
  },
  {
    title: 'Mobile',
    description: 'Apps multiplataforma para iOS e Android',
    categoryIcon: FiSmartphone,
    accentColor: 'from-blue-400 to-blue-600',
    borderColor: 'hover:border-blue-400/30',
    skills: [
      { name: 'Flutter', icon: SiFlutter, color: '#54C5F8' },
      { name: 'Dart', icon: SiDart, color: '#00B4AB' },
    ],
  },
  {
    title: 'Banco de Dados',
    description: 'Modelagem e gestão de dados relacionais e NoSQL',
    categoryIcon: FiDatabase,
    accentColor: 'from-green-500 to-emerald-600',
    borderColor: 'hover:border-green-500/30',
    skills: [
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    title: 'Infra & Cloud',
    description: 'Deploy, hospedagem e configuração de servidores',
    categoryIcon: FiCloud,
    accentColor: 'from-orange-500 to-amber-600',
    borderColor: 'hover:border-orange-500/30',
    skills: [
      { name: 'Plesk', icon: FiCloud, color: '#52BBE6' },
      { name: 'GCP', icon: SiGooglecloud, color: '#4285F4' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    ],
  },
  {
    title: 'IA & APIs',
    description: 'Integração com LLMs, automação e REST APIs',
    categoryIcon: FiCpu,
    accentColor: 'from-pink-500 to-rose-600',
    borderColor: 'hover:border-pink-500/30',
    skills: [
      { name: 'LLMs', icon: SiOpenai, color: '#FFFFFF' },
      { name: 'REST APIs', icon: FiServer, color: '#3b82f6' },
    ],
  },
  {
    title: 'Ferramentas',
    description: 'Testes de API, automação e utilitários do dia a dia',
    categoryIcon: FiTool,
    accentColor: 'from-violet-500 to-purple-700',
    borderColor: 'hover:border-violet-500/30',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'Linux', icon: SiLinux, color: '#FCC624' },
      { name: 'PowerShell', icon: FiTerminal, color: '#5391FE' },
      { name: 'Bash/Shell', icon: SiGnubash, color: '#4EAA25' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Insomnia', icon: SiInsomnia, color: '#4000BF' },
    ],
  },
]

// Variante de animação para o container de habilidades
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
}

export default function Skills() {
  return (
    <section id="habilidades" className="py-24 sm:py-32 relative">
      {/* Divisor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Fundo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(59,130,246,0.06),transparent)]" />

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
            Tecnologias
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            Minhas Habilidades
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-xl mx-auto">
            Stack completo para criar soluções digitais modernas, do backend ao mobile.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Grid de categorias */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              className={`group p-6 rounded-2xl bg-[#111111] border border-white/5 ${category.borderColor} transition-all duration-300`}
            >
              {/* Cabeçalho da categoria */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.accentColor} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.categoryIcon size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">{category.title}</h3>
                  <p className="text-white/35 text-xs leading-snug mt-0.5">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Badges de habilidades */}
              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 hover:bg-white/8 hover:border-white/15 transition-all duration-200 cursor-default group/skill"
                  >
                    {/* Ícone da tecnologia */}
                    <skill.icon
                      size={14}
                      style={{ color: skill.color }}
                      className="flex-shrink-0 group-hover/skill:scale-110 transition-transform"
                    />
                    <span className="text-white/70 text-xs font-medium group-hover/skill:text-white transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Nota sobre aprendizado contínuo */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-white/25 text-sm mt-10"
        >
          🚀 Sempre aprendendo e adicionando novas tecnologias ao repertório
        </motion.p>
      </div>
    </section>
  )
}
