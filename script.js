async function sendPrompt() {
    const prompt = document.getElementById("user-input").value;
    
    // Kirim permintaan ke API ChatGPT
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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', // Ganti YOUR_API_KEY dengan kunci API ChatGPT kamu
        },
        body: JSON.stringify({
            model: 'text-davinci-003', // Model yang akan digunakan, bisa diubah sesuai kebutuhan
            prompt: prompt,
            max_tokens: 150, // Jumlah maksimal token dalam respons
            temperature: 0.7, // "Kreativitas" dari respons, bisa disesuaikan
            top_p: 1,
            n: 1,
            stop: ['\n'], // Berhenti saat menemukan karakter baris baru
        }),
    });

    const data = await response.json();

    // Tampilkan respons di halaman
    const chatOutput = document.getElementById("chat-output");
    chatOutput.innerHTML += `<p><strong>Kamu:</strong> ${prompt}</p>`;
    chatOutput.innerHTML += `<p><strong>ChatGPT:</strong> ${data.choices[0].text.trim()}</p>`;

    // Tambahkan tombol untuk menyalin hasil respon
    chatOutput.innerHTML += `<button onclick="copyResponse('${data.choices[0].text.trim()}')">Salin Respons</button>`;

    // Clear input setelah mengirim
    document.getElementById("user-input").value = "";
}

function copyResponse(responseText) {
    // Salin hasil respon ke clipboard
    const el = document.createElement('textarea');
    el.value = responseText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    // Beri tahu pengguna bahwa hasil telah disalin
    alert('Hasil respons telah disalin!');
}
