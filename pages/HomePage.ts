import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class HomePage extends BasePage {
    
    private searchInput: Locator;
    readonly searchSuggestionsList: Locator;

    readonly productResults: Locator;
    readonly noResultsMessage: Locator;
    readonly signInButton: Locator;
    constructor(page: Page) {
        super(page);
        
        this.searchInput = page.locator('input.ui-autocomplete-input'); 
        this.searchSuggestionsList = page.locator('.ui-autocomplete'); 
        this.productResults = page.locator('.product-miniature');
        this.noResultsMessage = page.locator('.alert.alert-warning');
        this.noResultsMessage = page.locator('#product-search-no-matches');
        this.signInButton = page.locator('.user-info a'); //Locator de button SingIn
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