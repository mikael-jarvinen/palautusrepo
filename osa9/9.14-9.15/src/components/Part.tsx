import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ course: CoursePart }> = ({ course }) => {
  switch (course.name) {
  case "Fundamentals":
  return <p>{course.name} {course.exerciseCount} <br/>
    {course.description}
  </p>
  case "Using props to pass data":
  return <p>{course.name} {course.exerciseCount}</p>
  case "Deeper type usage":
  return <p>{course.name} {course.exerciseCount} <br/>
    {course.description} {course.exerciseSubmissionLink}
  </p>
  case "Fullstack":
  return <p>{course.name} {course.exerciseCount} <br/>
    {course.description} <br/>
    difficulty: {course.difficulty}
  </p>
  }
}

export default Part;