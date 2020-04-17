import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('hello');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  try {
    const bmiObject = {
      weight,
      height,
      bmi: calculateBmi(height, weight)
    };
    res.json(bmiObject);
  } catch (e) {
    res.json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log('server running on port:', PORT);
});