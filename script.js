// Data simulasi jadwal (jam 8-17, kosong/acara)
const rooms = {
    'Ruang 101': ['08:00-09:00 (Kosong)', '09:00-10:00 (Dipakai)', '10:00-11:00 (Kosong)', '11:00-12:00 (Kosong)', '13:00-14:00 (Dipakai)', '14:00-15:00 (Kosong)', '15:00-16:00 (Kosong)', '16:00-17:00 (Dipakai)'],
    'Ruang 102': ['08:00-09:00 (Dipakai)', '09:00-10:00 (Kosong)', '10:00-11:00 (Kosong)', '11:00-12:00 (Dipakai)', '13:00-14:00 (Kosong)', '14:00-15:00 (Kosong)', '15:00-16:00 (Dipakai)', '16:00-17:00 (Kosong)'],
    'Ruang 103': ['08:00-09:00 (Kosong)', '09:00-10:00 (Kosong)', '10:00-11:00 (Dipakai)', '11:00-12:00 (Kosong)', '13:00-14:00 (Kosong)', '14:00-15:00 (Dipakai)', '15:00-16:00 (Kosong)', '16:00-17:00 (Kosong)'],
    'Ruang 104': ['08:00-09:00 (Dipakai)', '09:00-10:00 (Dipakai)', '10:00-11:00 (Kosong)', '11:00-12:00 (Kosong)', '13:00-14:00 (Dipakai)', '14:00-15:00 (Kosong)', '15:00-16:00 (Kosong)', '16:00-17:00 (Dipakai)'],
    'Ruang 105': ['08:00-09:00 (Kosong)', '09:00-10:00 (Kosong)', '10:00-11:00 (Kosong)', '11:00-12:00 (Dipakai)', '13:00-14:00 (Kosong)', '14:00-15:00 (Kosong)', '15:00-16:00 (Dipakai)', '16:00-17:00 (Kosong)']
};

// Login simulasi
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        localStorage.setItem('loggedIn', username);
        window.location.href = 'dashboard.html';
    });
}

// Cek login di dashboard
if (localStorage.getItem('loggedIn')) {
    // Logout
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        window.location.href = 'index.html';
    });

    // Dark mode toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });

    // Rekomendasi ruangan kosong saat ini
    const now = new Date();
    const currentHour = now.getHours();
    const recList = document.getElementById('recList');
    Object.keys(rooms).forEach(room => {
        const schedule = rooms[room];
        const isAvailable = schedule.some(slot => slot.includes(`${currentHour}:00-${currentHour+1}:00 (Kosong)`));
        if (isAvailable) {
            const li = document.createElement('li');
            li.textContent = `${room} tersedia sekarang!`;
            recList.appendChild(li);
        }
    });

    // Denah interaktif
    const roomsElements = document.querySelectorAll('.room');
    roomsElements.forEach(roomEl => {
        roomEl.addEventListener('click', () => {
            const room = roomEl.dataset.room;
            document.getElementById('floorPlan').style.display = 'none';
            document.getElementById('schedule').style.display = 'block';
            document.getElementById('roomName').textContent = room;
            const scheduleList = document.getElementById('scheduleList');
            scheduleList.innerHTML = '';
            rooms[room].forEach(slot => {
                const li = document.createElement('li');
                li.textContent = slot;
                scheduleList.appendChild(li);
            });
        });
    });

    // Tombol back
    document.getElementById('backBtn').addEventListener('click', () => {
        document.getElementById('schedule').style.display = 'none';
        document.getElementById('floorPlan').style.display = 'block';
    });

    // Book simulasi
    document.getElementById('bookBtn').addEventListener('click', () => {
        alert('Booking berhasil! (Simulasi saja)');
    });
} else if (window.location.pathname.includes('dashboard.html')) {
    window.location.href = 'index.html'; // Redirect jika belum login
}
