import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'
import { Button } from './Button'

/**
 * Navigation Component
 * 
 * Main navigation bar for the application with responsive design,
 * theme toggle, and user authentication status.
 */
export function Navigation() {
  const { state, toggleTheme, logout } = useAppContext()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/examples', label: 'Examples' },
    { path: '/about', label: 'About' }
  ]

  return (
    <nav className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
      state.theme === 'dark' 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            SmartDocs Demo
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* User info */}
            {state.user?.isAuthenticated && (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Hello, {state.user.name}
                </span>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}

            {/* Theme toggle */}
            <Button
              variant="secondary"
              size="small"
              onClick={toggleTheme}
              className="p-2"
              aria-label={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {state.theme === 'light' ? '🌙' : '☀️'}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="secondary"
              size="small"
              className="md:hidden p-2"
              onClick={() => {
                // Simple mobile menu toggle - in a real app you'd want proper state management
                const mobileMenu = document.getElementById('mobile-menu')
                if (mobileMenu) {
                  mobileMenu.classList.toggle('hidden')
                }
              }}
            >
              ☰
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden pb-4">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {state.user?.isAuthenticated && (
              <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Hello, {state.user.name}
                </div>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={logout}
                  fullWidth
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}