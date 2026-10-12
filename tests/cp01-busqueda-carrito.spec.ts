import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';


test.describe('CP-01: Búsqueda de producto y agregado al carrito', () => {

    test('Flujo completo busqueda de producto hasta llegar a carrito', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);

        await test.step('Acción 1, cargar página', async () => {

            await homePage.navigate(); // En lugar de usar page.goto('url') directamente en el test
            // el /.**./ hace que busque que no sea un texto exacto y la letra i la hace insensitive
            //Aserción 1: El titulo de la página corresponde a la tienda
            await expect(page, 'El título de la página principal debe contener la palabra "store"').toHaveTitle(/.*store.*/i); 
        })
        
        await test.step('Acción 2, Escribir la palabra "best" en el campo de busqueda o searchInput', async () => {
           await homePage.searchProduct('best');
            // Validamos que el contenedor del menú desplegable exista y sea visible en el DOM.
            // Esto actúa como un "wait" dinámico: Playwright pausará el test aquí hasta que 
            // la tienda termine de cargar las sugerencias, evitando que el paso 3 falle por ir muy rápido.
           await expect(homePage.searchSuggestionsList, 'La lista de sugerencias debe desplegarse tras escribir la palabra clave').toBeVisible();
        });

        await test.step('Acción 3, Seleccionar de las sugerencias el producto The best is yet to come', async () => {
            await homePage.selectSuggestedProduct('The best is yet to come');
            await expect(page, 'El título de la pestaña debe cambiar al nombre del producto seleccionado').toHaveTitle(/.*The best is yet to come.*/i);
        });
        
        //Aquí hacemos referencia al modelo de página ProductPage
        await test.step('Acción 4, Verificar detalle nombre de producto y precio del producto', async () => {
            //no utilizamos await en este caso porque no se esta realizando una accion con pw
            await expect(productPage.productName ,'El nombre no coincide en el detalle de producto' ).toContainText(/The best is yet to come/i);
            await expect(productPage.productPrice, 'El precio del producto no se muestra').toBeVisible();
        });
        
        await test.step('Acción 5, desplazar el scroll hasta sección de descripción', async () => {
            //como no se hace nada aca solo se manda a llamar la funcion que tiene la accion de hacer scroll en este caso
            await productPage.scrollDescription();
            await expect(productPage.descriptionTab, 'La descripción no es visible').toBeVisible();
        });

        await test.step('Acción 6, seleccionar una dimensión diferente', async () => {
            //Limpiamos cualquier espacio en blanco invisible que traiga el DOM usando trim()
            const precioOriginal = (await productPage.productPrice.innerText()).trim();
            await productPage.selectDimension('80x120cm');
           // await expect(productPage.productPrice, 'El precio no se actualizo al cambiar la dimension').not.toHaveText(precioOriginal);
           await expect(productPage.productPrice, 'El precio no se actualizo al cambiar la dimension').not.toHaveText(precioOriginal, { timeout: 10000 });
            
        });

        await test.step('Acción 7, Modificar la cantidad a 3 unidades', async () => {
            await productPage.setQuantity('3');
            await expect(productPage.quantityInput, 'No se selecciono la cantidad de productos').toHaveValue('3');
        });

        await test.step('Acción 8, seleccionar el boton Add to card', async () => {
          await productPage.selectAddToCart();
          await expect(productPage.modalConfirmation, 'El modal no apareció tras hacer clic en add to cart').toBeVisible();      
        });

        await test.step('Acción 9, Clic en Continuar Comprando y validar cierre de modal', async () => {
            await productPage.clickContinueShopping();
            await expect(productPage.modalConfirmation, 'El modal no se cerró tras hacer clic').toBeHidden();
        });
                
    })
    
})
