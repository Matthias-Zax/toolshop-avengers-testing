import { Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * ProductPage - Individual product detail page
 * Handles product details, quantity selection, and add to cart
 */
export class ProductPage extends BasePage {
  private readonly addToCartButton = '[data-test="add-to-cart"]';
  private readonly quantityInput = '[data-test="quantity"]';
  private readonly increaseQuantityButton = 'button:has-text("Increase quantity")';
  private readonly decreaseQuantityButton = 'button:has-text("Decrease quantity")';
  private readonly productTitle = 'h1';
  private readonly productPrice = '[data-test="product-price"], .price';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Add product to cart
   */
  async addToCart(): Promise<void> {
    await this.page.locator(this.addToCartButton).click();
    // Wait for success message
    await this.page.waitForSelector('text=Product added to shopping cart', {
      timeout: 5000,
    });
  }

  /**
   * Set product quantity
   * @param quantity - The quantity to set
   */
  async setQuantity(quantity: number): Promise<void> {
    const input = this.page.locator(this.quantityInput).first();
    await input.fill(quantity.toString());
  }

  /**
   * Increase quantity by clicking the increase button
   */
  async increaseQuantity(): Promise<void> {
    await this.page.locator(this.increaseQuantityButton).click();
  }

  /**
   * Get product name
   */
  async getProductName(): Promise<string> {
    return await this.page.locator(this.productTitle).textContent() || '';
  }

  /**
   * Get product price
   */
  async getProductPrice(): Promise<string> {
    const priceText = await this.page.locator(this.productPrice).first().textContent();
    return priceText?.trim() || '';
  }

  /**
   * Navigate back to home
   */
  async goToHome(): Promise<void> {
    await this.page.locator('[data-test="nav-home"]').click();
    await this.waitForPageLoad();
  }
}
