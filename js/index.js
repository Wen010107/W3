document.addEventListener("DOMContentLoaded", () => {
  const endDateText = document.querySelector(".end-date").textContent;
  const timerEl = document.querySelector(".timer");

  // ⚠️ Safari / 部分瀏覽器不吃 2026/01/09，要轉成 -
  const endTime = new Date(endDateText.replace(/\//g, "-")).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = endTime - now;

    if (diff <= 0) {
      timerEl.textContent = "已結束";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerEl.textContent = `${days} 天 ${hours} 小時 ${minutes} 分 ${seconds} 秒`;
  }

  updateCountdown();           // 立刻跑一次
  setInterval(updateCountdown, 1000); // 每秒更新
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

