import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { Button } from './Button'
import { ButtonComponent } from './ButtonComponent'
import { Badge } from './Badge'

/**
 * Navigation Header Component
 * 
 * A responsive navigation header with routing links, theme toggle,
 * user authentication state, and notification indicators.
 */
export function Navigation() {
  const { state, toggleTheme, logout, addNotification } = useAppContext()
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: '📖' },
    { path: '/contact', label: 'Contact', icon: '📧' },
    { path: '/examples', label: 'Examples', icon: '🧩' }
  ]

  // Dynamic page links for demonstration
  const dynamicLinks = [
    { path: '/pages/12312', label: 'Page 12312', icon: '📄' },
    { path: '/articles/featured', label: 'Featured Article', icon: '📰' },
    { path: '/products/demo', label: 'Demo Product', icon: '📦' }
  ]

  const handleLogoClick = () => {
    addNotification({
      message: 'Welcome to SmartDocs Demo!',
      type: 'info'
    })
  }

  return (
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${
      state.theme === 'dark' 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    } border-b shadow-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span className="text-2xl">📚</span>
              <span>SmartDocs</span>
              <Badge variant="primary" size="small">Demo</Badge>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? state.theme === 'dark'
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-100 text-blue-700'
                      : state.theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
            
            {/* Dynamic Pages Dropdown */}
            <div className="relative group">
              <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                state.theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}>
                <span>🔗</span>
                <span>Dynamic</span>
                <span className="text-xs">▼</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                state.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-lg shadow-lg z-10`}>
                {dynamicLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                      state.theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications Indicator */}
            {state.notifications.length > 0 && (
              <div className="relative">
                <button className="text-yellow-500 hover:text-yellow-600 transition-colors">
                  <span className="text-xl">🔔</span>
                  <Badge 
                    variant="danger" 
                    size="small" 
                    className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 flex items-center justify-center text-xs"
                  >
                    {state.notifications.length}
                  </Badge>
                </button>
              </div>
            )}

            {/* Theme Toggle */}
            <Button
              variant="secondary"
              size="small"
              onClick={toggleTheme}
              className="hidden sm:flex items-center space-x-1"
            >
              <span>{state.theme === 'light' ? '🌙' : '☀️'}</span>
              <span className="hidden lg:inline">
                {state.theme === 'light' ? 'Dark' : 'Light'}
              </span>
            </Button>

            {/* User Menu */}
            {state.user ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {state.user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {state.user.email}
                  </p>
                </div>
                <ButtonComponent
                  variant="danger"
                  size="small"
                  onClick={logout}
                >
                  Logout
                </ButtonComponent>
              </div>
            ) : (
              <ButtonComponent
                variant="primary"
                size="small"
                onClick={() => {
                  addNotification({
                    message: 'Login feature coming soon!',
                    type: 'info'
                  })
                }}
              >
                Login
              </ButtonComponent>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => {
                addNotification({
                  message: 'Mobile menu not implemented in this demo',
                  type: 'info'
                })
              }}
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="py-2 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? state.theme === 'dark'
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-100 text-blue-700'
                      : state.theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
                {location.pathname === link.path && (
                  <Badge variant="primary" size="small">Current</Badge>
                )}
              </NavLink>
            ))}
            
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                state.theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{state.theme === 'light' ? '🌙' : '☀️'}</span>
              <span>Switch to {state.theme === 'light' ? 'Dark' : 'Light'} Mode</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}