import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage{
    
    readonly emailInput : Locator;
    readonly passwordInput : Locator;
    readonly submitSignInButton : Locator;
    readonly authenticationError : Locator;
    constructor(page: Page){
        super(page);
        
        this.emailInput = page.locator('#field-email');
        this.passwordInput = page.locator('#field-password');
        this.submitSignInButton = page.locator('#submit-login');

        // El contenedor del mensaje de error (usualmente una clase de alerta roja)
        this.authenticationError = page.locator('.alert-danger');
    }
    async  submitLogin(email:string, password:string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitSignInButton.click();
    }
}