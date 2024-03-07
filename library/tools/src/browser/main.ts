import type { Page } from 'puppeteer';

import { getNewUniqueBrowser } from './UniqueBrowser';

export async function fn_78a85a() {
  const { browser } = await getNewUniqueBrowser('', true);
  const { page } = eventPageOn(await browser.newPage(), '');
  page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
  return [page.goto('https://google.com'), browser];
}
fn_78a85a();

export function eventPageOn(page: Page, id: string) {
  const name = `Page id: ${id}`;
  page.on('close', () => {
    let removeAllListenersCount = 0;
    page.removeAllListeners();
    console.log(`${name} close ${++removeAllListenersCount}`);
  });
  let loadCount = 0;
  page.on('load', () => {
    console.log(`${name} load ${++loadCount}`);
  });

  let requestCount = 0;
  page.on('request', httpRequest => {
    console.log(`${name} request ${++requestCount}`);
    void httpRequest;
  });
  let consoleCount = 0;
  page.on('console', () => {
    console.log(`${name} console ${++consoleCount}`);
  });
  let dialogCount = 0;
  page.on('dialog', () => {
    console.log(`${name} dialog ${++dialogCount}`);
  });
  let domcontentloadedCount = 0;
  page.on('domcontentloaded', () => {
    console.log(`${name} domcontentloaded ${++domcontentloadedCount}`);
  });
  let errorCount = 0;
  page.on('error', error => {
    console.log(`${name} error ${++errorCount}`);
    void error;
  });
  let frameattachedCount = 0;
  page.on('frameattached', frame => {
    console.log(`${name} frameattached ${++frameattachedCount}`);
    void frame;
  });
  let framedetachedCount = 0;
  page.on('framedetached', frame => {
    console.log(`${name} framedetached ${++framedetachedCount}`);
    void frame;
  });
  let framenavigatedCount = 0;
  page.on('framenavigated', frame => {
    console.log(`${name} framenavigated ${++framenavigatedCount}`);
    void frame;
  });

  let metricsCount = 0;
  page.on('metrics', () => {
    console.log(`${name} metrics ${++metricsCount}`);
  });
  let pageerrorCount = 0;
  page.on('pageerror', error => {
    console.log(`${name} pageerror ${++pageerrorCount}`);
    void error;
  });
  let popupCount = 0;
  page.on('popup', page_ => {
    console.log(`${name} popup ${++popupCount}`);

    page_;
  });

  let requestfailedCount = 0;
  page.on('requestfailed', httpRequest => {
    console.log(`${name} requestfailed ${++requestfailedCount}`);
    void httpRequest;
  });

  let requestfinishedCount = 0;
  page.on('requestfinished', httpRequest => {
    console.log(`${name} requestfinished ${++requestfinishedCount}`);
    void httpRequest;
  });

  let requestservedfromcacheCount = 0;
  page.on('requestservedfromcache', httpRequest => {
    console.log(
      `${name} requestservedfromcache ${++requestservedfromcacheCount}`
    );
    void httpRequest;
  });
  let responseCount = 0;
  page.on('response', httpResponse => {
    console.log(`${name} response ${++responseCount}`);
    void httpResponse;
  });
  let workercreatedCount = 0;
  page.on('workercreated', () => {
    console.log(`${name} workercreated ${++workercreatedCount}`);
  });
  let workerdestroyedCount = 0;
  page.on('workerdestroyed', () => {
    console.log(`${name} workerdestroyed ${++workerdestroyedCount}`);
  });

  return { page };
}
