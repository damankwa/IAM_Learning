// src/server.ts
import express from 'express';

const app = express();
const PORT = 3000;

// This middleware allows us to receive JSON in requests
app.use(express.json());

// In-memory storage for users (temporary - just for learning)
const users: any[] = [];

// Existing hello endpoint
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, IAM World! - Development Mode!' });
});

app.get('/debug/users', (req, res) => {
  res.json({ 
    count: users.length,
    users: users 
  });
});

// New registration endpoint
app.post('/register', (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;
  
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ 
      error: 'Email and password are required' 
    });
  }
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ 
      error: 'User already exists with this email' 
    });
  }
  
  // Create new user (WARNING: storing password in plain text for now!)
  const newUser = {
    id: users.length + 1, // Simple ID generation
    email: email,
    password: password // This is BAD - we'll fix this next!
  };
  
  // Add to our "database"
  users.push(newUser);
  
  // Send success response (don't send password back!)
  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: newUser.id,
      email: newUser.email
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
  console.log('Available endpoints:');
  console.log('  GET  /hello     - Test endpoint');
  console.log('  POST /register  - Register new user');
  console.log('  GET  /debug/users  - View all users (debug only)');
});