import { AppPage } from './app.po';
import { browser, logging, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';
import { UserPannelComponent } from '../../../shop-site/src/app/user-pannel/user-pannel.component';


describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('ShopyFy');
  });

  it('user should click on the pager item', () => {
    element(by.css('app-shop-pager .itemclick')).click();
  });

  it('should expect to redirect to Login', () => {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');
  });

  it('now we input some login credentials and login', () => {
    browser.sleep(2000);
    const email = element(by.id('emailBox'));
    const password = element(by.id('passwordBox'));

    email.sendKeys('macovei@ciprian.com');
    password.sendKeys('asdasd');

    element(by.tagName('button')).click();
  });

  it('now verify if the user is loged in', () => {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/home');
    element(by.css('app-shop-category app-permanent-header app-user-pannel .user')).getText().then( res => res === 'macovei@ciprian.com');


  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
