const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Simpan API Key
const apiKey = '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'; // Ganti dengan API Key ChatGPT kamu

app.use(express.json());

app.post('/generate-response', async (req, res) => {
    const { prompt } = req.body;
    
    // Kirim permintaan ke API ChatGPT dari sisi server
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7,
            top_p: 1,
            n: 1,
            stop: ['\n'],
        }),
    });

    const data = await response.json();

    // Kirim respons dari server ke klien
    res.json({ response: data.choices[0].text.trim() });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
