import React from 'react';

const ClassRoutine = ({ currentDate, routineEvents }) => {
  // Format the month string from currentDate (e.g., "September")
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Filter routine events to show only events for the current month & year
  const filteredEvents = routineEvents.filter(
    (event) =>
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
  );

  return (
    <div className="w-1/3 p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold mb-3">Class Routine</h2>
      <p className="text-gray-500 mb-4">{monthName}</p>
      {filteredEvents.map((event, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-100 p-3 mb-2 rounded-lg"
        >
          <div>
            <h3 className="font-bold">{event.title}</h3>
            <p className="text-sm text-gray-500">
              {event.date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default ClassRoutine;
