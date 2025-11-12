---
applyTo: '**'
---

# Zephyr Integration for TTAG Playwright Template

## Overview
This document defines the Zephyr test management integration for the TTAG Playwright automation framework. Zephyr integration enables automatic test result reporting to JIRA/Zephyr for enterprise test tracking and management.

## Setup

### Installation
The project uses `ttag-playwright-zephyr` package for Zephyr integration:
```bash
npm install ttag-playwright-zephyr
```

### Environment Variables
Set the following environment variable for Zephyr API authentication:
```powershell
$env:ZEPHYR_TOKEN = "your-zephyr-api-token"
```

### Configuration
Add Zephyr reporter to `playwright.config.ts`:
```typescript
export default defineConfig({
  reporter: [
    ['html'],
    ['ttag-playwright-zephyr/reporter', {
      projectKey: 'TAG',
      environment: 'chrome',
      testCycle: 'TAG-C19',
      // Optional settings
      uploadResults: true,
      createNewCycle: false,
    }]
  ],
});
```

## Usage in Tests

### Import Statement
```typescript
import { addZephyrInfo } from 'ttag-playwright-zephyr';
```

### Adding Zephyr Info to Tests
Every test should include `addZephyrInfo()` call with three parameters:

```typescript
test('T1_LOGIN_validUser_loginSuccessful', async ({ page }) => {
  addZephyrInfo('T001', 'Verify successful login with valid credentials', 'TAG-C19');
  
  // Test implementation
});
```

### Parameters

#### 1. Test ID (string)
- Unique identifier for the test in Zephyr
- Format: `T###` (e.g., `T001`, `T002`, `T100`)
- Should be sequential and grouped by feature

#### 2. Test Description (string)
- Brief description of what the test verifies
- Should be clear and concise
- Examples:
  - `"Verify successful login with valid credentials"`
  - `"Verify search functionality with valid input"`
  - `"Verify error handling for invalid data"`

#### 3. Test Cycle (string)
- The Zephyr test cycle identifier
- Format: `PROJECT-C##` (e.g., `TAG-C19`)
- Represents the test execution cycle in JIRA/Zephyr

## Test ID Management

### ID Ranges by Feature
Organize test IDs by feature for better maintainability:

- **T001-T099**: Authentication & Authorization
- **T100-T199**: Search Functionality
- **T200-T299**: User Management
- **T300-T399**: Payment Processing
- **T400-T499**: Profile Management
- **T500-T599**: Navigation & UI
- **T600-T699**: Cart & Checkout
- **T700-T799**: API Integration
- **T800-T899**: Security & Validation
- **T900-T999**: Performance & Load

### Sequential Numbering
Within each feature range, use sequential numbering:

```typescript
// Authentication tests (T001-T099)
test('T1_LOGIN_validUser_success', async ({ page }) => {
  addZephyrInfo('T001', 'Verify login with valid credentials', 'TAG-C19');
});

test('T2_LOGIN_socialMedia_success', async ({ page }) => {
  addZephyrInfo('T002', 'Verify OAuth login', 'TAG-C19');
});

test('T3_LOGIN_serverDown_errorDisplayed', async ({ page }) => {
  addZephyrInfo('T003', 'Verify error handling during server downtime', 'TAG-C19');
});

// Search tests (T100-T199)
test('T1_SEARCH_validQuery_resultsDisplayed', async ({ page }) => {
  addZephyrInfo('T100', 'Verify search with valid query', 'TAG-C19');
});
```

## Complete Test Example

```typescript
import test from '../lambdatest-setup';
import { expect } from '@playwright/test';
import { addZephyrInfo } from 'ttag-playwright-zephyr';
import { LoginPage } from '../pages/login.page';

test.describe('Authentication Tests', () => {
  test('T1_LOGIN_validCredentials_userLoggedInSuccessfully', async ({ page }) => {
    // Zephyr integration - always first line in test
    addZephyrInfo('T001', 'Verify successful login with valid credentials', 'TAG-C19');
    
    // Test implementation
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('user@example.com', 'password123');
    
    // Assertions
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('T4_LOGIN_invalidPassword_errorMessageDisplayed', async ({ page }) => {
    addZephyrInfo('T004', 'Verify login fails with incorrect password', 'TAG-C19');
    
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('user@example.com', 'wrongpassword');
    
    await expect(page.locator('.error-message')).toContainText('Invalid credentials');
  });
});
```

## Test Cycles

### Creating Test Cycles
Test cycles should be created in Zephyr/JIRA before running tests:
1. Navigate to JIRA project (e.g., TAG)
2. Create new test cycle (e.g., TAG-C19)
3. Use the cycle ID in `addZephyrInfo()` calls

### Multiple Test Cycles
For different environments or sprints, use different cycle IDs:

```typescript
// Development environment
addZephyrInfo('T001', 'Verify login', 'TAG-C19');

// Staging environment
addZephyrInfo('T001', 'Verify login', 'TAG-C20');

// Production environment
addZephyrInfo('T001', 'Verify login', 'TAG-C21');
```

## Reporter Configuration Options

### Basic Configuration
```typescript
['ttag-playwright-zephyr/reporter', {
  projectKey: 'TAG',           // JIRA project key
  environment: 'chrome',       // Test environment
  testCycle: 'TAG-C19',       // Default test cycle
}]
```

### Advanced Configuration
```typescript
['ttag-playwright-zephyr/reporter', {
  projectKey: 'TAG',
  environment: 'chrome',
  testCycle: 'TAG-C19',
  uploadResults: true,         // Upload results to Zephyr
  createNewCycle: false,       // Create new cycle if not exists
  includeScreenshots: true,    // Attach screenshots on failure
  includeTrace: true,          // Attach Playwright trace
  timeout: 30000,              // API request timeout (ms)
}]
```

## Best Practices

### 1. Always Add Zephyr Info First
Place `addZephyrInfo()` as the first line in every test:
```typescript
test('T1_FEATURE_action_result', async ({ page }) => {
  addZephyrInfo('T001', 'Description', 'TAG-C19'); // Always first
  // Rest of test implementation
});
```

### 2. Use Descriptive Test Descriptions
Make descriptions clear and actionable:
```typescript
// ✅ Good
addZephyrInfo('T001', 'Verify user can login with valid email and password', 'TAG-C19');

// ❌ Bad
addZephyrInfo('T001', 'Login test', 'TAG-C19');
```

### 3. Keep Test IDs Sequential
Maintain sequential numbering within feature ranges:
```typescript
// ✅ Good
addZephyrInfo('T001', 'Test 1', 'TAG-C19');
addZephyrInfo('T002', 'Test 2', 'TAG-C19');
addZephyrInfo('T003', 'Test 3', 'TAG-C19');

// ❌ Bad (random numbering)
addZephyrInfo('T001', 'Test 1', 'TAG-C19');
addZephyrInfo('T055', 'Test 2', 'TAG-C19');
addZephyrInfo('T007', 'Test 3', 'TAG-C19');
```

### 4. Use Consistent Test Cycle
Use the same test cycle for related tests in a sprint/release:
```typescript
// All tests in sprint use TAG-C19
addZephyrInfo('T001', 'Login test', 'TAG-C19');
addZephyrInfo('T002', 'Search test', 'TAG-C19');
addZephyrInfo('T100', 'Checkout test', 'TAG-C19');
```

### 5. Document ID Ranges
Maintain a mapping of ID ranges to features in project documentation:
```markdown
## Test ID Ranges
- T001-T099: Authentication
- T100-T199: Search
- T200-T299: User Management
```

## Troubleshooting

### Missing Zephyr Token
If tests fail to report to Zephyr, verify token is set:
```powershell
echo $env:ZEPHYR_TOKEN
```

### Test Not Appearing in Zephyr
1. Verify test cycle exists in JIRA
2. Check test ID is unique
3. Ensure `addZephyrInfo()` is called in test
4. Verify `uploadResults: true` in config

### Duplicate Test IDs
Each test must have a unique test ID. If duplicates exist:
1. Review all test IDs in the project
2. Reassign sequential IDs
3. Update Zephyr info calls

## Running Tests with Zephyr Reporting

```powershell
# Run all tests and report to Zephyr
npx playwright test

# Run specific project with Zephyr reporting
npx playwright test --project="chromium-playwright"

# Run on LambdaTest with Zephyr reporting
npx playwright test --project="chrome:latest:Windows 10@lambdatest"

# View HTML report
npx playwright show-report
```

After test execution, results are automatically uploaded to Zephyr with:
- Test execution status (Passed/Failed/Skipped)
- Execution time
- Error messages and stack traces
- Screenshots (if configured)
- Playwright traces (if configured)

## Integration with CI/CD

### GitHub Actions Example
```yaml
- name: Run Playwright Tests
  env:
    ZEPHYR_TOKEN: ${{ secrets.ZEPHYR_TOKEN }}
  run: npx playwright test

- name: Upload Zephyr Report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: zephyr-report
    path: playwright-report/
```

### Azure DevOps Example
```yaml
- task: Npm@1
  displayName: 'Run Playwright Tests'
  inputs:
    command: custom
    customCommand: 'playwright test'
  env:
    ZEPHYR_TOKEN: $(ZEPHYR_TOKEN)
```

This Zephyr integration ensures comprehensive test tracking and reporting for enterprise test management workflows.
