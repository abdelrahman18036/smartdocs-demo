import { useAppContext } from '../context/AppContext'
import { CardWidget } from '../component/CardWidget'
import { Button } from '../component/Button'

/**
 * About Page Component
 * 
 * Displays information about the SmartDocs Demo application,
 * technology stack, features, and team information.
 */
export function AboutPage() {
  const { state, addNotification } = useAppContext()

  const techStack = [
    {
      name: 'React 18',
      description: 'Modern React with hooks and concurrent features',
      icon: '⚛️'
    },
    {
      name: 'TypeScript',
      description: 'Type-safe JavaScript development',
      icon: '🔷'
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework',
      icon: '🎨'
    },
    {
      name: 'Vite',
      description: 'Fast build tool and development server',
      icon: '⚡'
    },
    {
      name: 'React Router',
      description: 'Client-side routing and navigation',
      icon: '🧭'
    },
    {
      name: 'Context API',
      description: 'Built-in state management',
      icon: '🌐'
    }
  ]

  const features = [
    {
      title: 'Component Documentation',
      description: 'Comprehensive documentation for all UI components with examples and prop definitions.',
      icon: '📚'
    },
    {
      title: 'TypeScript Integration',
      description: 'Full TypeScript support with strict typing and excellent developer experience.',
      icon: '🔧'
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first responsive design that works on all screen sizes.',
      icon: '📱'
    },
    {
      title: 'Theme Support',
      description: 'Built-in light and dark theme switching with proper accessibility.',
      icon: '🌙'
    },
    {
      title: 'Form Validation',
      description: 'Custom hooks for form validation with real-time feedback.',
      icon: '✅'
    },
    {
      title: 'State Management',
      description: 'Centralized state management using React Context and useReducer.',
      icon: '🗂️'
    }
  ]

  const team = [
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
                subtitle={tech.description}
                elevation="md"
                hoverable
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <Button 
                    variant="secondary" 
                    size="small"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <CardWidget
                key={index}
                title={feature.title}
                subtitle={feature.description}
                elevation="md"
                hoverable
              >
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{feature.icon}</div>
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

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <CardWidget
                key={index}
                title={member.name}
                subtitle={member.role}
                elevation="md"
                hoverable
                className="text-center"
              >
                <div className="space-y-4">
                  <div className="text-6xl">{member.avatar}</div>
                  <div>
                    <h4 className="font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardWidget>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <CardWidget
          title="Ready to Get Started?"
          subtitle="Explore our component library and see the code in action"
          elevation="lg"
          className="text-center"
        >
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300">
              Check out our examples page to see all components in action, or visit our 
              GitHub repository to explore the source code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="large"
                onClick={() => window.location.href = '/examples'}
              >
                View Examples
              </Button>
              <Button 
                variant="secondary" 
                size="large"
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