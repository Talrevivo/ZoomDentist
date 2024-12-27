const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const goToDashboardButton = document.getElementById("goToDashboard");

let messageState = 0; // משתנה לניהול מצב ההודעות

function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerHTML = text; // שימוש ב-innerHTML כדי לאפשר קישורים ואימוג'ים
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // גלילה אוטומטית להודעה האחרונה
}

function generateZoomLink() {
    const meetingId = Math.floor(1000000000 + Math.random() * 9000000000); // מזהה פגישה אקראי
    const password = Math.random().toString(36).substring(2, 10); // סיסמה אקראית
    return `https://us04web.zoom.us/j/${meetingId}?pwd=${password}`;
}

// הודעה מערכתית ראשונית
addMessage("?שלום, כיצד ניתן לעזור", "system");

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, "user"); // הודעה של המשתמש
        messageInput.value = "";

        // תגובות לפי מצב
        setTimeout(() => {
            if (messageState === 0) {
                addMessage(
                    "על מנת לייעל את המענה, יש לפרט את פנייתך אשר תועבר לנציג הראשון שיתפנה. בינתיים ניתן להמשיך בשגרת היומיום שלך 🙏 ואנו נעדכן אותך כאן כשמקומך בתור יגיע",
                    "system"
                );
                messageState = 1;
            } else if (messageState === 1) {
                addMessage(
                    "שלום, כאן רועי ממרפאת מכבידנט, לצורך זיהוי יש להשיב בהודעה חוזרת מספר תעודת זהות, תאריך לידה וכתובת מגורים",
                    "system"
                );
                messageState = 2;
            } else if (messageState === 2) {
                addMessage(
                    "שמחתי לעמוד לשירותך, מיד ישלח אליך קישור לשיחת זום עם רופא.",
                    "system"
                );
                messageState = 3;
            } else if (messageState === 3) {
                const zoomLink = generateZoomLink();
                addMessage(
                    `קישור לזום: <a href="${zoomLink}" target="_blank">${zoomLink}</a>`,
                    "system"
                );

                // הצגת כפתור מעבר לעמוד dashboard
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