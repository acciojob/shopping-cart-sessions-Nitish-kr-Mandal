const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Load cart from sessionStorage or start empty
let cart = JSON.parse(window.sessionStorage.getItem("cart")) || [];

// Render product list
const productList = document.getElementById("product-list");
products.forEach((product) => {
  const li = document.createElement("li");
  li.textContent = `${product.name} - $${product.price} `;

  const btn = document.createElement("button");
  btn.textContent = "Add to Cart";
  btn.addEventListener("click", () => addToCart(product));

  li.appendChild(btn);
  productList.appendChild(li);
});

// Render cart from current cart array
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add product to cart and save to sessionStorage
function addToCart(product) {
  cart.push({ id: product.id, name: product.name, price: product.price });
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear cart button
document.getElementById("clear-cart-btn").addEventListener("click", () => {
  cart = [];
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});

// Initial render from sessionStorage
renderCart();