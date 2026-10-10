import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage{
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly descriptionTab: Locator;
    private dimensionSize: Locator;
    readonly quantityInput: Locator; //este si se queda como readonly porque se utiliza en el step 7
    private addToCartButton: Locator;
    private continueShoppingButton: Locator;
    readonly modalConfirmation: Locator;

    constructor(page: Page){
        super(page);   
        this.productName = page.locator('h1');
        this.productPrice = page.locator('.current-price span').first();
        this.descriptionTab = page.getByRole('tab',{name:'Description'});
        this.dimensionSize = page.getByLabel('Dimension');
        this.quantityInput = page.getByRole('spinbutton', {name: 'Quantity'});
        this.addToCartButton = page.getByRole('button', {name: /add to cart/i})
        this.modalConfirmation = page.locator('#blockcart-modal');
        this.continueShoppingButton = page.getByRole('button', { name: /continue shopping/i });
    }

    async scrollDescription() {
        await this.descriptionTab.scrollIntoViewIfNeeded();
    }

    async  selectDimension(dimensionSize:string) {
        await this.dimensionSize.selectOption({ label: dimensionSize });
    }

    async  setQuantity(quantity:string) {
        await this.quantityInput.fill(quantity);
    }

    async  selectAddToCart() {
        await this.addToCartButton.click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }
  
}