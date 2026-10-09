import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

// La palabra 'extends' significa que HomePage hereda todo lo de BasePage
export class HomePage extends BasePage {
    
    // Declaración de Localizadores (LOCATORS)
    // Se declaran como 'private' para que nadie fuera de esta clase pueda manipularlos.
    // Esto protege la estructura de tu página.
    private searchInput: Locator;
    readonly searchSuggestionsList: Locator;

    constructor(page: Page) {
        // 'super(page)' llama al constructor de BasePage para inicializar la página
        super(page);
        
        // LOCATORS
        //locator de input de busqueda
        this.searchInput = page.locator('input.ui-autocomplete-input'); 
        //locator de listado de resultado luego de buscar
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