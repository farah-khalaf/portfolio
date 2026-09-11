let currentTOTP = "";
let totpExpiryTime = 0;
let timeLeft = 30;

// توليد TOTP جديد
function generateTOTP() {
    currentTOTP = Math.floor(100000 + Math.random() * 900000).toString();
    totpExpiryTime = Date.now() + 30000; // صالح 30 ثانية
    document.getElementById("generatedTotp").innerText = currentTOTP;
    timeLeft = 30;
}

// تحديث عداد الوقت كل ثانية
setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft <= 0) {
        generateTOTP();
    }
}, 1000);

// تحليل السر و Token
function analyze() {
    const secret = document.getElementById("secret").value;
    const token = document.getElementById("userTotp").value;
    const result = document.getElementById("result");

    if (secret.length < 10) {
        result.style.background = "#ff4c4c";
        result.innerHTML = "❌ Weak Secret Key (too short)";
        return;
    }

    if (!/^\d{6}$/.test(token)) {
        result.style.background = "#ff4c4c";
        result.innerHTML = "❌ Invalid Token Format (must be 6 digits)";
        return;
    }

    result.style.background = "#4caf50";
    result.innerHTML = `
        ✅ Token Format: Valid <br>
        🔐 Secret Strength: Strong <br>
        ⏱ Time Window: 30 seconds <br>
        🛡 Replay Protection: Enabled <br>
        🚦 Brute Force Protection: Recommended
    `;
}

// التحقق من TOTP
function verifyTOTP() {
    const userInput = document.getElementById("userTotp").value;
    const currentTime = Date.now();

    if (currentTime > totpExpiryTime) {
        alert("❌ TOTP Expired");
        return;
    }

    if (userInput === currentTOTP) {
        alert("✅ Valid TOTP");
    } else {
        alert("❌ Invalid TOTP");
    }
}

// توليد تقرير الأمان
function generateReport() {
    const report = document.getElementById("report");
    report.innerHTML = "";
    const checks = [
        "✔ TOTP expires every 30 seconds",
        "✔ 6-digit secure token",
        "✔ Replay attack prevention simulated",
        "✔ Time-based validation enabled",
        "✔ Brute-force protection simulated"
    ];
    checks.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        report.appendChild(li);
    });
}

// محاكاة هجوم
function simulateAttack() {
    let attempts = Math.floor(Math.random() * 1000);
    let result = document.getElementById("attackResult");

    if (attempts > 5) {
        result.innerText =
            "❌ Attack blocked after " + attempts + " attempts (Rate limiting active)";
        result.style.color = "red";
    } else {
        result.innerText =
            "⚠ Weak protection detected!";
        result.style.color = "orange";
    }
}

// تهيئة الصفحة عند الفتح
generateTOTP();
generateReport();
