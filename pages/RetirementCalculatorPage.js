const { expect } = require('@playwright/test');

class RetirementCalculatorPage {
    constructor(page) {
        this.page = page;

        // Age Fields
        this.currentAge = page.locator("#current-age");
        this.retirementAge = page.locator("#retirement-age");

        // Income & Savings Fields
        this.currentAnnualIncome = page.locator("#current-income");
        this.spouseAnnualIncome = page.locator("#spouse-income");
        this.retirementSavings = page.locator("#current-total-savings");
        this.yearlySavingAmount = page.locator("#current-annual-savings");
        this.savingsIncreaseRate = page.locator("#savings-increase-rate");

        // Social Security Selection & Marital Status
        this.socialSecurityYes = page.locator("#yes-social-benefits");
        this.socialSecurityNo = page.locator("#no-social-benefits");

        // Marital Status Selection (Radio Buttons)
        this.maritalStatusLable = page.locator("//legend[@id='marital-status-label']");
        this.maritalStatusYes = page.locator("//label[text()='Married']");
        this.maritalStatusNo = page.locator("//label[text()='Single']");
        
        this.overrideAmount = page.getByLabel('Social Security override amount');

        // Additional Retirement Preferences
        this.adjestDefaultValues =page.getByRole('button', { name: 'Adjust default values' });
        this.otherIncomeDuringRetirement = page.getByLabel('What other income will you have during retirement?');
        this.dependonRetirementIncome = page.getByLabel('How many years do you plan to depend on retirement income?');
        this.inflationAdjustmentYes = page.locator('#include-inflation');
        this.inflationAdjustmentNo = page.locator('#exclude-inflation');        
        this.inflationRate = page.getByLabel('If yes, what is the expected inflation rate?');
        this.finalIncomeGoal = page.getByLabel('How much of your final annual income do you want available in each year of your retirement?');
        this.preRetireInvestment = page.getByLabel('Pre-retirement investment return');
        this.postRetirementInvestment = page.getByLabel('Post-retirement investment return');

        // Buttons
        this.calculateButton = page.getByRole('button', { name: 'Calculate' });
        this.clearFormButton = page.getByRole('button', { name: 'Clear form' });
        this.saveChangesButton = page.locator("//button[text()='Save changes']");
    }

    
    async fillRetirementDetails({ age, retireAge, income,spouseIncome, savings, yearlySaving, increaseRate,overrideamount }) {
        await this.currentAge.fill(age.toString());
        await this.retirementAge.fill(retireAge.toString());
        await this.currentAnnualIncome.fill(income.toString());
        await this.spouseAnnualIncome.fill(spouseIncome.toString())
        await this.retirementSavings.fill(savings.toString());
        await this.yearlySavingAmount.fill(yearlySaving.toString());
        await this.savingsIncreaseRate.fill(increaseRate.toString());
    }


    async selectSocialSecurity(enable) {
        if (enable) {
            await this.socialSecurityYes.click({ force: true });
        } else {
            await this.socialSecurityNo.click({ force: true });
        }

        const isVisible = await this.maritalStatusLable.isVisible();
        const isOverrideVisible = await this.overrideAmount.isVisible();

        console.log(`Marital Status enabled: ${isVisible}`);

        if (enable && !isVisible) {
            throw new Error('Marital Status should be enabled but is not');
            
        }
    }

    async selectMaritalStatusandOverRideAmount( enable,relationshipStatus,socialSecurityOverride) {
        if (enable) {
            console.log(`Selecting Marital Status: ${relationshipStatus}`);
            if (relationshipStatus === "Married") {
                await this.maritalStatusYes.click();
            } else {
                await this.maritalStatusNo.click();
            }
            this.overrideAmount.fill(socialSecurityOverride.toString())
        } else {
            console.error('Skipping Marital Status selection as Social Security is disabled');
        }
    }
    



    async updateDefaultValues({ additionalIncome,retirementYears,inflationRate, finalIncome, preRetirementReturn, postRetirementReturn }) {
        await this.adjestDefaultValues.click();
        await this.otherIncomeDuringRetirement.fill(additionalIncome.toString());
        await this.dependonRetirementIncome.fill(retirementYears.toString());
        if (inflationRate === 'true'){
            this.inflationAdjustmentYes.click({force:true});
            await this.inflationRate.fill(inflationRate.toString());
        }
        else{
            this.inflationAdjustmentNo.click({force:true});
            await this.inflationRate.isDisabled();
        }
        await this.finalIncomeGoal.fill(finalIncome.toString());
        await this.preRetireInvestment.fill(preRetirementReturn.toString());
        await this.postRetirementInvestment.fill(postRetirementReturn.toString());
    }
    
    async saveChanges(){
        await this.page.evaluate(() => {
            document.querySelector('#default-values-modal').style.zoom = '50%';
        });
        await this.saveChangesButton.scrollIntoViewIfNeeded();
        await this.saveChangesButton.click({force:true});
    }

    async submitCalculation() {
        await this.calculateButton.click();
    }

    async clearForm() {
        await this.clearFormButton.click();
    }
}

module.exports = { RetirementCalculatorPage };
