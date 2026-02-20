// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");


// ✅ Ensure cart key exists WITHOUT overwriting Cypress data
function initializeCart() {
  if (sessionStorage.getItem("cart") === null) {
    sessionStorage.setItem("cart", JSON.stringify([]));
  }
}

// Always read fresh data from sessionStorage
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.textContent = "Add to Cart";

    button.addEventListener("click", function () {
      addToCart(product.id);
    });

    li.textContent = `${product.name} - $${product.price} `;
    li.appendChild(button);
    productList.appendChild(li);
  });
}

// Render cart
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item
function addToCart(productId) {
  const cart = getCart(); // always fresh read

  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    saveCart(cart);
    renderCart();
  }
}

// Clear cart
function clearCart() {
  sessionStorage.setItem("cart", JSON.stringify([]));
  renderCart();
}

clearCartBtn.addEventListener("click", clearCart);


// ✅ Important: use DOMContentLoaded for Cypress compatibility
document.addEventListener("DOMContentLoaded", function () {
  initializeCart();
  renderProducts();
  renderCart();
});