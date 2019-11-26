import { newE2EPage } from '@stencil/core/testing';

describe('checkout', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nim-checkout></nim-checkout>');
    const element = await page.find('nim-checkout');
    expect(element).toHaveClass('hydrated');
  });

  it('should open nimiq hub to proceed to checkout', async () => {
    const page = await newE2EPage();

    await page.setContent('<nim-checkout></nim-checkout>');
    const element = await page.find('nim-checkout');
    element.click();

    await page.waitForChanges();

    const button = await page.find('nim-checkout >>> button');
    expect(button).toEqualText('In progress...');
  });
});
