// server.js
const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.use(express.json());

// Endpoint to handle chat messages
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Call the LLM API 
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: userMessage,
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ response: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing your request.' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));