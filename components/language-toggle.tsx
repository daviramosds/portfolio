"use client"

import React, { useEffect, useState } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const LanguageContext = React.createContext<{
  language: "en" | "pt"
  setLanguage: (lang: "en" | "pt") => void
  t: (key: string) => string
}>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

const translations = {
  en: {
    // Hero Section
    "hero.greeting": "Hello, I'm",
    "hero.name": "Davi Ramos",
    "hero.title": "Development & Automation Specialist",
    "hero.description":
      "I craft digital solutions that streamline workflows and bring ideas to life. Specializing in modern web development, process automation, and creating seamless user experiences.",
    "hero.available": "Available for new projects",
    "hero.viewWork": "View My Work",
    "hero.connectWith": "Connect with me:",
    "hero.yearsExperience": "Years Experience",
    "hero.projectsDone": "Projects Done",

    // What I Do Section
    "whatIDo.title": "What I Do",
    "whatIDo.subtitle": "I specialize in creating digital solutions that drive results and streamline processes.",
    "whatIDo.webDev.title": "Web Development",
    "whatIDo.webDev.description":
      "I create modern, responsive web applications using cutting-edge technologies. From sleek landing pages to complex full-stack applications, I focus on performance, user experience, and clean code architecture.",
    "whatIDo.mobileDev.title": "Mobile Development",
    "whatIDo.mobileDev.description":
      "I develop cross-platform mobile applications using React Native and Expo, delivering native performance across iOS and Android. From concept to app store deployment, I handle the entire mobile development lifecycle.",
    "whatIDo.automation.title": "Automation",
    "whatIDo.automation.description":
      "I streamline business processes through intelligent automation solutions using Python, APIs, and workflow orchestration tools like n8n and Make. From data processing pipelines to automated reporting systems, I eliminate repetitive tasks.",
    "whatIDo.devops.title": "DevOps",
    "whatIDo.devops.description":
      "I implement robust CI/CD pipelines and cloud infrastructure using Docker, Kubernetes, and modern deployment strategies on AWS and Google Cloud. From containerization to monitoring and scaling, I ensure reliable production environments.",

    // Featured Projects Section
    "projects.title": "Featured Projects",
    "projects.subtitle": "A selection of my recent work showcasing different technologies and approaches.",
    "projects.viewProject": "View Project",
    "projects.viewAll": "View All Projects",

    // Contact Section
    "contact.title": "Let's Work Together",
    "contact.subtitle": "Ready to bring your ideas to life? I'm always excited to work on new projects and challenges.",
    "contact.email": "Email",
    "contact.form.whatsapp": "WhatsApp",
    "contact.location": "Location",
    "contact.responseTime": "Response Time",
    "contact.responseTimeValue": "Usually within 24 hours",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.whatsapp": "WhatsApp",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.emailPlaceholder": "your@email.com",
    "contact.form.whatsappPlaceholder": "+55 (11) 99999-9999",
    "contact.form.subjectPlaceholder": "Project inquiry",
    "contact.form.messagePlaceholder": "Tell me about your project...",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.form.success": "Thank you for your message! I'll get back to you soon.",

    // Form Validation
    "validation.nameRequired": "Name is required",
    "validation.emailRequired": "Email is required",
    "validation.emailInvalid": "Please enter a valid email",
    "validation.whatsappInvalid": "Please enter a valid WhatsApp number",
    "validation.subjectRequired": "Subject is required",
    "validation.messageRequired": "Message is required",
    "validation.messageMinLength": "Message must be at least 10 characters",

    // Footer
    "footer.rights": "All rights reserved.",

    // Project Descriptions
    "projects.socially.description":
      "A modern social media platform built with TypeScript, featuring real-time interactions and a clean, intuitive interface.",
    "projects.microservices.description":
      "Scalable microservices architecture using NestJS, NATS messaging, SQL databases, and Docker containerization.",
    "projects.mediaRenamer.description":
      "Python automation script that recursively organizes media files, standardizing names to YYYY-MM-DD_HHMMSS format.",
  },
  pt: {
    // Hero Section
    "hero.greeting": "Olá, eu sou",
    "hero.name": "Davi Ramos",
    "hero.title": "Especialista em Desenvolvimento e Automação",
    "hero.description":
      "Eu crio soluções digitais que otimizam fluxos de trabalho e dão vida às ideias. Especializado em desenvolvimento web moderno, automação de processos e criação de experiências de usuário perfeitas.",
    "hero.available": "Disponível para novos projetos",
    "hero.viewWork": "Ver Meu Trabalho",
    "hero.connectWith": "Conecte-se comigo:",
    "hero.yearsExperience": "Anos de Experiência",
    "hero.projectsDone": "Projetos Realizados",

    // What I Do Section
    "whatIDo.title": "O Que Eu Faço",
    "whatIDo.subtitle": "Eu me especializo em criar soluções digitais que geram resultados e otimizam processos.",
    "whatIDo.webDev.title": "Desenvolvimento Web",
    "whatIDo.webDev.description":
      "Eu crio aplicações web modernas e responsivas usando tecnologias de ponta. De landing pages elegantes a aplicações full-stack complexas, foco em performance, experiência do usuário e arquitetura de código limpo.",
    "whatIDo.mobileDev.title": "Desenvolvimento Mobile",
    "whatIDo.mobileDev.description":
      "Eu desenvolvo aplicações mobile multiplataforma usando React Native e Expo, entregando performance nativa no iOS e Android. Do conceito ao deploy na app store, eu cuido de todo o ciclo de desenvolvimento mobile.",
    "whatIDo.automation.title": "Automação",
    "whatIDo.automation.description":
      "Eu otimizo processos de negócio através de soluções de automação inteligente usando Python, APIs e ferramentas de orquestração de workflow como n8n e Make. De pipelines de processamento de dados a sistemas de relatórios automatizados, eu elimino tarefas repetitivas.",
    "whatIDo.devops.title": "DevOps",
    "whatIDo.devops.description":
      "Eu implemento pipelines CI/CD robustos e infraestrutura em nuvem usando Docker, Kubernetes e estratégias modernas de deploy na AWS e Google Cloud. Da containerização ao monitoramento e escalonamento, eu garanto ambientes de produção confiáveis.",

    // Featured Projects Section
    "projects.title": "Projetos em Destaque",
    "projects.subtitle": "Uma seleção dos meus trabalhos recentes mostrando diferentes tecnologias e abordagens.",
    "projects.viewProject": "Ver Projeto",
    "projects.viewAll": "Ver Todos os Projetos",

    // Contact Section
    "contact.title": "Vamos Trabalhar Juntos",
    "contact.subtitle":
      "Pronto para dar vida às suas ideias? Estou sempre animado para trabalhar em novos projetos e desafios.",
    "contact.email": "Email",
    "contact.form.whatsapp": "WhatsApp",
    "contact.location": "Localização",
    "contact.responseTime": "Tempo de Resposta",
    "contact.responseTimeValue": "Geralmente em até 24 horas",
    "contact.form.name": "Nome",
    "contact.form.email": "Email",
    "contact.form.whatsapp": "WhatsApp",
    "contact.form.subject": "Assunto",
    "contact.form.message": "Mensagem",
    "contact.form.namePlaceholder": "Seu nome",
    "contact.form.emailPlaceholder": "seu@email.com",
    "contact.form.whatsappPlaceholder": "+55 (11) 99999-9999",
    "contact.form.subjectPlaceholder": "Consulta sobre projeto",
    "contact.form.messagePlaceholder": "Conte-me sobre seu projeto...",
    "contact.form.send": "Enviar Mensagem",
    "contact.form.sending": "Enviando...",
    "contact.form.success": "Obrigado pela sua mensagem! Entrarei em contato em breve.",

    // Form Validation
    "validation.nameRequired": "Nome é obrigatório",
    "validation.emailRequired": "Email é obrigatório",
    "validation.emailInvalid": "Por favor, insira um email válido",
    "validation.whatsappInvalid": "Por favor, insira um número de WhatsApp válido",
    "validation.subjectRequired": "Assunto é obrigatório",
    "validation.messageRequired": "Mensagem é obrigatória",
    "validation.messageMinLength": "Mensagem deve ter pelo menos 10 caracteres",

    // Footer
    "footer.rights": "Todos os direitos reservados.",

    // Project Descriptions
    "projects.socially.description":
      "Uma plataforma de mídia social moderna construída com TypeScript, apresentando interações em tempo real e uma interface limpa e intuitiva.",
    "projects.microservices.description":
      "Arquitetura de microsserviços escalável usando NestJS, mensageria NATS, bancos de dados SQL e containerização Docker.",
    "projects.mediaRenamer.description":
      "Script de automação Python que organiza recursivamente arquivos de mídia, padronizando nomes para o formato YYYY-MM-DD_HHMMSS.",
  },
}

export function LanguageToggle() {
  const [language, setLanguage] = useState<"en" | "pt">("en")

  useEffect(() => {
    // Check saved language preference on mount
    const savedLanguage = localStorage.getItem("language") as "en" | "pt" | null
    const browserLanguage = navigator.language.startsWith("pt") ? "pt" : "en"
    const initialLanguage = savedLanguage || browserLanguage

    setLanguage(initialLanguage)
  }, [])

  const changeLanguage = (newLanguage: "en" | "pt") => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
    window.dispatchEvent(new CustomEvent("languageChange", { detail: newLanguage }))
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-16 z-50 hover:scale-110 transition-all duration-300 hover:text-[#3B82F6] cursor-pointer"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[100px]" onCloseAutoFocus={(e) => e.preventDefault()}>
        <DropdownMenuItem
          onClick={() => changeLanguage("en")}
          className={`cursor-pointer ${language === "en" ? "bg-[#3B82F6]/10 text-[#3B82F6]" : ""}`}
        >
          <span className="mr-2">🇺🇸</span>
          EN
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("pt")}
          className={`cursor-pointer ${language === "pt" ? "bg-[#3B82F6]/10 text-[#3B82F6]" : ""}`}
        >
          <span className="mr-2">🇧🇷</span>
          PT
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<"en" | "pt">("en")

  useEffect(() => {
    // Check saved language preference on mount
    const savedLanguage = localStorage.getItem("language") as "en" | "pt" | null
    const browserLanguage = navigator.language.startsWith("pt") ? "pt" : "en"
    const initialLanguage = savedLanguage || browserLanguage

    setLanguage(initialLanguage)

    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  const changeLanguage = (newLanguage: "en" | "pt") => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = React.useContext(LanguageContext)
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
