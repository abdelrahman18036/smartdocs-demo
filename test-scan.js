// Test script to check real usage extraction
import { scanComponents } from '../../packages/smartdocs/dist/cli.js';

async function test() {
  console.log('🔍 Testing real usage extraction...');
  
  const patterns = ['src/**/*.{ts,tsx,js,jsx}'];
  const components = await scanComponents(patterns);
  
  console.log(`Found ${components.length} components`);
  
  const cardComponent = components.find(c => c.displayName === 'Card');
  if (cardComponent) {
    console.log('Card component:', {
      name: cardComponent.displayName,
      hasRealUsageExamples: !!cardComponent.realUsageExamples,
      realUsageExamplesCount: cardComponent.realUsageExamples?.length || 0,
      realUsageExamples: cardComponent.realUsageExamples
    });
  } else {
    console.log('Card component not found');
  }
}

test().catch(console.error);