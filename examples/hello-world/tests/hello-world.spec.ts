import { test, expect } from '@playwright/test';

const homePage = 'http://localhost:5173/';

//
// url tests
//

test('home page by url', async ({ page }) => {
  await page.goto(homePage);

  await expect(page).toHaveTitle(/Van Cone Hello World/);
  await expect(page.getByText('Home Page')).toBeVisible();
})

test('user by url', async ({ page }) => {
  await page.goto(homePage + 'user/456');

  await expect(page.getByText('User Page')).toBeVisible();
  await expect(page.getByText('userId: 456')).toBeVisible();
})

//
// link tests
//

test('user link', async ({ page }) => {
  await page.goto(homePage);

  await page.getByRole('link', { name: 'User' }).click();

  await expect(page.getByText('User Page')).toBeVisible();
  await expect(page.getByText('userId: 123')).toBeVisible();
})

test('home page link', async ({ page }) => {
  await page.goto(homePage);

  await page.getByRole('link', { name: 'Home' }).click();

  await expect(page.getByText('Home Page')).toBeVisible();
})
