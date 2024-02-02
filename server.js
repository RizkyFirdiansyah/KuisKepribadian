const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data pertanyaan kuis
const questions = [
    {
        question: "Saya lebih suka bekerja sendiri daripada dalam kelompok.",
        type: "introvert",
    },
    {
        question: "Saya merasa energik dan bahagia ketika bersama orang lain.",
        type: "extrovert",
    },
    {
        question: "Saya merasa nyaman baik bekerja sendiri maupun dalam kelompok. ",
        type: "ambivert",
    },
    {
        question: "Saya lebih suka berbicara dengan orang-orang yang sudah saya kenal daripada orang baru. ",
        type: "introvert",
    },
    {
        question: "Saya senang bergaul dan bertemu dengan orang baru.",
        type: "extrovert",
    },
    {
        question: "Saya bisa menyesuaikan diri dengan berbagai situasi sosial dengan mudah. ",
        type: "ambivert",
    },
    {
        question: "Saya cenderung mendengarkan lebih banyak daripada berbicara dalam percakapan. ",
        type: "introvert",
    },
    {
        question: "Saya aktif dalam berbagai kegiatan sosial dan senang berpartisipasi.",
        type: "extrovert",
    },
    {
        question: "Saya suka memiliki waktu sendiri untuk merenung dan meresapi pikiran saya. ",
        type: "introvert",
    },
    {
        question: "Saya merasa energik ketika berada di kerumunan orang.",
        type: "extrovert",
    },
    {
        question: "Saya suka menghabiskan waktu di dalam ruangan dengan hobi atau kegiatan sendiri. ",
        type: "introvert",
    },
    {
        question: "Saya memiliki keseimbangan antara waktu bersosialisasi dan waktu untuk diri sendiri. ",
        type: "ambivert",
    },
];

// Endpoint untuk mendapatkan pertanyaan kuis
app.get('/api/quiz', (req, res) => {
    res.json(questions);
    // console.log(questions);
});


let totalUsers = 0;
let personalityData = {
    Introvert: 0,
    Extrovert: 0,
    Ambivert: 0,
};

app.post('/save-results', (req, res) => {
    console.log('Received data:', req.body);
    const userPersonality = req.body.personalityType;

    // Update the total users count
    totalUsers++;

    // Update the personality count
    if (personalityData.hasOwnProperty(userPersonality)) {
        personalityData[userPersonality]++;
    } else {
        // Handle unexpected personality types
        console.error('Unexpected personality type:', userPersonality);
    }

    console.log('Total users now:', totalUsers);
    console.log('Personality data:', personalityData);

    res.json({ message: 'Data berhasil diterima di server.' });
});

app.get('/get-stats', (req, res) => {
    res.json({
        totalUsers: totalUsers,
        personalityData: personalityData,
    });
});

// Middleware untuk menyajikan file statis dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Menjalankan server pada port tertentu
app.listen(PORT, () => {
    console.log(`Server Express berjalan di http://localhost:${PORT}`);
});
