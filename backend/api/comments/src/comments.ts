import { randomBytes } from 'crypto';
import express, { Request, Response } from 'express';

const app = express();
const port = process.argv[2] || 4001;

app.use(express.json());

interface Comment {
  id: string;
  content: string;
}

const commentsByPostId: { [key: string]: Comment[] } = {};

app.get('/posts/:id/comments', (req: Request, res: Response) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req: Request, res: Response) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
