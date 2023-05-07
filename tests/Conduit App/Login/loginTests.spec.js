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

test('User cannot login with BLANK EMAIL - Error appears', async ({ page }) => {
    
  // Go to Sign In page, enter login info with a Blank Email and click Sign In
  await page.getByText('Sign in').click();
  await page.getByPlaceholder('Password').type('abc');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  // Verify Error Message appears
  await expect(page.getByText('email can\'t be blank')).toBeVisible();
});

test('User cannot login with BLANK PASSWORD - Error appears', async ({ page }) => {
    
  // Go to Sign In page, enter login info with a Blank Password and click Sign In
  await page.getByText('Sign in').click();
  await page.getByPlaceholder('Email').type('abc@gmail.com');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  // Verify Error Message appears
  await expect(page.getByText('password can\'t be blank')).toBeVisible();
});

test('User cannot login with BLANK Values - API Returns a 500 error response', async ({ page }) => {
    
  // Go to Sign In page, enter login info with a Blank Password and click Sign In
  await page.getByText('Sign in').click();
  
  // Verify API returns 500 status code response
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForResponse(response => response.url() === 'https://api.realworld.io/api/users/login' && response.status() === 500 && response.request().method() === 'POST');
});