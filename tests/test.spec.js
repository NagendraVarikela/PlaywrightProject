const { test, expect } = require('@playwright/test');
const { RetirementCalculatorPage } = require('../pages/RetirementCalculatorPage');
const { RetirementResultsPage } = require('../pages/RetirementResultsPage');
const { captureScreenshot } = require('../utils/screenshotUtils'); 
const testData = require('../testdata/test_data.json');


test('Verify Retirement Calculator Form Submission', async ({ page }) => {
    const retirementPage = new RetirementCalculatorPage(page);
    const resultsPage = new RetirementResultsPage(page);

    const testName = 'retirementCalculatorTest';

    try {
        await page.goto('https://www.securian.com/insights-tools/retirement-calculator.html');
        console.log('Navigated to Retirement Calculator page');

        await retirementPage.fillRetirementDetails({
            age: testData.test_data.currentAge,
            retireAge: testData.test_data.retirementAge,
            income: testData.test_data.currentAnnualIncome,
            spouseIncome:testData.test_data.spouseAnnualIncome,
            savings: testData.test_data.currentRetirementSavings,
            yearlySaving: testData.test_data.currentRetirementContribution,
            increaseRate: testData.test_data.annualRetirementContributionIncrease,
        });

        await retirementPage.selectSocialSecurity(testData.test_data.socialSecurityIncome);
        await retirementPage.selectMaritalStatusandOverRideAmount(testData.test_data.socialSecurityIncome,testData.test_data.relationshipStatus,testData.test_data.socialSecurityOverride);

        await retirementPage.updateDefaultValues({
            additionalIncome: testData.test_data.additionalIncome,
            retirementYears: testData.test_data.retirementYears,
            inflationRate: testData.test_data.postRetirementIncomeIncreaseWithInflation 
                ? testData.test_data.inflationRate 
                : null, // Handle null scenario dynamically
            finalIncome: testData.test_data.finalAnnualIncomeDesiredPercentage,
            preRetirementReturn: testData.test_data.preRetirementInvestmentReturn,
            postRetirementReturn: testData.test_data.postRetirementInvestmentReturn            
        });

        await retirementPage.saveChanges();

        console.log('Filled basic details');
        await captureScreenshot(page, testName, 'filledForm');

        await retirementPage.submitCalculation();
        console.log('Submitted the form');
        await captureScreenshot(page, testName, 'submittedForm');
        await resultsPage.assertResultMessage(testData.test_data.resultsMessage);
        await resultsPage.assertRetirementAmount(testData.test_data.expectedRetirementAmount);
        await resultsPage.assertCurrentSavings(testData.test_data.expectedCurrentSavings);



    } catch (error) {
        console.error(`Test failed: ${error.message}`);
        await captureScreenshot(page, testName, 'error');
        throw error;
    }
});
