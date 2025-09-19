import { useContext } from 'react'
import { AppContext } from './context'
import type { AppContextType } from './types'

/**
 * Custom hook to use the App Context
 * 
 * @returns AppContextType - The app context value with state and actions
 * @throws Error if used outside of AppProvider
 */
export function useAppContext(): AppContextType {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}