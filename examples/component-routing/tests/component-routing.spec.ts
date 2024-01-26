import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.locator('#layout')).toContainText('Home Page');

  await page.getByRole('link', { name: 'Van Element' }).click();
  await expect(page.locator('#layout')).toContainText('Van JS Element Page');

  await page.getByRole('link', { name: 'Doc Element' }).click();
  await expect(page.locator('#layout')).toContainText('Document Element Page');

  await page.getByRole('link', { name: 'From String' }).click();
  await expect(page.locator('#layout')).toContainText('From String Page');

  await page.getByRole('link', { name: 'Function', exact: true }).click();
  await expect(page.locator('#layout')).toContainText('Function Page');

  await page.getByRole('link', { name: 'Default Export' }).click();
  await expect(page.locator('#layout')).toContainText('Default Export Page');

  await page.getByRole('link', { name: 'Non Default Element' }).click();
  await expect(page.locator('#layout')).toContainText('Non Default Element Page');

  await page.getByRole('link', { name: 'Non Default Function' }).click();
  await expect(page.locator('#layout')).toContainText('Non Default Function Page');
  
  await page.getByRole('link', { name: 'Non Default String' }).click();
  await expect(page.locator('#layout')).toContainText('Non Default String Page');
});