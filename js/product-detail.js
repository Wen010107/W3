document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");
  const p = productData[productId];

  if (!p) {
    document.getElementById("product-detail").innerHTML = "<p>找不到商品資料</p>";
    return;
  }

  // 顯示基本資料
  document.getElementById("product-name").textContent = p.name;
  document.getElementById("product-img").src = p.img;
  document.getElementById("product-img").alt = p.name;
  document.getElementById("product-desc").textContent = p.desc;
  document.getElementById("product-weight").textContent = p.weight ? `重量：${p.weight}` : "";

  // 價格
    // 價格（支援折扣比例 discount）
  // 價格（支援折扣比例 discount）
// 價格處理區
  const priceEl = document.getElementById("product-price");
  const priceNum = Number(p.price);
  const hasDiscount = p.discount && p.discount < 1;

  if (hasDiscount) {
    const discountPrice = Math.round(priceNum * p.discount);
    priceEl.innerHTML = `
      <span style="text-decoration:line-through;color:#999;margin-right:8px;font-size:16px;">
        NT$${priceNum}
      </span>
      <span class="new-price" style="color:#d32f2f !important; font-size:24px; font-weight:bold;">
        NT$${discountPrice}
      </span>
    `;
  } else {
    // 💡 沒有折扣的普通商品：使用橙紅色 #ff7575ff
    priceEl.innerHTML = `
      <span class="price-highlight" style="color:#ff7575ff !important; font-size:24px; font-weight:bold;">
        NT$${priceNum}
      </span>`;
  }

  // 倒數計時
// 找到這一段並替換
if(p.discountEnd){
    const countdown = document.createElement("div");
    // 改成這行，同時加入 countdown 和 timer 兩個 class
    countdown.classList.add("countdown", "timer"); 
    priceEl.insertAdjacentElement("afterend", countdown);

    function updateCountdown(){
        const now = new Date();
        const end = new Date(p.discountEnd);
        const diff = end - now;
        if(diff <= 0){
            countdown.textContent = "折扣已結束";
            countdown.style.color = "#999"; // 結束變灰色
            clearInterval(timer);
        } else {
            const days = Math.floor(diff/1000/60/60/24);
            const hours = Math.floor((diff/1000/60/60)%24);
            const mins = Math.floor((diff/1000/60)%60);
            const secs = Math.floor((diff/1000)%60);
            
            // 這裡使用 innerHTML 確保可以放入樣式，或者維持 textContent 但靠 CSS 控制
            countdown.textContent = `折扣倒數：${days}天 ${hours}時 ${mins}分 ${secs}秒`;
            
            // 直接在這裡強制指定顏色最保險
            countdown.style.color = "#ff0000"; 
            countdown.style.fontWeight = "bold";
            countdown.style.marginTop = "10px"; // 增加一點與價格的距離
        }
    }
    updateCountdown();
    let timer = setInterval(updateCountdown, 1000);
}
  // 商品特色
  const featureBox = document.getElementById("features");
  if (p.features) {
    featureBox.innerHTML = "<h3>產品特色</h3>";
    const ul = document.createElement("ul");
    p.features.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      ul.appendChild(li);
    });
    featureBox.appendChild(ul);
  }

  if (p.sizes) {
    const sizeSelect = document.createElement('div');
    sizeSelect.classList.add('size-select');
    sizeSelect.innerHTML = `
        <label>尺寸：</label>
        <select id="size-select">
            ${p.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
        </select>
    `;
    
    // ⬇️ 插在「產品特色」正下方
    document.getElementById("features")
        .insertAdjacentElement("afterend", sizeSelect);
}


  // 數量按鈕
  const qtyInput = document.getElementById("qty");
  document.getElementById("plus").onclick = () => qtyInput.value++;
  document.getElementById("minus").onclick = () => {
    if (qtyInput.value > 1) qtyInput.value--;
  };

  // 加入購物車
document.getElementById("add-cart").onclick = () => {
    const size = document.getElementById("size-select")?.value || "";
    const qty = parseInt(qtyInput.value) || 1;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(item => item.name === p.name && item.size === size);
    const priceNum = Number(p.price);
    const finalPrice = p.discount && p.discount < 1
        ? Math.round(priceNum * p.discount)
        : priceNum;

    if (index >= 0) {
      cart[index].qty += qty;
    } else {
      cart.push({
        name: p.name,
        price: finalPrice,   // ✅ 儲存折扣價
        image: p.img,
        size: size,
        qty: qty
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    if (p.sizes) {
        alert(`${p.name} 已加入購物車！\n尺寸：${size}\n數量：${qty}`);
    } else {
        alert(`${p.name} 已加入購物車！\n數量：${qty}`);
    }
};

});


