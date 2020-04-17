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
        description: "very god"
      };
    case (difference < -0.5):
      return {
        value: 1,
        description: "could do better"
      };
    default:
      return {
        value: 2,
        description: "doing ok"
      }
  }
}

const calculateExercises = (hours: Array<number>, target: number): weekExercises => {
  const totalHours = hours.reduce((sum: number, hour: number) => 
    sum + hour, 0);
  const periodLength = hours.length;
  const trainingDays = hours.reduce((days: number, hour: number) => {
    return hour > 0 ? days + 1 : days
  }, 0);
  const success = totalHours / periodLength >= target ? true : false;
  const rating = calculateRating(totalHours, periodLength, target).value;
  const ratingDescription = calculateRating(totalHours, periodLength, target).description;
  const average = totalHours / periodLength;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

const inputtedStrings = process.argv.slice(2)

const inputtedHours = inputtedStrings.map(hour => Number(hour))
if (inputtedHours.includes(NaN)) {
  throw new Error('Parameters have to be numbers')
}

console.log(calculateExercises(inputtedHours, 2))