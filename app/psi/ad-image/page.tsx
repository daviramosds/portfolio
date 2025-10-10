"use client"

export default function AdImageCleanPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white dark:bg-black p-8 sm:p-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Prévia da Imagem para Publicação (Versão Final)</h1>
        <p className="text-sm text-gray-500">Abaixo está o gráfico quadrado para você usar no seu feed.</p>
      </div>
      
      <div 
        id="image-to-screenshot" 
        className="w-full max-w-2xl aspect-square bg-[#111111] shadow-2xl p-16 sm:p-24 flex flex-col justify-center text-white font-sans"
      >
        
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-gray-300">
            Você transforma anúncios em
          </h1>

          <div className="my-4">
            <span className="text-6xl sm:text-8xl font-extrabold tracking-tighter text-gray-600 line-through">
              Cliques
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-300">
            ou em
          </h2>

          <div className="my-4">
            {/* CORREÇÃO APLICADA AQUI: removido tracking-tighter e adicionado px-2 */}
            <span className="text-6xl sm:text-8xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text px-2">
              Pacientes?
            </span>
          </div>

          <p className="text-base sm:text-lg font-medium text-gray-400 mt-8">
            Sua landing page é a ferramenta que faz essa conversão.
          </p>
        </div>
        
        <div className="mt-auto text-center">
          <div className="border border-gray-700 rounded-full py-2 px-4 inline-block mt-4">
            <p className="font-semibold text-gray-300">davirds.dev/psi</p>
          </div>
        </div>
        
      </div>
    </main>
  );
}