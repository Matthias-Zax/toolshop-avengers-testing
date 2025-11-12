# AI Coding Instructions for TTAG Playwright Template

## Project Architecture

This is a **Playwright test automation template** for RBI (Raiffeisen Bank International) with enterprise-grade testing patterns including LambdaTest cloud integration, Zephyr test management, and multi-browser setup dependencies.

### Key Components

- **Page Objects**: Inherit from `BasePage` (see `pages/base.page.ts`) - provides cookie consent handling, localization support, and common utilities
- **Test Setup Dependencies**: Use `*.setup.ts` files that run before main tests - handle auth, environment validation, test data initialization
- **Multi-Environment Testing**: LambdaTest cloud integration (`lambdatest-setup.ts`) with local fallback capability
- **Test Management**: Zephyr integration for enterprise test tracking (`ttag-playwright-zephyr` package)

## Critical Development Workflows

### Test Execution with Dependencies
```powershell
# Run all projects (setup runs first, then dependent projects in parallel)
npx playwright test

# Run specific project (automatically includes setup dependency)
npx playwright test --project="chrome:latest:MacOS Ventura@lambdatest"
```

### Project Structure Pattern
- `tests/*.setup.ts` - Setup projects (auth, data, environment validation)
- `tests/*.spec.ts` - Main test files that depend on setup
- `pages/*.page.ts` - Page objects extending `BasePage`
- Import test from `../lambdatest-setup` (not `@playwright/test`) for cloud compatibility

## Project-Specific Conventions

### Page Object Pattern
- **Extend BasePage**: All page objects inherit from `BasePage` for cookie consent and common functionality
- **Multi-selector Strategy**: Use arrays of selectors for robust element location (see `JobPortalPage.searchInputSelectors`)
- **Localization Support**: Page objects handle multiple languages (German/English selectors)

### Test Structure Pattern
```typescript
// Import from lambdatest-setup, not @playwright/test
import test from '../lambdatest-setup';
import { addZephyrInfo } from 'ttag-playwright-zephyr';

test.describe('Feature Name', () => {
  // Always add Zephyr tracking with test ID and cycle
  test('[T20] descriptive_test_name', async ({ page }) => {
    addZephyrInfo('T20', 'Test description', 'TAG-C19');
    // Test implementation
  });
});
```

### Naming Conventions
- Test files: `feature-name.spec.ts`
- Setup files: `feature.setup.ts` 
- Test names: `[T##] T#_FEATURE_ACTION_CONDITION_EXPECTED_RESULT` format
- Page objects: `FeaturePage` extending `BasePage`

### Configuration Management
- **Multi-project setup** in `playwright.config.ts` with dependency chains
- **LambdaTest integration** through project name pattern `"browser:version:platform@lambdatest"`
- **Environment variables**: `LT_USERNAME`, `LT_ACCESS_KEY`, `ZEPHYR_TOKEN`
- **Zephyr reporter** configured with project key `TAG`, environment `chrome`, test cycle `TAG-C19`

## Integration Points

### LambdaTest Cloud Testing
- Tests automatically detect LambdaTest projects by name pattern
- SSL certificate handling for WebSocket connections
- Dynamic capability modification based on project configuration
- Fallback to local execution for non-LambdaTest projects

### Zephyr Test Management
- All tests must include `addZephyrInfo()` calls with test ID, description, and cycle
- Reporter uploads results to JIRA/Zephyr with configurable options
- Test cycle management through configuration

### Authentication & Setup Dependencies
- Setup projects run first and can save authentication state to `playwright/.auth/user.json`
- Main tests depend on setup projects - use `dependencies: ['setup']` in config
- Environment validation and test data initialization handled in setup phase

## Error Handling & Resilience Patterns

### Robust Element Location
```typescript
// Use multiple selector strategies for fragile UI elements
private readonly searchInputSelectors = [
  'input[type="search"]',
  'input[placeholder*="Search"]', 
  '[data-testid*="search-input"]'
];
```

### Cookie Consent Handling
- Automatic cookie consent detection in `BasePage.handleCookieConsent()`
- Multi-language support for international applications
- Called automatically in page navigation methods

### Localization Support
- Page objects support German/English selectors
- Language detection through `hasLanguage()` method
- URL locale parameters for international testing

## File Templates

When creating new tests, follow these patterns:

**New Test File**:
```typescript
import test from '../lambdatest-setup'; // Not @playwright/test
import { addZephyrInfo } from 'ttag-playwright-zephyr';
import { YourPage } from '../pages/your.page';
```

**New Page Object**:
```typescript
import { BasePage } from './base.page';
export class YourPage extends BasePage {
  // Multi-selector arrays for robust element location
  // Localization support in selectors
}
```

**Setup File**:
```typescript
import { test as setup } from '@playwright/test';
setup('operation name', async ({ page }) => {
  // Setup logic - auth, data, validation
});
```