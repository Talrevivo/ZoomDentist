const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

let messageState = 0; // משתנה לניהול מצב ההודעות החוזרות

function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // גלילה אוטומטית להודעה האחרונה
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
                addMessage("תודה על פנייתך, אני בודק את הבקשה שלך", "system");
                messageState = 1; // מעבר להודעה השנייה
            } else {
                addMessage("אני מיד מצרף לצ'אט לינק לשיחת וידאו", "system");
                messageState = 0; // חזרה להודעה הראשונה
            }
        }, 1000);
    }
});