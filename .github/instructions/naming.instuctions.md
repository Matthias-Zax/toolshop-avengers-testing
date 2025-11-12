---
applyTo: '**'
---

# Test Case Naming Conventions for TTAG Playwright Template

## Overview
This document defines the standardized naming conventions for test cases in the TTAG Playwright automation framework. These conventions ensure consistency, readability, and maintainability.

## Test Scenario Naming Structure

### Format
```
T#_FEATURE_ACTION_CONDITION_EXPECTED_RESULT
```

### Components
- **T#**: Test case type (T1-T5)
- **FEATURE**: Feature/module being tested (UPPERCASE)
- **ACTION**: Action performed (camelCase)
- **CONDITION**: Test condition/input state (camelCase)
- **EXPECTED_RESULT**: Expected outcome (camelCase)

## Test Case Types

### T1 - Standard Case (Happy Path)
Most common user workflow with valid inputs.

```typescript
test('T1_LOGIN_validUserWithCorrectPassword_userIsLoggedInAndGetsToken', async ({ page }) => {
  // Test implementation
});

test('T1_SEARCH_enterValidQuery_resultsDisplayedSuccessfully', async ({ page }) => {
  // Test implementation
});
```

### T2 - Alternative Case (Alternative Happy Path)
Alternative valid workflows achieving the same goal.

```typescript
test('T2_LOGIN_validUserWithValidIdCard_userIsLoggedInAndGetsToken', async ({ page }) => {
  // Test implementation
});

test('T2_SEARCH_useAdvancedSearchFilters_filteredResultsDisplayed', async ({ page }) => {
  // Test implementation
});
```

### T3 - Exception Case (System Errors)
System encounters unexpected conditions but handles gracefully.

```typescript
test('T3_LOGIN_validUserWithNotReadableIdCard_userGetErrorMessageAndIsNotLoggedIn', async ({ page }) => {
  // Test implementation
});

test('T3_SEARCH_serverTimeoutDuringQuery_timeoutErrorDisplayedGracefully', async ({ page }) => {
  // Test implementation
});
```

### T4 - Negative Case (Invalid Inputs)
Invalid inputs to ensure proper validation and error handling.

```typescript
test('T4_LOGIN_validUserWithWrongPassword_userGetErrorMessageAndIsNotLoggedIn', async ({ page }) => {
  // Test implementation
});

test('T4_SEARCH_enterEmptyQuery_noResultsMessageDisplayed', async ({ page }) => {
  // Test implementation
});
```

### T5 - Misuse Case (Security & Abuse)
Users attempting to misuse the system or bypass security.

```typescript
test('T5_LOGIN_validUserWithLockedIdCard_userGetErrorMessageAndIsNotLoggedIn', async ({ page }) => {
  // Test implementation
});

test('T5_SEARCH_attemptSqlInjectionInQuery_maliciousInputSanitizedAndBlocked', async ({ page }) => {
  // Test implementation
});
```

## Naming Guidelines

### Feature Names (UPPERCASE)
`LOGIN`, `SEARCH`, `REGISTRATION`, `PAYMENT`, `PROFILE`, `NAVIGATION`, `CART`, `CHECKOUT`, `API`, `DASHBOARD`

### Action Names (camelCase)
`login`, `logout`, `search`, `filter`, `create`, `update`, `delete`, `navigate`, `submit`, `upload`, `download`, `validate`

### Condition Names (camelCase)
`validCredentials`, `invalidPassword`, `emptyFields`, `validQuery`, `specialCharacters`, `existingUser`, `lockedAccount`, `expiredToken`

### Expected Result Names (camelCase)
`userLoggedInSuccessfully`, `accessDenied`, `errorMessageDisplayed`, `resultsDisplayed`, `validationFailed`, `redirectToLogin`

## File Naming Conventions

### Test Files
- Format: `feature-name.spec.ts`
- Examples: `login.spec.ts`, `user-registration.spec.ts`, `product-search.spec.ts`

### Setup Files
- Format: `feature-name.setup.ts`
- Examples: `auth.setup.ts`, `database.setup.ts`, `environment.setup.ts`

### Page Object Files
- Format: `feature-name.page.ts`
- Examples: `login.page.ts`, `search.page.ts`, `checkout.page.ts`

## Examples by Feature

### Authentication Tests
```typescript
test('T1_LOGIN_validUserWithCorrectPassword_userLoggedInSuccessfully', async ({ page }) => {
  // Test implementation
});

test('T2_LOGIN_validUserWithSocialMedia_userLoggedInThroughOAuth', async ({ page }) => {
  // Test implementation
});

test('T4_LOGIN_validUserWithWrongPassword_loginDeniedWithErrorMessage', async ({ page }) => {
  // Test implementation
});

test('T5_LOGIN_attemptBruteForceAttack_accountLockedAfterFailedAttempts', async ({ page }) => {
  // Test implementation
});
```

### E-commerce Tests
```typescript
test('T1_SEARCH_enterValidProductName_relevantProductsDisplayed', async ({ page }) => {
  // Test implementation
});

test('T1_CART_addValidProductToCart_productAddedSuccessfully', async ({ page }) => {
  // Test implementation
});

test('T4_CHECKOUT_submitOrderWithExpiredCard_paymentDeclinedWithErrorMessage', async ({ page }) => {
  // Test implementation
});
```

## Best Practices

1. **Consistency**: Follow exact format for all test names
2. **Clarity**: Test names are self-documenting (max 100 chars)
3. **Uniqueness**: Each test has unique name within the test suite
4. **Descriptive**: Use meaningful feature, action, condition, and result names

## Integration with TTAG Template

### Import Structure
```typescript
import test from '../lambdatest-setup'; // Not @playwright/test
import { expect } from '@playwright/test';
import { FeaturePage } from '../pages/feature.page';
```

### Test Structure Template
```typescript
test('T#_FEATURE_ACTION_CONDITION_EXPECTED_RESULT', async ({ page }) => {
  const featurePage = new FeaturePage(page);
  await featurePage.performAction();
  await expect(page).toHaveTitle(/Expected Title/);
});
```