import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/') as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-shop-category app-permanent-header span')).getText() as Promise<string>;
  }
}
