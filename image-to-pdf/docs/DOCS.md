# Image to PDF Converter - Documentation

## Overview
The Image to PDF Converter allows users to upload multiple images (JPG/PNG), adjust their order using drag-and-drop, preview the PDF before downloading, and generate a single PDF file.

## Features
- Upload multiple images (JPG, PNG only).
- Drag and drop images to reorder them.
- Preview images before generating the PDF.
- Generate and download the PDF with adjusted images.

## Usage

### Uploading Images
- Click on the file input to select multiple images.
- Ensure images are in JPG or PNG format.
- Images will be displayed for preview.

### Adjust Image Order
- Drag and drop images to rearrange them.
- Remove unwanted images before generating the PDF.

### Generate & Download PDF
- Click the Generate PDF button (enabled only when images are selected).
- Preview the generated PDF.
- Click Download PDF to save the file.

## API Endpoints

**Convert Images to PDF**
    - Endpoint: POST /upload
    - Request: Multipart form data (images)
    - Response: JSON with pdfUrl

**Example Response:**
```bash
{
  "message": "PDF created successfully",
  "pdfUrl": "http://localhost:5000/uploads/1706789092-output.pdf"
}
```

