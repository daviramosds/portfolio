"use client"
import React, { useEffect } from "react" 
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, BrainCircuit, Target, MessageCircleOff, CheckCircle2, Star, Rocket, TabletSmartphone, GanttChartSquare, Gem } from "lucide-react"
// CORRIGIDO: Importação estática do 'scrollreveal' removida para evitar erro no servidor

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
)
export default function PsicologosLandingPage() {
  const WHATSAPP_MESSAGE = "Olá, Davi! Vi sua página sobre criação de Landing Pages para psicólogos e tenho interesse na oferta especial. Podemos conversar?";
  // CORRIGIDO: URL completa com número de telefone e mensagem (baseado no padrão da app/page.tsx)
  const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=5511912950091&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  
  const projects = [
    {
      name: "Projeto | Matheus Vieira",
      imageUrl: "/matheus.png",
      testimonial: "Tive uma ótima experiência! Desde o início foram extremamente atenciosos, tiraram todas as minhas dúvidas e acompanharam cada detalhe. O site que eles desenvolveram ficou incrível — moderno, funcional e exatamente como eu queria.",
      author: "Matheus Vieira, Psicólogo",
    },
    {
      name: "Projeto | Jerusa Claro",
      imageUrl: "/jerusa.png",
      testimonial: "Já tive a oportunidade de contar com os serviços mais de uma vez, e sempre fui atendida com muito profissionalismo e competência. O conhecimento vasto permite resolver qualquer problema com rapidez, garantindo um resultado de qualidade.",
      author: "Jerusa Claro, Psicóloga",
    },
    {
      name: "Projeto | Juliana Costa",
      imageUrl: "/juliana.png",
      testimonial: "O Davi conseguiu traduzir em design a sensibilidade que eu queria para o meu site. O resultado foi uma página que realmente me representa e tem atraído os pacientes certos para o meu consultório. Recomendo de olhos fechados!",
      author: "Juliana Costa, Psicóloga",
    },
  ];
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_URL, '_blank');
  };
  
  // CORRIGIDO: useEffect modificado para importar 'scrollreveal' dinamicamente no cliente
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initScrollReveal = async () => {
      try {
        const ScrollReveal = (await import("scrollreveal")).default;
        
        const sr = ScrollReveal({
          origin: 'bottom',
          distance: '60px',
          duration: 1000,
          delay: 200,
          reset: false,
        });
        sr.reveal('.reveal-hero', { origin: 'top', delay: 200 });
        sr.reveal('.reveal-cards', { interval: 200 });
        sr.reveal('.reveal-text', { origin: 'left' });
        sr.reveal('.reveal-project-image', { origin: 'right', delay: 400 });
        sr.reveal('.reveal-project-text', { origin: 'left', delay: 400 });
        sr.reveal('.reveal-offer', { scale: 0.85 });
      } catch (error) {
        console.warn("ScrollReveal failed to load:", error);
      }
    };

    initScrollReveal();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {}
      <section className="relative py-24 sm:py-32 lg:py-40 text-center overflow-hidden">
        <Image src="/placeholder.jpg" layout="fill" objectFit="cover" alt="Consultório de psicologia" className="absolute inset-0 z-0 opacity-10" />
        <div className="container relative z-10 mx-auto px-4 reveal-hero">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-4xl mx-auto">
            Psicólogo, e se cada real investido em anúncios trouxesse um <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text">paciente qualificado?</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Muitos profissionais excelentes se frustram com o marketing digital. Eles atraem cliques, mas não pacientes. A verdade é que o problema não é o seu anúncio. <strong className="text-foreground">É o destino para onde você o envia.</strong>
          </p>
          <div className="mt-10">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white transition-transform hover:scale-105 group cursor-pointer" onClick={() => scrollTo('problema')}>
              Quero entender como
              <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
        </div>
      </section>
      {}
      <section id="problema" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center reveal-text">
            <h2 className="text-3xl lg:text-4xl font-bold">Isso soa familiar para você?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 text-center">
            <div className="flex flex-col items-center reveal-cards">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400 rounded-full flex items-center justify-center mb-5">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">O "Funil Furado" do Instagram</h3>
              <p className="text-muted-foreground">Você paga para levar pessoas ao seu perfil, elas olham seus posts, se distraem com stories e... somem. Seu perfil é um ótimo cartão de visitas, mas um péssimo conversor.</p>
            </div>
            <div className="flex flex-col items-center reveal-cards">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400 rounded-full flex items-center justify-center mb-5">
                <GanttChartSquare className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">A Confusão do Site Completo</h3>
              <p className="text-muted-foreground">Seu site tem 'Home', 'Sobre', 'Blog'. O visitante clica em tudo, mas não toma a ação que você mais quer: a de agendar uma consulta.</p>
            </div>
            <div className="flex flex-col items-center reveal-cards">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400 rounded-full flex items-center justify-center mb-5">
                <MessageCircleOff className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">O Desgaste do WhatsApp</h3>
              <p className="text-muted-foreground">Você recebe dezenas de mensagens, explica tudo do zero, filtra curiosos e, no fim, a conversa esfria. Seu tempo é valioso demais para isso.</p>
            </div>
          </div>
        </div>
      </section>
      {}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl reveal-text">
          <h2 className="text-3xl lg:text-4xl font-bold">A <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text">ponte</span> entre o clique e o paciente tem um nome: Landing Page.</h2>
          <p className="text-xl text-muted-foreground mt-6">
            Imagine uma página criada com um <strong className="text-foreground">único objetivo:</strong> receber o visitante do seu anúncio e guiá-lo, passo a passo, até o agendamento. Sem distrações. Sem links para sair. Apenas um caminho direto para a sua agenda.
          </p>
          <p className="text-2xl font-semibold mt-6">É isso que eu construo.</p>
          <p className="text-lg mt-4 text-muted-foreground">
            Não sou apenas um desenvolvedor. Sou um especialista em criar a ferramenta de conversão que falta na sua estratégia. E eu já fiz isso para outros psicólogos.
          </p>
        </div>
      </section>
      {}
      <section id="prova" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16 reveal-text">
                  <h2 className="text-3xl lg:text-4xl font-bold">Veja as pontes que construí para outros psicólogos como você:</h2>
              </div>
              <div className="space-y-20">
                {projects.map((project, index) => (
                    <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
                        <div className={`order-1 ${index % 2 === 0 ? 'md:order-2 reveal-project-image' : 'md:order-1 reveal-project-image'}`}>
                            <Image src={project.imageUrl} alt={`Mockup do projeto ${project.name}`} width={600} height={500} className="rounded-xl object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105 hover:-rotate-1" />
                        </div>
                        <div className={`order-2 ${index % 2 === 0 ? 'md:order-1 reveal-project-text' : 'md:order-2 reveal-project-text'}`}>
                            <h3 className="text-2xl font-bold mb-6">{project.name}</h3>
                            <blockquote className="p-6 bg-card border rounded-lg italic text-muted-foreground relative">
                                <p className="z-10 relative">"{project.testimonial}"</p>
                                <footer className="mt-4 not-italic font-semibold text-foreground flex items-center gap-2 z-10 relative"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/> {project.author}</footer>
                            </blockquote>
                        </div>
                    </div>
                ))}
              </div>
          </div>
      </section>
      {}
      <section id="oferta" className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center reveal-text">
            <h2 className="text-3xl lg:text-4xl font-bold">Ok, Davi, eu entendi. Do que eu preciso?</h2>
            <p className="text-lg text-muted-foreground mt-4">Você não precisa de um site complexo de 5 mil reais. Você precisa de uma <strong className="text-foreground">máquina de conversão</strong>. E eu tornei isso acessível.</p>
          </div>
          <Card className="mt-12 shadow-2xl border-purple-500 border-2 bg-card reveal-offer">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-6">Pacote "Presença Digital de Alta Conversão"</h3>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                {[
                  { icon: Gem, text: "Landing Page Profissional e Focada" },
                  { icon: BrainCircuit, text: "Estrutura de Textos Persuasivos (Copywriting)" },
                  { icon: TabletSmartphone, text: "100% Responsiva (Celular, Tablet, PC)" },
                  { icon: WhatsAppIcon, text: "Botões de WhatsApp Integrados" },
                  { icon: CheckCircle2, text: "Formulário Inteligente (Opcional)" },
                  { icon: Target, text: "Integração com Pixel (Facebook/Google)" },
                  { icon: Rocket, text: "Domínio e Hospedagem por 1 ano" },
                ].map(item => (
                  <li key={item.text} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-purple-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center bg-muted/50 p-6 rounded-lg">
                <p className="text-muted-foreground line-through">Investimento padrão: R$700</p>
                <p className="text-lg text-muted-foreground mt-2">Condição especial por tempo limitado:</p>
                <p className="text-4xl lg:text-5xl font-bold text-purple-500 my-2 animate-pulse">12x de R$49,90</p>
                <p className="font-semibold">ou R$497 à vista</p>
                <div className="mt-4 text-sm font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 py-2 px-4 rounded-md inline-block">
                  Atenção: Vagas limitadas a 2 projetos por mês com este valor.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      {}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center max-w-3xl reveal-text">
          <h2 className="text-3xl lg:text-4xl font-bold">Pronto(a) para transformar seus cliques em pacientes?</h2>
          <p className="text-lg text-muted-foreground mt-4 mb-8">
            Clique no botão abaixo e vamos conversar no WhatsApp. Sem compromisso. Vou entender seu projeto e tirar todas as suas dúvidas.
          </p>
          <Button size="lg" className="group h-auto py-4 px-8 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg transition-transform hover:scale-105 animate-pulse cursor-pointer" onClick={handleWhatsAppClick}>
            <WhatsAppIcon className="h-6 w-6" />
            <span className="ml-3">Sim, quero minha Landing Page por este valor especial!</span>
          </Button>
        </div>
      </section>
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} davirds.dev</p>
        </div>
      </footer>
    </main>
  );
} 