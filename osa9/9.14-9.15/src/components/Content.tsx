import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';


const Content: React.FC<{ content: CoursePart[] }> = ({ content }) => {
  return (
    <div>
      {content.map(course => <Part key={course.name} course={course}/>)}
    </div>
  );
};

export default Content;