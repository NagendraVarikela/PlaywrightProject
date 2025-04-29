Installation
Install the dependencies and devDependencies to run the test.

Clone (OR) Download this repo as zip folder on to your local machine
Navigate to project's directory on terminal and run the following commands:
Clone the repository

git clone https://github.com/NagendraVarikela/PlaywrightProject

Install dependencies
    npm install
    npx playwright install

Run application

    Run tests in Parallel chrome
        npm run test:chrome - For tests only on chrome browser
    
    Run tests in Parallel firefox
        npm run test:firefox - For tests only on firefox browser
    
    Run tests in Parallel safari
        npm run test:safari - For tests only on safari browser

    Run tests in Parallel edge
        npm run test:edge - For tests only on edge browser

Run tests in Parallel on all browsers (chrome, safari, edge and firefox)

npm run test  - For tests only on all browsers

Playwright Test Report
    Html-test-report :
npm run test:chrome (OR)  npm run test:edge (OR) npm run html-report
