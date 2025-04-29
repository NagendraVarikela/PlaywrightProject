const fs = require('fs');

async function captureScreenshot(page, testName, status) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const dirPath = './test-results';
    
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const screenshotPath = `${dirPath}/${testName}-${status}-${timestamp}.png`;

    await page.screenshot({ path: screenshotPath });

    console.log(`Screenshot saved: ${screenshotPath}`);
}

module.exports = { captureScreenshot };