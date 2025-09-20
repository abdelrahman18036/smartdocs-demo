import { GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Pagination, { usePagination } from '../../components/Pagination'
import { TypeOverrideControl } from '../../components/TypeOverrideControl'

// Helper function to extract components used in a page
function extractUsedComponents(pageContent: string, allComponents: any[]) {
  if (!pageContent) {
    return []
  }
  

  
  const usedComponents: Array<{name: string, type: string, count: number, firstUsage: string}> = []
  const componentMap = new Map()
  
  // Create a map of all available components by display name
  allComponents.forEach(comp => {
    if (comp.displayName) {
      componentMap.set(comp.displayName, comp)
    }
  })
  

  // Enhanced patterns for better detection
  const importPattern = /import\s*(?:\*\s+as\s+\w+|(?:\{[^}]*\}|\w+)(?:\s*,\s*(?:\{[^}]*\}|\w+))*)\s*from\s*['"`][^'"`]*['"`]/gm
  const jsxPattern = /<([A-Z][a-zA-Z0-9]*(?:\.[A-Z][a-zA-Z0-9]*)*)/g
  const hookPattern = /(?:const|let|var)\s*(?:\[?[^=]*\]?\s*=\s*)?(use[A-Z][a-zA-Z0-9]*)\s*\(/g
  const directHookPattern = /\b(use[A-Z][a-zA-Z0-9]*)\s*\(/g
  
  // Find imported components and hooks (for reference, but don't count them)
  const imports = Array.from(pageContent.matchAll(importPattern))
  const importedNames = new Set<string>()
  
  
  imports.forEach(match => {
    const importText = match[0]
    
    // Extract all possible names from import (default, named, destructured)
    const nameMatches = importText.match(/\b[A-Z][a-zA-Z0-9]*\b/g) || []
    const hookMatches = importText.match(/\buse[A-Z][a-zA-Z0-9]*\b/g) || []
    
    const allNames = [...nameMatches, ...hookMatches]
    
    if (allNames.length > 0) {
      allNames.forEach(name => {
        if (componentMap.has(name)) {
          importedNames.add(name) // Track imported names but don't count them yet
          const comp = componentMap.get(name)
          if (!usedComponents.find(u => u.name === name)) {
            usedComponents.push({
              name,
              type: comp.type || 'component',
              count: 0, // Start with 0 for imports
              firstUsage: importText
            })
          }
        }
      })
    }
  })
  
  // Find JSX usage with enhanced context (count actual usage)
  const jsxMatches = Array.from(pageContent.matchAll(jsxPattern))
  
  jsxMatches.forEach(match => {
    const componentName = match[1]
    
    if (componentMap.has(componentName)) {
      // Get surrounding context for better usage example
      const matchIndex = match.index || 0
      const contextStart = Math.max(0, matchIndex - 20)
      const contextEnd = Math.min(pageContent.length, matchIndex + 50)
      const contextUsage = pageContent.slice(contextStart, contextEnd).trim()
      
      const existing = usedComponents.find(u => u.name === componentName)
      if (existing) {
        existing.count++ // Count actual usage
        // Update with better usage example if this one is more complete
        if (contextUsage.includes('>') && contextUsage.length > existing.firstUsage.length) {
          existing.firstUsage = contextUsage
        }
      } else {
        const comp = componentMap.get(componentName)
        usedComponents.push({
          name: componentName,
          type: comp.type || 'component',
          count: 1, // First actual usage
          firstUsage: contextUsage
        })
        console.log('✅ Added from JSX:', componentName, comp.type)
      }
    }
  })
  
  // Find hook usage with both patterns (count actual usage only)
  const hookMatches = Array.from(pageContent.matchAll(hookPattern))
  const directHookMatches = Array.from(pageContent.matchAll(directHookPattern))
  
  
  // Process structured hook usage (with variable assignment)
  hookMatches.forEach(match => {
    const hookName = match[1]
    if (hookName && componentMap.has(hookName)) {
      const matchIndex = match.index || 0
      const contextStart = Math.max(0, matchIndex - 10)
      const contextEnd = Math.min(pageContent.length, matchIndex + 40)
      const contextUsage = pageContent.slice(contextStart, contextEnd).trim()
      
      const existing = usedComponents.find(u => u.name === hookName)
      if (existing) {
        existing.count++ // Count actual usage
        if (contextUsage.length > existing.firstUsage.length) {
          existing.firstUsage = contextUsage // Better usage example
        }
      } else {
        const comp = componentMap.get(hookName)
        usedComponents.push({
          name: hookName,
          type: comp.type || 'hook',
          count: 1, // First actual usage
          firstUsage: contextUsage
        })
        console.log('✅ Added hook:', hookName, comp.type)
      }
    }
  })
  
  // Process direct hook calls
  directHookMatches.forEach(match => {
    const hookName = match[1]
    if (hookName && componentMap.has(hookName)) {
      const matchIndex = match.index || 0
      const contextStart = Math.max(0, matchIndex - 10)
      const contextEnd = Math.min(pageContent.length, matchIndex + 30)
      const contextUsage = pageContent.slice(contextStart, contextEnd).trim()
      
      const existing = usedComponents.find(u => u.name === hookName)
      if (existing) {
        existing.count++ // Count additional usage
      } else {
        const comp = componentMap.get(hookName)
        usedComponents.push({
          name: hookName,
          type: comp.type || 'hook',
          count: 1, // First actual usage
          firstUsage: contextUsage
        })
        console.log('✅ Added direct hook:', hookName, comp.type)
      }
    }
  })
  
  // Filter out components with 0 usage (only imported but never used)
  const actuallyUsedComponents = usedComponents.filter(u => u.count > 0)
  
  return actuallyUsedComponents
}

interface PagePageProps {
  component: any
  usedComponents: Array<{name: string, type: string, count: number, firstUsage: string}>
}

export default function PagePage({ component, usedComponents }: PagePageProps) {
  if (!component) {
    return <div>Page not found</div>
  }
  
  // Helper function to get component type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'component': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700'
      case 'hook': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700'
      case 'page': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700'
      case 'api': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700'
      case 'service': return 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900 dark:text-teal-200 dark:border-teal-700'
      case 'util': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700'
      default: return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700'
    }
  }
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'component': return '🧩'
      case 'hook': return '⚡'
      case 'page': return '📄'
      case 'api': return '🔌'
      case 'service': return '⚙️'
      case 'util': return '🛠️'
      default: return '📦'
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{component.displayName}</h1>
        <p className="text-lg text-muted-foreground">
          {component.description || 'No description available'}
        </p>
        
        {/* Page Information */}
        <div className="flex gap-4 flex-wrap items-center">
          <TypeOverrideControl
            componentName={component.displayName}
            filePath={component.filePath}
            currentType={component.type || 'page'}
          />
          {component.props && component.props.length > 0 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {component.props.length} prop{component.props.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Components Used by This Page - Modern Design */}
      {usedComponents && usedComponents.length > 0 && (
        <div className="space-y-8">
          {/* Section Header */}
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold flex items-center gap-3">
              <span className="text-2xl">🧩</span>
              Components & Hooks Used
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                {usedComponents.length} item{usedComponents.length !== 1 ? 's' : ''}
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              These are all the components, hooks, and utilities that this page imports and uses, displayed in the order they appear in your code with their actual usage count.
            </p>
          </div>
          
          {/* Modern Component Cards Grid */}
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {usedComponents.map((usedComp, index) => {
              const colors = getTypeColor(usedComp.type)
              const icon = getTypeIcon(usedComp.type)
              
              return (
                <Link
                  key={index}
                  href={`/${usedComp.type}s/${usedComp.name.toLowerCase()}`}
                  className="group block"
                >
                  <div className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${colors}`}>
                    {/* Order Badge */}
                    <div className="absolute -top-3 -left-3 bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {icon}
                        </span>
                        <div>
                          <h3 className="font-semibold text-xl text-slate-800 dark:text-white">
                            {usedComp.name}
                          </h3>
                          <span className="inline-block text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-full bg-white/50 dark:bg-black/20 text-slate-600 dark:text-slate-400">
                            {usedComp.type}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-white/30 dark:bg-black/20 rounded-lg px-3 py-1 text-slate-800 dark:text-white">
                          {usedComp.count}×
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          used
                        </div>
                      </div>
                    </div>
                    
                    {/* Usage Example */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                        <span>💻</span> Usage Example
                      </h4>
                      <div className="bg-slate-800 dark:bg-slate-950 p-4 rounded-lg border border-slate-700">
                        <code className="block text-green-400 font-mono text-sm leading-relaxed overflow-x-auto">
                          {usedComp.firstUsage || `<${usedComp.name} />`}
                        </code>
                      </div>
                    </div>
                    
                    {/* View Documentation Link */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span>🔍</span>
                        Click to view documentation
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Summary Footer */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {usedComponents.filter(c => c.type === 'component').length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Components</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {usedComponents.filter(c => c.type === 'hook').length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Hooks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {usedComponents.filter(c => ['service', 'util', 'api'].includes(c.type)).length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Utils/Services</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {usedComponents.reduce((sum, c) => sum + c.count, 0)}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Usage</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Props Table */}
      {component.props && component.props.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Props</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 dark:border-slate-600 rounded-lg">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800">
                  <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Name</th>
                  <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Type</th>
                  <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Required</th>
                  <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Default</th>
                  <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop: any, index: number) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {prop.name}
                    </td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono text-sm text-slate-600 dark:text-slate-400">
                      {prop.type}
                    </td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        prop.required 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {prop.required ? 'Required' : 'Optional'}
                      </span>
                    </td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono text-sm text-slate-600 dark:text-slate-400">
                      {prop.defaultValue ? (
                        <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">
                          {prop.defaultValue}
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">-</span>
                      )}
                    </td>
                    <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-slate-600 dark:text-slate-400">
                      {prop.description || 'No description'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* JSDoc Examples */}
      {component.jsdoc?.examples && component.jsdoc.examples.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">JSDoc Examples</h2>
          {component.jsdoc.examples.map((example: string, index: number) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">Example {index + 1}</h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border">
                  <code className="language-tsx">{example}</code>
                </pre>
                <div className="absolute top-2 right-2">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                    Page
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Real Usage Examples - Enhanced Design */}
      {component.realUsageExamples && component.realUsageExamples.length > 0 && (() => {
        const {
          currentPage,
          setCurrentPage,
          itemsPerPage,
          setItemsPerPage,
          totalPages,
          currentItems,
          totalItems
        } = usePagination(component.realUsageExamples as string[], 3);

        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                Page Usage in Your Codebase 
                <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-sm font-medium px-2 py-1 rounded">
                  {totalItems} usage(s) found
                </span>
              </h2>
              
              {totalPages > 1 && (
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
                </div>
              )}
            </div>
            
            {(currentItems as string[]).map((example, index) => {
              const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
              
              return (
                <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-6 shadow-sm">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        Usage {actualIndex}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                          Page Component
                        </span>
                      </div>
                    </div>
                    
                    {/* Code Example */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Code:</h4>
                      <div className="relative">
                        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border">
                          <code className="language-tsx">{example}</code>
                        </pre>
                        <div className="absolute top-2 right-2">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                            Real Code
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Page Pattern Info */}
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                      <div className="text-sm text-purple-800 dark:text-purple-200">
                        <strong>📄 Pattern:</strong> This example shows how the <code className="bg-purple-100 dark:bg-purple-800 px-1 py-0.5 rounded">{component.displayName}</code> page component is structured in your application.
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          
            {/* Pagination for usage examples */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                totalItems={totalItems}
                className="mt-8"
              />
            )}
          </div>
        );
      })()}

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Source</h2>
        <p className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
          📄 {component.filePath}
        </p>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: any[] = []
  
  try {
    const fs = await import('fs')
    const path = await import('path')
    const searchJsonPath = path.join(process.cwd(), 'content', 'search.json')
    
    const searchData = JSON.parse(fs.readFileSync(searchJsonPath, 'utf-8'))
    
    paths = searchData.components
      .filter((comp: any) => comp.type === 'page')
      .map((comp: any) => ({
        params: { slug: comp.displayName.toLowerCase() }
      }))

  } catch (error) {
    console.warn('Could not read components data for static paths:', error)
    paths = []
  }

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('🔍 [PAGE DEBUG] Starting getStaticProps for slug:', params?.slug)
  console.log('🔍 [PAGE DEBUG] Current working directory:', process.cwd())
  console.log('🔍 [PAGE DEBUG] Environment:', process.env.NODE_ENV)
  console.log('🔍 [PAGE DEBUG] Platform:', process.platform)
  
  let component: any = null
  let usedComponents: Array<{name: string, type: string, count: number, firstUsage: string}> = []
  
  try {
    const fs = await import('fs')
    const path = await import('path')
    const searchJsonPath = path.join(process.cwd(), 'content', 'search.json')
    
    console.log('🔍 [PAGE DEBUG] Trying to read search.json from:', searchJsonPath)
    
    // Check if search.json exists
    try {
      await fs.promises.access(searchJsonPath)
      console.log('✅ [PAGE DEBUG] search.json exists')
    } catch (accessError) {
      console.error('❌ [PAGE DEBUG] search.json not found:', accessError)
      throw new Error('search.json not found')
    }
    
    const searchData = JSON.parse(fs.readFileSync(searchJsonPath, 'utf-8'))
    console.log('📊 [PAGE DEBUG] Search data loaded with', searchData.components?.length || 0, 'components')
    
    // Log all page components for debugging
    const pageComponents = searchData.components.filter((comp: any) => comp.type === 'page')
    console.log('📄 [PAGE DEBUG] Available page components:', pageComponents.map((c: any) => c.displayName))
    
    component = searchData.components.find(
      (comp: any) => comp.displayName.toLowerCase() === params?.slug && comp.type === 'page'
    )

    if (!component) {
      console.error('❌ [PAGE DEBUG] Component not found for slug:', params?.slug)
      return {
        notFound: true
      }
    }

    console.log('✅ [PAGE DEBUG] Found component:', component.displayName)
    console.log('📁 [PAGE DEBUG] Component file path:', component.filePath)
    console.log('🔧 [PAGE DEBUG] Component has usedComponents?', !!component.usedComponents)
    console.log('🔧 [PAGE DEBUG] usedComponents type:', typeof component.usedComponents)
    console.log('🔧 [PAGE DEBUG] usedComponents length:', component.usedComponents?.length || 'N/A')

    // Use pre-generated component usage data if available (preferred for production)
    if (component.usedComponents && Array.isArray(component.usedComponents)) {
      usedComponents = component.usedComponents
      console.log(`✅ [PAGE DEBUG] Using pre-generated component usage data for ${component.displayName} (${usedComponents.length} components)`)
      usedComponents.forEach((comp, index) => {
        console.log(`  ${index + 1}. ${comp.name} (${comp.type}): ${comp.count} usages`)
      })
    } else {
      console.log('⚠️ [PAGE DEBUG] No pre-generated component usage data found, trying runtime extraction...')
      
      // Fallback: Try to extract at runtime (development only)
      try {
        if (component.filePath) {
          let pageContent = ''
          
          // Only try a few likely paths to avoid excessive file system operations
          const possiblePaths = [
            path.resolve(process.cwd(), '..', component.filePath),
            path.resolve(process.cwd(), '..', '..', component.filePath),
            path.resolve(process.cwd(), component.filePath),
            component.filePath
          ]
          
          console.log('🔍 [PAGE DEBUG] Trying file paths:', possiblePaths)
          
          for (const filePath of possiblePaths) {
            try {
              console.log('🔍 [PAGE DEBUG] Checking path:', filePath)
              if (fs.existsSync(filePath)) {
                pageContent = fs.readFileSync(filePath, 'utf-8')
                console.log(`✅ [PAGE DEBUG] Found file at: ${filePath} (${pageContent.length} chars)`)
                break
              } else {
                console.log('❌ [PAGE DEBUG] File not found at:', filePath)
              }
            } catch (e) {
              console.log('❌ [PAGE DEBUG] Error accessing file:', filePath, e)
            }
          }
          
          if (pageContent) {
            usedComponents = extractUsedComponents(pageContent, searchData.components)
            console.log(`✅ [PAGE DEBUG] Extracted component usage at runtime for ${component.displayName} (${usedComponents.length} components)`)
            usedComponents.forEach((comp, index) => {
              console.log(`  ${index + 1}. ${comp.name} (${comp.type}): ${comp.count} usages`)
            })
          } else {
            console.warn(`⚠️ [PAGE DEBUG] No component usage data available for ${component.displayName} (source file not found)`)
          }
        } else {
          console.warn(`⚠️ [PAGE DEBUG] No filePath provided for component ${component.displayName}`)
        }
      } catch (error) {
        console.warn('⚠️ [PAGE DEBUG] Could not extract used components (this is normal on Vercel):', error instanceof Error ? error.message : String(error))
      }
    }

    console.log('🎯 [PAGE DEBUG] Final result - usedComponents:', usedComponents.length)
    console.log('📤 [PAGE DEBUG] Returning props with component:', component.displayName, 'and', usedComponents.length, 'used components')

    return {
      props: {
        component,
        usedComponents
      }
    }
  } catch (error) {
    console.error('❌ [PAGE DEBUG] Error in getStaticProps:', error instanceof Error ? error.message : String(error))
    console.error('❌ [PAGE DEBUG] Full error:', error)
    return {
      notFound: true
    }
  }
}