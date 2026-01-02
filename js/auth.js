// auth.js
// =======================
// 共用登入狀態管理
// =======================

// 取得目前登入使用者
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// 是否已登入
function isLoggedIn() {
  return !!getCurrentUser();
}

// 顯示使用者名稱與頭像（通用）
function renderUser() {
  const user = getCurrentUser();
  if (!user) return;

  // 登入按鈕
  const loginItem = document.getElementById("loginItem");

  // 使用者名稱（簡單顯示）
  const userNameLi = document.getElementById("user-name");
  const usernameEl = document.getElementById("username");

  // 下拉選單
  const userMenu = document.getElementById("userMenu");
  const userAvatarEl = document.getElementById("userAvatar");
  const userNameEl = document.getElementById("userName");

  // 隱藏登入
  if (loginItem) loginItem.style.display = "none";

  // 顯示名字（不加歡迎詞）
  if (userNameLi && usernameEl) {
    userNameLi.style.display = "block";
    usernameEl.textContent = user.name;
  }

  // 顯示頭像＋名字
  if (userMenu && userAvatarEl && userNameEl) {
    userMenu.style.display = "block";
    userAvatarEl.textContent = user.avatar || "😸";
    userNameEl.textContent = user.name;
  }
}

// 登出
function logout() {
  const confirmLogout = confirm("確定要登出嗎？");
  if (!confirmLogout) return;

  localStorage.removeItem("currentUser");
  location.href = "login.html";
}

// 綁定登出按鈕（通用）
function bindLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
}

// 手機版使用者選單下拉
function bindMobileUserMenu() {
  const userMenu = document.getElementById("userMenu");

  if (!userMenu) return;

  userMenu.addEventListener("click", e => {
    if (window.innerWidth <= 768) {
      e.stopPropagation();
      userMenu.classList.toggle("open");
    }
  });

  // 點擊其他地方關閉
  document.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      userMenu.classList.remove("open");
    }
  });
}

// 初始化（每頁都會跑）
document.addEventListener("DOMContentLoaded", () => {
  renderUser();
  bindLogout();
  bindMobileUserMenu(); // ✅ 加這行
});
