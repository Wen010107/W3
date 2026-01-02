// product.js
document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll(".product-card");
    const menuLinks = document.querySelectorAll(".category-menu a, .sub-menu a");

    let currentAnimal = "all";
    let currentType = "all";

    function filterProducts() {
        products.forEach(p => {
            const matchAnimal = currentAnimal === "all" || p.dataset.animal === currentAnimal;
            const matchType = currentType === "all" || p.dataset.type === currentType;
            p.style.display = matchAnimal && matchType ? "block" : "none";
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation(); // 阻止父層 a 影響
            const animal = link.dataset.animal || "all";
            const type = link.dataset.type || "all";

            currentAnimal = animal;
            currentType = type;
            console.log("篩選:", currentAnimal, currentType);
            filterProducts();
        });
    });

    // 如果要支援首頁傳參數
    const params = new URLSearchParams(window.location.search);
    const paramAnimal = params.get("animal");
    const paramType = params.get("type");
    if (paramAnimal || paramType) {
        currentAnimal = paramAnimal || "all";
        currentType = paramType || "all";
        filterProducts();
    }

    // 倒數計時
    function startCountdown(product) {
        const timerEl = product.querySelector(".timer");
        const endDateEl = product.querySelector(".end-date");
        if (!timerEl || !endDateEl) return;
        const endTime = new Date(endDateEl.textContent).getTime();

        const interval = setInterval(() => {
            const now = Date.now();
            const diff = endTime - now;
            if (diff <= 0) {
                clearInterval(interval);
                timerEl.textContent = "活動已結束";
                return;
            }
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);
            timerEl.textContent = `${d}天 ${h}時 ${m}分 ${s}秒`;
        }, 1000);
    }

    products.forEach(p => startCountdown(p));
});
/*測試1111*/
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    // 1. 點擊漢堡切換主選單
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 2. 手機版點擊「商品」或「狗狗用品」時展開下層，而不跳頁
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const subMenu = item.nextElementSibling;
                if (subMenu) {
                    e.preventDefault(); // 阻止跳轉
                    subMenu.classList.toggle('show');
                }
            }
        });
    });
});
