import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('CP-02: Validación y modificación del carrito', () => {
    
    let homePage: HomePage;
    let productPage: ProductPage;
    let cartPage: CartPage;

    // ESTADO INICIAL: Esto se ejecuta antes del test CP02
    test.beforeEach(async ({ page, context }) => {
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await homePage.navigate();
        // Limpiamos cookies y almacenamiento local
        await context.clearCookies();
        await page.evaluate(() => window.localStorage.clear());
        await page.evaluate(() => window.sessionStorage.clear());
        
        // Recargamos la página limpia y seguimos el flujo
        await page.reload();
        await homePage.searchProduct('best');
        await homePage.selectSuggestedProduct('The best is yet to come');
        await expect(productPage.productName, 'La página del producto no cargó a tiempo').toBeVisible();
    });
    
    test('Validar cálculos matemáticos y eliminar productos', async ({ page }) => {
        
        await test.step('Acción 1, Agregar al carrito 3 unidades', async () => {
            await productPage.setQuantity('3');
            await expect(productPage.quantityInput,'La cantidad no coincide').toHaveValue('3');
            await page.waitForTimeout(1000);
            await productPage.selectAddToCart();
            await expect(productPage.modalConfirmation, 'El modal de confirmación no apareció').toBeVisible();
            await productPage.clickProceedToCheckout();

        })

        await test.step('Acción 2, verificar el detalle del nombre', async () => {
            //Aquí se guarda la cantidad unitaria $X.XX
            const unitPriceText = await cartPage.unitPrice.innerText();
            //Aquí se guarda la cantidad de productos 
            const quantityText = await cartPage.lineQuantity.inputValue();
            //Aquí se guarda el total que se genera entre la multiplicación del precio unitario y la cantidad de productos
            const lineTotalText = await cartPage.lineTotal.innerText();

            const unitPriceNumber = parseFloat(unitPriceText.replace('$', '')); // Se convierte en 29.00
            const quantityNumber = parseInt(quantityText, 10);                  // Se convierte en 3, sistema decima base 10
            const systemTotalNumber = parseFloat(lineTotalText.replace('$', '')); // Se convierte en 87.00
            
            const expectedTotal = unitPriceNumber * quantityNumber; // 29.00 * 3 = 87.00

            // LA ASERCIÓN FINAL (Comparar cálculo contra el sistema)
            console.log(` Precio: $${unitPriceNumber} x ${quantityNumber} unidades = Total Calculado: $${expectedTotal} | El sistema muestra: $${systemTotalNumber}`);
            expect(systemTotalNumber, 'El cálculo matemático de la línea es incorrecto').toBe(expectedTotal);
        });
        
        
    })
    
})
