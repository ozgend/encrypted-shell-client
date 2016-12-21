import { EncryptedShellClientPage } from './app.po';

describe('encrypted-shell-client App', function() {
  let page: EncryptedShellClientPage;

  beforeEach(() => {
    page = new EncryptedShellClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
