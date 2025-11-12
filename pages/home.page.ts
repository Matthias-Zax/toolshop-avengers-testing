import { Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * HomePage - Practice Software Testing home page
 * Handles product listing, search, filtering, and navigation
 */
export class HomePage extends BasePage {
  private readonly baseUrl = 'https://practicesoftwaretesting.com/';

  // Multi-selector strategy for robust element location
  private readonly productLinkSelectors = [
    '[data-test^="product-"]',
    'a[href*="/product/"]',
  ];

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to home page
   */
  async goto(): Promise<void> {
    await this.navigate(this.baseUrl);
  }

  /**
   * Click on a product by index (0-based)
   * @param index - The index of the product to click
   */
  async clickProductByIndex(index: number): Promise<void> {
    const products = this.page.locator(this.productLinkSelectors[0]);
    await products.nth(index).click();
    await this.waitForPageLoad();
  }

  /**
   * Click on a product by name
   * @param productName - The name of the product to click
   */
  async clickProductByName(productName: string): Promise<void> {
    await this.page.locator(`a:has-text("${productName}")`).first().click();
    await this.waitForPageLoad();
  }

  /**
   * Get cart item count
   */
  async getCartCount(): Promise<number> {
    const cartBadge = this.page.locator('[data-test="nav-cart"] span').first();
    const text = await cartBadge.textContent();
    return text ? parseInt(text.trim()) : 0;
  }

  /**
   * Navigate to cart/checkout
   */
  async goToCart(): Promise<void> {
    await this.page.locator('[data-test="nav-cart"]').click();
    await this.waitForPageLoad();
  }
}
