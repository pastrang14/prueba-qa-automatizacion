import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

// La palabra 'extends' significa que HomePage hereda todo lo de BasePage
export class HomePage extends BasePage {
    
    // 1. Declaración de Localizadores (Locators)
    // Se declaran como 'private' para que nadie fuera de esta clase pueda manipularlos.
    // Esto protege la estructura de tu página.
    private searchInput: Locator;
    private searchSuggestions: Locator;

    constructor(page: Page) {
        // 'super(page)' llama al constructor de BasePage para inicializar la página
        super(page);
        
        // 2. Inicialización de Localizadores
        // Aquí mapeamos los elementos de la web. Si mañana la tienda cambia el diseño
        // y le cambian la clase al buscador, SOLO tendrás que modificar esta línea.
        this.searchInput = page.locator('input.ui-autocomplete-input'); 
        this.searchSuggestions = page.locator('ul.ui-autocomplete');
    }

    // 3. Métodos de Acción (Lo que el usuario puede hacer en esta página)
    async searchProduct(productName: string) {
        // Simula al usuario escribiendo en la barra de búsqueda
        await this.searchInput.fill(productName);
    }

    async selectSuggestedProduct(exactProductName: string) {
        // Busca dentro de la lista de sugerencias el elemento <li> que contenga el texto exacto y le hace clic
        await this.searchSuggestions.locator('li', { hasText: exactProductName }).click();
    }
}