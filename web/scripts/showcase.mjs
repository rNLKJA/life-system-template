import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import { fileURLToPath } from 'url'

const execAsync = promisify(exec)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function runShowcase() {
  try {
    console.log('Running Playwright showcase tests...')
    const result = await execAsync('pnpm exec playwright test --config playwright.config.ts')
    console.log(result.stdout)
    console.log('Showcase tests completed.')
  } catch (error) {
    console.error('Showcase tests failed:', error.message)
    process.exit(1)
  }
}

runShowcase()
