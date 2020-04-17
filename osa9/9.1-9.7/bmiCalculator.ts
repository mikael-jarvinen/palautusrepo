const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(180, 85))