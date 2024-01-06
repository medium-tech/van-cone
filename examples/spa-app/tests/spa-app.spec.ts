import { test, expect } from '@playwright/test';

test('nav bar', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // check nav bar
  await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('class', 'navbar-link');
  await expect(page.getByRole('link', { name: 'Users' })).toHaveAttribute('class', 'navbar-link');
  await expect(page.getByRole('link', { name: 'Context' })).toHaveAttribute('class', 'navbar-link');
  await expect(page.getByRole('link', { name: 'Agreement' })).toHaveAttribute('class', 'navbar-link');

  // check home page
  await expect(page.getByRole('heading')).toContainText('Welcome to this SPA demo using VanJS and Van Cone!');
  await expect(page.getByRole('img', { name: 'VanJS' })).toBeVisible();

  // current page == home
  await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Users' })).toHaveAttribute('aria-current', '');
  await expect(page.getByRole('link', { name: 'Context' })).toHaveAttribute('aria-current', '');
  await expect(page.getByRole('link', { name: 'Agreement' })).toHaveAttribute('aria-current', '');

  // check users page
  await page.getByRole('link', { name: 'Users' }).click();
  await expect(page.getByRole('heading')).toContainText('Users');

  // current page == users
  await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', '');
  await expect(page.getByRole('link', { name: 'Users' })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Context' })).toHaveAttribute('aria-current', '');
  await expect(page.getByRole('link', { name: 'Agreement' })).toHaveAttribute('aria-current', '');

  // check context page
  await page.getByRole('link', { name: 'Context' }).click();
  await expect(page.getByRole('heading')).toContainText('The state of the context object:');

  // current page == context
  await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', '');
  await expect(page.getByRole('link', { name: 'Users' })).toHaveAttribute('aria-current', '');
  await expect(page.getByRole('link', { name: 'Context' })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Agreement' })).toHaveAttribute('aria-current', '');

  // check agreement page
  await page.getByRole('link', { name: 'Agreement' }).click();
  await expect(page.locator('label')).toContainText('I agree with the terms and conditions');

  // current page == agreement
  await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', '');
  await expect(page.getByRole('link', { name: 'Users' })).toHaveAttribute('aria-current', '');
  await expect(page.getByRole('link', { name: 'Context' })).toHaveAttribute('aria-current', '');
  await expect(page.getByRole('link', { name: 'Agreement' })).toHaveAttribute('aria-current', 'page');

  // check home page
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.getByRole('heading')).toContainText('Welcome to this SPA demo using VanJS and Van Cone!');
  await expect(page.getByRole('img', { name: 'VanJS' })).toBeVisible();

  // current page == home
  await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Users' })).toHaveAttribute('aria-current', '');
  await expect(page.getByRole('link', { name: 'Context' })).toHaveAttribute('aria-current', '');
  await expect(page.getByRole('link', { name: 'Agreement' })).toHaveAttribute('aria-current', '');
});

test('not found', async ({ page }) => {
  await page.goto('http://localhost:5173/bad');
  await expect(page.getByRole('paragraph')).toContainText('page not found: /bad');
});

test('agreement context', async ({ page }) => {
    await page.goto('http://localhost:5173/context');
  await expect(page.locator('span')).toContainText('The agreement: false');
  await expect(page.locator('span')).toHaveClass('danger');

  await page.getByRole('link', { name: 'Agreement' }).click();
  await page.getByLabel('I agree with the terms and').check();

  await page.getByRole('link', { name: 'click here' }).click();
  await expect(page.locator('span')).toContainText('The agreement: true');
  await expect(page.locator('span')).toHaveClass('success');

  // ensure state is maintained on address bar change
  await page.reload();
  await expect(page.locator('span')).toContainText('The agreement: true');
  await expect(page.locator('span')).toHaveClass('success');
});