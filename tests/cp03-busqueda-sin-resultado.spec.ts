import {test, expect, Page} from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('CP-03: Busqueda sin reusltados', () => {
    
     
    test('Buscar en el sistema reponde correctamente cuando no hay coincidencias', async ({ page }) => {
        const homePage = new HomePage(page);
        await test.step('Acción 1, Buscar un texto que no exista en el catálogo', async () => {
           
            await homePage.navigate();  //Ubicarnos en el sitio
            
            await homePage.searchProduct('xyzqw123'); //Ubicarnos en el buscador e ingresar busqueda
            
            await page.keyboard.press('Enter'); // Simula presionar Enter para ejecutar la búsqueda
            
            await page.waitForTimeout(1500);  //Tiempo de espera para que cargue

            //Verificar la lista de productos este vacía
            await expect(homePage.productResults, 'Fallo: El sistema mostró productos cuando no debería').toHaveCount(0);

            // Verificar mediante el ID que el mensaje de error  está visible
            await expect(homePage.noResultsMessage, 'Fallo: No se mostró el mensaje de error de búsqueda').toBeVisible();
        
        })

        
    })
    
})
