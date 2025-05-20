import { format } from 'date-fns';
import vi from 'date-fns/locale/vi';

export default function     CalendarGrid({ weekDays, eventsByDay }) {
  return (
    <div className="grid grid-cols-7 border-t border-l">
      {weekDays.map(day => {
        const key = format(day, 'yyyy-MM-dd');
        const dayEvents = eventsByDay[key] || [];

        return (
          <div key={key} className="border-b border-r p-2 min-h-[150px]">
            <h3 className="font-medium text-m mb-1">
              {format(day, 'EEEE dd/MM', { locale: vi })}
            </h3>
            {dayEvents.length > 0 ? (
              <ul className="space-y-1">
                {dayEvents.map(s => (
                  <li key={s.schedule_id} className="text-xs bg-purple-100 p-1 rounded">
                    <strong>{s.class.subject.subject_name}</strong><br/>
                    {s.class.class_detail.study_time} (Ca {s.shift})<br/>
                    Phòng {s.class.class_detail.room_name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-400">Không có</p>
            )}
          </div>
        );
      })}
    </div>
  );
}