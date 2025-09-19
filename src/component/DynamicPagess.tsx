import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { CardWidget } from '../component/CardWidget'
import { Button } from '../component/Button'
import { ButtonComponent } from '../component/ButtonComponent'
import { Badge } from '../component/Badge'

/**
 * Dynamic Page Component
 * 
 * A dynamic page that displays content based on the ID parameter in the URL.
 * Demonstrates React Router's dynamic routing capabilities.
 */
export function DynamicPagess() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { state, addNotification } = useAppContext()

  // Mock data for different page types
  const pageData = getPageData(id || '')

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleNavigateToId = (newId: string) => {
    navigate(`/pages/${newId}`)
    addNotification({
      message: `Navigated to page ${newId}`,
      type: 'info'
    })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dynamic Page
          </h1>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Badge variant="primary" size="large">ID: {id}</Badge>
            <Badge variant={pageData.type === 'article' ? 'success' : 'info'} size="medium">
              {pageData.type}
            </Badge>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            This page demonstrates dynamic routing with URL parameters. The content changes based on the ID in the URL.
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center space-x-4 mb-12">
          <Button variant="secondary" onClick={handleGoBack}>
            ← Go Back
          </Button>
          <Button variant="primary" onClick={() => handleNavigateToId('12312')}>
            Go to Page 12312
          </Button>
          <Button variant="success" onClick={() => handleNavigateToId('99999')}>
            Go to Page 99999
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Page Content */}
          <div className="lg:col-span-2 space-y-8">
            <CardWidget
              title={pageData.title}
              subtitle={pageData.subtitle}
              elevation="lg"
            >
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">{pageData.content}</p>
                
                {pageData.features && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Features:</h3>
                    <ul className="space-y-2">
                      {pageData.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <ButtonComponent 
                    variant="primary"
                    onClick={() => addNotification({
                      message: `Liked page ${id}!`,
                      type: 'success'
                    })}
                  >
                    👍 Like
                  </ButtonComponent>
                  <ButtonComponent 
                    variant="secondary"
                    onClick={() => addNotification({
                      message: `Shared page ${id}`,
                      type: 'info'
                    })}
                  >
                    📤 Share
                  </ButtonComponent>
                </div>
              </div>
            </CardWidget>

            {/* Dynamic Content Based on ID */}
            {pageData.type === 'article' && (
              <CardWidget
                title="Article Details"
                subtitle="Additional information about this article"
                elevation="md"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Published:</span> {pageData.publishDate}
                    </div>
                    <div>
                      <span className="font-semibold">Author:</span> {pageData.author}
                    </div>
                    <div>
                      <span className="font-semibold">Reading Time:</span> {pageData.readingTime}
                    </div>
                    <div>
                      <span className="font-semibold">Category:</span> {pageData.category}
                    </div>
                  </div>
                </div>
              </CardWidget>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CardWidget
              title="Page Information"
              subtitle="Details about this dynamic page"
              elevation="md"
            >
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold">Current ID:</span> {id}
                </div>
                <div>
                  <span className="font-semibold">Page Type:</span> {pageData.type}
                </div>
                <div>
                  <span className="font-semibold">URL Pattern:</span> /pages/:id
                </div>
                <div>
                  <span className="font-semibold">Theme:</span> {state.theme}
                </div>
              </div>
            </CardWidget>

            <CardWidget
              title="Quick Navigation"
              subtitle="Jump to other pages"
              elevation="md"
            >
              <div className="space-y-2">
                {['123', '456', '789', '12312', '99999'].map((pageId) => (
                  <Button
                    key={pageId}
                    variant={id === pageId ? 'primary' : 'secondary'}
                    size="small"
                    className="w-full justify-start"
                    onClick={() => handleNavigateToId(pageId)}
                  >
                    Page {pageId} {id === pageId && '(Current)'}
                  </Button>
                ))}
              </div>
            </CardWidget>

            <CardWidget
              title="URL Examples"
              subtitle="Try these dynamic routes"
              elevation="md"
            >
              <div className="space-y-2 text-xs">
                <div className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  /pages/12312
                </div>
                <div className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  /pages/article-001
                </div>
                <div className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  /pages/product-123
                </div>
              </div>
            </CardWidget>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Get mock data based on the page ID
 */
function getPageData(id: string) {
  // Default data
  const defaultData = {
    title: `Dynamic Page ${id}`,
    subtitle: 'This is a dynamically generated page',
    content: `Welcome to page ${id}! This content is generated based on the URL parameter. You can navigate to different pages by changing the ID in the URL.`,
    type: 'page' as const,
    features: [
      'Dynamic content based on URL parameters',
      'React Router integration',
      'Context state management',
      'Responsive design'
    ]
  }

  // Special cases based on ID
  if (id === '12312') {
    return {
      ...defaultData,
      title: 'Special Page 12312',
      subtitle: 'A featured page with special content',
      content: 'This is the special page 12312 that you requested! It has unique content and features that make it stand out from other pages.',
      type: 'article' as const,
      features: [
        'Featured article content',
        'Enhanced UI components',
        'Special navigation features',
        'Premium styling'
      ],
      publishDate: 'September 19, 2025',
      author: 'SmartDocs Team',
      readingTime: '5 min read',
      category: 'Featured'
    }
  }

  if (id === '99999') {
    return {
      ...defaultData,
      title: 'Advanced Page 99999',
      subtitle: 'Advanced features and functionality',
      content: 'Page 99999 showcases advanced features of our dynamic routing system. It includes complex state management and advanced UI patterns.',
      type: 'product' as const,
      features: [
        'Advanced routing patterns',
        'Complex state management',
        'Premium UI components',
        'Analytics integration'
      ]
    }
  }

  if (id?.startsWith('article-')) {
    return {
      ...defaultData,
      title: `Article ${id.replace('article-', '')}`,
      subtitle: 'Informative article content',
      content: `This is article ${id.replace('article-', '')}. Articles provide in-depth information about various topics and are perfect for educational content.`,
      type: 'article' as const,
      publishDate: 'September 19, 2025',
      author: 'Content Team',
      readingTime: '8 min read',
      category: 'Articles'
    }
  }

  return defaultData
}