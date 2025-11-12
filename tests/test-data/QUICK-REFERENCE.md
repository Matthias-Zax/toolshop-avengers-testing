# Quick Reference: Test Data Usage

## 🎯 Import Statement

```typescript
import {
  VALID_GUEST_USERS,
  VALID_BILLING_ADDRESSES,
  VALID_CREDIT_CARDS,
  INVALID_CREDIT_CARDS,
  PRODUCT_INDICES,
  PaymentMethod,
  MESSAGES,
} from './test-data/checkout.data';
```

---

## 👤 Guest Users

```typescript
// Usage
VALID_GUEST_USERS.johnDoe.email        // "test@example.com"
VALID_GUEST_USERS.johnDoe.firstName    // "John"
VALID_GUEST_USERS.johnDoe.lastName     // "Doe"

// Available Users
- johnDoe
- janeSmith
- testUser
```

---

## 📍 Billing Addresses

```typescript
// Usage - Pass entire object
await checkoutPage.fillBillingAddress(VALID_BILLING_ADDRESSES.newYork);

// Available Addresses
- newYork      // 123 Main St, New York, NY 10001
- losAngeles   // 456 Oak Ave, Los Angeles, CA 90001
- testCity     // 123 Test St, Test City, TS 12345
```

---

## 💳 Credit Cards

```typescript
// Usage - Pass entire object
await checkoutPage.completePayment(VALID_CREDIT_CARDS.visa);

// Valid Cards
- visa         // 4111-1111-1111-1111
- mastercard   // 5555-5555-5555-4444
- amex         // 3782-822463-10005

// Invalid Cards (for negative testing)
- invalidMonth     // Card with month 13
- expiredCard      // Expired card
- invalidCvv       // Too short CVV
- wrongFormat      // Wrong date format
```

---

## 🛍️ Product Selection

```typescript
// Usage
await homePage.clickProductByIndex(PRODUCT_INDICES.hammer);

// Available Products
- combinationPliers              // Index 0
- pliers                         // Index 1
- boltCutters                    // Index 2
- longNosePliers                 // Index 3
- slipJointPliers                // Index 4
- clawHammerShockReduction       // Index 5
- hammer                         // Index 6
- clawHammer                     // Index 7
- thorHammer                     // Index 8
```

---

## 💰 Payment Methods (Enum)

```typescript
// Usage
await page.selectOption('[data-test="payment-method"]', PaymentMethod.CreditCard);

// Available Methods
PaymentMethod.BankTransfer
PaymentMethod.CashOnDelivery
PaymentMethod.CreditCard
PaymentMethod.BuyNowPayLater
PaymentMethod.GiftCard
```

---

## 💬 Expected Messages

```typescript
// Usage in assertions
await expect(page.locator(`text=${MESSAGES.productAdded}`)).toBeVisible();

// Available Messages
MESSAGES.productAdded           // "Product added to shopping cart"
MESSAGES.continuingAsGuest      // "Continuing as guest"
MESSAGES.paymentSuccessful      // "Payment was successful"
MESSAGES.invalidDateFormat      // "Invalid date format"
```

---

## 📝 Complete Example

```typescript
test('checkout_test', async ({ page }) => {
  // Initialize pages
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Add product
  await homePage.goto();
  await homePage.clickProductByIndex(PRODUCT_INDICES.hammer);
  await productPage.addToCart();
  await expect(page.locator(`text=${MESSAGES.productAdded}`)).toBeVisible();

  // Checkout
  await homePage.goToCart();
  await checkoutPage.proceedFromCart();

  // Guest info
  await checkoutPage.continueAsGuest(
    VALID_GUEST_USERS.johnDoe.email,
    VALID_GUEST_USERS.johnDoe.firstName,
    VALID_GUEST_USERS.johnDoe.lastName
  );

  // Billing
  await checkoutPage.fillBillingAddress(VALID_BILLING_ADDRESSES.newYork);

  // Payment
  await checkoutPage.completePayment(VALID_CREDIT_CARDS.visa);

  // Verify
  await expect(page.locator(`text=${MESSAGES.paymentSuccessful}`)).toBeVisible();
});
```

---

## ✅ Benefits Checklist

- ✅ No hardcoded strings in tests
- ✅ No magic numbers
- ✅ Type-safe with TypeScript
- ✅ Reusable across tests
- ✅ Easy to maintain
- ✅ Self-documenting
- ✅ Centralized updates
