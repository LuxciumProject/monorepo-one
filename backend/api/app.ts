import express, { Request, Response } from 'express';

const app = express();
const port = process.argv[2] || 3001;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World');
});

app.post('/', (req: Request, res: Response) => {
  const { body } = req;
  console.log('Hello World');
  res.send(body);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*
epress server will have a post and a get endpoint on the same route get will reply helloworld and post will reply with the post content back and will write helloworld to the server console should have a port variable to set to port 3001 and it should be the default but should be overriddden when started using a port in the command line make it idiomatic typescript and add all the iconic best practice items to make it more robust and more resilient
 */
