import { chromium } from '@playwright/test';

const browsers = {
  webkit: 'webkit',
  firefox: 'firefox', 
  chromium: 'chromium'
};

async function captureScreenshots() {
  const browser = await chromium.launch();

  const contexts = [
    {
      name: 'light',
      colorScheme: 'light',
      forcedColors: 'none',
    },
    {
      name: 'dark',
      colorScheme: 'dark',
      forcedColors: 'none',
    },
  ];

  const viewports = [
    { width: 1440, height: 900, name: '1440' },
    { width: 390, height: 844, name: '390' },
  ];

  for (const context of contexts) {
    for (const viewport of viewports) {
      // Skip 390px dark mode as we want light and dark at 1440px
      if (viewport.name === '390' && context.name === 'dark') continue;

      const page = await browser.newPage({
        viewport,
        colorScheme: context.colorScheme,
      });

      await page.goto('http://localhost:3870', { waitUntil: 'networkidle' });
      
      const filename = `/tmp/style-shots/life-system-template/home-${context.name}-${viewport.name}.png`;
      await page.screenshot({ path: filename, fullPage: false });
      console.log(`Captured: ${filename}`);

      await page.close();
    }
  }

  // Create tour placeholder screenshots
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light',
  });

  await page.goto('http://localhost:3870/tour', { waitUntil: 'networkidle' });
  await page.screenshot({ 
    path: '/tmp/style-shots/life-system-template/tour-light-1440.png',
    fullPage: false 
  });
  console.log('Captured: /tmp/style-shots/life-system-template/tour-light-1440.png');

  await page.close();

  await browser.close();
  console.log('Screenshot capture complete');
}

captureScreenshots().catch(console.error);
