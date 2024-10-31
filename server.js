const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;

// Dosya yolu
const filePath = './reservations.txt';

// JSON verilerini okumak için middleware
app.use(express.json());
app.use(express.static('public'));

// Rezervasyonları kaydetme işlevi
function saveReservations(reservations) {
    fs.writeFile(filePath, JSON.stringify(reservations), (err) => {
        if (err) {
            console.error('Veri kaydedilirken hata oluştu:', err);
        } else {
            console.log('Rezervasyon verileri başarıyla kaydedildi.');
        }
    });
}

// Rezervasyonları yükleme işlevi
function loadReservations() {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } else {
            return [];
        }
    } catch (err) {
        console.error('Veri okunurken hata oluştu:', err);
        return [];
    }
}

// Rezervasyonları al
app.get('/reservations', (req, res) => {
    const reservations = loadReservations();
    res.json(reservations);
});

// Rezervasyon ekle
app.post('/reservations', (req, res) => {
    const reservations = loadReservations();
    reservations.push(req.body);
    saveReservations(reservations);
    res.json({ message: 'Rezervasyon başarıyla eklendi!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
