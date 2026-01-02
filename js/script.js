/*index部分*/

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
  // 隱藏登入
  document.getElementById("loginItem").style.display = "none";

  // 顯示使用者選單
  document.getElementById("userMenu").style.display = "block";
  document.getElementById("userAvatar").innerText = currentUser.avatar;
  document.getElementById("userName").innerText = currentUser.name;
}

// 登出功能
document.getElementById("logoutBtn")?.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  alert("已登出");
  location.href = "index.html";
});

// 手機版：點擊使用者名稱展開登出
document.getElementById("userMenu")?.addEventListener("click", function (e) {
  if (window.innerWidth <= 768) {
    e.stopPropagation(); // 防止冒泡
    this.classList.toggle("open");
  }
});


const urlParams = new URLSearchParams(window.location.search);
const animal = urlParams.get('animal'); // dog / cat / all
const type = urlParams.get('type'); // clothes / food / toy / snack

const products = document.querySelectorAll('.product-card');

products.forEach(product => {
    const productAnimal = product.dataset.animal;
    const productType = product.dataset.type;

    let show = true;

    // 判斷 animal
    if (animal && animal !== 'all' && productAnimal !== animal) {
        show = false;
    }

    // 判斷 type（只有當有選 type 時才篩選）
    if (type && productType !== type) {
        show = false;
    }

    product.style.display = show ? 'block' : 'none';
});


/*product部分*/

/*const products = document.querySelectorAll('.product-card');*/
const menuLinks = document.querySelectorAll('.category-menu a');

let currentAnimal = 'all';
let currentType = 'all';

function filterProducts() {
    products.forEach(p => {
        const matchAnimal =
            currentAnimal === 'all' || p.dataset.animal === currentAnimal;
        const matchType =
            currentType === 'all' || p.dataset.type === currentType;

        p.style.display = (matchAnimal && matchType) ? 'block' : 'none';
    });
}

// 點選下拉選單
menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        currentAnimal = link.dataset.animal || 'all';
        currentType = link.dataset.type || 'all';

        filterProducts();
    });
});

// 讀 URL 參數（從首頁跳過來也能用）
const params = new URLSearchParams(window.location.search);
currentAnimal = params.get('animal') || 'all';
currentType = params.get('type') || 'all';

filterProducts();

// 倒數計時功能
function startCountdown(product) {
    const timerEl = product.querySelector('.timer');
    const endDateEl = product.querySelector('.end-date');
    if (!timerEl || !endDateEl) return;

    const endTime = new Date(endDateEl.textContent).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            clearInterval(interval);
            timerEl.textContent = "活動已結束";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerEl.textContent = `${days}天 ${hours}時 ${minutes}分 ${seconds}秒`;
    }, 1000);
}

// 對所有商品啟動倒數
products.forEach(product => startCountdown(product));


/*product-detail部分*/
// 確保 DOM 完全載入
document.addEventListener("DOMContentLoaded", () => {

    // 商品資料（示範，實際可引入完整 productData）
    const productData = {
        "dog-food-1": {
            name: "高品質成犬狗糧",
            price: 1500,
            weight: "15kg",
            img: "img/02.jpg",
            desc: "專為成犬設計，營養均衡，健康美味。",
            features: [
                "促進腸道菌叢平衡",
                "支持免疫力，維持整體健康",
                "高蛋白配方，維持成犬肌肉健康"
            ],
            discount: 0.8,
            discountEnd: "2026-01-09T23:59:59"
        }
    };

    // 讀取 URL 參數
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product");

    if (!productData[productId]) {
        document.getElementById("product-detail").innerHTML = "<p>找不到商品資料</p>";
        return;
    }

    const p = productData[productId];

    // 填入商品資訊
    document.getElementById("product-name").textContent = p.name;
    document.getElementById("product-img").src = p.img;
    document.getElementById("product-img").alt = p.name;
    document.getElementById("product-desc").textContent = p.desc;

    const weightEl = document.getElementById("product-weight");
    if (p.weight) {
        weightEl.textContent = `重量：${p.weight}`;
        weightEl.style.display = "block";
    } else weightEl.style.display = "none";

    // 產品特色
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

    // 價格與折扣
    const priceEl = document.getElementById("product-price");
    if (p.discount) {
        const discounted = Math.round(p.price * p.discount);
        priceEl.innerHTML = `<span class="old-price">NT$${p.price}</span><span class="discount">NT$${discounted}</span>`;
    } else {
        priceEl.textContent = `NT$${p.price}`;
    }

    // 折扣倒數
    if (p.discountEnd) {
        const countdown = document.createElement("div");
        countdown.classList.add("countdown");
        priceEl.insertAdjacentElement("afterend", countdown);

        function updateCountdown() {
            const now = new Date();
            const end = new Date(p.discountEnd);
            const diff = end - now;
            if (diff <= 0) {
                countdown.textContent = "折扣已結束";
                clearInterval(timer);
            } else {
                const days = Math.floor(diff / 1000 / 60 / 60 / 24);
                const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
                const mins = Math.floor((diff / 1000 / 60) % 60);
                const secs = Math.floor((diff / 1000) % 60);
                countdown.textContent = `折扣倒數：${days}天 ${hours}時 ${mins}分 ${secs}秒`;
            }
        }
        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
    }

    // 數量控制
    const qtyInput = document.getElementById("qty");
    document.getElementById("plus").addEventListener("click", () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });
    document.getElementById("minus").addEventListener("click", () => {
        if (qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
    });

    // 加入購物車
    document.getElementById("add-cart").addEventListener("click", () => {
        const size = document.getElementById("size-select") ? document.getElementById("size-select").value : "";
        const qty = parseInt(qtyInput.value);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);
        if (existingIndex >= 0) cart[existingIndex].qty += qty;
        else cart.push({
            id: productId,
            name: p.name,
            price: p.price,
            discount: p.discount || 1,
            img: p.img,
            size: size,
            qty: qty
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${p.name} 已加入購物車！數量：${qty}${size ? "，尺寸：" + size : ""}`);
    });
});

    // 商品資料（示範，實際可引入完整 productData）
    const productData = {
        "dog-food-1": {
            name: "高品質成犬狗糧",
            price: 1500,
            weight: "15kg",
            img: "assets/img/02.jpg",
            desc: "專為成犬設計，營養均衡，健康美味。",
            features: [
                "促進腸道菌叢平衡",
                "支持免疫力，維持整體健康",
                "高蛋白配方，維持成犬肌肉健康"
            ],
            discount: 0.8,
            discountEnd: "2026-01-09T23:59:59"
        }
    };

    // 讀取 URL 參數
    /*const params = new URLSearchParams(window.location.search);*/
    const productId = params.get("product");

    if (!productData[productId]) {
        document.getElementById("product-detail").innerHTML = "<p>找不到商品資料</p>";
        return;
    }

    const p = productData[productId];

    // 填入商品資訊
    document.getElementById("product-name").textContent = p.name;
    document.getElementById("product-img").src = p.img;
    document.getElementById("product-img").alt = p.name;
    document.getElementById("product-desc").textContent = p.desc;

    const weightEl = document.getElementById("product-weight");
    if (p.weight) {
        weightEl.textContent = `重量：${p.weight}`;
        weightEl.style.display = "block";
    } else weightEl.style.display = "none";

    // 產品特色
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

    // 價格與折扣
    const priceEl = document.getElementById("product-price");
    if (p.discount) {
        const discounted = Math.round(p.price * p.discount);
        priceEl.innerHTML = `<span class="old-price">NT$${p.price}</span><span class="discount">NT$${discounted}</span>`;
    } else {
        priceEl.textContent = `NT$${p.price}`;
    }

    // 折扣倒數
    if (p.discountEnd) {
        const countdown = document.createElement("div");
        countdown.classList.add("countdown");
        priceEl.insertAdjacentElement("afterend", countdown);

        function updateCountdown() {
            const now = new Date();
            const end = new Date(p.discountEnd);
            const diff = end - now;
            if (diff <= 0) {
                countdown.textContent = "折扣已結束";
                clearInterval(timer);
            } else {
                const days = Math.floor(diff / 1000 / 60 / 60 / 24);
                const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
                const mins = Math.floor((diff / 1000 / 60) % 60);
                const secs = Math.floor((diff / 1000) % 60);
                countdown.textContent = `折扣倒數：${days}天 ${hours}時 ${mins}分 ${secs}秒`;
            }
        }
        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
    }

    // 數量控制
    const qtyInput = document.getElementById("qty");
    document.getElementById("plus").addEventListener("click", () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });
    document.getElementById("minus").addEventListener("click", () => {
        if (qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
    });

    // 加入購物車
    document.getElementById("add-cart").addEventListener("click", () => {
        const size = document.getElementById("size-select") ? document.getElementById("size-select").value : "";
        const qty = parseInt(qtyInput.value);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);
        if (existingIndex >= 0) cart[existingIndex].qty += qty;
        else cart.push({
            id: productId,
            name: p.name,
            price: p.price,
            discount: p.discount || 1,
            img: p.img,
            size: size,
            qty: qty
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${p.name} 已加入購物車！數量：${qty}${size ? "，尺寸：" + size : ""}`);
    });

