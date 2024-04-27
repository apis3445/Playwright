import { expect, test } from '@playwright/test';
import { HomePage } from '../../../pages/ContosoTraders/homePage';
import { ProductDetailPage } from '../../../pages/ContosoTraders/productDetailPage';
import { CartPage } from '../../../pages/ContosoTraders/cartPage';
import { AnnotationType } from '../../../utils/annotations/AnnotationType';

test.describe('Contoso Traders', () => {

    // eslint-disable-next-line playwright/expect-expect
    test('Should add an item to the cart', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goTo();
        await homePage.allProductsClick();
        await homePage.selectRandomProduct();
        const productDetailPage = new ProductDetailPage(page);
        await productDetailPage.addToBag.click();
        await expect(productDetailPage.shoppingCartItems.locator).toContainText('1');
        await productDetailPage.bag.click();
        const cartPage = new CartPage(page);
        let assertDescription = `The name of the item in the cart is: ${homePage.product.name}`;
        await cartPage.addAnnotation(AnnotationType.Assert, assertDescription);
        await expect(cartPage.cartItem.name, assertDescription).toHaveText(homePage.product.name);
        const price = homePage.product.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        assertDescription = `The price of the item in the cart is: ${price}`;
        await cartPage.addAnnotation(AnnotationType.Assert, assertDescription);
        const unitPrice = await cartPage.cartItem.unitPrice.first().innerText();
        await expect(unitPrice, assertDescription).toEqual(price);
    });

});