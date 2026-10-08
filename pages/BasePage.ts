import { Page } from '@playwright/test';

export class BasePage {
    // Usamos 'protected' para que el objeto 'page' solo pueda ser usado 
    // por esta clase y por las páginas que hereden de ella (como HomePage).
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Este método usa la baseURL que configuraste en playwright.config.ts
    // Si pasamos un string vacío (''), irá a la raíz de la tienda.
    async navigate(path: string = '') {
        await this.page.goto(`/${path}`);
    }
}