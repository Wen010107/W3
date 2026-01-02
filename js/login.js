let loginCaptcha = "";

// 產生驗證碼

function generateLoginCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  loginCaptcha = "";
  for (let i = 0; i < 4; i++) {
    loginCaptcha += chars[Math.floor(Math.random() * chars.length)];
  }
  document.getElementById("loginCaptchaCode").innerText = loginCaptcha;
}
generateLoginCaptcha();

// ⚡ 登入
function login() {
  const account = document.getElementById("loginAccount").value;
  const password = document.getElementById("loginPassword").value;
  const inputCaptcha = document.getElementById("loginCaptchaInput").value;

  // 假設使用者資料存 localStorage 叫 "user"
  const user = JSON.parse(localStorage.getItem("user"));

  if (!account || !password) {
    alert("請輸入帳號與密碼");
    return;
  }

  if (!user || user.account !== account || user.password !== password) {
    alert("帳號或密碼錯誤");
    return;
  }

  if (inputCaptcha !== loginCaptcha) {
    alert("驗證碼錯誤");
    generateLoginCaptcha();
    return;
  }

  // 登入成功，存登入狀態並新增 name 與 avatar
  const currentUser = 
  {
  account: user.account,
  name: user.name,
  avatar: user.avatar || "😸"
  };

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  alert("登入成功！");
  location.href = "index.html"; // 回首頁
}