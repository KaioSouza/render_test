const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ mensagem: "API REST Node.js funcionando no Render!" });
});

// Rota /download com comando yt-dlp simplificado
app.get('/download', (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ erro: "URL não fornecida. Por favor, inclua a URL como parâmetro na query string (?url=...)."});
    }

    const command = `/usr/bin/python3 /app/bin/yt-dlp -e ${url}`; // Tentativa com caminho absoluto para python3 e yt-dlp

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar yt-dlp: ${error}`);
            return res.status(500).json({ erro: "Erro ao executar yt-dlp", detalhes: error.message });
        }
        if (stderr) {
            console.error(`Stderr do yt-dlp: ${stderr}`);
            return res.status(500).json({ erro: "Erro do yt-dlp (stderr)", detalhes: stderr });
        }

        try {
            const outputJSON = JSON.parse(stdout);
            res.json(outputJSON);
        } catch (parseError) {
            console.error(`Erro ao parsear JSON do yt-dlp: ${parseError}`);
            console.log(`Stdout do yt-dlp (não parseado): ${stdout}`);
            res.status(500).json({ erro: "Erro ao processar saída do yt-dlp", detalhes: "Saída não é JSON válido." });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});