import express from 'express';
import cors from 'cors';
import router from './routes/router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//route
app.use('/api', router)



app.get('/', (_req, res) => {
  res.send('Hello Express');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
