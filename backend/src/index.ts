import express from 'express';
import cors from 'cors';
import router from './routes/router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const allowedOrigins = [
  'https://finlytics.tony219y.com',
  'http://localhost:5173',
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));

//route
app.use('/api', router)



app.get('/', (_req, res) => {
  res.send('Hello Express');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
