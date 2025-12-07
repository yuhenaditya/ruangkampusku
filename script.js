const rooms = {
    'Ruang 101': ['08:00-09:00 (Kosong)', '09:00-10:00 (Dipakai)', '10:00-11:00 (Kosong)', '11:00-12:00 (Kosong)', '13:00-14:00 (Dipakai)', '14:00-15:00 (Kosong)', '15:00-16:00 (Kosong)', '16:00-17:00 (Dipakai)'],
    'Ruang 102': ['08:00-09:00 (Dipakai)', '09:00-10:00 (Kosong)', '10:00-11:00 (Kosong)', '11:00-12:00 (Dipakai)', '13:00-14:00 (Kosong)', '14:00-15:00 (Kosong)', '15:00-16:00 (Dipakai)', '16:00-17:00 (Kosong)'],
    'Ruang 103': ['08:00-09:00 (Kosong)', '09:00-10:00 (Kosong)', '10:00-11:00 (Dipakai)', '11:00-12:00 (Kosong)', '13:00-14:00 (Kosong)', '14:00-15:00 (Dipakai)', '15:00-16:00 (Kosong)', '16:00-17:00 (Kosong)'],
    'Ruang 104': ['08:00-09:00 (Dipakai)', '09:00-10:00 (Dipakai)', '10:00-11:00 (Kosong)', '11:00-12:00 (Kosong)', '13:00-14:00 (Dipakai)', '14:00-15:00 (Kosong)', '15:00-16:00 (Kosong)', '16:00-17:00 (Dipakai)'],
    'Ruang 105': ['08:00-09:00 (Kosong)', '09:00-10:00 (Kosong)', '10:00-11:00 (Kosong)', '11:00-12:00 (Dipakai)', '13:00-14:00 (Kosong)', '14:00-15:00 (Kosong)', '15:00-16:00 (Dipakai)', '16:00-17:00 (Kosong)']
};

// Login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').onsubmit = e => {
        e.preventDefault();
        localStorage.setItem('loggedIn', 'true');
        location.href = 'dashboard.html';
    };
}

// Register
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').onsubmit = e => {
        e.preventDefault();
        const modal = document.getElementById('registerSuccessModal');
        if (modal) modal.classList.add('show');
    };
}

// Dashboard
if (localStorage.getItem('loggedIn') && document.getElementById('recList')) {
    document.getElementById('logout').onclick = () => {
        localStorage.removeItem('loggedIn');
        location.href = 'index.html';
    };

    const confirmModal = document.getElementById('confirmModal');
    const successModal = document.getElementById('successModal');
    const confirmText = document.getElementById('confirmText');
    const successDetail = document.getElementById('successDetail');
    let pendingBooking = null;

    const openRoomSchedule = (room) => {
        document.getElementById('floorPlan').style.display = 'none';
        document.getElementById('schedule').style.display = 'block';
        document.getElementById('roomName').textContent = room;
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('datePicker').value = today;
        loadSchedule(room, today);
    };

    const loadSchedule = (room, date) => {
        const list = document.getElementById('scheduleList');
        list.innerHTML = '';
        rooms[room].forEach(slot => {
            const time = slot.split(' ')[0];
            const div = document.createElement('div');
            div.className = 'slot';
            div.innerHTML = `<strong>${time}</strong> ${slot.includes('Kosong') ? 'Tersedia' : 'Dibooking'}`;
            if (slot.includes('Kosong')) {
                div.classList.add('kosong');
                div.style.cursor = 'pointer';
                div.onclick = () => {
                    pendingBooking = {room, time, date};
                    const dateStr = new Date(date).toLocaleDateString('id-ID', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
                    confirmText.innerHTML = `Booking <strong>${room}</strong><br>pada <strong>${time}</strong><br><small>${dateStr}</small>`;
                    confirmModal.classList.add('show');
                };
            } else {
                div.classList.add('dipakai');
            }
            list.appendChild(div);
        });
    };

    // Ganti tanggal
    document.getElementById('datePicker').onchange = function() {
        loadSchedule(document.getElementById('roomName').textContent, this.value);
    };

    // Klik ruangan dari denah
    document.querySelectorAll('.room').forEach(el => {
        el.onclick = () => openRoomSchedule(el.dataset.room);
    });

    // REKOMENDASI RUANGAN — 100% BISA DIKLIK!
    Object.keys(rooms).forEach(room => {
        if (rooms[room].some(s => s.includes('Kosong'))) {
            const card = document.createElement('div');
            card.className = 'slot kosong';
            card.innerHTML = `<strong style="font-size:1.4em;display:block;margin-bottom:8px">${room}</strong><small>Klik untuk melihat jadwal</small>`;
            card.style.cursor = 'pointer';
            card.style.textAlign = 'center';
            card.style.padding = '20px';
            card.style.borderRadius = '16px';
            card.onclick = () => openRoomSchedule(room);
            document.getElementById('recList').appendChild(card);
        }
    });

    document.getElementById('backBtn').onclick = () => {
        document.getElementById('schedule').style.display = 'none';
        document.getElementById('floorPlan').style.display = 'block';
    };

    // Tutup popup
    document.getElementById('confirmNo').onclick = () => confirmModal.classList.remove('show');
    document.getElementById('confirmYes').onclick = () => {
        confirmModal.classList.remove('show');
        const {room, time, date} = pendingBooking;
        const dateStr = new Date(date).toLocaleDateString('id-ID', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
        successDetail.innerHTML = `Kamu berhasil booking:<br><strong>${room}</strong><br><strong>${time}</strong><br><small>${dateStr}</small>`;
        successModal.classList.add('show');
    };

    window.closeSuccessModal = () => successModal.classList.remove('show');
}