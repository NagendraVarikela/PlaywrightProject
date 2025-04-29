const fs = require('fs');

async function captureScreenshot(page, testName, status) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const screenshotPath = `./test-results/${testName}-${status}-${timestamp}.png`;

    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved: ${screenshotPath}`);
}

module.exports = { captureScreenshot };
