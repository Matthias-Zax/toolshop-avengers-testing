import { test } from '@playwright/test';

export class Logger {
    static info(message: string) {
        test.info().annotations.push({ type: 'info', description: message });
        console.log(`[INFO] ${message}`);
    }

    static error(message: string) {
        test.info().annotations.push({ type: 'error', description: message });
        console.error(`[ERROR] ${message}`);
    }

    static warning(message: string) {
        test.info().annotations.push({ type: 'warning', description: message });
        console.warn(`[WARNING] ${message}`);
    }
}
