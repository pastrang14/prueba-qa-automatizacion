import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class HomePage extends BasePage {
    
    private searchInput: Locator;
    readonly searchSuggestionsList: Locator;

    constructor(page: Page) {
        super(page);
        
        this.searchInput = page.locator('input.ui-autocomplete-input'); 
        this.searchSuggestionsList = page.locator('.ui-autocomplete'); 
    }

    async searchProduct(productName: string) {
        //Simula al usuario escribiendo en la barra de búsqueda
        await this.searchInput.fill(productName);
    }
    async selectSuggestedProduct(exactProductName: string) {
        // Busca dentro de la lista de sugerencias el elemento <li> que contenga el texto exacto y le hace clic
        await this.searchSuggestionsList.locator('li', { hasText: exactProductName }).first().click();
    }

}