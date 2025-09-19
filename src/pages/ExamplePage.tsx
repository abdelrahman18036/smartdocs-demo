import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { ButtonComponent } from '../component/ButtonComponent'
import { DialogModal } from '../component/DialogModal'
import { CardWidget } from '../component/CardWidget'
import { InputField } from '../component/InputField'
import { Button } from '../component/Button'
import { useAppStorage } from '../utils/useAppStorage'
import { useApiCall } from '../services/useApiCall'
import { useFormValidator } from '../utils/useFormValidator'

/**
 * Example Page Component
 * 
 * This page contains the original demo content showcasing various UI components,
 * hooks functionality, and form validation examples.
 */
export function ExamplePage() {
  const { state, addNotification } = useAppContext()
  const [showModal, setShowModal] = useState(false)
  const [theme, setTheme] = useAppStorage('app-theme', 'light')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  
  // Demonstrate useApiCall hook
  const { data: userData, loading, error } = useApiCall('/api/user-profile')
  
  // Demonstrate useFormValidator hook
  const { validateField, isValid } = useFormValidator({
    email: (value: string) => /\S+@\S+\.\S+/.test(value) ? null : 'Invalid email',
    name: (value: string) => value.length >= 2 ? null : 'Name too short'
  })

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    addNotification({
      message: `Switched to ${theme === 'light' ? 'dark' : 'light'} theme`,
      type: 'info'
    })
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    validateField('email', value)
  }

  const handleNameChange = (value: string) => {
    setName(value)
    validateField('name', value)
  }

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'
    }`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Component Examples
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Testing React components, hooks, and TypeScript documentation generation
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
            <Button variant="secondary" onClick={toggleTheme}>
              Toggle Theme
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardWidget 
            title="Button Examples" 
            subtitle="Different button variants and sizes"
            elevation="lg"
            hoverable
          >
            <div className="space-y-4">
              <div className="space-x-2">
                <Button variant="primary" size="small" className='small-button'>Small</Button>
                <Button variant="secondary" size="medium">Medium</Button>
                <Button variant="success" size="large">Large</Button>
              </div>
              <div className="space-x-2">
                <ButtonComponent variant="danger" onClick={() => setShowModal(true)}>
                  Open Modal
                </ButtonComponent>
                <ButtonComponent variant="primary" disabled>
                  Disabled
                </ButtonComponent>
              </div>
            </div>
          </CardWidget>

          <CardWidget 
            title="Theme Settings" 
            subtitle="Using useAppStorage hook"
            elevation="lg"
            hoverable
          >
            <div className="space-y-4">
              <p>Current theme: <strong>{theme}</strong></p>
              <p>Global theme: <strong>{state.theme}</strong></p>
              <ButtonComponent variant="primary" onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'dark' : 'light'} theme
              </ButtonComponent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {loading ? 'Loading user data...' : userData ? 'User data loaded' : 'No user data'}
                {error && <span className="text-red-500"> (Error: {error.message})</span>}
              </p>
            </div>
          </CardWidget>
        </div>

        <CardWidget 
          title="Form Validation Demo" 
          subtitle="Using useFormValidator hook"
          elevation="lg"
        >
          <div className="space-y-4">
            <InputField
              label="Name"
              value={name}
              onChange={handleNameChange}
              required
              placeholder="Enter your name"
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Enter your email"
            />
            <Button 
              variant="warning" 
              className='bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500'
              onClick={() => addNotification({
                message: 'This is a test notification!',
                type: 'warning'
              })}
            >
              Test Notification
            </Button>

            <p className="text-sm">
              Form is {isValid ? '✅ valid' : '❌ invalid'}
            </p>
          </div>
        </CardWidget>

        <CardWidget 
          title="Documentation Features" 
          subtitle="What SmartDocs will extract from this app"
          footer={
            <ButtonComponent 
              variant="success" 
              onClick={() => addNotification({
                message: 'Documentation generated! (Demo only)',
                type: 'success'
              })}
            >
              Generate Docs
            </ButtonComponent>
          }
        >
          <ul className="space-y-2 text-sm">
            <li>✅ <strong>Components:</strong> ButtonComponent, DialogModal, CardWidget, InputField with full prop documentation</li>
            <li>✅ <strong>Hooks:</strong> useAppStorage, useApiCall, useFormValidator with JSDoc examples</li>
            <li>✅ <strong>TypeScript:</strong> Complete interface definitions and types</li>
            <li>✅ <strong>Examples:</strong> Real usage patterns from this App component</li>
            <li>✅ <strong>Context:</strong> Global state management with React Context</li>
            <li>✅ <strong>Routing:</strong> Client-side navigation with React Router</li>
          </ul>
        </CardWidget>

        <DialogModal 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Demo Modal"
          maxWidth="md"
        >
          <div className="space-y-4">
            <p>This is a dialog modal component that was opened by clicking the button.</p>
            <p>It demonstrates:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Backdrop click to close</li>
              <li>Custom title and content</li>
              <li>Responsive sizing</li>
              <li>Proper accessibility</li>
              <li>Integration with global context</li>
            </ul>
            <div className="flex justify-end space-x-2">
              <ButtonComponent 
                variant="secondary" 
                onClick={() => {
                  setShowModal(false)
                  addNotification({ message: 'Modal closed', type: 'info' })
                }}
              >
                Cancel
              </ButtonComponent>
              <ButtonComponent 
                variant="primary" 
                onClick={() => {
                  setShowModal(false)
                  addNotification({ message: 'Modal confirmed!', type: 'success' })
                }}
              >
                OK
              </ButtonComponent>
            </div>
          </div>
        </DialogModal>
      </div>
    </div>
  )
}
