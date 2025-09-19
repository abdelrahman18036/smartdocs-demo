import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { CardWidget } from '../component/CardWidget'
import { InputField } from '../component/InputField'
import { Button } from '../component/Button'
import { ButtonComponent } from '../component/ButtonComponent'
import { useFormValidator } from '../utils/useFormValidator'

/**
 * Contact Page Component
 * 
 * A contact form page demonstrating form validation, input handling,
 * and integration with the global context for notifications and theme.
 */
export function ContactPage() {
  const { state, addNotification } = useAppContext()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    newsletter: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form validation rules
  const { validateField, errors, isValid, validateAll } = useFormValidator({
    name: (value: string) => {
      if (!value.trim()) return 'Name is required'
      if (value.length < 2) return 'Name must be at least 2 characters'
      return null
    },
    email: (value: string) => {
      if (!value.trim()) return 'Email is required'
      if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address'
      return null
    },
    company: (value: string) => {
      if (value && value.length < 2) return 'Company name must be at least 2 characters'
      return null
    },
    subject: (value: string) => {
      if (!value.trim()) return 'Subject is required'
      if (value.length < 5) return 'Subject must be at least 5 characters'
      return null
    },
    message: (value: string) => {
      if (!value.trim()) return 'Message is required'
      if (value.length < 10) return 'Message must be at least 10 characters'
      if (value.length > 1000) return 'Message must be less than 1000 characters'
      return null
    }
  })

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (typeof value === 'string' && field !== 'newsletter') {
      validateField(field as keyof typeof errors, value)
    }
  }

  const handleSubmitClick = async () => {
    setIsSubmitting(true)

    // Validate all fields
    const allValid = validateAll(formData)
    
    if (!allValid) {
      addNotification({
        message: 'Please fix the errors in the form',
        type: 'error'
      })
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      addNotification({
        message: 'Thank you! Your message has been sent successfully.',
        type: 'success'
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        newsletter: false
      })
    } catch (error) {
      addNotification({
        message: 'Failed to send message. Please try again.',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSubmitClick()
  }

  const handleClearForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      newsletter: false
    })
    addNotification({
      message: 'Form cleared',
      type: 'info'
    })
  }

  const contactInfo = [
    {
      title: 'Email',
      value: 'hello@smartdocs.dev',
      icon: '✉️'
    },
    {
      title: 'Phone',
      value: '+1 (555) 123-4567',
      icon: '📞'
    },
    {
      title: 'Address',
      value: '123 Tech Street, Innovation City, TC 12345',
      icon: '📍'
    },
    {
      title: 'Hours',
      value: 'Mon-Fri 9AM-6PM PST',
      icon: '🕒'
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions about SmartDocs Demo? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <CardWidget
              title="Send us a Message"
              subtitle="Fill out the form below and we'll get back to you"
              elevation="lg"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Full Name"
                    value={formData.name}
                    onChange={(value) => handleInputChange('name', value)}
                    required
                    placeholder="John Doe"
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    required
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Company"
                    value={formData.company}
                    onChange={(value) => handleInputChange('company', value)}
                    placeholder="Acme Corp (optional)"
                  />
                  <InputField
                    label="Subject"
                    value={formData.subject}
                    onChange={(value) => handleInputChange('subject', value)}
                    required
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.message 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.message.length}/1000 characters
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={formData.newsletter}
                    onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-700 dark:text-gray-300">
                    Subscribe to our newsletter for updates
                  </label>
                </div>

                <div className="flex space-x-4">
                  <ButtonComponent
                    variant="primary"
                    disabled={isSubmitting || !isValid}
                    className="flex-1"
                    onClick={handleSubmitClick}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </ButtonComponent>
                  <Button
                    variant="secondary"
                    onClick={handleClearForm}
                    disabled={isSubmitting}
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </CardWidget>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <CardWidget
              title="Contact Information"
              subtitle="Other ways to reach us"
              elevation="lg"
            >
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardWidget>

            <CardWidget
              title="FAQ"
              subtitle="Quick answers"
              elevation="lg"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    How quickly do you respond?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Is this a real contact form?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This is a demo form that showcases validation and UI components.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What about privacy?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We respect your privacy and never share your information.
                  </p>
                </div>
              </div>
            </CardWidget>

            <div className="text-center">
              <Button
                variant="success"
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}