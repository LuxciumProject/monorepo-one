import type { Browser } from 'puppeteer';
import puppeteer from 'puppeteer';

import { eventBrowserOn } from './eventBrowserOn';

export class UniqueBrowser {
  private readonly _browser: { browser: Browser; ID: number };

  private static _browserID = 1;

  private static _browserCount = 0;

  private static async getNewBrowser(name = '', headless = false) {
    let browser = await puppeteer.launch({ headless });
    browser = eventBrowserOn(browser, name).browser;
    return browser;
  }

  static async getNewUniqueBrowser(name = '', displayBrowser = false) {
    const ID = UniqueBrowser._browserID++;
    const browser = await UniqueBrowser.getNewBrowser(name, !displayBrowser);

    // TODO: will be implemented later whit browser.close ------------
    UniqueBrowser._browserCount++;
    UniqueBrowser._browserCount;

    return new UniqueBrowser(browser, ID);
  }

  private constructor(browser: Browser, ID: number) {
    this._browser = { browser, ID };
  }

  get browser() {
    return this._browser.browser;
  }

  get ID() {
    return this._browser.ID;
  }
}

export const getNewUniqueBrowser = UniqueBrowser.getNewUniqueBrowser;
