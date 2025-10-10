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

export default function HomePage() {
  const { t, language } = useTranslation() // adicionando language do contexto

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

        // Hero section animations
        sr.reveal(".hero-content", {
          origin: "left",
          distance: "100px",
          duration: 1200,
        })

        sr.reveal(".hero-image", {
          origin: "right",
          distance: "100px",
          duration: 1200,
          delay: 200,
        })

        // Stagger animations for hero elements
        sr.reveal(".hero-greeting", { delay: 300 })
        sr.reveal(".hero-name", { delay: 400 })
        sr.reveal(".hero-title", { delay: 500 })
        sr.reveal(".hero-description", { delay: 600 })
        sr.reveal(".hero-skills", { delay: 700 })
        sr.reveal(".hero-cta", { delay: 800 })
        sr.reveal(".hero-social", { delay: 900 })

        // Section titles
        sr.reveal(".section-title", {
          origin: "top",
          distance: "50px",
          duration: 800,
        })

        // Service cards with stagger
        sr.reveal(".service-card", {
          origin: "bottom",
          distance: "80px",
          duration: 1000,
          interval: 200,
        })

        // Project cards with different origins
        sr.reveal(".project-card:nth-child(1)", {
          origin: "left",
          distance: "100px",
          duration: 1000,
        })

        sr.reveal(".project-card:nth-child(2)", {
          origin: "bottom",
          distance: "100px",
          duration: 1000,
          delay: 200,
        })

        sr.reveal(".project-card:nth-child(3)", {
          origin: "right",
          distance: "100px",
          duration: 1000,
          delay: 400,
        })

        // Contact section
        sr.reveal(".contact-info", {
          origin: "left",
          distance: "80px",
          duration: 1000,
        })

        sr.reveal(".contact-form", {
          origin: "right",
          distance: "80px",
          duration: 1000,
          delay: 200,
        })

        // Contact info items with stagger
        sr.reveal(".contact-item", {
          origin: "left",
          distance: "50px",
          duration: 800,
          interval: 150,
        })

        // Footer
        sr.reveal("footer", {
          origin: "bottom",
          distance: "30px",
          duration: 800,
        })

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
      // Remove all non-digit characters to validate
      const cleanNumber = formData.whatsapp.replace(/\D/g, "")
      // International numbers: minimum 7 digits (some small countries), maximum 15 digits (ITU-T E.164)
      if (cleanNumber.length < 7 || cleanNumber.length > 15) {
        errors.whatsapp = "Número deve ter entre 7 e 15 dígitos (formato internacional)"
      }
      // Basic validation for country codes (1-3 digits)
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
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, "")

    // Limit to 15 digits (international format)
    const limited = numbers.slice(0, 15)

    // Don't force Brazilian format, allow flexible international formatting
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
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#3B82F6] hero-title">
                  {t("hero.title")}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed hero-description">
                  {t("hero.description")}
                </p>
              </div>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 hero-skills">
              {["Web", "Mobile", language === "pt" ? "Automação" : "Automation", "DevOps"].map((skill, index) => (
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
              <p className="text-xs sm:text-sm text-muted-foreground">Conecte-se comigo:</p>
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

              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-card border rounded-lg p-2 sm:p-4 shadow-lg backdrop-blur-sm z-50">
                <div className="text-lg sm:text-2xl font-bold text-[#3B82F6]">5+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{t("hero.yearsExperience")}</div>
              </div>

              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-card border rounded-lg p-2 sm:p-4 shadow-lg backdrop-blur-sm z-50">
                <div className="text-lg sm:text-2xl font-bold text-[#3B82F6]">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{t("hero.projectsDone")}</div>
              </div>
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
                id: "web-dev-card",
                icon: Globe,
                title: t("whatIDo.webDev.title"),
                description: t("whatIDo.webDev.description"),
                tech: ["React", "Next.js", "TypeScript"],
              },
              {
                id: "mobile-dev-card",
                icon: Smartphone,
                title: t("whatIDo.mobileDev.title"),
                description: t("whatIDo.mobileDev.description"),
                tech: ["React Native", "Expo", "iOS", "Android"],
              },
              {
                id: "automation-card",
                icon: Zap,
                title: t("whatIDo.automation.title"),
                description: t("whatIDo.automation.description"),
                tech: ["Python", "APIs", "n8n", "Make"],
              },
              {
                id: "devops-card",
                icon: Server,
                title: t("whatIDo.devops.title"),
                description: t("whatIDo.devops.description"),
                tech: ["Docker", "Kubernetes", "CI/CD", "AWS", "Google Cloud"],
              },
            ].map((service, index) => (
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

      {/* Featured Projects Section */}
      <section id="featured-projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 section-title">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("projects.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("projects.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Socially",
                description: t("projects.socially.description"),
                tech: ["Next.js", "TypeScript", "Node.js"],
                image: "/socially.gif",
                github: "https://github.com/daviramosds/socially",
              },
              {
                title: "NestJS Microservices",
                description: t("projects.microservices.description"),
                tech: ["NestJS", "Docker", "NATS", "SQL"],
                image: "/microservices-architecture.png",
                github: "https://github.com/daviramosds/nestjs-microservices-nats-sql-docker",
              },
              {
                title: "Media Renamer",
                description: t("projects.mediaRenamer.description"),
                tech: ["Python", "Automation", "File Processing"],
                image: "/file-automation-tool.png",
                github: "https://github.com/daviramosds/mediarenamer",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-card border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 group hover:scale-105 project-card flex flex-col h-[500px]"
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 flex-shrink-0 group-hover:text-[#3B82F6] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed flex-grow text-sm">{project.description}</p>
                  <div className="mt-auto flex-shrink-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group/btn cursor-pointer w-full justify-center hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-all duration-300"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        {t("projects.viewProject")}
                        <ExternalLink className="ml-2 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 section-title">
            <Button
              variant="outline"
              size="lg"
              className="border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/10 bg-transparent cursor-pointer transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="https://github.com/daviramosds" target="_blank" rel="noopener noreferrer">
                {t("projects.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Let's Work Together Section */}
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
                        className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 transition-all duration-300 ${
                          formErrors.name
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
                        className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 transition-all duration-300 ${
                          formErrors.email
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
                      className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 transition-all duration-300 ${
                        formErrors.whatsapp
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
                      className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 transition-all duration-300 ${
                        formErrors.subject
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
                      className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 resize-none transition-all duration-300 ${
                        formErrors.message
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
              <span className="text-sm text-muted-foreground">Conecte-se comigo:</span>
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
