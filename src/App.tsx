import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { AppProvider } from './context/AppContext'
import { Navigation } from './component/Navigation'
import { Notifications } from './component/Notifications'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { ExamplePage } from './pages/ExamplePage'
import { DynamicPage } from './pages/DynamicPage'
import { DynamicPages } from './assets/DynamicPages'
import { TestPage } from './Test'
import { DynamicPagess } from './component/DynamicPagess'
/**
 * Main application component with routing and global context
 * 
 * This is the root component that sets up routing, provides global state management,
 * and renders the main application layout with navigation and page content.
 */
function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Navigation />
          <Notifications />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/examples" element={<ExamplePage />} />
              {/* Dynamic routes with ID parameters */}
              <Route path="/pages/:id" element={<DynamicPage />} />
              <Route path="/articles/:id" element={<DynamicPagess />} />
              <Route path="/products/:id" element={<DynamicPages />} />
              <Route path="/test" element={<TestPage />} />
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  )
}

/**
 * 404 Not Found Page Component
 * 
 * Displays a friendly 404 error page when users navigate to non-existent routes.
 */
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}

export default App
