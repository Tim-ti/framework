const Page = require("./Page");

const logger = require("../logger");

const { LOADING_TIMEOUT } = require("../config/constants");

class ProductPage extends Page {
  static resourcesFileName = "product.properties";
  static ProductNumberInCart = `//*[@class='headerIconCartCount']`;

  constructor(driver, product) {
    super(driver);
    this.product = product;
  }

  async openPage() {
    return super.openPage(this.product.getPageUrl());
  }

  async openCart() {
    return super.openPage(this.product.getCartUrl());
  }

  async openOrdering() {
    return super.openPage(this.product.getOrderingUrl());
  }


  async loadProperties() {
    return super.loadProperties(ProductPage.resourcesFileName);
  }

  async waitingLoad() {
    return super.waitingLoad(LOADING_TIMEOUT);
  }

  async addItemToCart() {
    logger.info("Adding item to the cart.");
    await this.waitingLoad(LOADING_TIMEOUT);
    await this.clickByXpath(`/html/body/div[2]/div[5]/main/div[3]/div[2]/div/div[2]/div[2]/div[2]/div/button/span`);
    await this.waitingLoad(LOADING_TIMEOUT);

    return this;
  }

  async deleteItemFromTheCart() {
    logger.info("Deleting item from the cart.");
    
    await this.clickByXpath(`//*[@class='cartItemPropertyDeleteIcon']`);
    await this.waitingLoad(LOADING_TIMEOUT);

    return this;
  }

  async selectSize() {
    logger.info(`Selecting size: ${this.product.getSize()}.`);

    const sizeXpath = '/html/body/div[2]/div[5]/main/div[3]/div[2]/div/div[2]/div[2]/div[2]/div/div/div[2]/div[2]/div[1]';
    await this.clickByXpath(sizeXpath);

    return this;
  }

  async getProductNumberInCart() {
    logger.info(`getProductNumberInCart`);
    const totalPriceElement = await this.findByXpath(ProductPage.ProductNumberInCart);
    return Number.parseInt(await totalPriceElement.getText());


  }

  async getProductNameInCart() {
    logger.info(`getProductNameInCart`);
    const productNameInCart = await this.findByXpath(`//*[@id="basket_items"]/div/div[1]/div/div[2]/a`);
    const name = await productNameInCart.getText();
    return name;

  }

  async getProductSizeInCart() {
    logger.info(`getProductSizeInCart`);
    const productSizeInCart = await this.findByXpath(`//*[@class='cartItemPropertySize']`);
    const size = await productSizeInCart.getText();
    return size;

  }

  async getProductPriceInCart() {
    logger.info(`getProductPriceInCart`);
    const productPriceInCart = await this.findByXpath(` //*[@id="bx-soa-total"]/div[2]/div[1]/span[2]`);
    const price = await productPriceInCart.getText();
    return price;

  }

  async getCartInfo() {
    logger.info(`getCartInfo`);
    const cartInfo = await this.findByXpath(`/html/body/div[2]/div[5]/main/div[3]/div[2]/div`);
    const text = await cartInfo.getText();
    return text;

  }

}

module.exports = ProductPage;
