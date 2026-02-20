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

function getCartFromSession() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCartToSession(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.textContent = "Add to Cart";

    button.addEventListener("click", () => {
      addToCart(product.id);
    });

    li.textContent = `${product.name} - $${product.price} `;
    li.appendChild(button);
    productList.appendChild(li);
  });
}

function renderCart() {
  const cart = getCartFromSession();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  let cart = getCartFromSession();

  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    saveCartToSession(cart);
    renderCart();
  }
}

function clearCart() {
  sessionStorage.setItem("cart", JSON.stringify([]));
  renderCart();
}

clearCartBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();