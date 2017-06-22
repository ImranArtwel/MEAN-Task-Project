import { AngularClientPage } from './app.po';

describe('angular-client App', () => {
  let page: AngularClientPage;

  beforeEach(() => {
    page = new AngularClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
