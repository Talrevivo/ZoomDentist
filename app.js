document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // למנוע ריענון של העמוד

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // דוגמא לבדיקה ראשונית של שם משתמש וסיסמה
    if (username === "admin" && password === "1234") {
        alert("ברוך הבא!");
        // ניווט לעמוד הבא
        window.location.href = "dashboard.html"; // עמוד עתידי
    } else {
        // הצגת הודעת שגיאה
        const errorMessage = document.getElementById("error-message");
        errorMessage.classList.remove("hidden");
    }
});