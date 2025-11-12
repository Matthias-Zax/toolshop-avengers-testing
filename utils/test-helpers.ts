import { Page } from '@playwright/test';
import { Logger } from './logger';

export class TestHelpers {
    static async waitAndClick(page: Page, selector: string, timeout = 5000) {
        try {
            await page.waitForSelector(selector, { timeout });
            await page.click(selector);
        } catch (error) {
            Logger.error(`Failed to click element: ${selector}`);
            throw error;
        }
    }

    static async waitAndFill(page: Page, selector: string, text: string, timeout = 5000) {
        try {
            await page.waitForSelector(selector, { timeout });
            await page.fill(selector, text);
        } catch (error) {
            Logger.error(`Failed to fill element: ${selector}`);
            throw error;
        }
    }

    static async isElementVisible(page: Page, selector: string, timeout = 5000): Promise<boolean> {
        try {
            await page.waitForSelector(selector, { timeout, state: 'visible' });
            return true;
        } catch {
            return false;
        }
    }

    static async takeScreenshot(page: Page, name: string) {
        try {
            await page.screenshot({ path: `./screenshots/${name}.png`, fullPage: true });
            Logger.info(`Screenshot saved: ${name}.png`);
        } catch (error) {
            Logger.error(`Failed to take screenshot: ${name}`);
            throw error;
        }
    }
}
