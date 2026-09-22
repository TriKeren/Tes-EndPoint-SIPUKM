const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const ormawaList = [
    {
        id: '01',
        nama: 'Badan Eksekutif Mahasiswa Politeknik Negeri Banyuwangi',
        deskripsi: 'Lorem ipsum',
        status: 'aktif',
    },
    {
        id: '02',
        nama: 'Himpunan Mahasiswa Jurusan Bisnis dan Informatika',
        deskripsi: 'Lorem ipsum',
        status: 'aktif',
    },
    {
        id: '03',
        nama: 'Himpunan Mahasiswa Jurusan Teknik Sipil',
        deskripsi: 'Lorem ipsum',
        status: 'aktif',
    },
    {
        id: '04',
        nama: 'Himpunan Mahasiswa Jurusan Teknik Mesin',
        status: 'aktif',
    },
    {
        id: '05',
        nama: 'Himpunan Mahasiswa Jurusan Pertanian',
        deskripsi: 'Lorem ipsum',
        status: 'aktif',
    },
    {
        id: '06',
        nama: 'UKM Geniwangi',
        deskripsi: 'Lorem ipsum',
        status: 'aktif',
    },
];

app.get('/api/ukm', (req, res) => {
    res.status(200).json({
        success: true,
        data: ormawaList
    });
});

app.get('/api/ukm/:id', (req, res) => {
    const id = req.params.id;

    const ukm = ormawaList.find(item => item.id === id);

    if (!ukm) {
        return res.status(404).json({
            success: false,
            message: 'Data UKM tidak ditemukan'
        });
    }

    res.status(200).json({
        success: true,
        data: ukm
    });
});

app.post('/api/ukm', (req, res) => {
    const { id, nama, deskripsi, status } = req.body;

    if (!id || !nama || !status) {
        return res.status(400).json({
            success: false,
            message: 'id, nama, dan status wajib diisi'
        });
    }

    const existingUkm = ormawaList.find(item => item.id === id);

    if (existingUkm) {
        return res.status(409).json({
            success: false,
            message: 'ID UKM sudah digunakan'
        });
    }

    const newUkm = {
        id,
        nama,
        deskripsi,
        status
    };

    ormawaList.push(newUkm);

    res.status(201).json({
        success: true,
        message: 'Data UKM berhasil ditambahkan',
        data: newUkm
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});