import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';


test.describe('CP-01: Búsqueda de producto y agregado al carrito', () => {

    test('Flujo completo busqueda de producto hasta llegar a carrito', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);

        await test.step('Acción 1, cargar página', async () => {
            await homePage.navigate(); 
            // el /.**./ hace que busque que no sea un texto exacto y la letra i la hace insensitive
            //Recordar que hacemos referencia al url que esta en el base url
            await expect(page, 'El título de la página principal debe contener la palabra "store"').toHaveTitle(/.*store.*/i); 
        })
        
        await test.step('Acción 2, Escribir la palabra "best" en el campo de busqueda o searchInput', async () => {
           await homePage.searchProduct('best');
           await expect(homePage.searchSuggestionsList, 'La lista de sugerencias debe desplegarse tras escribir la palabra clave').toBeVisible();
        });

        await test.step('Accion 3, Seleccionar de las sugerencias el producto The best is yet to come', async () => {
            await homePage.selectSuggestedProduct('The best is yet to come');
            await expect(page, 'El título de la pestaña debe cambiar al nombre del producto seleccionado').toHaveTitle(/.*The best is yet to come.*/i);
        });
        
        await test.step('Acción 4, Verificar detalle nombre de producto y precio del producto', async () => {
            //no utilizamos await en este caso porque no se esta realizando una accion con pw
            productPage.productName;
            await expect(productPage.productName ,'El nombre no coincide en el detalle de producto' ).toContainText(/The best is yet to come/i);
            await expect(productPage.productPrice, 'El precio del producto no se muestra').toBeVisible();

            await page.waitForTimeout(2000);
        });
        
        await test.step('Acción 5, desplazar el scroll hasta sección de descripción', async () => {
            //como no se hace nada aca solo se manda a llamar la funcion que tiene la accion de hacer scroll en este caso
            await productPage.scrollDescription();
            await expect(productPage.descriptionTab, 'La descripción no es visible').toBeVisible();

            await page.waitForTimeout(2000);
        })
        
        
        
    })
    
    
})
