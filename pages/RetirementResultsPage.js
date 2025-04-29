const { expect } = require('@playwright/test');

class RetirementResultsPage {
    constructor(page) {
      this.page = page;
      this.resultMessage = page.locator('#result-message'); 
      this.retirementAmount = page.locator('#retirement-amount-results'); 
      this.currentSavings = page.locator('#current-savings-results'); 
      this.resultsChart = page.getByRole('img', { name: 'Results chart' });
    }
  
    async getResultMessage() {
      return await this.resultMessage.textContent() || '';
    }
  
    async getRetirementAmount() {
      return await this.retirementAmount.textContent() || '';
    }
  
    async getCurrentSavings() {
      return await this.currentSavings.textContent() || '';
    }
  
    async assertResultMessage(expectedMessage) {
      await expect(this.resultsChart).toBeVisible();
      await expect(this.resultMessage).toBeVisible();
      const actualMessage = await this.getResultMessage();
      expect(actualMessage).toContain(expectedMessage);
    }
  
    async assertRetirementAmount(expectedAmount) {
      const actualAmount = await this.getRetirementAmount();
      expect(actualAmount).toContain(expectedAmount);
    }
  
    async assertCurrentSavings(expectedSavings) {
      const actualSavings = await this.getCurrentSavings();
      expect(actualSavings).toContain(expectedSavings);
    }
  }
  
  module.exports ={ RetirementResultsPage };
  