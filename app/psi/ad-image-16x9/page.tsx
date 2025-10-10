"use client"

export default function AdImage16x9Page() {
  return (
    // Fundo neutro e padding da página
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white dark:bg-black p-4 sm:p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Prévia da Imagem para Publicação (Formato 16:9)</h1>
        <p className="text-sm text-gray-500">Abaixo está o gráfico horizontal para você usar no seu feed.</p>
      </div>
      
      {/* Container 16:9 */}
      <div 
        id="image-to-screenshot-16x9" 
        className="w-full max-w-4xl aspect-video bg-[#111111] shadow-2xl p-10 sm:p-16 flex flex-col justify-center text-white font-sans"
      >
        
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-gray-300">
            Você transforma anúncios em
          </h1>

          <div className="my-3">
            <span className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-gray-600 line-through">
              Cliques
            </span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-normal text-gray-300">
            ou em
          </h2>

          <div className="my-3">
            {/* Texto "Pacientes?" com gradiente de cores e padding para evitar corte */}
            <span className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text px-2">
              Pacientes?
            </span>
          </div>

          <p className="text-base sm:text-lg font-medium text-gray-400 mt-6">
            Sua landing page é a ferramenta que faz essa conversão.
          </p>
        </div>
        
        {/* Chamada para Ação (CTA) */}
        <div className="mt-auto text-center">
          <div className="border border-gray-700 rounded-full py-2 px-4 inline-block mt-4">
            <p className="font-semibold text-gray-300">davirds.dev/psi</p>
          </div>
        </div>
        
      </div>
    </main>
  );
}