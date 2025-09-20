const fs = require('fs');
const path = require('path');

// Import the extractUsedComponents function from the pages directory
function extractUsedComponents(pageContent, allComponents) {
  if (!pageContent) {
    return []
  }
  
  const usedComponents = []
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
  const importedNames = new Set()
  
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
      }
    }
  })
  
  // Filter out components with 0 usage (only imported but never used)
  const actuallyUsedComponents = usedComponents.filter(u => u.count > 0)
  
  return actuallyUsedComponents
}

async function buildComponentData() {
  console.log('🔧 Building component data with usage analysis...');
  
  try {
    // Read the existing search.json
    const searchJsonPath = path.join(process.cwd(), 'content', 'search.json');
    const searchData = JSON.parse(fs.readFileSync(searchJsonPath, 'utf-8'));
    
    console.log(`📊 Loaded ${searchData.components.length} components from search.json`);
    
    // Process each page component to add usedComponents data
    const updatedComponents = searchData.components.map(component => {
      if (component.type === 'page' && component.filePath) {
        console.log(`🔍 Analyzing component usage for: ${component.displayName}`);
        
        // Try to find the source file
        const possiblePaths = [
          path.resolve(process.cwd(), '..', component.filePath), // D:\GitHub\smartdocs-demo\src\pages\AboutPage.tsx
          path.resolve(process.cwd(), component.filePath),
          path.resolve(process.cwd(), '..', '..', component.filePath),
          component.filePath
        ];
        
        let pageContent = '';
        let foundPath = null;
        
        for (const filePath of possiblePaths) {
          try {
            if (fs.existsSync(filePath)) {
              pageContent = fs.readFileSync(filePath, 'utf-8');
              foundPath = filePath;
              break;
            }
          } catch (e) {
            // Continue to next path
          }
        }
        
        if (pageContent && foundPath) {
          console.log(`✅ Found source file at: ${foundPath}`);
          const usedComponents = extractUsedComponents(pageContent, searchData.components);
          console.log(`📈 Found ${usedComponents.length} used components for ${component.displayName}`);
          
          return {
            ...component,
            usedComponents
          };
        } else {
          console.log(`⚠️ Could not find source file for ${component.displayName} at ${component.filePath}`);
          return component;
        }
      }
      
      return component;
    });
    
    // Write the updated search.json
    const updatedSearchData = {
      ...searchData,
      components: updatedComponents
    };
    
    fs.writeFileSync(searchJsonPath, JSON.stringify(updatedSearchData, null, 2));
    console.log('✅ Updated search.json with component usage data');
    
    // Summary
    const pagesWithUsage = updatedComponents.filter(c => c.type === 'page' && c.usedComponents && c.usedComponents.length > 0);
    console.log(`📊 Summary: ${pagesWithUsage.length} pages now have component usage data`);
    
  } catch (error) {
    console.error('❌ Error building component data:', error);
    process.exit(1);
  }
}

// Run the build
buildComponentData();
