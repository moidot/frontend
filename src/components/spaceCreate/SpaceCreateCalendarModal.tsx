import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../../node_modules/react-calendar/dist/Calendar.css';

const SpaceCreateCalendarModal = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};
export default SpaceCreateCalendarModal;
