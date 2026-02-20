// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Get cart from sessionStorage
function getCartFromSession() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart to sessionStorage
function saveCartToSession(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.classList.add("add-to-cart-btn");
    button.dataset.id = product.id;

    button.addEventListener("click", () => {
      addToCart(product.id);
    });

    li.textContent = `${product.name} - $${product.price} `;
    li.appendChild(button);
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  const cart = getCartFromSession();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const cart = getCartFromSession();
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product);
    saveCartToSession(cart);
    renderCart();
  }
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Event listener for Clear Cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();