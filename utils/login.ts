import { Page } from '@playwright/test';

/**
 * Performs SSO login
 * @param page Playwright page object
 * @param email User email for SSO login
 * @param location Location code for SSO login
 */
export async function loginWithSSO(page: Page, email: string = 'matthias.zax@rbinternational.com', location: string = 'rbi'): Promise<void> {
  await page.goto('https://accounts.lambdatest.com/login');
  await page.getByRole('button', { name: 'Allow selection' }).click();
  await page.getByRole('link', { name: 'Log in with SSO' }).click();
  await page.getByPlaceholder('Email*').click();
  await page.getByPlaceholder('Email*').fill(email);
  await page.getByPlaceholder('Email*').press('Enter');
  await page.locator('#location').selectOption(location);
  await page.getByRole('link', { name: 'Sign On' }).click();
  // Wait for login to complete
  await page.waitForTimeout(3000);
}

/**
 * Performs standard login
 * @param page Playwright page object
 * @param email User email
 */
export async function login(page: Page, email: string): Promise<void> {
  await page.goto('https://accounts.lambdatest.com/login');
  await page.getByPlaceholder('Email*').click();
  await page.getByPlaceholder('Email*').fill(email);
  // Click on the AGB checkbox
  await page.getByRole('checkbox', { name: 'AGB' }).click();
  // Click on the login button
  await page.getByRole('button', { name: 'Log in' }).click();
}
