import test from '../lambdatest-setup';
import { expect } from '@playwright/test';
import { addZephyrInfo } from 'ttag-playwright-zephyr';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkout.page';
import {
  VALID_GUEST_USERS,
  VALID_BILLING_ADDRESSES,
  VALID_CREDIT_CARDS,
  INVALID_CREDIT_CARDS,
  PRODUCT_INDICES,
  PaymentMethod,
  MESSAGES,
} from './test-data/checkout.data';

test.describe('E-commerce Checkout Tests', () => {
  test('T1_CHECKOUT_validGuestUserWithThreeProducts_checkoutCompletedSuccessfully', async ({
    page,
  }) => {
    // Zephyr integration - Test ID, Description, and Cycle
    addZephyrInfo(
      'T600',
      'Verify guest user can add three products to cart and complete checkout successfully',
      'TAG-C19'
    );

    // Initialize page objects
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Navigate to home page
    await homePage.goto();
    await expect(page).toHaveTitle(/Practice Software Testing/);

    // Step 2: Add first product (Combination Pliers) to cart
    await homePage.clickProductByIndex(PRODUCT_INDICES.combinationPliers);
    await expect(page).toHaveURL(/\/product\//);
    await productPage.addToCart();
    await expect(page.locator(`text=${MESSAGES.productAdded}`)).toBeVisible();

    // Step 3: Navigate back to home and add second product (Pliers)
    await productPage.goToHome();
    await homePage.clickProductByIndex(PRODUCT_INDICES.pliers);
    await productPage.addToCart();
    await expect(page.locator(`text=${MESSAGES.productAdded}`)).toBeVisible();

    // Step 4: Navigate back to home and add third product (Hammer)
    await productPage.goToHome();
    await homePage.clickProductByIndex(PRODUCT_INDICES.hammer);
    await productPage.addToCart();
    await expect(page.locator(`text=${MESSAGES.productAdded}`)).toBeVisible();

    // Step 5: Verify cart count shows 3 items
    const cartCount = await homePage.getCartCount();
    expect(cartCount).toBe(3);

    // Step 6: Navigate to cart
    await homePage.goToCart();
    await expect(page).toHaveURL(/\/checkout/);

    // Step 7: Verify cart contains 3 items
    const itemCount = await checkoutPage.getCartItemCount();
    expect(itemCount).toBe(3);

    // Step 8: Proceed to checkout
    await checkoutPage.proceedFromCart();

    // Step 9: Continue as guest with valid information
    await checkoutPage.continueAsGuest(
      VALID_GUEST_USERS.johnDoe.email,
      VALID_GUEST_USERS.johnDoe.firstName,
      VALID_GUEST_USERS.johnDoe.lastName
    );
    await expect(page.locator(`text=${MESSAGES.continuingAsGuest}`)).toBeVisible();

    // Step 10: Fill billing address with valid information
    await checkoutPage.fillBillingAddress(VALID_BILLING_ADDRESSES.newYork);

    // Step 11: Complete payment with valid credit card
    await checkoutPage.completePayment(VALID_CREDIT_CARDS.visa);

    // Step 12: Verify payment success
    const isPaymentSuccessful = await checkoutPage.isPaymentSuccessful();
    expect(isPaymentSuccessful).toBe(true);
    await expect(page.locator(`text=${MESSAGES.paymentSuccessful}`)).toBeVisible();
  });

  test('T2_CHECKOUT_validGuestUserWithSingleProduct_checkoutCompletedWithBankTransfer', async ({
    page,
  }) => {
    addZephyrInfo(
      'T601',
      'Verify guest user can complete checkout with bank transfer payment method',
      'TAG-C19'
    );

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Navigate and add single product
    await homePage.goto();
    await homePage.clickProductByIndex(PRODUCT_INDICES.combinationPliers);
    await productPage.addToCart();

    // Proceed to checkout
    await homePage.goToCart();
    await checkoutPage.proceedFromCart();

    // Guest checkout
    await checkoutPage.continueAsGuest(
      VALID_GUEST_USERS.janeSmith.email,
      VALID_GUEST_USERS.janeSmith.firstName,
      VALID_GUEST_USERS.janeSmith.lastName
    );

    // Billing address
    await checkoutPage.fillBillingAddress(VALID_BILLING_ADDRESSES.losAngeles);

    // Select Bank Transfer and complete
    await page.locator('[data-test="payment-method"]').selectOption(PaymentMethod.BankTransfer);
    await page.locator('[data-test="finish"]').click();

    // Verify success
    const isSuccessful = await checkoutPage.isPaymentSuccessful();
    expect(isSuccessful).toBe(true);
  });

  test('T4_CHECKOUT_invalidExpirationDate_errorMessageDisplayed', async ({ page }) => {
    addZephyrInfo(
      'T602',
      'Verify error is displayed when invalid credit card expiration date is entered',
      'TAG-C19'
    );

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add product and proceed to payment
    await homePage.goto();
    await homePage.clickProductByIndex(PRODUCT_INDICES.combinationPliers);
    await productPage.addToCart();
    await homePage.goToCart();
    await checkoutPage.proceedFromCart();

    // Complete guest and address steps
    await checkoutPage.continueAsGuest(
      VALID_GUEST_USERS.testUser.email,
      VALID_GUEST_USERS.testUser.firstName,
      VALID_GUEST_USERS.testUser.lastName
    );
    await checkoutPage.fillBillingAddress(VALID_BILLING_ADDRESSES.testCity);

    // Enter invalid expiration date format
    await page.locator('[data-test="payment-method"]').selectOption(PaymentMethod.CreditCard);
    await page.locator('[data-test="credit_card_number"]').fill(INVALID_CREDIT_CARDS.invalidMonth.cardNumber);
    await page.locator('[data-test="expiration_date"]').fill(INVALID_CREDIT_CARDS.invalidMonth.expirationDate);
    await page.locator('[data-test="cvv"]').fill(INVALID_CREDIT_CARDS.invalidMonth.cvv);
    await page.locator('[data-test="card_holder_name"]').fill(INVALID_CREDIT_CARDS.invalidMonth.cardHolderName);

    // Verify error message or disabled button
    const errorMessage = page.locator(`text=${MESSAGES.invalidDateFormat}`);
    const isErrorVisible = await errorMessage.isVisible().catch(() => false);

    // Either error message should be visible or finish button should be disabled
    const finishButton = page.locator('[data-test="finish"]');
    const isButtonDisabled = await finishButton.isDisabled();

    expect(isErrorVisible || isButtonDisabled).toBe(true);
  });
});
