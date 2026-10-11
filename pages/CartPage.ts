import { BasePage } from "./BasePage";
import { Page, Locator } from "@playwright/test";

export class CartPage extends BasePage{

    readonly unitPrice: Locator;
    readonly lineQuantity: Locator;
    readonly lineTotal: Locator;


    constructor (page: Page){
        super(page);
        const productRow = page.locator('.cart-item').filter({ hasText: 'The best is yet to come' });
        this.unitPrice = productRow.locator('.current-price .price');
        this.lineQuantity = productRow.locator('input[name="product-quantity-spin"]');
        this.lineTotal = productRow.locator('span.product-price > strong');
    }

    
}