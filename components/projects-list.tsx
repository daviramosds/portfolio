"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/components/language-toggle"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useState } from "react"
import allProjectsData from "@/projects.json" //

// Função helper para capitalizar a primeira letra (ex: "web" -> "Web")
function capitalize(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ProjectsList() {
  const { t, language } = useTranslation()
  const [filter, setFilter] = useState("all")

  // 1. Pega as categorias únicas do JSON
  const categories = [...new Set(allProjectsData.map(p => p.category))] //

  const allProjects = allProjectsData.map(project => {
    const lang = language === "pt" ? "pt" : "en";
    let imageUrl = project.image_url;

    // Lógica do placeholder (da etapa anterior)
    if (!imageUrl || imageUrl.startsWith("/images/projects/")) {
      imageUrl = "/placeholder.svg";
    }
    
    return {
      id: project.id,
      category: project.category,
      title: project.translations[lang].title,
      description: project.translations[lang].description,
      tech: project.tech,
      image: imageUrl,
      github: project.project_url
    };
  });

  const filteredProjects = allProjects.filter(project => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  return (
    <section id="featured-projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 section-title">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("projects.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("projects.subtitle")}</p>
          <div className="flex justify-center mt-8">
            <Tabs defaultValue="all" onValueChange={(value) => setFilter(value)}>
              <TabsList className="p-0">
                
                {/* 2. Mantém o "All" fixo */}
                <TabsTrigger className="text-[#3B82F6] px-4 cursor-pointer data-[state=active]:text-[#3B82F6]" value="all">
                  All
                </TabsTrigger>

                {/* 3. Renderiza as categorias dinâmicas do JSON */}
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category}
                    className="text-[#3B82F6] px-4 cursor-pointer data-[state=active]:text-[#3B82F6]" 
                    value={category}
                  >
                    {capitalize(category)}
                  </TabsTrigger>
                ))}

              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-card border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 group hover:scale-105 project-card flex flex-col h-[500px]"
            >
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 flex-shrink-0 group-hover:text-[#3B82F6]">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed flex-grow text-sm">{project.description}</p>
                <div className="mt-auto flex-shrink-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs bg-[#3B82F6]/10 text-[#3B82F6]"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group/btn cursor-pointer w-full justify-center hover:bg-[#3B82F6]/10"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      {t("projects.viewProject")}
                      <ExternalLink className="ml-2 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                </div>
                {/* O 'a' que estava aqui foi removido */}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 section-title">
          <Button
            variant="outline"
            size="lg"
            className="border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10"
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
  )
}