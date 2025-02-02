# Image to PDF Converter

## Overview
The **Image to PDF Converter** is a web application that allows users to upload multiple images (JPG/PNG), reorder them using drag-and-drop, preview the images before generating a PDF, and download the final PDF file.

## Features
- Upload multiple images (JPG, PNG only).
- Drag and drop images to adjust order before generating the PDF.
- Preview images before converting them to a PDF.
- Generate and download the PDF with reordered images.

## Tech Stack
- **Frontend:** React.js (with `@dnd-kit` for drag-and-drop functionality)
- **Backend:** Node.js, Express.js
- **File Handling:** `multer`, `pdfkit`

---

## Installation

### Prerequisites
Ensure you have **Node.js** and **npm** installed on your system.

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/saksham25022004/image-to-pdf.git
   cd image-to-pdf
   ```

2. Install dependencies for both Frontend and Backend
    ```bash
    npm install
    ```

3. Start the development server
    ```bash
    npm start
    ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser