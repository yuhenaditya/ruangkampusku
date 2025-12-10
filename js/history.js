document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("loggedInUser");
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    const myBookings = bookings.filter(b => b.user === user);
    const table = document.getElementById("historyTable");

    if (myBookings.length === 0) {
        table.innerHTML += `
            <tr><td colspan="6">Kamu belum pernah melakukan booking.</td></tr>
        `;
        return;
    }

    myBookings.forEach(b => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${b.building}</td>
            <td>${b.floor}</td>
            <td>${b.room}</td>
            <td>${b.date}</td>
            <td>${b.time}</td>
            <td>
                <button class="btn-cancel" onclick="cancelBooking('${b.id}')">
                    Batalkan
                </button>
            </td>
        `;

        table.appendChild(row);
    });
});


// ===============================
// CANCEL BOOKING BY ID
// ===============================
function cancelBooking(id) {
    let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const user = localStorage.getItem("loggedInUser");

    const booking = bookings.find(b => b.id == id);

    if (!booking) {
        alert("Booking tidak ditemukan.");
        return;
    }

    if (booking.user !== user) {
        alert("Kamu tidak dapat membatalkan booking milik pengguna lain.");
        return;
    }

    if (!confirm(`Batalkan booking ruangan ${booking.room}?`)) return;

    bookings = bookings.filter(b => b.id != id);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking berhasil dibatalkan!");
    location.reload();
}
