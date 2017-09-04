import { MagneticbroadcastPage } from './app.po';

describe('magneticbroadcast App', function() {
  let page: MagneticbroadcastPage;

  beforeEach(() => {
    page = new MagneticbroadcastPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
