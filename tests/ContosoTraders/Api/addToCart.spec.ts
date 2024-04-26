import { expect, test } from '@playwright/test';
import { HomePage } from '../../../pages/ContosoTraders/homePage';
import { ProductDetailPage } from '../../../pages/ContosoTraders/productDetailPage';

test.describe('Contoso Traders', () => {

    // eslint-disable-next-line playwright/expect-expect
    test('Should add an item to the cart', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goTo();
        await homePage.allProductsClick();
        await homePage.selecctRandomProduct();
        const productDetailPage = new ProductDetailPage(page);
        await productDetailPage.addToBag.click();
        await expect(productDetailPage.shoppingCartItems.locator).toContainText('1');
        await productDetailPage.bag.click();
    });

});