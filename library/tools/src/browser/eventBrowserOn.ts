import type { Browser } from 'puppeteer';

export function eventBrowserOn(browser: Browser, name = '') {
  console.log(`CONNECTED ${name}`);

  browser.on('disconnected', () => {
    browser.removeAllListeners();
    console.log(`DISCONNECTED ${name}`);
  });

  let countTargetCreated = 1;
  browser.on('targetcreated', () => {
    console.log(`Target Created!!! Active: ${++countTargetCreated}`);
  });

  browser.on('targetdestroyed', () => {
    console.log(`Target Destroyed! Active: ${--countTargetCreated}`);
  });

  browser.on('targetchanged', () => {
    console.log(`Target Created!!! (changed)`);
  });

  return { browser };
}
