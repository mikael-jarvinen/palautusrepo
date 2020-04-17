interface weekExercises {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface rating {
  value: number,
  description: string
}

const calculateRating = (total: number, days: number, target: number): rating => {
  const average = total / days;
  const difference = average - target;
  switch (true) {
  case (difference > 0.5):
    return {
      value: 3,
      description: 'very god'
    };
  case (difference < -0.5):
    return {
      value: 1,
      description: 'could do better'
    };
  default:
    return {
      value: 2,
      description: 'doing ok'
    };
  }
};

const calculateExercises = (hours: Array<number>, target: number): weekExercises => {
  const intHours = hours.map(hour => Number(hour));
  const intTarget = Number(target);
  if (intHours.includes(NaN) || !intTarget) {
    throw new Error('Parameters have to be numbers');
  }
  
  const totalHours = intHours.reduce((sum: number, hour: number) => 
    sum + hour, 0);
  const periodLength = intHours.length;
  const trainingDays = intHours.reduce((days: number, hour: number) => {
    return hour > 0 ? days + 1 : days;
  }, 0);
  const success = totalHours / periodLength >= intTarget ? true : false;
  const rating = calculateRating(totalHours, periodLength, intTarget).value;
  const ratingDescription = calculateRating(totalHours, periodLength, intTarget).description;
  const average = totalHours / periodLength;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: intTarget,
    average
  };
};

export default calculateExercises;