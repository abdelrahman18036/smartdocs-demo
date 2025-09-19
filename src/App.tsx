import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider, useAppContext } from './context/AppContext'
import { Navigation } from './component/Navigation'
import { Notifications } from './component/Notifications'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ExamplePage } from './pages/ExamplePage'
import { DynamicPagess } from './component/DynamicPagess'

/**
 * App Layout Component
 * 
 * Wraps the app content with navigation and notifications.
 * Applies theme classes based on the global state.
 */
function AppLayout() {
  const { state } = useAppContext()

  return (
    <div className={state.theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/examples" element={<ExamplePage />} />
            <Route path="/pages/:id" element={<DynamicPagess />} />
            <Route path="/articles/:id" element={<DynamicPagess />} />
            <Route path="/products/:id" element={<DynamicPagess />} />
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    The page you're looking for doesn't exist.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Notifications />
      </div>
    </div>
  )
}

/**
 * Main App Component
 * 
 * Root component that provides global state context and routing.
 */
function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout />
      </Router>
    </AppProvider>
  )
}

export default App
