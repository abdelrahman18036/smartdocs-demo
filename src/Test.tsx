import { useAppContext } from './context/AppContext'
import { CardWidget } from './component/CardWidget'
import { Button } from './component/Button'
import { ButtonComponent } from './component/ButtonComponent'
import { Badge } from './component/Badge'

/**
 * About Page Component
 * 
 * Displays information about the SmartDocs Demo application,
 * technology stack, features, and team information.
 */
export function TestPage() {
  const { state, addNotification } = useAppContext()

  const techStack = [
    { name: 'React', version: '18.x', category: 'Frontend' },
    { name: 'TypeScript', version: '5.x', category: 'Language' },
    { name: 'Vite', version: '5.x', category: 'Build Tool' },
    { name: 'Tailwind CSS', version: '3.x', category: 'Styling' },
    { name: 'React Router', version: '6.x', category: 'Routing' },
    { name: 'ESLint', version: '9.x', category: 'Linting' }
  ]

  const features = [
    {
      title: 'Component Library',
      description: 'Reusable, well-documented React components with TypeScript support',
      icon: '🧩'
    },
    {
      title: 'State Management',
      description: 'Global state management using React Context API and useReducer',
      icon: '🗂️'
    },
    {
      title: 'Routing',
      description: 'Client-side routing with React Router for seamless navigation',
      icon: '🛣️'
    },
    {
      title: 'Form Handling',
      description: 'Custom hooks for form validation and input management',
      icon: '📝'
    },
    {
      title: 'API Integration',
      description: 'Custom hooks for API calls with loading and error states',
      icon: '🔌'
    },
    {
      title: 'Theme Support',
      description: 'Light and dark theme switching with persistent storage',
      icon: '🎨'
    }
  ]

  const teamMembers = [
    {
      name: 'Alice Johnson',
      role: 'Frontend Developer',
      avatar: '👩‍💻',
      skills: ['React', 'TypeScript', 'UI/UX']
    },
    {
      name: 'Bob Smith',
      role: 'Full Stack Developer',
      avatar: '👨‍💻',
      skills: ['Node.js', 'React', 'Database']
    },
    {
      name: 'Carol Davis',
      role: 'UI/UX Designer',
      avatar: '👩‍🎨',
      skills: ['Design', 'Figma', 'Prototyping']
    }
  ]

  const handleLearnMore = (topic: string) => {
    addNotification({
      message: `More info about ${topic} coming soon!`,
      type: 'info'
    })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About SmartDocs Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive React application built to demonstrate modern web development 
            practices, component architecture, and documentation generation capabilities.
          </p>
        </div>

        {/* Mission Statement */}
        <CardWidget
          title="Our Mission"
          subtitle="Building better developer experiences"
          elevation="lg"
          className="mb-12 text-center"
        >
          <div className="space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              SmartDocs Demo showcases how modern React applications can be built with 
              clean architecture, comprehensive TypeScript typing, and automatic documentation generation.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Our goal is to provide developers with a reference implementation that follows 
              best practices for component design, state management, and code organization.
            </p>
          </div>
        </CardWidget>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <CardWidget
                key={index}
                title={tech.name}
                subtitle={`Version ${tech.version}`}
                elevation="md"
                hoverable
              >
                <div className="space-y-3">
                  <Badge variant="primary" size="small">
                    {tech.category}
                  </Badge>
                  <Button 
                    variant="secondary" 
                    size="small" 
                    className="w-full"
                    onClick={() => handleLearnMore(tech.name)}
                  >
                    Learn More
                  </Button>
                </div>
              </CardWidget>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <CardWidget
                key={index}
                title={feature.title}
                subtitle={feature.description}
                elevation="md"
                hoverable
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <Button 
                    variant="primary" 
                    size="small"
                    onClick={() => handleLearnMore(feature.title)}
                  >
                    Explore
                  </Button>
                </div>
              </CardWidget>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <CardWidget
                key={index}
                title={member.name}
                subtitle={member.role}
                elevation="lg"
                hoverable
                className="text-center"
              >
                <div className="space-y-4">
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <div className="space-y-2">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" size="small" className="mr-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <ButtonComponent variant="primary" size="small" className="w-full">
                    View Profile
                  </ButtonComponent>
                </div>
              </CardWidget>
            ))}
          </div>
        </div>

        {/* Stats */}
        <CardWidget
          title="Project Statistics"
          subtitle="By the numbers"
          elevation="lg"
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">15+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Components</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">8+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Custom Hooks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">TypeScript</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Test Coverage</div>
            </div>
          </div>
        </CardWidget>

        {/* Call to Action */}
        <CardWidget
          title="Get Involved"
          subtitle="Join our community"
          elevation="lg"
          className="text-center"
        >
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300">
              Interested in contributing or learning more? We'd love to hear from you!
            </p>
            <div className="space-x-4">
              <ButtonComponent 
                variant="primary" 
                onClick={() => window.location.href = '/contact'}
              >
                Contact Us
              </ButtonComponent>
              <ButtonComponent 
                variant="secondary"
                onClick={() => addNotification({ message: 'GitHub repository opening...', type: 'info' })}
              >
                View on GitHub
              </ButtonComponent>
              <Button 
                variant="success"
                onClick={() => window.location.href = '/'}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </CardWidget>
      </div>
    </div>
  )
}