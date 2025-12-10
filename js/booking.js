// ===============================
// SLOT LIST
// ===============================
const timeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00"
];


// ===============================
// LOAD PAGE
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const room = localStorage.getItem("selectedRoom");

    if (!room) window.location.href = "select-building.html";

    document.getElementById("room-info").innerText = "Ruangan: " + room;

    document.getElementById("datePicker").addEventListener("change", loadSlots);
});


// ===============================
// LOAD SLOT INTO UI
// ===============================
function loadSlots() {
    const date = document.getElementById("datePicker").value;
    const room = localStorage.getItem("selectedRoom");
    const container = document.getElementById("slotContainer");

    container.innerHTML = "";

    if (!date) return;

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const user = localStorage.getItem("loggedInUser");

    timeSlots.forEach(slot => {
        const slotDiv = document.createElement("div");
        slotDiv.classList.add("slot");
        slotDiv.innerText = slot;

        const existing = bookings.find(b =>
            b.room === room && b.date === date && b.time === slot
        );

        // Slot sudah dibooking
        if (existing) {
            if (existing.user === user) {
                slotDiv.classList.add("mine"); // biru
                slotDiv.onclick = () => confirmUnbooking(slot);
            } else {
                slotDiv.classList.add("booked"); // merah
            }
        } else {
            // slot masih bebas (abu/putih)
            slotDiv.classList.add("available");
            slotDiv.onclick = () => confirmBooking(slot);
        }

        container.appendChild(slotDiv);
    });
}


// ===============================
// KONFIRMASI BOOKING
// ===============================
function confirmBooking(time) {
    const room = localStorage.getItem("selectedRoom");
    const result = confirm(`Apakah kamu yakin ingin booking ${room} pada jam ${time}?`);

    if (result) bookSlot(time);
}


// ===============================
// KONFIRMASI UNBOOKING
// ===============================
function confirmUnbooking(time) {
    const room = localStorage.getItem("selectedRoom");
    const result = confirm(`Apakah kamu ingin membatalkan booking ${room} pada jam ${time}?`);

    if (result) unbookSlot(time);
}


// ===============================
// CREATE BOOKING
// ===============================
function bookSlot(time) {
    const date = document.getElementById("datePicker").value;
    const building = localStorage.getItem("selectedBuilding");
    const floor = localStorage.getItem("selectedFloor");
    const room = localStorage.getItem("selectedRoom");
    const user = localStorage.getItem("loggedInUser");

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

bookings.push({
    id: Date.now(), // tambahkan ID unik
    building,
    floor,
    room,
    date,
    time,
    user
});


    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking berhasil!");
    loadSlots();
}


// ===============================
// DELETE BOOKING (UNBOOK)
// ===============================
function unbookSlot(time) {
    const date = document.getElementById("datePicker").value;
    const room = localStorage.getItem("selectedRoom");
    const user = localStorage.getItem("loggedInUser");

    let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    bookings = bookings.filter(b =>
        !(b.date === date && b.room === room && b.time === time && b.user === user)
    );

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking dibatalkan!");
    loadSlots();
}
