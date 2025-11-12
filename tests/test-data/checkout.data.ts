/**
 * Test data for E-commerce Checkout tests
 * Centralized test data management following TTAG best practices
 */

export interface GuestUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface BillingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface CreditCardPayment {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardHolderName: string;
}

/**
 * Valid guest user data for checkout
 */
export const VALID_GUEST_USERS = {
  johnDoe: {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
  } as GuestUser,
  janeSmith: {
    email: 'guest@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
  } as GuestUser,
  testUser: {
    email: 'testuser@example.com',
    firstName: 'Test',
    lastName: 'User',
  } as GuestUser,
};

/**
 * Valid billing addresses for checkout
 */
export const VALID_BILLING_ADDRESSES = {
  newYork: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    postalCode: '10001',
  } as BillingAddress,
  losAngeles: {
    street: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    country: 'United States',
    postalCode: '90001',
  } as BillingAddress,
  testCity: {
    street: '123 Test St',
    city: 'Test City',
    state: 'TS',
    country: 'Test Country',
    postalCode: '12345',
  } as BillingAddress,
};

/**
 * Valid credit card payment details
 */
export const VALID_CREDIT_CARDS = {
  visa: {
    cardNumber: '4111-1111-1111-1111',
    expirationDate: '12/2025',
    cvv: '123',
    cardHolderName: 'John Doe',
  } as CreditCardPayment,
  mastercard: {
    cardNumber: '5555-5555-5555-4444',
    expirationDate: '06/2026',
    cvv: '456',
    cardHolderName: 'Jane Smith',
  } as CreditCardPayment,
  amex: {
    cardNumber: '3782-822463-10005',
    expirationDate: '03/2027',
    cvv: '1234',
    cardHolderName: 'Test User',
  } as CreditCardPayment,
};

/**
 * Invalid credit card data for negative testing
 */
export const INVALID_CREDIT_CARDS = {
  invalidMonth: {
    cardNumber: '4111-1111-1111-1111',
    expirationDate: '13/25', // Invalid month
    cvv: '123',
    cardHolderName: 'Test User',
  } as CreditCardPayment,
  expiredCard: {
    cardNumber: '4111-1111-1111-1111',
    expirationDate: '12/2020', // Expired
    cvv: '123',
    cardHolderName: 'Test User',
  } as CreditCardPayment,
  invalidCvv: {
    cardNumber: '4111-1111-1111-1111',
    expirationDate: '12/2025',
    cvv: '12', // Too short
    cardHolderName: 'Test User',
  } as CreditCardPayment,
  wrongFormat: {
    cardNumber: '4111-1111-1111-1111',
    expirationDate: '12/25', // Wrong format (should be MM/YYYY)
    cvv: '123',
    cardHolderName: 'Test User',
  } as CreditCardPayment,
};

/**
 * Product indices for selection on home page
 */
export const PRODUCT_INDICES = {
  combinationPliers: 0,
  pliers: 1,
  boltCutters: 2,
  longNosePliers: 3,
  slipJointPliers: 4,
  clawHammerShockReduction: 5,
  hammer: 6,
  clawHammer: 7,
  thorHammer: 8,
};

/**
 * Expected product names for validation
 */
export const PRODUCT_NAMES = {
  combinationPliers: 'Combination Pliers',
  pliers: 'Pliers',
  hammer: 'Hammer',
};

/**
 * Payment methods available in the system
 */
export enum PaymentMethod {
  BankTransfer = 'Bank Transfer',
  CashOnDelivery = 'Cash on Delivery',
  CreditCard = 'Credit Card',
  BuyNowPayLater = 'Buy Now Pay Later',
  GiftCard = 'Gift Card',
}

/**
 * Expected messages and validation text
 */
export const MESSAGES = {
  productAdded: 'Product added to shopping cart',
  continuingAsGuest: 'Continuing as guest',
  paymentSuccessful: 'Payment was successful',
  invalidDateFormat: 'Invalid date format',
};
