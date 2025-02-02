import React, { useState } from "react";
import axios from "axios";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const Converter = () => {
  const [images, setImages] = useState([]);
  const [allow, setAllow] =useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [errorMessage, setErrorMessage]= useState("");

  // Handle file selection
  const handleImageChange = (e) => {
    const allowedTypes = ["image/png", "image/jpeg"];
    const selectedFiles = Array.from(e.target.files);
    
    const validFiles = selectedFiles.filter(file => allowedTypes.includes(file.type));

    if (validFiles.length !== selectedFiles.length) {
      setErrorMessage("Only PNG and JPG files are allowed!");
      return;
    }

    setAllow(true);
    setImages([...images, ...validFiles]);
  };

  // Handle drag-and-drop sorting
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setImages((prevImages) => {
        const oldIndex = prevImages.findIndex((_, i) => i === active.id);
        const newIndex = prevImages.findIndex((_, i) => i === over.id);
        return arrayMove(prevImages, oldIndex, newIndex);
      });
    }
  };

  // Remove an image
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    if (updatedImages.length === 0) {
      setAllow(false); 
    }
  };

  // Upload images & generate PDF
  const handleGeneratePDF = async () => {
    if (images.length === 0) {
      setErrorMessage("Please select images first.");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        responseType: "blob",
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPdfBlob(response.data);
    } 
    catch (error) {
      setErrorMessage("Failed to generating PDF");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", width: "600px", margin: "auto", background: "#f8f9fa", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0,0,0,0.2)" }}>
      <h2 style={{ color: "#333" }}>📄 Image to PDF Converter</h2>

      {/* File Input */}
      <div style={{ border: "2px dashed #007bff", padding: "15px", borderRadius: "5px", background: "#e9f5ff", cursor: "pointer" }}>
        <input type="file" multiple accept="image/png, image/jpeg" onChange={handleImageChange} style={{ cursor: "pointer" }} />
      </div>

      {/* Error Message */}
      {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}

      {/* Draggable Image Preview */}
      <h3 style={{ marginTop: "20px" }}>Adjust Image Order</h3>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={images.map((_, index) => index)}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
            {images.map((file, index) => (
              <SortableItem key={index} file={file} index={index} removeImage={removeImage} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Generate PDF Button */}
      <button
        onClick={handleGeneratePDF}
        disabled={!allow}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: allow ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          cursor: allow ? "pointer" : "not-allowed",
          opacity: allow ? 1 : 0.6,
          borderRadius: "5px",
          transition: "0.3s",
        }}
      >
        🖨 Generate PDF
      </button>

      {/* PDF Preview & Download */}
      {pdfBlob && (
        <div style={{ marginTop: "20px", padding: "10px"}}>
          <h3>📜 PDF Preview</h3>
          <iframe src={URL.createObjectURL(pdfBlob)} width="400" height="500" title="PDF Preview"></iframe>

          <br />
          <a href={URL.createObjectURL(pdfBlob)} download="converted.pdf">
            <button style={{ marginTop: "10px", padding: "10px 20px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
              ⬇ Download PDF
            </button>
          </a>
        </div>
      )}
    </div>
  );
};
export default Converter;