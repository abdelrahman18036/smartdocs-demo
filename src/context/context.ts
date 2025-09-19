import { createContext } from 'react'
import type { AppContextType } from './types'

// Create context
export const AppContext = createContext<AppContextType | undefined>(undefined)