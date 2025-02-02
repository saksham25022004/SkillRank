const express = require("express");
const fs = require("fs");
const multer = require("multer");
const PDFDocument = require("pdfkit");

const router = express.Router();

// Multer: Store images in memory (not on disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Images & Convert to PDF (without saving images)
router.post("/upload", upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded." });
    }

    // Create PDF
    const doc = new PDFDocument();
    const pdfPath = `uploads/${Date.now()}-output.pdf`;
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    req.files.forEach((file, index) => {
      doc.image(file.buffer, { fit: [500, 700] });
      if (index < req.files.length - 1) doc.addPage();
    });

    doc.end();

    writeStream.on("finish", () => {
      res.download(pdfPath, "converted.pdf", () => {
        fs.unlinkSync(pdfPath);
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;