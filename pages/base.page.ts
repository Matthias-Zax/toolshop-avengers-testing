import { Page } from '@playwright/test';

/**
 * BasePage provides common functionality for all page objects
 * - Cookie consent handling
 * - Navigation utilities
 * - Common waits and interactions
 */
export class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await this.handleCookieConsent();
  }

  /**
   * Handle cookie consent if present
   * Supports multiple languages and consent patterns
   */
  async handleCookieConsent(): Promise<void> {
    const cookieSelectors = [
      'button:has-text("Accept")',
      'button:has-text("Accept All")',
      'button:has-text("Akzeptieren")',
      '[data-testid="cookie-accept"]',
      '.cookie-consent button',
    ];

    for (const selector of cookieSelectors) {
      try {
        const button = this.page.locator(selector).first();
        if (await button.isVisible({ timeout: 2000 })) {
          await button.click();
          break;
        }
      } catch {
        // Continue to next selector
      }
    }
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }
}
