// src/__tests__/EndToEnd.test.js

import puppeteer, { Browser, Page } from "puppeteer";

describe('show/hide event details', () => {
    jest.setTimeout(30000);
    /**
    * @type {Browser}
    */
    let browser
    /**
     * @type {Page}
     */
    let page;
    let lastTest = false;
    beforeAll(async () => {
        browser = await puppeteer.launch();
    });
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
    });
    afterEach(async () => {
        if (!lastTest) await page.close();
    });
    afterAll(() => {
        browser.close();
    });
    test('An event element is collapsed by default', async () => {
        try {
            await page.waitForSelector('div.accordion-collapse.collapse.show', { timeout: 1000 });
        } catch (error) {
            if (!(error instanceof puppeteer.errors.TimeoutError)) throw error;
        }
    });
    test('User can expand an event to see its details', async () => {
        await page.waitForSelector('div.accordion-collapse.collapse');
        (await page.waitForSelector('button.accordion-button')).click();
        await page.waitForSelector('div.accordion-collapse.collapse.show');
        expect(await page.$$('div.accordion-collapse.collapse.show')).toHaveLength(1);
    });
    test('User can collapse an event to hide its details', async () => {
        lastTest = true;
        const button = await page.waitForSelector('button.accordion-button');
        await button.click();
        await page.waitForSelector('div.accordion-collapse.collapse.show');
        await button.click();
        setTimeout(() => {
            expect(page.$$('div.accordion-collapse.collapse.show')).toHaveLength(0);
        }, 1000);
    });
});