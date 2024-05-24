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
        //Select a random product from api results by image
        //because the name could be the same
        await homePage.selectRandomProduct();
        const productDetailPage = new ProductDetailPage(page);
        await productDetailPage.addToBag.click();
        let assertDescription = 'There is one item in the bag';
        await productDetailPage.addAnnotation(AnnotationType.Assert, assertDescription);
        await expect(productDetailPage.shoppingCartItems.locator, assertDescription).toContainText('1');
        await productDetailPage.bag.click();
        const cartPage = new CartPage(page);
        //Check the item in the shopping cart should be the same that was selected
        assertDescription = `The name of the item in the cart is: ${homePage.product.name}`;
        await cartPage.addAnnotation(AnnotationType.Assert, assertDescription);
        await expect(cartPage.cartItem.name, assertDescription).toHaveText(homePage.product.name);
        //Format price to currency format
        const price = homePage.product.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        assertDescription = `The price of the item in the cart is: ${price}`;
        await cartPage.addAnnotation(AnnotationType.Assert, assertDescription);
        const unitPrice = cartPage.cartItem.unitPrice.first();
        await await expect(unitPrice, assertDescription).toHaveText(price);
    });

});