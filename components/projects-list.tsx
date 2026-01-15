"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/language-toggle"
import { ArrowRight, ExternalLink } from "lucide-react"
import allProjectsData from "@/projects.json"

export function ProjectsList() {
  const { t, language } = useTranslation()

  const allProjects = allProjectsData.map(project => {
    const lang = language === "pt" ? "pt" : "en";
    let imageUrl = project.image_url;

    // Lógica do placeholder
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

  return (
    <section id="featured-projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 section-title">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("projects.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("projects.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {allProjects.map((project) => (
            <div
              key={project.id}
              className="bg-card border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 group hover:scale-105 project-card flex flex-col p-6"
            >
              <h3 className="text-xl font-semibold mb-2 flex-shrink-0 group-hover:text-[#3B82F6]">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed flex-grow text-sm">{project.description}</p>
              <div className="mt-auto flex-shrink-0">
                <div className="flex flex-wrap gap-2">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}