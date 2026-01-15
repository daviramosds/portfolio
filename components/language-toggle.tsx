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
  setLanguage: () => { },
  t: (key: string) => key,
})

const translations = {
  en: {
    // Hero Section
    "hero.greeting": "Hello, I'm",
    "hero.name": "Davi Ramos",
    "hero.title": "Software Engineer | Backend & Automation",
    "hero.description":
      "I build and maintain SaaS products, backend systems, APIs, and automation that support scalable, real-world use cases.",
    "hero.available": "Available for new projects",
    "hero.viewWork": "View My Work",
    "hero.connectWith": "Connect with me:",
    "hero.yearsExperience": "Years Experience",
    "hero.projectsDone": "Projects Done",

    // What I Do Section
    "whatIDo.title": "What I Do",
    "whatIDo.subtitle": "I build backend systems, APIs, and automation that support scalable SaaS products.",
    "whatIDo.backendEngineering.title": "Backend Engineering",
    "whatIDo.backendEngineering.description":
      "I design and build backend systems that handle real business logic, data integrity, and scalability. Focused on APIs, authentication, integrations, and long-term maintainability.",
    "whatIDo.apisIntegrations.title": "APIs & Integrations",
    "whatIDo.apisIntegrations.description":
      "I develop and integrate APIs that connect products, services, and third-party platforms, enabling reliable data flow and automation across systems.",
    "whatIDo.saasDevelopment.title": "SaaS Development",
    "whatIDo.saasDevelopment.description":
      "I build and maintain SaaS products, from backend architecture to core features, focusing on scalability, performance, and real-world usage.",
    "whatIDo.automation.title": "Automation",
    "whatIDo.automation.description":
      "I create automation solutions that eliminate repetitive work, reduce errors, and save operational time through scripts, APIs, and workflow orchestration.",

    // Featured Projects Section
    "projects.title": "Featured Projects",
    "projects.subtitle": "Selected projects focused on backend systems, automation, and SaaS development.",
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
    "hero.title": "Engenheiro de Software | Backend & Automação",
    "hero.description":
      "Eu construo e mantenho produtos SaaS, sistemas backend, APIs e automação que suportam casos de uso escaláveis e reais.",
    "hero.available": "Disponível para novos projetos",
    "hero.viewWork": "Ver Meu Trabalho",
    "hero.connectWith": "Conecte-se comigo:",
    "hero.yearsExperience": "Anos de Experiência",
    "hero.projectsDone": "Projetos Realizados",

    // What I Do Section
    "whatIDo.title": "O Que Eu Faço",
    "whatIDo.subtitle": "Eu construo sistemas backend, APIs e automação que suportam produtos SaaS escaláveis.",
    "whatIDo.backendEngineering.title": "Engenharia Backend",
    "whatIDo.backendEngineering.description":
      "Eu projeto e construo sistemas backend que lidam com lógica de negócio real, integridade de dados e escalabilidade. Focado em APIs, autenticação, integrações e manutenibilidade a longo prazo.",
    "whatIDo.apisIntegrations.title": "APIs & Integrações",
    "whatIDo.apisIntegrations.description":
      "Eu desenvolvo e integro APIs que conectam produtos, serviços e plataformas de terceiros, permitindo fluxo de dados confiável e automação entre sistemas.",
    "whatIDo.saasDevelopment.title": "Desenvolvimento SaaS",
    "whatIDo.saasDevelopment.description":
      "Eu construo e mantenho produtos SaaS, desde arquitetura backend até funcionalidades principais, focando em escalabilidade, performance e uso no mundo real.",
    "whatIDo.automation.title": "Automação",
    "whatIDo.automation.description":
      "Eu crio soluções de automação que eliminam trabalho repetitivo, reduzem erros e economizam tempo operacional através de scripts, APIs e orquestração de workflows.",

    // Featured Projects Section
    "projects.title": "Projetos em Destaque",
    "projects.subtitle": "Projetos selecionados focados em sistemas backend, automação e desenvolvimento SaaS.",
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
    "contact.form.subject": "Assunto",
    "contact.form.message": "Mensagem",
    "contact.form.namePlaceholder": "Seu nome",
    "contact.form.emailPlaceholder": "seu@email.com",
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
