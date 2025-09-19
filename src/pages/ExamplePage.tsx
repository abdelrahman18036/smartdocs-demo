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
  const { state, toggleTheme, addNotification } = useAppContext()
  const [showModal, setShowModal] = useState(false)
  
  // Demo hooks
  const [theme] = useAppStorage('theme-preference', 'light')
  const { data: userData, loading, error, execute: fetchUserData } = useApiCall(
    'https://jsonplaceholder.typicode.com/users/1'
  )

  // Form validation demo
  const { values, updateField, touchField, getFieldError, isValid } = useFormValidator(
    { name: '', email: '' },
    {
      name: { required: true, minLength: 2 },
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
    }
  )

  const { name, email } = values

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('name', e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('email', e.target.value)
  }

  const handleNameBlur = () => touchField('name')
  const handleEmailBlur = () => touchField('email')

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Component Examples
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Interactive demonstrations of our component library and custom hooks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Button Examples */}
          <CardWidget 
            title="Button Components" 
            subtitle="Various button styles and states"
            elevation="lg"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Button Variants:</p>
                <div className="flex flex-wrap gap-2">
                  <ButtonComponent variant="primary" size="small">Primary</ButtonComponent>
                  <ButtonComponent variant="secondary" size="small">Secondary</ButtonComponent>
                  <ButtonComponent variant="success" size="small">Success</ButtonComponent>
                  <ButtonComponent variant="warning" size="small">Warning</ButtonComponent>
                  <ButtonComponent variant="error" size="small">Error</ButtonComponent>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Button Sizes:</p>
                <div className="flex flex-wrap gap-2 items-center">
                  <ButtonComponent variant="primary" size="small">Small</ButtonComponent>
                  <ButtonComponent variant="primary" size="medium">Medium</ButtonComponent>
                  <ButtonComponent variant="primary" size="large">Large</ButtonComponent>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Interactive Examples:</p>
                <div className="space-y-2">
                  <ButtonComponent 
                    variant="primary" 
                    fullWidth
                    onClick={() => setShowModal(true)}
                  >
                    Open Modal Dialog
                  </ButtonComponent>
                  <ButtonComponent 
                    variant="success" 
                    fullWidth
                    loading={loading}
                    onClick={() => fetchUserData()}
                  >
                    {loading ? 'Loading...' : 'Fetch User Data'}
                  </ButtonComponent>
                </div>
              </div>
            </div>
          </CardWidget>

          {/* Storage & API Demo */}
          <CardWidget 
            title="Hooks Demonstration" 
            subtitle="Custom hooks for storage, API calls, and theme"
            elevation="lg"
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Local Storage Hook:</p>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                  <p>Stored theme: <strong>{theme}</strong></p>
                  <ButtonComponent variant="primary" onClick={toggleTheme}>
                    Switch to {theme === 'light' ? 'dark' : 'light'} theme
                  </ButtonComponent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {loading ? 'Loading user data...' : userData ? 'User data loaded' : 'No user data'}
                    {error && <span className="text-red-500"> (Error: {error.message})</span>}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Global State:</p>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                  <p>Global theme: <strong>{state.theme}</strong></p>
                  <ButtonComponent variant="primary" onClick={toggleTheme}>
                    Switch to {theme === 'light' ? 'dark' : 'light'} theme
                  </ButtonComponent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {loading ? 'Loading user data...' : userData ? 'User data loaded' : 'No user data'}
                    {error && <span className="text-red-500"> (Error: {error.message})</span>}
                  </p>
                </div>
              </div>
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
              onBlur={handleNameBlur}
              error={getFieldError('name')}
              required
              placeholder="Enter your name"
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              error={getFieldError('email')}
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
                onClick={() => setShowModal(false)}
              >
                Close
              </ButtonComponent>
              <ButtonComponent 
                variant="primary" 
                onClick={() => {
                  addNotification({
                    message: 'Modal action completed!',
                    type: 'success'
                  })
                  setShowModal(false)
                }}
              >
                Confirm
              </ButtonComponent>
            </div>
          </div>
        </DialogModal>
      </div>
    </div>
  )
}