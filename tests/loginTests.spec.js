// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    // Go to Conduit Page
    await page.goto('https://demo.realworld.io/#/');
  });

test('User can Login with VALID User', async ({ page }) => {
  // Go to Sign In page, enter login info and login
  await page.getByText('Sign in').click();
  await page.getByPlaceholder('Email').type('qaportfolioaz@gmail.com');
  await page.getByPlaceholder('Password').type('Loveqa!123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  // Verify the user logged in successfully
  await expect(page.getByRole('link', { name: 'Your Feed' })).toHaveText('Your Feed');
  await expect(page.getByRole('link', { name: 'Global Feed' })).toHaveText('Global Feed');
});

test('User cannot login with INVALID User - Error appears', async ({ page }) => {
    
  // Go to Sign In page, enter login info for an INVALID user and click Sign In
  await page.getByText('Sign in').click();
  await page.getByPlaceholder('Email').type('abc@gmail.com');
  await page.getByPlaceholder('Password').type('abc');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  // Verify Error Message appears
  await expect(page.getByText('email or password is invalid')).toBeVisible();
});