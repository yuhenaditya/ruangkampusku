// =============================
//  CEK LOGIN
// =============================
function requireLogin() {
    const user = localStorage.getItem("loggedInUser");
    if (!user) window.location.href = "index.html";
}


// =============================
//  (1) PILIH GEDUNG
// =============================
function selectBuilding(buildingName) {
    localStorage.setItem("selectedBuilding", buildingName);
    window.location.href = "select-floor.html";
}


// =============================
//  (2) PILIH LANTAI
// =============================
function selectFloor(floorNumber) {
    localStorage.setItem("selectedFloor", floorNumber);
    window.location.href = "select-room.html";
}


// =============================
//  (3) PILIH RUANGAN
// =============================
function selectRoom(roomName) {
    localStorage.setItem("selectedRoom", roomName);
    window.location.href = "booking.html";
}


// =============================
//  (4) LOAD DATA DI BOOKING PAGE
// =============================
function loadBookingInfo() {
    const building = localStorage.getItem("selectedBuilding");
    const floor = localStorage.getItem("selectedFloor");
    const room = localStorage.getItem("selectedRoom");

    if (!building || !floor || !room) return;

    document.getElementById("infoBuilding").innerText = building;
    document.getElementById("infoFloor").innerText = floor;
    document.getElementById("infoRoom").innerText = room;
}


// =============================
//  (5) BOOKING
// =============================
function bookRoom(e) {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!date || !time) {
        alert("Harap pilih tanggal dan waktu!");
        return;
    }

    // Simulasi penyimpanan booking
    const bookingData = {
        building: localStorage.getItem("selectedBuilding"),
        floor: localStorage.getItem("selectedFloor"),
        room: localStorage.getItem("selectedRoom"),
        date: date,
        time: time
    };

    localStorage.setItem("lastBooking", JSON.stringify(bookingData));

    window.location.href = "success.html";
}


// =============================
//  (6) LOAD SUCCESS PAGE
// =============================
function loadSuccessInfo() {
    const booking = JSON.parse(localStorage.getItem("lastBooking"));
    if (!booking) return;

    document.getElementById("successBuilding").innerText = booking.building;
    document.getElementById("successFloor").innerText = booking.floor;
    document.getElementById("successRoom").innerText = booking.room;
    document.getElementById("successDate").innerText = booking.date;
    document.getElementById("successTime").innerText = booking.time;
}


// =============================
//  LOGOUT
// =============================
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
