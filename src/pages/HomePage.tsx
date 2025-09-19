import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { ButtonComponent } from '../component/ButtonComponent'
import { Button } from '../component/Button'
import { CardWidget } from '../component/CardWidget'
import { DialogModal } from '../component/DialogModal'

/**
 * Home Page Component
 * 
 * The main landing page of the application showcasing various components
 * and demonstrating the use of global context for theme and state management.
 */
export function HomePage() {
  const { state, toggleTheme, addNotification, setUser } = useAppContext()
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [userCount, setUserCount] = useState(1250)

  const handleGetStarted = () => {
    addNotification({
      message: 'Welcome to SmartDocs Demo App!',
      type: 'success'
    })
    setShowWelcomeModal(true)
  }

  const handleLogin = () => {
    setUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      isAuthenticated: true
    })
    addNotification({
      message: 'Successfully logged in!',
      type: 'success'
    })
  }

  const incrementUsers = () => {
    setUserCount(prev => prev + 1)
    addNotification({
      message: 'New user joined!',
      type: 'info'
    })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SmartDocs Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            A comprehensive React application showcasing modern components, hooks, 
            TypeScript integration, and context-based state management.
          </p>
          <div className="space-x-4">
            <ButtonComponent variant="primary" size="large" onClick={handleGetStarted}>
              Get Started
            </ButtonComponent>
            <Button variant="secondary" size="large" onClick={toggleTheme}>
              Switch to {state.theme === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <CardWidget
            title="Component Library"
            subtitle="Reusable UI Components"
            elevation="lg"
            hoverable
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Our app includes a variety of well-documented components:
              </p>
              <ul className="text-sm space-y-2">
                <li>• ButtonComponent with variants</li>
                <li>• CardWidget for content display</li>
                <li>• InputField with validation</li>
                <li>• DialogModal for overlays</li>
                <li>• Notifications system</li>
              </ul>
              <Button variant="primary" size="small" onClick={() => window.location.href = '/examples'}>
                View Examples
              </Button>
            </div>
          </CardWidget>

          <CardWidget
            title="State Management"
            subtitle="React Context & Hooks"
            elevation="lg"
            hoverable
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Centralized state management with React Context:
              </p>
              <ul className="text-sm space-y-2">
                <li>• Theme switching (Light/Dark)</li>
                <li>• User authentication state</li>
                <li>• Global notification system</li>
                <li>• Loading states</li>
              </ul>
              {!state.user?.isAuthenticated ? (
                <Button variant="success" size="small" onClick={handleLogin}>
                  Demo Login
                </Button>
              ) : (
                <p className="text-sm text-green-600 dark:text-green-400">
                  ✅ Welcome, {state.user.name}!
                </p>
              )}
            </div>
          </CardWidget>

          <CardWidget
            title="TypeScript Integration"
            subtitle="Type-safe Development"
            elevation="lg"
            hoverable
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Full TypeScript support throughout:
              </p>
              <ul className="text-sm space-y-2">
                <li>• Strict type checking</li>
                <li>• Interface definitions</li>
                <li>• Generic components</li>
                <li>• IntelliSense support</li>
              </ul>
              <Button variant="warning" size="small" onClick={() => addNotification({
                message: 'TypeScript provides excellent DX!',
                type: 'info'
              })}>
                Learn More
              </Button>
            </div>
          </CardWidget>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <div className="text-3xl font-bold text-blue-600">{userCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Active Users</div>
            <Button variant="secondary" size="small" onClick={incrementUsers} className="mt-2">
              +1 User
            </Button>
          </div>
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <div className="text-3xl font-bold text-green-600">15+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Components</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <div className="text-3xl font-bold text-purple-600">3</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Custom Hooks</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <div className="text-3xl font-bold text-orange-600">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">TypeScript</div>
          </div>
        </div>

        {/* Dynamic Routing Showcase */}
        <CardWidget
          title="Dynamic Routing Demo"
          subtitle="Explore pages with URL parameters"
          elevation="lg"
          className="text-center"
        >
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300">
              Our app supports dynamic routing with URL parameters. Try these examples:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2">Simple Pages</h4>
                <div className="space-y-2">
                  <Button 
                    variant="primary" 
                    size="small" 
                    className="w-full"
                    onClick={() => window.location.href = '/pages/123'}
                  >
                    Page 123
                  </Button>
                  <Button 
                    variant="primary" 
                    size="small" 
                    className="w-full"
                    onClick={() => window.location.href = '/pages/12312'}
                  >
                    Special Page
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2">Article Routes</h4>
                <div className="space-y-2">
                  <Button 
                    variant="success" 
                    size="small" 
                    className="w-full"
                    onClick={() => window.location.href = '/articles/featured'}
                  >
                    Featured Article
                  </Button>
                  <Button 
                    variant="warning" 
                    size="small" 
                    className="w-full"
                    onClick={() => window.location.href = '/articles/getting-started'}
                  >
                    Getting Started
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2">Product Routes</h4>
                <div className="space-y-2">
                  <Button 
                    variant="secondary" 
                    size="small" 
                    className="w-full"
                    onClick={() => window.location.href = '/products/demo'}
                  >
                    Demo Product
                  </Button>
                  <Button 
                    variant="error" 
                    size="small" 
                    className="w-full"
                    onClick={() => window.location.href = '/products/advanced'}
                  >
                    Advanced Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardWidget>

        {/* Welcome Modal */}
        <DialogModal 
          isOpen={showWelcomeModal}
          onClose={() => setShowWelcomeModal(false)}
          title="Welcome to SmartDocs Demo!"
          maxWidth="md"
        >
          <div className="space-y-4">
            <p>Thank you for exploring our demo application!</p>
            <p>This app demonstrates:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>React Router for navigation</li>
              <li>Context API for global state</li>
              <li>TypeScript integration</li>
              <li>Component composition</li>
              <li>Responsive design with Tailwind CSS</li>
            </ul>
            <div className="flex justify-end space-x-2">
              <ButtonComponent variant="primary" onClick={() => setShowWelcomeModal(false)}>
                Got it!
              </ButtonComponent>
            </div>
          </div>
        </DialogModal>
      </div>
    </div>
  )
}