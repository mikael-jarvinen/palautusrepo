import React from 'react';
import { CoursePart } from '../types';

const Total: React.FC<{ content: CoursePart[] }> = ({ content }) => {
  const total = content.reduce((sum, course) => {
    return sum + course.exerciseCount;
  }, 0)

  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

export default Total