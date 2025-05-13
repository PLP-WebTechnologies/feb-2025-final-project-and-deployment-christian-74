// This will later be used for interactive features like add to cart
console.log("EcoStore script loaded.");
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;
  
    // ---------- PRODUCTS PAGE ----------
    if (currentPage.includes("products.html")) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      const addToCartButtons = document.querySelectorAll(".add-to-cart");
  
      addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
          const name = button.dataset.name;
          const price = parseFloat(button.dataset.price);
  
          const existingProduct = cart.find(item => item.name === name);
  
          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            cart.push({ name, price, quantity: 1 });
          }
  
          localStorage.setItem("cart", JSON.stringify(cart));
          alert(`${name} added to cart!`);
        });
      });
    }
  
    // ---------- CART PAGE ----------
    if (currentPage.includes("cart.html")) {
      const cartItemsContainer = document.getElementById("cart-items");
      const totalPriceEl = document.getElementById("total-price");
      const clearCartBtn = document.getElementById("clear-cart");
  
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("cart-summary").style.display = "none";
        return;
      }
  
      let total = 0;
  
      cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
  
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
          <div>
            <h3>${item.name}</h3>
            <p>Price: Ksh ${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p><strong>Subtotal: Ksh ${subtotal}</strong></p>
          </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
      });
  
      totalPriceEl.textContent = total;
  
      clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        window.location.reload();
      });
    }
  });
  