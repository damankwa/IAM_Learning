// src/server.ts
import express from 'express';

const app = express();
const PORT = 3000;

// This middleware allows us to receive JSON in requests
app.use(express.json());

// A simple test endpoint
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, IAM World! here testing here' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Try: http://localhost:3000/hello');
});