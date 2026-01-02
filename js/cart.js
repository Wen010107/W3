let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const emptyCart = document.getElementById("emptyCart");
  const summary = document.getElementById("summary");
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    emptyCart.style.display = "block";
    summary.style.display = "none";
    return;
  } else {
    emptyCart.style.display = "none";
    summary.style.display = "flex";
  }

  let subtotal = 0, totalQty = 0;

  cart.forEach((item, index) => {
    let price = parseInt(item.price) || 0;
    let qty = parseInt(item.qty) || 0;
    subtotal += price * qty;
    totalQty += qty;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <span class="item-name">${item.name}${item.size ? ` (${item.size})` : ""}</span>
        <div class="qty">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${qty}</span>
          <button onclick="changeQty(${index}, 1)">＋</button>
          <button class="remove-btn" onclick="removeItem(${index})">刪除</button>
        </div>
        <span class="item-total">NT$ ${price * qty}</span>
      </div>
    `;
    cartItems.appendChild(itemDiv);
  });

  const discount = subtotal >= 1000 ? 100 : 0;
  const total = subtotal - discount;

  document.getElementById("totalQty").textContent = totalQty;
  document.getElementById("subtotal").textContent = subtotal;
  document.getElementById("discount").textContent = discount;
  document.getElementById("total").textContent = total;
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
}

function removeItem(index) {
  const item = cart[index];
  if (confirm(`確定刪除 ${item.name} (數量: ${item.qty}) 嗎？`)) {
    cart.splice(index, 1);
    saveCart();
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.getElementById("checkoutBtn").onclick = () => {
  if (cart.length === 0) { alert("購物車目前沒有商品！"); return; }

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (confirm(`請確認商品無誤\n總數量: ${totalQty}\n總金額: NT$ ${totalAmount}`)) {
    if (currentUser) {
      alert(`${currentUser.avatar} ${currentUser.name}，結帳成功！\n感謝購買。`);
    } else {
      alert("結帳成功！感謝購買。");
    }
    // 清空購物車
    cart = [];
    saveCart();

    // 自動登出使用者
    localStorage.removeItem("currentUser");
    location.href = "index.html";
  }
};

// 初始渲染
renderCart();
