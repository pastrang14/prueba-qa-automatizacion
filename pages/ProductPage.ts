import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage{
    //como solo necesitamos leer el nombre, al no hacer acción usamos readonly para declarar y no se usa método
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly descriptionTab: Locator;

    constructor(page: Page){
        super(page);

        //etiqueta que contiene el titulo del producto
        this.productName = page.locator('h1');
        //clase css del precio del producto
        this.productPrice = page.locator('.current-price span').first();
        this.descriptionTab = page.getByRole('tab',{name:'Description'});
    }

    //metodo de scroll accion 5
    async scrollDescription() {
        await this.descriptionTab.scrollIntoViewIfNeeded();
    }
  
}