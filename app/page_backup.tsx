"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/language-toggle"
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ExternalLink,
  Calendar,
  MapPin,
  Globe,
  Smartphone,
  Zap,
  Server,
} from "lucide-react"
import { ProjectsList } from "@/components/projects-list"

export default function TestingPage() {
  const { t, language } = useTranslation()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    if (typeof window === "undefined") return

    const initScrollReveal = async () => {
      try {
        const ScrollReveal = (await import("scrollreveal")).default

        const sr = ScrollReveal({
          origin: "bottom",
          distance: "60px",
          duration: 1000,
          delay: 100,
          easing: "cubic-bezier(0.5, 0, 0, 1)",
          reset: false,
        })

        sr.reveal(".hero-content", { origin: "left", distance: "100px", duration: 1200 })
        sr.reveal(".hero-image", { origin: "right", distance: "100px", duration: 1200, delay: 200 })
        sr.reveal(".hero-greeting", { delay: 300 })
        sr.reveal(".hero-name", { delay: 400 })
        sr.reveal(".hero-title", { delay: 500 })
        sr.reveal(".hero-description", { delay: 600 })
        sr.reveal(".hero-skills", { delay: 700 })
        sr.reveal(".hero-cta", { delay: 800 })
        sr.reveal(".hero-social", { delay: 900 })
        sr.reveal(".section-title", { origin: "top", distance: "50px", duration: 800 })
        sr.reveal(".service-card", { origin: "bottom", distance: "80px", duration: 1000, interval: 200 })
        sr.reveal(".project-card:nth-child(1)", { origin: "left", distance: "100px", duration: 1000 })
        sr.reveal(".project-card:nth-child(2)", { origin: "bottom", distance: "100px", duration: 1000, delay: 200 })
        sr.reveal(".project-card:nth-child(3)", { origin: "right", distance: "100px", duration: 1000, delay: 400 })
        sr.reveal(".contact-info", { origin: "left", distance: "80px", duration: 1000 })
        sr.reveal(".contact-form", { origin: "right", distance: "80px", duration: 1000, delay: 200 })
        sr.reveal(".contact-item", { origin: "left", distance: "50px", duration: 800, interval: 150 })
        sr.reveal("footer", { origin: "bottom", distance: "30px", duration: 800 })

        return () => {
          sr.destroy()
        }
      } catch (error) {
        console.warn("ScrollReveal failed to load:", error)
      }
    }

    let cleanup: (() => void) | undefined

    initScrollReveal().then((cleanupFn) => {
      cleanup = cleanupFn
    })

    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [])

  const scrollToSection = (sectionId: string, badgeText: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })

      setTimeout(() => {
        let cardId = ""
        if (badgeText.includes("Web")) {
          cardId = "web-dev-card"
        } else if (badgeText.includes("Mobile")) {
          cardId = "mobile-dev-card"
        } else if (badgeText.includes("Automação") || badgeText.includes("Automation")) {
          cardId = "automation-card"
        } else if (badgeText.includes("DevOps")) {
          cardId = "devops-card"
        }

        if (cardId) {
          const cardElement = document.getElementById(cardId)
          if (cardElement) {
            cardElement.classList.add("card-highlight")
            setTimeout(() => {
              cardElement.classList.remove("card-highlight")
            }, 3000)
          }
        }
      }, 800)
    }
  }

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      whatsapp: "",
      subject: "",
      message: "",
    }

    if (!formData.name.trim()) {
      errors.name = t("validation.nameRequired")
    }

    if (!formData.email.trim()) {
      errors.email = t("validation.emailRequired")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("validation.emailInvalid")
    }

    if (!formData.whatsapp.trim()) {
      errors.whatsapp = t("validation.whatsappRequired")
    } else {
      const cleanNumber = formData.whatsapp.replace(/\D/g, "")
      if (cleanNumber.length < 7 || cleanNumber.length > 15) {
        errors.whatsapp = "Número deve ter entre 7 e 15 dígitos (formato internacional)"
      }
      const countryCode = cleanNumber.slice(0, 3)
      if (!/^[1-9]\d{0,2}$/.test(countryCode)) {
        errors.whatsapp = "Código do país inválido (deve começar com 1-9)"
      }
    }

    if (!formData.subject.trim()) {
      errors.subject = t("validation.subjectRequired")
    }

    if (!formData.message.trim()) {
      errors.message = t("validation.messageRequired")
    } else if (formData.message.trim().length < 10) {
      errors.message = t("validation.messageMinLength")
    }

    setFormErrors(errors)
    return Object.values(errors).every((error) => error === "")
  }

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    const limited = numbers.slice(0, 15)

    if (limited.length <= 3) {
      return `+${limited}`
    } else if (limited.length <= 6) {
      return `+${limited.slice(0, 3)} ${limited.slice(3)}`
    } else if (limited.length <= 10) {
      return `+${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`
    } else {
      return `+${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6, 10)} ${limited.slice(10)}`
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === "whatsapp") {
      const formatted = formatWhatsApp(value)
      setFormData((prev) => ({ ...prev, [field]: formatted }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("https://formspree.io/f/xkgzegyj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", whatsapp: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 lg:pr-8 hero-content order-2 lg:order-1">
            {/* Status Badge */}
            <div className="flex items-center gap-2 hero-greeting">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-dot"></div>
              <Badge
                variant="secondary"
                className="text-xs sm:text-sm font-medium bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20"
              >
                {t("hero.available")}
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-2 sm:space-y-3">
              <p className="text-base sm:text-lg text-muted-foreground font-medium tracking-wide hero-greeting">
                {t("hero.greeting")}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight hero-name leading-tight">
                <span className="bg-gradient-to-r from-foreground via-[#3B82F6] to-[#3B82F6] bg-clip-text text-transparent animate-gradient">
                  Davi Ramos
                </span>
              </h1>
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#3B82F6] hero-title whitespace-nowrap">
                  {t("hero.title")}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed hero-description">
                  {t("hero.description")}
                </p>
              </div>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 hero-skills">
              {[
                language === "pt" ? "Engenharia Backend" : "Backend Engineering",
                language === "pt" ? "APIs & Integrações" : "APIs & Integrations",
                language === "pt" ? " SaaS" : "SaaS",
                language === "pt" ? "Automação" : "Automation"
              ].map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-xs sm:text-sm border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/10 cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={(e) => scrollToSection("what-i-do", (e.target as HTMLElement).textContent || "")}
                >
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 hero-skills">
              <Badge
                variant="secondary"
                className="text-xs sm:text-sm bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20 hover:bg-[#3B82F6]/20 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
                </svg>
                TypeScript
              </Badge>

              <Badge
                variant="secondary"
                className="text-xs sm:text-sm bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20 hover:bg-[#3B82F6]/20 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.276-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
                </svg>
                NodeJS
              </Badge>

              <Badge
                variant="secondary"
                className="text-xs sm:text-sm bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20 hover:bg-[#3B82F6]/20 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM12.938 2.993A9.007 9.007 0 1 0 21.007 12 9.007 9.007 0 0 0 12.938 2.993zM8.47 8.457h.002l-.014.014a.095.095 0 0 0-.014.037L6.848 14.4h1.656l.359-1.192h2.084l.359 1.192h1.656L11.366 8.508a.095.095 0 0 0-.014-.037l-.014-.014H8.47zm1.953 1.271l.661 2.206H9.761l.661-2.206zm5.888-.085v4.757h1.574V9.643h-.002c1.037 0 1.574.911 1.574 1.911v2.846h1.574v-3.029c0-1.612-1.022-2.726-2.635-2.726h-2.085v.078z" />
                </svg>
                NestJS
              </Badge>

              <Badge
                variant="secondary"
                className="text-xs sm:text-sm bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20 hover:bg-[#3B82F6]/20 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.532-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                </svg>
                React
              </Badge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 hero-cta">
              <Button
                size="lg"
                className="group bg-[#3B82F6] hover:bg-[#3B82F6]/90 cursor-pointer transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                onClick={() => scrollToSection("featured-projects", "")}
              >
                {t("hero.viewWork")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4 hero-social">
              <p className="text-xs sm:text-sm text-muted-foreground">{t("hero.connectWith")}</p>
              <div className="flex gap-3">
                {[
                  { href: "https://github.com/daviramosds", icon: Github, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/davirds/", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:davirds.dev@gmail.com", icon: Mail, label: "Email" },
                  {
                    href: "http://wa.me/5548988267221",
                    icon: () => (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                    ),
                    label: "WhatsApp",
                  },
                ].map(({ href, icon: Icon, label }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="icon"
                    className="hover:scale-110 transition-all duration-300 hover:text-[#3B82F6] cursor-pointer h-8 w-8 sm:h-10 sm:w-10"
                    asChild
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon />
                      <span className="sr-only">{label}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative hero-image order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <Image
                src="/profile.jpg"
                alt="Davi Ramos - Development and Automation Specialist"
                fill
                className="object-cover transition-all duration-500 hover:scale-105 rounded-3xl"
                priority
              />


            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section id="what-i-do" className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 section-title">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("whatIDo.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("whatIDo.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                id: "backend-engineering-card",
                icon: Server,
                title: t("whatIDo.backendEngineering.title"),
                description: t("whatIDo.backendEngineering.description"),
                tech: ["TypeScript", "Node.js", "PostgreSQL", "APIs"],
              },
              {
                id: "apis-integrations-card",
                icon: Zap,
                title: t("whatIDo.apisIntegrations.title"),
                description: t("whatIDo.apisIntegrations.description"),
                tech: ["REST APIs", "Webhooks", "Integrations", "Node.js"],
              },
              {
                id: "saas-development-card",
                icon: Globe,
                title: t("whatIDo.saasDevelopment.title"),
                description: t("whatIDo.saasDevelopment.description"),
                tech: ["SaaS", "Backend Architecture", "Authentication", "Multi-tenant"],
              },
              {
                id: "automation-card",
                icon: Zap,
                title: t("whatIDo.automation.title"),
                description: t("whatIDo.automation.description"),
                tech: ["Automation", "APIs", "n8n", "Python"],
              },
            ].map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="bg-card border rounded-xl p-8 hover:shadow-xl transition-all duration-500 group hover:border-[#3B82F6]/50 hover:scale-105 service-card"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-6 w-6 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsList />

      {/* Contact Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 section-title">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("contact.title")}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 contact-info">
                {[
                  { icon: Mail, title: t("contact.email"), value: "davirds.dev@gmail.com" },
                  { icon: MapPin, title: t("contact.location"), value: "Brazil" },
                  { icon: Calendar, title: t("contact.responseTime"), value: t("contact.responseTimeValue") },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 contact-item">
                    <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-[#3B82F6]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card border rounded-xl p-8 contact-form">
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-800 dark:text-green-200 font-medium">{t("contact.form.success")}</p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-800 dark:text-red-200 font-medium">{t("contact.form.error")}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("contact.form.name")}</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 transition-all duration-300 ${formErrors.name
                          ? "border-red-500 focus:ring-red-500/20"
                          : "focus:ring-[#3B82F6]/20 border-border"
                          }`}
                        placeholder={t("contact.form.namePlaceholder")}
                      />
                      {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("contact.form.email")}</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 transition-all duration-300 ${formErrors.email
                          ? "border-red-500 focus:ring-red-500/20"
                          : "focus:ring-[#3B82F6]/20 border-border"
                          }`}
                        placeholder={t("contact.form.emailPlaceholder")}
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("contact.form.whatsapp")}</label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 transition-all duration-300 ${formErrors.whatsapp
                        ? "border-red-500 focus:ring-red-500/20"
                        : "focus:ring-[#3B82F6]/20 border-border"
                        }`}
                      placeholder="+55 11 99999 9999"
                      maxLength={20}
                    />
                    {formErrors.whatsapp && <p className="text-red-500 text-xs mt-1">{formErrors.whatsapp}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("contact.form.subject")}</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 transition-all duration-300 ${formErrors.subject
                        ? "border-red-500 focus:ring-red-500/20"
                        : "focus:ring-[#3B82F6]/20 border-border"
                        }`}
                      placeholder={t("contact.form.subjectPlaceholder")}
                    />
                    {formErrors.subject && <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("contact.form.message")}</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 resize-none transition-all duration-300 ${formErrors.message
                        ? "border-red-500 focus:ring-red-500/20"
                        : "focus:ring-[#3B82F6]/20 border-border"
                        }`}
                      placeholder={t("contact.form.messagePlaceholder")}
                    />
                    {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90 cursor-pointer transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {t("contact.form.sending")}
                      </div>
                    ) : (
                      t("contact.form.send")
                    )}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 hover:translate-x-1" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground">© 2025 davirds.dev. {t("footer.rights")}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="text-sm text-muted-foreground">{t("hero.connectWith")}</span>
              <div className="flex gap-4">
                {[
                  { href: "https://github.com/daviramosds", icon: Github },
                  { href: "https://www.linkedin.com/in/davirds/", icon: Linkedin },
                  { href: "mailto:davirds.dev@gmail.com", icon: Mail },
                  {
                    href: "http://wa.me/5548988267221",
                    icon: () => (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                    ),
                  },
                ].map(({ href, icon: Icon }, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="hover:text-[#3B82F6] cursor-pointer hover:scale-110 transition-all duration-300"
                    asChild
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
