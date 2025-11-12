# Playwright Test Automation Template

This template provides a structured foundation for creating end-to-end tests using Playwright.

## 🚀 Getting Started

For detailed information about Playwright, visit the official [Getting Started Guide](https://playwright.dev/docs/intro).

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
```bash
npm install
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests in UI mode
npx playwright test --ui

# Run tests with debug mode
npx playwright test --debug
```

## 📁 Project Structure

```
├── tests/                    # Test files
├── pages/                    # Page Object Models
├── fixtures/                 # Test fixtures
├── utils/                    # Helper utilities
├── data/                    # Test data
└── config/                  # Environment configurations
```

### Key Components

- **tests/**: Contains all test files organized by feature or functionality
- **pages/**: Page Object Models for better maintainability
- **fixtures/**: Reusable test fixtures
- **utils/**: Helper functions and utilities
- **data/**: Test data management
- **config/**: Environment-specific configurations

## 🔧 Configuration

The template uses `playwright.config.ts` for core configuration. Environment-specific settings can be found in the `config` directory.

### Environment Variables

Create a `.env` file in the root directory:

```env
BASE_URL=https://your-app-url
API_KEY=your-api-key
```

## 📝 Best Practices

1. **Page Object Pattern**
   - Use Page Object Models for better maintainability
   - Keep selectors in page objects
   - Implement common actions as methods

2. **Test Data Management**
   - Use fixtures for test data
   - Avoid hardcoding test data in tests
   - Use data generators for dynamic data

3. **Test Structure**
   - Follow AAA pattern (Arrange, Act, Assert)
   - Keep tests independent
   - Use descriptive test names

4. **Error Handling**
   - Implement proper error handling
   - Use custom error messages
   - Take screenshots on failure

## 🤝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request
