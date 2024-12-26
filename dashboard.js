const appointments = [
    { id: 1, date: "2024-12-25", time: "09:00", doctor: "ד'ר כהן" },
    { id: 2, date: "2024-12-26", time: "11:00", doctor: "ד'ר לוי" },
    { id: 3, date: "2024-12-27", time: "14:00", doctor: "ד'ר רוזן" }
];

function renderAppointments() {
    const appointmentList = document.getElementById("appointmentList");
    appointmentList.innerHTML = ""; // מנקה את הרשימה הקיימת

    appointments.forEach(appointment => {
        const div = document.createElement("div");
        div.innerHTML = `
            <span>${appointment.date} ${appointment.time} - ${appointment.doctor}</span>
            <button onclick="deleteAppointment(${appointment.id})">מחק</button>
        `;
        appointmentList.appendChild(div);
    });
}

function deleteAppointment(id) {
    const index = appointments.findIndex(appointment => appointment.id === id);
    if (index !== -1) {
        appointments.splice(index, 1);
        renderAppointments();
    }
}

document.getElementById("addAppointment").addEventListener("click", function() {
    const newAppointment = { 
        id: appointments.length + 1, 
        date: prompt("תאריך (YYYY-MM-DD):"), 
        time: prompt("שעה (HH:MM):"), 
        doctor: prompt("שם רופא:") 
    };
    if (newAppointment.date && newAppointment.time && newAppointment.doctor) {
        appointments.push(newAppointment);
        renderAppointments();
        // הכפתור "עבור לצ'אט" הוסר, אין צורך להציג אותו
    }
});

// הצגת התורים בתחילת הטעינה
renderAppointments();