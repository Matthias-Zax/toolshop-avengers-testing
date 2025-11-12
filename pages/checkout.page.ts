import { Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * CheckoutPage - Multi-step checkout process
 * Handles cart review, guest checkout, billing address, and payment
 */
export class CheckoutPage extends BasePage {
  // Cart step selectors
  private readonly proceedToCheckoutButton = '[data-test="proceed-1"]';

  // Guest checkout selectors
  private readonly guestTabButton = 'tab:has-text("Continue as Guest")';
  private readonly guestEmailInput = '[data-test="guest-email"]';
  private readonly guestFirstNameInput = '[data-test="guest-first-name"]';
  private readonly guestLastNameInput = '[data-test="guest-last-name"]';
  private readonly guestSubmitButton = '[data-test="guest-submit"]';
  private readonly proceedAfterGuestButton = '[data-test="proceed-2-guest"]';

  // Billing address selectors
  private readonly streetInput = '[data-test="street"]';
  private readonly cityInput = '[data-test="city"]';
  private readonly stateInput = '[data-test="state"]';
  private readonly countryInput = '[data-test="country"]';
  private readonly postalCodeInput = '[data-test="postal_code"]';
  private readonly proceedAfterAddressButton = '[data-test="proceed-3"]';

  // Payment selectors
  private readonly paymentMethodSelect = '[data-test="payment-method"]';
  private readonly creditCardNumberInput = '[data-test="credit_card_number"]';
  private readonly expirationDateInput = '[data-test="expiration_date"]';
  private readonly cvvInput = '[data-test="cvv"]';
  private readonly cardHolderNameInput = '[data-test="card_holder_name"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly successMessage = 'text=Payment was successful';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Proceed from cart to sign in step
   */
  async proceedFromCart(): Promise<void> {
    await this.page.locator(this.proceedToCheckoutButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Continue as guest
   * @param email - Guest email
   * @param firstName - Guest first name
   * @param lastName - Guest last name
   */
  async continueAsGuest(
    email: string,
    firstName: string,
    lastName: string
  ): Promise<void> {
    // Click "Continue as Guest" tab
    await this.page.getByRole('tab', { name: 'Continue as Guest' }).click();

    // Fill guest information
    await this.page.locator(this.guestEmailInput).fill(email);
    await this.page.locator(this.guestFirstNameInput).fill(firstName);
    await this.page.locator(this.guestLastNameInput).fill(lastName);

    // Submit guest form
    await this.page.locator(this.guestSubmitButton).click();
    await this.page.waitForLoadState('networkidle');

    // Proceed to billing address
    await this.page.locator(this.proceedAfterGuestButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill billing address
   * @param address - Billing address details
   */
  async fillBillingAddress(address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }): Promise<void> {
    await this.page.locator(this.streetInput).fill(address.street);
    await this.page.locator(this.cityInput).fill(address.city);
    await this.page.locator(this.stateInput).fill(address.state);
    await this.page.locator(this.countryInput).fill(address.country);
    await this.page.locator(this.postalCodeInput).fill(address.postalCode);

    // Proceed to payment
    await this.page.locator(this.proceedAfterAddressButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Complete payment with credit card
   * @param paymentDetails - Credit card payment details
   */
  async completePayment(paymentDetails: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    cardHolderName: string;
  }): Promise<void> {
    // Select Credit Card payment method
    await this.page.locator(this.paymentMethodSelect).selectOption('Credit Card');

    // Fill credit card details
    await this.page.locator(this.creditCardNumberInput).fill(paymentDetails.cardNumber);
    await this.page.locator(this.expirationDateInput).fill(paymentDetails.expirationDate);
    await this.page.locator(this.cvvInput).fill(paymentDetails.cvv);
    await this.page.locator(this.cardHolderNameInput).fill(paymentDetails.cardHolderName);

    // Submit payment
    await this.page.locator(this.finishButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify payment success
   */
  async isPaymentSuccessful(): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.successMessage, { timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get cart total from checkout page
   */
  async getCartTotal(): Promise<string> {
    const totalElement = this.page.locator('td:has-text("Total")').locator('..').locator('td').last();
    return await totalElement.textContent() || '';
  }

  /**
   * Get number of items in cart table
   */
  async getCartItemCount(): Promise<number> {
    const rows = this.page.locator('tbody tr');
    const count = await rows.count();
    // Subtract 1 for the total row
    return count > 0 ? count - 1 : 0;
  }
}
