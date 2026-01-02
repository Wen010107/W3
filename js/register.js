let captcha = "";
let selectedAvatar = "";

// 產生驗證碼
function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  captcha = "";
  for (let i = 0; i < 4; i++) {
    captcha += chars[Math.floor(Math.random() * chars.length)];
  }
  document.getElementById("captchaCode").innerText = captcha;
}
generateCaptcha();

// 選頭像
function selectAvatar(emoji, el) {
  selectedAvatar = emoji;
  document.querySelectorAll('.emoji-avatar').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
}

// 註冊
function register() {
  const name = document.getElementById("regName").value;
  const account = document.getElementById("regAccount").value;
  const password = document.getElementById("regPassword").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const inputCaptcha = document.getElementById("captchaInput").value;

  if (!name || !account || !password || !gender || !selectedAvatar) {
    alert("請填寫所有資料");
    return;
  }

  if (inputCaptcha !== captcha) {
    alert("驗證碼錯誤");
    generateCaptcha();
    return;
  }

  const user = { name, account, password, gender, avatar: selectedAvatar };
  localStorage.setItem("user", JSON.stringify(user));

  alert("註冊成功！");
  location.href = "login.html";
}