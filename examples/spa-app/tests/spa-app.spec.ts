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

  await page.goto('http://localhost:5173/user/9');
  await expect(page.getByRole('paragraph')).toContainText('user id was not found');
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

  // ensure state is maintained on navigation
  await page.goBack();
  await page.goForward();
  await expect(page.locator('span')).toContainText('The agreement: true');
  await expect(page.locator('span')).toHaveClass('success');
});

test('users', async ({ page }) => {

  const usersUrl = 'http://localhost:5173/users'
  const usersAscUrl = 'http://localhost:5173/users?sort=asc'
  const usersDescUrl = 'http://localhost:5173/users?sort=desc'

  const defaultUserList = ['Mendoza, Pilar', 'Doe, John', 'Smith, Ashley', 'Johnson, Timothy'];
  const ascUserList = ['Doe, John', 'Johnson, Timothy', 'Mendoza, Pilar', 'Smith, Ashley'];
  const descUserList = ['Smith, Ashley', 'Mendoza, Pilar', 'Johnson, Timothy', 'Doe, John'];

  //
  // default sort order
  //

  await page.goto(usersUrl);
  await expect(page.locator('ul > li')).toHaveText(defaultUserList);

  await page.getByRole('link', { name: 'Mendoza, Pilar' }).click();
  await expect(page.getByRole('table')).toContainText('Pilar');
  await page.getByRole('link', { name: 'Users' }).click();

  await page.getByRole('link', { name: 'Doe, John' }).click();
  await expect(page.getByRole('table')).toContainText('John');
  await page.getByRole('link', { name: 'Users' }).click();

  await page.getByRole('link', { name: 'Smith, Ashley' }).click();
  await expect(page.getByRole('table')).toContainText('Ashley');
  await page.getByRole('link', { name: 'Users' }).click();

  await page.getByRole('link', { name: 'Johnson, Timothy' }).click();
  await expect(page.getByRole('table')).toContainText('Timothy');

  await page.getByRole('link', { name: 'Users' }).click();

  //
  // asc sort order
  //

  await page.getByRole('link', { name: 'asc' }).click();
  await expect(page).toHaveURL(usersAscUrl);
  await expect(page.locator('ul > li')).toHaveText(ascUserList);

  await page.goto(usersAscUrl);
  await expect(page.locator('ul > li')).toHaveText(ascUserList);

  //
  // desc sort order
  //

  await page.getByRole('link', { name: 'desc' }).click();
  await expect(page).toHaveURL(usersDescUrl);
  await expect(page.locator('ul > li')).toHaveText(descUserList);

  await page.goto(usersDescUrl);
  await expect(page.locator('ul > li')).toHaveText(descUserList);

});