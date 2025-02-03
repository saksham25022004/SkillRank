const express = require('express');
const multer = require('multer');
const { uploadDocument, uploadText, askQuestion, getPreviousQAs } = require('../controllers/documentController');

const router = express.Router();

// Multer configuration for file upload
const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/upload', upload.single('document'), uploadDocument);
router.post('/upload-text', uploadText);
router.post('/ask', askQuestion);
router.get('/previous', getPreviousQAs);

module.exports = router;
