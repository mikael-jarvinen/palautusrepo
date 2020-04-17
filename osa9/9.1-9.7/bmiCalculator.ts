const calculateBmi = (height: number, weight: number): string => {
  if (!Number(height) ||!Number(weight)) {
    throw new Error('Parameters have to be numbers')
  }

  const squaredHeight = Math.pow((height / 100), 2);
  const bmi = weight / squaredHeight;

  switch (true) {
    case (bmi < 18.5):
      return 'Underweight';
    case (bmi < 25):
      return 'Healthy weight';
    case (bmi < 30):
      return 'Overweight';
    default:
      return 'Obese'
  }
}

export default calculateBmi