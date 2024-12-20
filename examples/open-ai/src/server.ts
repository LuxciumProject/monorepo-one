import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Configuration, OpenAIApi } from 'openai';
import path from 'path';

const app = express();

// Security Middleware
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

// Environment Variables
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('ERROR: OPENAI_API_KEY not found in environment variables. Please set it in .env');
  process.exit(1);
}

// OpenAI Configuration
const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

// Routes
app.post('/generate', async (req: Request, res: Response, next: NextFunction) => {
  const { idea } = req.body as { idea?: string };

  if (!idea) {
    return res.status(400).json({ error: 'No idea provided' });
  }

  try {
    const prompt = `Given the following description for improving the server:\n${idea}\nGenerate improved server-side code that can help realize these improvements. Only show the code snippet, nothing else.`;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.7,
      max_tokens: 300,
    });

    const result = response.data.choices[0]?.text?.trim() || 'No result generated.';
    res.json({ result });
  } catch (error) {
    next(error);
  }
});

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
