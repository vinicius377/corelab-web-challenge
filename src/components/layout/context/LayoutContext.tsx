import { createContext, ReactNode, useContext, useState } from 'react'

interface LayoutContext {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const LayoutContext = createContext<LayoutContext>({
  searchTerm: '',
  setSearchTerm: () => { }
})

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <LayoutContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayoutContext = () => useContext(LayoutContext)
