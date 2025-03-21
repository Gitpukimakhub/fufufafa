const express = require('express'), multer = require('multer'), fs = require('fs'), os = require('os'), path = require('path');
const app = express(), tmpDir = os.tmpdir();

const storage = multer.diskStorage({
    destination: tmpDir,
    filename: (req, file, cb) => cb(null, Math.random().toString(36).slice(-4) + path.extname(file.originalname))
});

const upload = multer({ storage });

app.use('/f', express.static(tmpDir));

app.all('/', (req, res) => res.send(`<!DOCTYPE html>
<html lang="id">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
@font-face {
  font-family: 'iAWriterDuospace';
  src: url('iAWriterDuospace-Regular.woff2') format('woff2'),
       url('iAWriterDuospace-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
body { font-family: 'iAWriterDuospace', sans-serif; margin: 20px; text-align: center; }
input, button { margin: 10px; padding: 10px; }
</style>
</head>
<body>
<h1>File Uploader</h1>
<hr>
<p>No size limit</p>
<form action="/upload" method="post" enctype="multipart/form-data">
<input type="file" name="files[]" multiple>
<button type="submit">Upload</button>
</form>
</body>
</html>`));

app.post('/upload', upload.single('files[]'), (req, res) => res.status(200).type('text').send(`https://${req.hostname}/f/${req.file.filename}`));

app.listen(7860);
