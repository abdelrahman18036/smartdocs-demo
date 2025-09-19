import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { ButtonComponent } from '../component/ButtonComponent'
import { CardWidget } from '../component/CardWidget'
import { Button } from '../component/Button'
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
                <li>🔘 Button Components</li>
                <li>📝 Input Fields</li>
                <li>🎴 Card Widgets</li>
                <li>🗨️ Modal Dialogs</li>
                <li>🏷️ Badges</li>
              </ul>
              <Button variant="primary" size="small" className="w-full">
                View Components
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
                Powerful state management with React Context:
              </p>
              <div className="space-y-2 text-sm">
                <div>Theme: <span className="font-semibold">{state.theme}</span></div>
                <div>User: <span className="font-semibold">
                  {state.user ? state.user.name : 'Not logged in'}
                </span></div>
                <div>Loading: <span className="font-semibold">
                  {state.loading ? 'Yes' : 'No'}
                </span></div>
              </div>
              {!state.user && (
                <Button variant="success" size="small" onClick={handleLogin} className="w-full">
                  Demo Login
                </Button>
              )}
            </div>
          </CardWidget>

          <CardWidget
            title="TypeScript Ready"
            subtitle="Fully typed components"
            elevation="lg"
            hoverable
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Built with TypeScript for better developer experience:
              </p>
              <ul className="text-sm space-y-2">
                <li>✅ Type-safe props</li>
                <li>✅ IntelliSense support</li>
                <li>✅ Compile-time checks</li>
                <li>✅ Auto-documentation</li>
              </ul>
              <Button variant="warning" size="small" className="w-full">
                See Types
              </Button>
            </div>
          </CardWidget>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <div className="text-3xl font-bold text-blue-600">{userCount}+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Active Users</div>
            <Button variant="primary" size="small" onClick={incrementUsers} className="mt-2">
              +1 User
            </Button>
          </div>
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <div className="text-3xl font-bold text-green-600">15+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Components</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <div className="text-3xl font-bold text-purple-600">8+</div>
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
                <h4 className="font-semibold mb-2">Page Routes</h4>
                <div className="space-y-2">
                  <Button 
                    variant="primary" 
                    size="small" 
                    className="w-full"
                    onClick={() => window.location.href = '/pages/12312'}
                  >
                    Page 12312
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="small" 
                    className="w-full"
                    onClick={() => window.location.href = '/pages/99999'}
                  >
                    Page 99999
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
                    variant="danger" 
                    size="small" 
                    className="w-full"
                    onClick={() => window.location.href = '/products/premium'}
                  >
                    Premium Product
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p><strong>URL Pattern Examples:</strong></p>
              <div className="font-mono text-xs mt-2 space-y-1">
                <div>/pages/:id → /pages/12312</div>
                <div>/articles/:id → /articles/featured</div>
                <div>/products/:id → /products/demo</div>
              </div>
            </div>
          </div>
        </CardWidget>

        {/* Call to Action */}
        <CardWidget
          title="Ready to Explore?"
          subtitle="Navigate through our demo pages to see more features"
          elevation="lg"
          className="text-center"
        >
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Check out our About page to learn more about the technology stack, 
              or visit the Contact page to see our form validation in action.
            </p>
            <div className="space-x-4">
              <ButtonComponent variant="primary" onClick={() => window.location.href = '/about'}>
                Learn More
              </ButtonComponent>
              <ButtonComponent variant="secondary" onClick={() => window.location.href = '/contact'}>
                Get in Touch
              </ButtonComponent>
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