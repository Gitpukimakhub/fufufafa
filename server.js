const express = require('express'), multer = require('multer'), fs = require('fs'), os = require('os'), path = require('path');
const app = express(), tmpDir = os.tmpdir();

const storage = multer.diskStorage({
    destination: tmpDir,
    filename: (req, file, cb) => cb(null, Math.random().toString(36).slice(-4) + path.extname(file.originalname))
});

const upload = multer({ storage });

app.use('/f', express.static(tmpDir));

app.post('/upload', upload.single('files[]'), (req, res) => res.status(200).type('text').send(`https://${req.hostname}/f/${req.file.filename}`));

app.listen(7860);