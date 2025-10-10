// File: components/conditional-toggles.tsx

"use client"

import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'

export function ConditionalToggles() {
  const pathname = usePathname()

  // Se a página atual for /psi, não renderize nada.
  if (pathname === '/psi') {
    return null
  }

  // Para todas as outras páginas, mostre os botões.
  return (
    <>
      <ThemeToggle />
      <LanguageToggle />
    </>
  )
}