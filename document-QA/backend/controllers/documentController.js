const fs = require('fs');
const pdfParse = require('pdf-parse');
const axios =require("axios");
const QuestionAnswer = require('../models/questionAnswer');

// Store document text
let documentText = "";

// Upload and parse document
exports.uploadDocument = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const dataBuffer = fs.readFileSync(file.path);
    const parsedData = await pdfParse(dataBuffer);
    documentText = parsedData.text;

    fs.unlinkSync(file.path);
    res.json({ message: 'Document uploaded successfully'});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Upload the text
exports.uploadText = async (req, res) => {
  try {
    const result = req.body;
    if (!result) return res.status(400).json({ message: 'No text uploaded' });

    documentText = result.textUpload;

    res.json({ message: 'Document uploaded successfully'});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ask question and save to database
exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    if (!documentText) return res.status(400).json({ message: 'No document uploaded yet' });
   
    const promt= `Read this Content carefully content:${documentText}, Now answer the following question based on the above passage : ${question}`;
    const options = {
      method: 'POST',
      url: 'https://open-ai21.p.rapidapi.com/claude3',
      headers: {
        'x-rapidapi-key': 'ef0d9a554emsh645eadc7f36c4d0p184b59jsncad8962983da',
        'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: `${promt}`
          }
        ],
        web_access: false,
      },
    };

    const response = await axios.request(options);
    const answer = response.data.result || "No response";

    // Save to MongoDB
    const newAnswer = new QuestionAnswer({ question, answer });
    await newAnswer.save();

    res.json({ answer:answer.trim() });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all previous questions and answers
exports.getPreviousQAs = async (req, res) => {
  try {
    const qas = await QuestionAnswer.find().sort({ date: 1 });
    res.json(qas);
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};
