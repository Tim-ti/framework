const { expect } = require("chai");
require("chromedriver");
const Driver = require("../driver/Driver");
const DataReader = require("../services/DataReaderService");

const ProductPage = require("../pages/ProductPage");
const Product = require("../models/Product");

const { TEST_TIMEOUT } = require("../config/constants");

describe("Adding and deleting items from cart.", function () {
  before(async function () {
    const productProps = await DataReader.getTestData("product.properties");
    for (const key in productProps) {
        this[key] = productProps[key];
    }

  });

  beforeEach(async function () {
    this.driver = await Driver.getInstance();
  });

  it("Check the information in the cart.", async function () {
    const product = new Product(this.productName, this.productPrice, this.productId, this.productSize, this.productUrl, this.cartUrl);
    const productPage = new ProductPage(this.driver, product);
    
    await productPage.loadProperties();
    await productPage.openPage();
    await productPage.selectSize();
    await productPage.addItemToCart();
    await productPage.openCart();
    
    const productNameInCart = await productPage.getProductNameInCart();
    expect(productNameInCart).to.equal('ПЛАТЬЕ');
    const productSizeInCart = await productPage.getProductSizeInCart();
    expect(productSizeInCart).to.equal('38 (M)');
  }).timeout(TEST_TIMEOUT);

  afterEach(async function () {
    if (this.currentTest.state !== "passed") {
      const image = await this.driver.takeScreenshot();
      await require('fs').writeFile(
          './screenshots/cartFail.png',
          image,
          'base64',
          (err) => {});
    }

    await Driver.killDriver();
  });
});