# Lucas Feitosa — Portfólio Profissional

Portfólio pessoal desenvolvido com **Next.js 14**, **TypeScript**, **Tailwind CSS** e **Framer Motion**.

## ✨ Funcionalidades

- Tema escuro (dark mode) como padrão
- Animações suaves com Framer Motion
- Efeito typewriter no hero
- Navegação fixa com blur e indicador de seção ativa
- Menu hamburguer responsivo para mobile
- Scroll suave entre seções
- Botão "voltar ao topo" flutuante
- 100% responsivo (mobile first)
- SEO otimizado com metadados

## 🛠️ Stack

| Tecnologia       | Versão   | Uso                         |
|-----------------|----------|-----------------------------|
| Next.js         | 14.2.5   | Framework React (App Router)|
| TypeScript      | 5.x      | Tipagem estática            |
| Tailwind CSS    | 3.4.x    | Estilização                 |
| Framer Motion   | 11.x     | Animações                   |
| React Icons     | 5.x      | Ícones                      |

## 📁 Estrutura de Arquivos

```
lucas-feitosa-portfolio/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx      # Navegação fixa com blur
│   │   ├── Hero.tsx        # Seção principal com typewriter
│   │   ├── About.tsx       # Sobre mim e estatísticas
│   │   ├── Skills.tsx      # Habilidades por categoria
│   │   ├── Projects.tsx    # Cards de projetos
│   │   ├── Contact.tsx     # Formulário de contato
│   │   └── Footer.tsx      # Rodapé com links rápidos
│   ├── globals.css         # Estilos globais e utilitários
│   ├── layout.tsx          # Layout raiz e metadados SEO
│   └── page.tsx            # Página principal
├── public/                 # Assets estáticos
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

## 🚀 Como rodar localmente

### Pré-requisitos

- **Node.js** 18.17 ou superior
- **npm** (ou yarn/pnpm)

### Passo a passo

**1. Clone o repositório:**
```bash
git clone https://github.com/feitosalucas174/lucas-feitosa-portfolio.git
cd lucas-feitosa-portfolio
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

**4. Abra no navegador:**
```
http://localhost:3000
```

### Outros comandos

```bash
npm run build    # Build para produção
npm run start    # Inicia em modo produção (após build)
npm run lint     # Verifica erros de lint
```

## 🌐 Deploy na Vercel

Este projeto está configurado para deploy automático na Vercel.

1. Faça push do repositório para o GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. A Vercel detecta automaticamente que é Next.js
4. Clique em **Deploy** — pronto!

Após o deploy, atualize o campo `metadataBase` em `app/layout.tsx`:
```typescript
metadataBase: new URL('https://seu-dominio.vercel.app'),
```

## 🔧 Personalizações

### Atualizar informações pessoais

| Arquivo                         | O que atualizar                          |
|--------------------------------|------------------------------------------|
| `app/layout.tsx`               | Título, descrição e metadados SEO        |
| `app/components/Hero.tsx`      | Links do GitHub e LinkedIn               |
| `app/components/About.tsx`     | Texto de apresentação e estatísticas     |
| `app/components/Projects.tsx`  | Dados dos projetos, links e imagens      |
| `app/components/Footer.tsx`    | Links sociais e ano do copyright         |

### Adicionar formulário de contato funcional

No arquivo `app/components/Contact.tsx`, localize o comentário `TODO` na função `handleSubmit` e substitua pelo serviço de sua preferência:

```typescript
// Exemplo com Formspree:
const response = await fetch('https://formspree.io/f/SEU_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})

// Exemplo com EmailJS:
// await emailjs.send('service_id', 'template_id', formData, 'public_key')
```

### Alterar cores do tema

Em `tailwind.config.ts`, modifique as cores primárias:
```typescript
colors: {
  primary: {
    DEFAULT: '#6366f1',  // cor principal
    dark: '#4f46e5',
    light: '#818cf8',
  },
  secondary: '#8b5cf6',  // cor secundária
}
```

### Adicionar projetos reais

Em `app/components/Projects.tsx`, atualize o array `projects` com os dados reais, substituindo os `href="#"` pelos links dos repositórios e demos.

## 📋 Checklist pós-deploy

- [ ] Atualizar `metadataBase` com a URL do site
- [ ] Configurar formulário de contato (Formspree, EmailJS, etc.)
- [ ] Substituir projetos placeholder por projetos reais
- [ ] Adicionar imagem de Open Graph (`public/og-image.png`)
- [ ] Configurar domínio personalizado na Vercel

## 📄 Licença

MIT © Lucas Feitosa
