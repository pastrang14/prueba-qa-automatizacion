import { BasePage } from "./BasePage";
import { Page, Locator } from "@playwright/test";

export class CartPage extends BasePage{
    readonly productRow: Locator;
    readonly unitPrice: Locator;
    readonly lineQuantity: Locator;
    readonly lineTotal: Locator;
    readonly deleteButton: Locator;
    readonly emptyCartMessage: Locator;

    constructor (page: Page){
        super(page);
        this.productRow = page.locator('.cart-item').filter({ hasText: 'The best is yet to come' }).first();;
        this.unitPrice = this.productRow.locator('.current-price .price');
        this.lineQuantity = this.productRow.locator('input[name="product-quantity-spin"]');
        this.lineTotal = this.productRow.locator('span.product-price > strong');
        this.deleteButton = this.productRow.locator('.remove-from-cart'); 
        this.emptyCartMessage = page.getByText('There are no more items in your cart');
        
    }

    async  setlineQuantity(lineQuantity: string) {
        await this.lineQuantity.click();
        
        // Seleccionamos todo el texto actual (el '3')
        await this.lineQuantity.press('Control+A'); 
        
        // Escribimos el nuevo número sin que la caja haya quedado vacía
        await this.lineQuantity.type(lineQuantity); 
        
        // Simulamos presionar "Enter" para forzar el recálculo
        await this.lineQuantity.press('Enter'); 
    }

    
}