"use strict";
const basketEl = document.querySelector(".basket");
const cartIconEl = document.querySelector(".cartIconWrap");
const cartIconCounterEl = document.querySelector(".cartIconWrap span");
const basketTotalEl = document.querySelector(".basketTotal");
const basketTotalValueEl = document.querySelector(".basketTotalValue");

const basket = {};

cartIconEl.addEventListener("click", () => {
  basketEl.classList.toggle("hidden");
});

document
  .querySelector(".featured-items__cards")
  .addEventListener("click", (e) => {
    e.preventDefault();

    if (!e.target.closest(".product__add-to-cart")) {
      return;
    }

    const productEl = e.target.closest(".product");
    const id = productEl.dataset.id;
    const name = productEl.dataset.name;
    const price = +productEl.dataset.price;

    addToBasket(id, name, price);
  });

function addToBasket(id, name, price) {
  if (!(id in basket)) {
    basket[id] = { id, name, price, count: 0 };
  }
  basket[id].count++;
  cartIconCounterEl.textContent = getTotalNumberProducts().toString();
  basketTotalValueEl.textContent = getTotalPrice();
  renderBasketProduct(id);
}

function getTotalNumberProducts() {
  return Object.values(basket).reduce(
    (totalCount, product) => (totalCount += product.count),
    0
  );
}

function getTotalPrice() {
  return Object.values(basket).reduce(
    (totalPrice, product) => (totalPrice += product.price * product.count),
    0
  );
}

function renderBasketProduct(id) {
  const basketRowEl = basketEl.querySelector(`.basketRow[data-id="${id}"]`);
  if (!basketRowEl) {
    renderNewProductInBasket(id);
    return;
  }

  const productData = basket[id];
  basketRowEl.querySelector(
    ".productCount"
  ).textContent = `${productData.count} шт.`;
  basketRowEl.querySelector(".productTotalPrice").textContent = `$${
    productData.count * productData.price
  }`;
}

function renderNewProductInBasket(id) {
  const productElHtml = `
<div class="basketRow" data-id="${id}">
  <div>${basket[id].name}</div>
  <div class="productCount">${basket[id].count} шт.</div>
  <div>$${basket[id].price}</div>
  <div class="productTotalPrice">$${basket[id].price * basket[id].count}</div>
</div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productElHtml);
}
