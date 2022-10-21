class ProductList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = [];
    this._fetchProducts();
    this.render();
  }

  _fetchProducts() {
    this.goods = [
      { id: 1, title: "Notebook", price: 2000 },
      { id: 2, title: "Mouse", price: 20 },
      { id: 3, title: "Keyboard", price: 200 },
      { id: 4, title: "Gamepad", price: 50 },
    ];
  }

  render() {
    const divToRenderIn = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new Product(product);
      divToRenderIn.insertAdjacentHTML("beforeend", item.render());
    }
  }

  getTotalSum() {
    return this.goods.reduce((sum, item) => (sum += item.price), 0);
  }
}

class Product {
  constructor(
    product,
    img = "https://www.pinclipart.com/picdir/big/261-2616732_contact-information-clipart.png"
  ) {
    const { title, id, price } = product;
    this.title = title;
    this.id = id;
    this.price = price;
    this.imgSrc = img;
  }

  render() {
    return `<div class="product-item">
                <img src="${this.imgSrc}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
  }
}

const productList = new ProductList();

console.log(productList.getTotalSum());

// -----

class CartProduct extends Product {
  constructor(
    product,
    img = "https://www.pinclipart.com/picdir/big/261-2616732_contact-information-clipart.png"
  ) {
    super(product, img);
  }

  //overwrite render method with new markup for basket layout
  render() {}
}

class Cart {
  constructor(container) {
    this.container = document.querySelector(container);
  }

  //make cart visible
  toggle() {
    this.container.classList.toggle("hidden");
  }

  addToBasket() {}

  getTotalNumberProducts() {}

  renderNewProductInBasket() {}
}
