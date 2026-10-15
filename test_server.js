const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const upload = require('./middlewares/multerMiddleware');

app.use(cors());
app.use(express.json());

app.post('/test', upload.array('imagenes', 5), (req, res) => {
    res.json({ body: req.body, files: req.files });
});

// Error handling middleware to catch multer errors
app.use((err, req, res, next) => {
    console.error("EXPRESS ERROR:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
});

app.listen(5001, () => {
    console.log("Test server running on 5001");
});
