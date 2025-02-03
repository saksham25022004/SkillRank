# Document Q&A System Documentation

## Overview
The Document Q&A system allows users to upload documents (PDF or text) and ask questions based on the uploaded content. The system utilizes an AI API to generate answers strictly according to the document's content and stores question-answer pairs in a database for future reference.

## System Design

### Components:

**Frontend (React.js):**
- Provides a chat-like interface for user interaction.
- Allows document upload (PDF/Text) and manual text input.
- Displays conversation history dynamically.

**Backend (Node.js + Express.js):**
- Manages API endpoints for file upload, question-answering, and retrieving history.
- Processes user queries and interacts with AI API.
- Stores document content and question-answer pairs in MongoDB.

**Database (MongoDB):**
- Stores uploaded documents and extracted text.
- Maintains a collection of question-answer pairs.

**AI API (Claude3 - OpenAI via RapidAPI):**
- Generates answers based on the uploaded document's content.

## API Endpoints

1. Upload Document

**Endpoint: POST /api/documents/upload**
- Description: Uploads a document (PDF or text) and extracts its content.
- Request:
```bash
FormData: {
  "document": (file)
}
```

- Response:
```bash
{
  "message": "Document uploaded successfully"
}
```

2. Ask a Question

**Endpoint: POST /api/documents/ask**
- Description: Queries the AI API based on the uploaded document and returns an answer.
- Request:
```bash
{
  "question": "What is the main idea of the document?"
}
```
- Response:
```bash
{
  "answer": "The document discusses climate change and its effects."
}
```
3. Get Previous Questions and Answers

**Endpoint: GET /api/documents/previous**
- Description: Retrieves a history of past questions and answers.
- Response:
```bash
[
  {
    "question": "What is climate change?",
    "answer": "Climate change refers to long-term shifts in temperatures and weather patterns."
  }
]
```
## Workflow
- User uploads a document (PDF or text) via the frontend.
- Backend extracts and stores the document's content in MongoDB.
- User asks a question related to the document.
- Backend sends a request to the AI API with the document’s content and user’s question.
- AI API generates a response strictly based on the document’s content.
- The system stores the question-answer pair and displays the answer to the user.
- Users can view previous Q&A history for reference.