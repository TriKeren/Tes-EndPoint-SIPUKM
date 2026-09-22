const express = require('express');

const app = express();
const port = 3001;

app.use(express.json());

const kegiatanList = [
    {
        id_kegiatan: '01',
        nama_kegiatan: 'Seminar Teknologi',
        jadwal: '20 September 2026, 09:00',
        kuota: 100,
        status: 'aktif'
    },
    {
        id_kegiatan: '02',
        nama_kegiatan: 'Workshop UI/UX',
        jadwal: '22 September 2026, 13:00',
        kuota: 50,
        status: 'aktif'
    },
    {
        id_kegiatan: '03',
        nama_kegiatan: 'Webinar Pemrograman',
        jadwal: '25 September 2026, 09:00',
        kuota: 75,
        status: 'aktif'
    }
];

app.get('/api/kegiatan', (req, res) => {
    res.status(200).json({
        success: true,
        data: kegiatanList
    });
});

app.get('/api/kegiatan/:id', (req, res) => {
    const id = req.params.id;

    const kegiatan = kegiatanList.find(
        item => item.id_kegiatan === id
    );

    if (!kegiatan) {
        return res.status(404).json({
            success: false,
            message: 'Kegiatan tidak ditemukan'
        });
    }

    res.status(200).json({
        success: true,
        data: kegiatan
    });
});

app.post('/api/kegiatan', (req, res) => {
    const {
        id_kegiatan,
        nama_kegiatan,
        jadwal,
        kuota,
        status
    } = req.body;

    if (!id_kegiatan || !nama_kegiatan || !jadwal || !kuota || !status) {
        return res.status(400).json({
            success: false,
            message: 'Semua data wajib diisi'
        });
    }

    const existingKegiatan = kegiatanList.find(
        item => item.id_kegiatan === id_kegiatan
    );

    if (existingKegiatan) {
        return res.status(409).json({
            success: false,
            message: 'ID kegiatan sudah digunakan'
        });
    }

    const newKegiatan = {
        id_kegiatan,
        nama_kegiatan,
        jadwal,
        kuota: Number(kuota),
        status
    };

    kegiatanList.push(newKegiatan);

    res.status(201).json({
        success: true,
        message: 'Kegiatan berhasil ditambahkan',
        data: newKegiatan
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});