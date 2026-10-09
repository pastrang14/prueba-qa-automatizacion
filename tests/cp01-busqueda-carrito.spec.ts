import {test, expect} from '@playwright/test'
import { HomePage } from '../pages/HomePage';

test.describe('CP-01: Búsqueda de producto y agregado al carrito', () => {

    test('Flujo completo busqueda de producto hasta llegar a carrito', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('Acción 1, cargar página', async () => {
            await homePage.navigate(); 
            // el /.**./ hace que busque que no sea un texto exacto y la letra i la hace insensitive
            //Recordar que hacemos referencia al url que esta en el base url
            await expect(page, 'El título de la página principal debe contener la palabra "store"').toHaveTitle(/.*store.*/i); 
        })
        
        await test.step('Acción 2, Escribir la palabra "best" en el campo de busqueda o searchInput', async () => {
           await homePage.searchProduct('best');
           await expect(homePage.searchSuggestionsList, 'La lista de sugerencias debe desplegarse tras escribir la palabra clave').toBeVisible();
        })

        await test.step('Accion 3, Seleccionar de las sugerencias el producto The best is yet to come', async () => {
            await homePage.selectSuggestedProduct('The best is yet to come');
            await expect(page, 'El título de la pestaña debe cambiar al nombre del producto seleccionado').toHaveTitle(/.*The best is yet to come.*/i);
        })
        
        
    })
    
    
})
