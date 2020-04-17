import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';


const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const dailyExercises = req.body.daily_exercises;
  const target = req.body.target;
  
  if(!dailyExercises || !target) {
    res.json({ error: 'parameters missing' });
  }

  try {
    const exerciseObject = calculateExercises(dailyExercises, Number(target));
    res.json(exerciseObject);
  } catch (e) {
    res.json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log('server running on port:', PORT);
});