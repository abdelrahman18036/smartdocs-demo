import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'
import { CardWidget } from '../component/CardWidget'
import { Button } from '../component/Button'

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
      subtitle: 'Article content with rich formatting',
      content: `This is article ${id}. Articles have enhanced formatting and structure for better readability.`,
      type: 'article' as const
    }
  }

  if (id?.startsWith('product-')) {
    return {
      ...defaultData,
      title: `Product ${id.replace('product-', '')}`,
      subtitle: 'Product showcase page',
      content: `Welcome to product ${id}. This page demonstrates product information display patterns.`,
      type: 'product' as const
    }
  }

  return defaultData
}

/**
 * Dynamic Page Component
 * 
 * A dynamic page that displays content based on the ID parameter in the URL.
 * Demonstrates React Router's dynamic routing capabilities.
 */
export function DynamicPagess() {
  const { id } = useParams<{ id: string }>()
  const { state, addNotification } = useAppContext()
  
  const pageData = getPageData(id || 'default')

  const handleAction = (action: string) => {
    addNotification({
      message: `${action} action triggered for page ${id}`,
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {pageData.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {pageData.subtitle}
          </p>
          
          {/* Article metadata */}
          {pageData.type === 'article' && 'publishDate' in pageData && (
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>📅 {pageData.publishDate}</span>
              <span>✍️ {pageData.author}</span>
              <span>⏱️ {pageData.readingTime}</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                {pageData.category}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <CardWidget
              title="Page Content"
              subtitle={`Dynamic content for page ID: ${id}`}
              elevation="lg"
            >
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {pageData.content}
                </p>
                
                {pageData.type === 'article' && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      Article Features
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      This article includes enhanced formatting, metadata, and special styling 
                      to provide a rich reading experience.
                    </p>
                  </div>
                )}

                {pageData.type === 'product' && (
                  <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      Product Information
                    </h4>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Product pages showcase items with detailed information, pricing, 
                      and purchase options.
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="primary" 
                    onClick={() => handleAction('Like')}
                  >
                    👍 Like
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => handleAction('Share')}
                  >
                    📤 Share
                  </Button>
                  <Button 
                    variant="success" 
                    onClick={() => handleAction('Bookmark')}
                  >
                    🔖 Bookmark
                  </Button>
                </div>
              </div>
            </CardWidget>

            <CardWidget
              title="Page Features"
              subtitle="What this page demonstrates"
              elevation="md"
            >
              <ul className="space-y-2">
                {pageData.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardWidget>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CardWidget
              title="Page Information"
              subtitle="Technical details"
              elevation="md"
            >
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold">Page ID:</span> {id}
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
                    onClick={() => window.location.href = `/pages/${pageId}`}
                  >
                    Page {pageId}
                    {pageId === '12312' && ' (Special)'}
                    {pageId === '99999' && ' (Advanced)'}
                  </Button>
                ))}
              </div>
            </CardWidget>

            <CardWidget
              title="Navigation Examples"
              subtitle="Try different route patterns"
              elevation="md"
            >
              <div className="space-y-2">
                <Button
                  variant="success"
                  size="small"
                  className="w-full"
                  onClick={() => window.location.href = '/articles/featured'}
                >
                  📰 Featured Article
                </Button>
                <Button
                  variant="warning"
                  size="small"
                  className="w-full"
                  onClick={() => window.location.href = '/products/demo'}
                >
                  📦 Demo Product
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  className="w-full"
                  onClick={() => window.location.href = '/'}
                >
                  🏠 Back to Home
                </Button>
              </div>
            </CardWidget>
          </div>
        </div>
      </div>
    </div>
  )
}