"use client"
import Image from "next/image";
import { ThumbsUp, MessageCircle, Share, MoreHorizontal, Globe } from "lucide-react";

export default function FacebookAdPage() {
  const adCopy = `Psicólogo, você investe em anúncios e só atrai curiosos? 🤔

O erro mais comum é enviar o tráfego para o perfil do Instagram ou para um site confuso. Ambos são péssimos em converter cliques em agendamentos.

A solução é uma Landing Page: uma página 100% focada em transformar seu visitante em paciente.

✅ Transmite profissionalismo e confiança.
✅ Guia o visitante em um caminho direto até o agendamento.
✅ Filtra os curiosos e qualifica seus contatos.

Clique em "Saiba mais" e descubra como uma ferramenta de conversão pode destravar o potencial dos seus anúncios.`;

  return (
    // Fundo neutro para facilitar a captura
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-200 dark:bg-gray-900 p-4 sm:p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Prévia do Anúncio para Publicação</h1>
        <p className="text-sm text-gray-500">Abaixo está a imagem quadrada para você usar em suas campanhas.</p>
      </div>
      
      {/* Container Quadrado (A Imagem que você vai usar) */}
      <div id="ad-creative" className="w-full max-w-lg aspect-square bg-white dark:bg-black shadow-2xl rounded-xl overflow-hidden flex flex-col">
        
        {/* Cabeçalho do Anúncio */}
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              DR
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900 dark:text-gray-100">Davi Ramos | Ferramentas de Conversão</p>
              <div className="flex items-center gap-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Patrocinado</p>
                <Globe className="h-3 w-3 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
          <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>

        {/* Texto (Copy) do Anúncio */}
        <div className="px-3 pb-2">
          <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {adCopy}
          </p>
        </div>

        {/* Imagem do Anúncio (Mockup) */}
        <div className="flex-grow relative w-full h-auto">
          <Image 
            src="/matheus.png" 
            alt="Mockup de landing page para psicólogo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        
        {/* Barra de Ação (Headline e CTA) */}
        <div className="bg-gray-50 dark:bg-gray-950 mt-auto flex items-center justify-between p-2 border-t border-gray-200 dark:border-gray-800">
          <div className="flex-grow">
            <p className="text-xs uppercase text-gray-500 dark:text-gray-400">DAVIRDS.DEV</p>
            <p className="font-bold text-sm text-gray-900 dark:text-gray-100">Transforme Cliques em Pacientes</p>
          </div>
          <div className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 font-bold text-sm py-2 px-6 rounded-md">
            Saiba mais
          </div>
        </div>

      </div>
    </main>
  );
}