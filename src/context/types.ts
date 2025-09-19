// Define the shape of our app state
export interface AppState {
  theme: 'light' | 'dark'
  user: {
    name: string
    email: string
    isAuthenticated: boolean
  } | null
  notifications: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
  }>
  loading: boolean
}

// Define action types
export type AppAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_USER'; payload: AppState['user'] }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<AppState['notifications'][0], 'id'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SET_LOADING'; payload: boolean }

// Context type
export interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  // Helper functions
  toggleTheme: () => void
  addNotification: (notification: Omit<AppState['notifications'][0], 'id'>) => void
  removeNotification: (id: string) => void
  setUser: (user: AppState['user']) => void
  logout: () => void
}