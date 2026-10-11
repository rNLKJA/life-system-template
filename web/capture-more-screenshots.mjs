import { chromium } from '@playwright/test';

async function captureScreenshots() {
  const browser = await chromium.launch();

  // Capture a 768px tablet width screenshot for variety
  const page1 = await browser.newPage({
    viewport: { width: 768, height: 1024 },
    colorScheme: 'light',
  });

  await page1.goto('http://localhost:3870', { waitUntil: 'networkidle' });
  await page1.screenshot({ 
    path: '/tmp/style-shots/life-system-template/home-light-768.png',
    fullPage: false 
  });
  console.log('Captured: /tmp/style-shots/life-system-template/home-light-768.png');
  await page1.close();

  await browser.close();
  console.log('Screenshot capture complete');
}

captureScreenshots().catch(console.error);
