// @ts-check
const { test, expect } = require('@playwright/test');

const date = new Date();
let now = date.getTime();
let airlineId = now * (Math.floor(Math.random() * 1000));

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
  });

test('Create airline via POST endpoint then validate via GET endpoint', async ({ request }) => {
    // Create new airline via POST endpoint
    const newAirline = await request.post('https://api.instantwebtools.net/v1/airlines', {
    data: {
        id: airlineId,
        name: 'Playwright Airlines',
        country: 'USA',
        logo: 'Fly Away!',
        slogan: 'Affordable Luxury',
        head_quaters: 'Los Angeles, CA',
        website: 'playwright.com',
        established: '2023',
        }
    });
    expect(newAirline.ok()).toBeTruthy();

    // Verify the new airline was created via the GET endpoint
    const airline = await request.get(`https://api.instantwebtools.net/v1/airlines/${airlineId}`);
    expect(airline.ok()).toBeTruthy();
    expect(await airline.json()).toEqual(expect.objectContaining({
        id: airlineId,
        name: 'Playwright Airlines',
        country: 'USA',
        logo: 'Fly Away!',
        slogan: 'Affordable Luxury',
        head_quaters: 'Los Angeles, CA',
        website: 'playwright.com',
        established: '2023',
      }));
  });