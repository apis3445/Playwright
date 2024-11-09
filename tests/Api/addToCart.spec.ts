import { expect, test } from '@playwright/test';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import { HomePage } from '../../pages/WebdriverIOShop/HomePage';
import { ProductDetailPage } from '../../pages/WebdriverIOShop/ProductDetailPage';
import { CartPage } from '../../pages/WebdriverIOShop/CartPage';
import * as allure from 'allure-js-commons';

test.describe('WebdriverIO Shop', () => {

    test('Should add an item to the cart', {
        tag: ['@API'],
    }, async ({ page }) => {
        await allure.feature('API');
        await allure.suite('WebdriverIO Shop');
        const homePage = new HomePage(page);
        await homePage.goTo();
        await homePage.showAllClick();
        const product = await homePage.selectRandomProduct();
        const productDetailPage = new ProductDetailPage(page);
        await productDetailPage.color.selectRandomOptionWithoutText('Select one');
        await productDetailPage.selectAvailableSize();
        const productPrice = await productDetailPage.getProductPrice();
        await productDetailPage.addToCart.click();
        let assertDescription = 'There is one item in the bag';
        await productDetailPage.addStepWithAnnotation(AnnotationType.Assert, assertDescription, async () => {
            await expect(productDetailPage.shoppingCartItems.locator, assertDescription).toContainText('1');
        });
        await productDetailPage.cart.click();
        const cartPage = new CartPage(page);
        //Check the item in the shopping cart should be the same that was selected
        assertDescription = `The name of the item in the cart is: "${product.name}"`;
        await cartPage.addStepWithAnnotation(AnnotationType.Assert, assertDescription, async () => {
            await expect(cartPage.cartItem.name, assertDescription).toHaveText(product.name);
        });
        assertDescription = `The price of the item in the cart is: "${productPrice}"`;
        const priceItem = cartPage.cartItem.unitPrice;
        await cartPage.addStepWithAnnotation(AnnotationType.Assert, assertDescription, async () => {
            await expect(priceItem, assertDescription).toHaveText(productPrice);
        });
        assertDescription = `The subtotal is: "${productPrice}"`;
        await cartPage.addStepWithAnnotation(AnnotationType.Assert, assertDescription, async () => {
            //The subtotal locator is repeated multiple times so I will check the last
            await expect(cartPage.subTotal.locator.last(), assertDescription).toHaveText(productPrice);
        });
    });

});