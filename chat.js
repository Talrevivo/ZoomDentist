const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const goToDashboardButton = document.getElementById("goToDashboard");

let messageState = 0; // משתנה לניהול מצב ההודעות החוזרות

function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerHTML = text; // שימוש ב-innerHTML כדי לאפשר קישורים
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // גלילה אוטומטית להודעה האחרונה
}

function generateZoomLink() {
    const meetingId = Math.floor(1000000000 + Math.random() * 9000000000); // מזהה פגישה אקראי
    const password = Math.random().toString(36).substring(2, 10); // סיסמה אקראית
    return `https://us04web.zoom.us/j/${meetingId}?pwd=${password}`;
}

// הודעה מערכתית ראשונית
addMessage("?שלום, איך אני יכול לעזור לך", "system");

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, "user"); // הודעה של המשתמש
        messageInput.value = "";

        // תגובות חוזרות חלילה
        setTimeout(() => {
            if (messageState === 0) {
                addMessage("?תודה על פנייתך, תרצה שנדבר בזום", "system");
                messageState = 1; // מעבר להודעה השנייה
            } else {
                const zoomLink = generateZoomLink();
                addMessage(`:אני מיד מצרף לצ'אט לינק לשיחת וידאו <a href="${zoomLink}" target="_blank">${zoomLink}</a>`, "system");

                // הצגת כפתור מעבר ל-dashboard
                goToDashboardButton.classList.remove("hidden");

                messageState = 0; // חזרה להודעה הראשונה
            }
        }, 1000);
    }
});

// מעבר ל-dashboard
goToDashboardButton.addEventListener("click", function() {
    window.location.href = "dashboard.html";
});