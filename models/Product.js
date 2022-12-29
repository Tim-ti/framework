class Product {
    constructor(name, price, id, size, url, cartUrl, orderingUrl, text) {
        this.name = name;
        this.price = price;
        this.id = id;
        this.size = size;
        this.url = url;
        this.cartUrl = cartUrl;
        this.orderingUrl = orderingUrl;
        this.text = text;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getSize() {
        return this.size;
    }

    setSize(size) {
        this.size = size;
    }

    getPageUrl() {
        return this.url ;
    }
    getCartUrl() {
        return this.cartUrl ;
    }
    getOrderingUrl() {
        return this.orderingUrl ;
    }

    getText() {
        return this.text ;
    }
}

module.exports = Product;