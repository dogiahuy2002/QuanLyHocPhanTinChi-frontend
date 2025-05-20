import { useEffect, useState } from 'react';
import { startOfWeek, eachDayOfInterval, addDays, parse, isSameDay, format } from 'date-fns';

import WeekControls from '../components/Schedule/WeekControls';
import CalendarGrid from '../components/Schedule/CalendarGrid';
import SubjectList from '../components/Schedule/SubjectList';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  // Toggle date picker cũng đưa lên container
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/schedule', {
          credentials: 'include',
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (res.ok && json.status === 200) {
          setSchedules(json.data.map(item => ({
            ...item,
            dateObj: parse(item.time, 'MM/dd/yyyy', new Date()),
          })));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  if (loading) return <div className="p-4 text-center">Đang tải lịch…</div>;

  // Tạo mảng ngày trong tuần
  const weekDays = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });

  // Gom events theo ngày
  const eventsByDay = weekDays.reduce((acc, day) => {
    const key = format(day, 'yyyy-MM-dd');
    acc[key] = schedules.filter(s => isSameDay(s.dateObj, day));
    return acc;
  }, {});

  // Danh sách môn duy nhất
  const subjects = Array.from(
    new Set(Object.values(eventsByDay).flat().map(s => s.class.subject.subject_name))
  );

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left: tuần calendar */}
      <div className="md:col-span-2 bg-white rounded-lg shadow p-4 overflow-auto">
        <WeekControls
          weekStart={weekStart}
          setWeekStart={setWeekStart}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
        />
        <CalendarGrid weekDays={weekDays} eventsByDay={eventsByDay} />
      </div>

      {/* Right: danh sách môn */}
      <SubjectList subjects={subjects} />
    </div>
  );
};

export default Schedule;
