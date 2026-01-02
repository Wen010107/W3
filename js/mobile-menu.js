const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const desktopMenu = document.querySelector(".menu");

// 初始化時只複製一次
mobileMenu.innerHTML = desktopMenu.innerHTML;

hamburgerBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open"); // 切換顯示
});
