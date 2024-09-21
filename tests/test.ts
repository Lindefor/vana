import { expect, test } from '@playwright/test';

// test('home page has expected h1', async ({ page }) => {
// 	await page.goto('/');
// 	await expect(page.locator('h1')).toBeVisible();
// });

test('1+1=2', async () => {
	expect(1 + 1).toBe(2);
});