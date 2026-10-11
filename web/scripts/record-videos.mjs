import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE_URL = 'http://localhost:3870'
const OUTPUT_DIR = path.join(__dirname, '../docs/showcase/videos')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

async function recordVideo(filename, url, duration) {
  console.log(`Recording ${filename}...`)
  
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 1280, height: 800 }
    }
  })
  
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(duration)
  
  await context.close()
  
  const videos = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.webm'))
  const latestVideo = videos.sort((a, b) => {
    return fs.statSync(path.join(OUTPUT_DIR, b)).mtime - fs.statSync(path.join(OUTPUT_DIR, a)).mtime
  })[0]
  
  if (latestVideo) {
    const oldPath = path.join(OUTPUT_DIR, latestVideo)
    const newPath = path.join(OUTPUT_DIR, filename)
    fs.renameSync(oldPath, newPath)
    console.log(`  Saved: ${filename}`)
  }
  
  await browser.close()
}

async function main() {
  await recordVideo('tour-01-landing.webm', `${BASE_URL}/`, 8000)
  await recordVideo('tour-02-features.webm', `${BASE_URL}/#features`, 8000)
  await recordVideo('tour-03-tour.webm', `${BASE_URL}/tour`, 8000)
  
  console.log('\nAll videos recorded!')
}

main()
