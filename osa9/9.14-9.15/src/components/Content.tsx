import React from 'react';
import { CoursePart } from '../types';

const Content: React.FC<{ content: CoursePart[] }> = ({ content }) => {
  return (
    <div>
      {content.map(course => <p key={course.name}>
        {course.name} {course.exerciseCount}
      </p>
      )}
    </div>
  );
};

export default Content;