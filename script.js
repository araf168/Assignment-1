const productList = document.getElementById("productList");
const cartCount = document.getElementById("cartCount");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");

let selectedProduct = null;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= CART COUNT ================= */
function updateCartCount() {
  cartCount.innerText = cart.length;
}
updateCartCount();

/* ================= FETCH PRODUCTS ================= */
async function loadProducts() {
  productList.innerHTML = `<p class="text-center col-span-3">Loading...</p>`;

  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    // show first 6 products (Trending)
    renderProducts(data);
  } catch (error) {
    productList.innerHTML = "Failed to load products";
  }
}

/* ================= RENDER PRODUCTS ================= */
function renderProducts(products) {
  productList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded-xl shadow hover:shadow-lg transition";

    div.innerHTML = `
      <img src="${product.image}" class="h-40 mx-auto object-contain mb-4">
      <h3 class="font-semibold text-sm mb-1">
        ${product.title.slice(0, 40)}...
      </h3>
      <p class="text-indigo-600 font-bold">$${product.price}</p>
      <p class="text-xs text-gray-500 mb-2">${product.category}</p>

      <div class="flex gap-2 mt-3">
        <button onclick="openModal(${product.id})"
          class="flex-1 border border-indigo-600 text-indigo-600 text-sm py-1 rounded">
          Details
        </button>
        <button onclick="addToCartDirect(${product.id})"
          class="flex-1 bg-indigo-600 text-white text-sm py-1 rounded">
          Add
        </button>
      </div>
    `;

    productList.appendChild(div);
  });
}

/* ================= MODAL ================= */
async function openModal(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  selectedProduct = await res.json();

  modalTitle.innerText = selectedProduct.title;
  modalDesc.innerText = selectedProduct.description;
  modalPrice.innerText = `$${selectedProduct.price}`;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

/* ================= ADD TO CART ================= */
function addToCart() {
  cart.push(selectedProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  closeModal();
}

function addToCartDirect(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    });
}

/* ================= MOBILE MENU ================= */
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}

/* ================= INIT ================= */
loadProducts();
updateCartCount();

/* ================= SHOW / HIDE SECTIONS ================= */
function showProducts() {
  document.getElementById("hero").classList.add("hidden");
  document.getElementById("features").classList.add("hidden");
  document.getElementById("productSection").classList.remove("hidden");
}

function showHome() {
  document.getElementById("hero").classList.remove("hidden");
  document.getElementById("features").classList.remove("hidden");
  document.getElementById("productSection").classList.remove("hidden");
}
/* ================= MOBILE MENU ================= */
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}