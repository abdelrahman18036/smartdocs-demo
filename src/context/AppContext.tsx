import { createContext, useContext, useReducer, type ReactNode } from 'react'
import { type AppState, type AppAction, type AppContextType } from './types'

// Initial state
const initialState: AppState = {
  theme: 'light',
  user: null,
  notifications: [],
  loading: false
}

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    
    case 'SET_USER':
      return { ...state, user: action.payload }
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { ...action.payload, id: Date.now().toString() }
        ]
      }
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] }
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    default:
      return state
  }
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider props
interface AppProviderProps {
  children: ReactNode
}

/**
 * App Context Provider
 * 
 * Provides global state management for the entire application using React Context and useReducer.
 * Manages theme, user authentication, notifications, and loading states.
 */
export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Helper functions
  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' })
  }

  const addNotification = (notification: Omit<AppState['notifications'][0], 'id'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(Date.now().toString())
    }, 5000)
  }

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }

  const setUser = (user: AppState['user']) => {
    dispatch({ type: 'SET_USER', payload: user })
  }

  const logout = () => {
    dispatch({ type: 'SET_USER', payload: null })
    addNotification({
      message: 'Successfully logged out!',
      type: 'info'
    })
  }

  const value: AppContextType = {
    state,
    dispatch,
    toggleTheme,
    addNotification,
    removeNotification,
    setUser,
    logout
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

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