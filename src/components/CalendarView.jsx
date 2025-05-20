import React from 'react';

const CalendarView = ({ routineEvents, currentDate, setCurrentDate }) => {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Generate calendar grid cells including empty ones before the month starts
  const getMonthData = (year, month) => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarDays = [];

    for (let i = 0; i < firstDayIndex; i++) {
      calendarDays.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      calendarDays.push(d);
    }
    return calendarDays;
  };

  const calendarDays = getMonthData(year, month);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const weekdays = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const today = new Date();

  // Check if the given day in the grid is today
  const isToday = (day) =>
    day &&
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  // Check if a given day has a routine event
  const hasRoutineEvent = (day) => {
    if (!day) return false;
    return routineEvents.some((event) => {
      const eventDate = event.date;
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

  return (
    <div className="w-2/3 bg-white p-4 rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentDate(new Date())}
          className="px-3 py-1 bg-green-500 text-white rounded-lg"
        >
          Hôm nay {today.getDate()}
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg"
          >
            Trước
          </button>
          <h2 className="text-lg font-bold">
            {currentDate.toLocaleString('default', { month: 'long' })} {year}
          </h2>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg"
          >
            Sau
          </button>
        </div>
        <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
          Lịch học
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekdays.map((day, index) => (
          <div
            key={index}
            className="h-10 flex items-center justify-center font-bold text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          let bgClass = 'bg-gray-100';
          if (isToday(day)) {
            bgClass = 'bg-purple-400 text-white';
          } else if (day && hasRoutineEvent(day)) {
            bgClass = 'bg-green-200';
          }
          return (
            <div
              key={index}
              className={`h-16 flex items-center justify-center rounded-lg text-sm ${bgClass}`}
            >
              {day || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
