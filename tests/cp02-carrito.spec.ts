import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('CP-02: Validación y modificación del carrito', () => {

    test('Validar calculos y eliminar productos', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        //Estado previo hacer la automatización 2
        await homePage.navigate();
        await homePage.searchProduct('best');
        await homePage.selectSuggestedProduct('The best is yet to come');
        await expect(productPage.productName, 'La página del producto no cargó a tiempo').toBeVisible();
        await productPage.setQuantity('3');
        await expect(productPage.quantityInput, 'La cantidad no se actualizó').toHaveValue('3');
        await page.waitForTimeout(1000);
        await productPage.selectAddToCart();
        await expect(productPage.modalConfirmation).toBeVisible();
    })
    
})
