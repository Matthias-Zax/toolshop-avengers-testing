# Test Data Documentation

This directory contains centralized test data for the TTAG Playwright test automation framework.

## Structure

### `checkout.data.ts`
Contains all test data for e-commerce checkout tests including:

#### Data Types
- **GuestUser**: User information for guest checkout
- **BillingAddress**: Billing address information
- **CreditCardPayment**: Credit card payment details

#### Valid Test Data

**VALID_GUEST_USERS**
- `johnDoe`: Primary test user (test@example.com)
- `janeSmith`: Alternative test user (guest@example.com)
- `testUser`: Generic test user (testuser@example.com)

**VALID_BILLING_ADDRESSES**
- `newYork`: New York address
- `losAngeles`: Los Angeles address
- `testCity`: Generic test address

**VALID_CREDIT_CARDS**
- `visa`: Valid Visa card (4111-1111-1111-1111)
- `mastercard`: Valid Mastercard (5555-5555-5555-4444)
- `amex`: Valid American Express (3782-822463-10005)

#### Invalid Test Data (for negative testing)

**INVALID_CREDIT_CARDS**
- `invalidMonth`: Card with invalid month (13)
- `expiredCard`: Expired card
- `invalidCvv`: Card with too short CVV
- `wrongFormat`: Card with wrong date format (MM/YY instead of MM/YYYY)

#### Constants

**PRODUCT_INDICES**
Maps product names to their indices on the home page for easy selection:
```typescript
PRODUCT_INDICES.combinationPliers // 0
PRODUCT_INDICES.pliers            // 1
PRODUCT_INDICES.hammer            // 6
```

**PaymentMethod** (Enum)
- `BankTransfer`
- `CashOnDelivery`
- `CreditCard`
- `BuyNowPayLater`
- `GiftCard`

**MESSAGES**
Expected messages for validation:
- `productAdded`: "Product added to shopping cart"
- `continuingAsGuest`: "Continuing as guest"
- `paymentSuccessful`: "Payment was successful"
- `invalidDateFormat`: "Invalid date format"

## Usage Examples

### Import test data
```typescript
import {
  VALID_GUEST_USERS,
  VALID_BILLING_ADDRESSES,
  VALID_CREDIT_CARDS,
  PaymentMethod,
  MESSAGES,
} from './test-data/checkout.data';
```

### Use in tests
```typescript
// Guest user
await checkoutPage.continueAsGuest(
  VALID_GUEST_USERS.johnDoe.email,
  VALID_GUEST_USERS.johnDoe.firstName,
  VALID_GUEST_USERS.johnDoe.lastName
);

// Billing address
await checkoutPage.fillBillingAddress(VALID_BILLING_ADDRESSES.newYork);

// Payment
await checkoutPage.completePayment(VALID_CREDIT_CARDS.visa);

// Payment method
await page.selectOption('[data-test="payment-method"]', PaymentMethod.CreditCard);

// Assertions
await expect(page.locator(`text=${MESSAGES.paymentSuccessful}`)).toBeVisible();
```

## Best Practices

1. **Centralization**: All test data should be defined here, not in test files
2. **Type Safety**: Use TypeScript interfaces for type-safe test data
3. **Reusability**: Create reusable data objects for common scenarios
4. **Naming**: Use descriptive names that indicate the purpose of the data
5. **Categorization**: Group related data together (valid vs invalid, by feature)
6. **Documentation**: Add JSDoc comments for complex data structures
7. **Constants**: Use constants for indices, enums, and messages to avoid magic strings

## Maintenance

When adding new test data:
1. Define appropriate TypeScript interfaces/types
2. Group with related data
3. Use descriptive naming conventions
4. Add JSDoc comments
5. Update this README if needed
