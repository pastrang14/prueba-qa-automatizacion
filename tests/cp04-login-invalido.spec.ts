import {test, expect, Page} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test.describe('CP-04: Inicio de sesión de sesion con credenciales invalidas', () => {
        let homePage: HomePage;
        let loginPage: LoginPage;
        
        test.beforeEach(async ({ page, context }) => {
            homePage = new HomePage(page);
            loginPage = new LoginPage(page);

            await homePage.navigate();
            await context.clearCookies();
            await page.evaluate(() => window.localStorage.clear());
            await page.evaluate(() => window.sessionStorage.clear());
            await page.reload();
    });
        test('Verificar el manejo de errores en la autenticación', async ({ page }) => {
        
            await test.step('Acción 1, Ingresar a pantalla de inicio de sesión', async () => {
                await homePage.signInButton.click(); //Click en Sing In desde página home

                // Aserción: Se muestra el formulario con los campos de correo y contraseña
                await expect(loginPage.emailInput, 'El campo de correo no cargó').toBeVisible();
                await expect(loginPage.passwordInput, 'El campo de contraseña no cargó').toBeVisible();
            });
            await test.step('Acción 2, Ingreso de correo inexistente y cualquier contraseña', async () => {
                await loginPage.submitLogin('qa.candidato@example.com','welcome123');
                
                // Aserción: El sistema muestra el mensaje de error de autenticación
                await expect(loginPage.authenticationError, 'El mensaje de error no se mostró').toBeVisible();
            })
            await test.step('Acción 3, Verificar el estado de la sesión', async () => {
            // Aserción: El usuario permanece sin autenticar (la opción de iniciar sesión sigue visible)
            await expect(homePage.signInButton, 'Brecha de seguridad: El botón Sign In desapareció, posible falso login').toBeVisible();
        });
            
        });
    
   
    
});
