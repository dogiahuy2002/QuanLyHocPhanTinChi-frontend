import { addDays, subDays, startOfWeek, format } from 'date-fns';

export default function WeekControls({
  weekStart,
  setWeekStart,
  showDatePicker,
  setShowDatePicker
}) {
  const prevWeek = () => setWeekStart(ws => subDays(ws, 7));
  const nextWeek = () => setWeekStart(ws => addDays(ws, 7));
  const goToToday = () => setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const onDateChange = e => {
    const d = new Date(e.target.value);
    setWeekStart(startOfWeek(d, { weekStartsOn: 1 }));
    setShowDatePicker(false);
  };

  return (
    <div className="flex items-center justify-between mb-4 space-x-2">
      <button onClick={prevWeek} className="px-3 py-1 bg-purple-600 text-white rounded">‹ Tuần trước</button>
      <button onClick={() => setShowDatePicker(v => !v)} className="px-3 py-1 bg-gray-200 rounded">
        Chọn ngày
      </button>
      {showDatePicker && (
        <input
          type="date"
          onChange={onDateChange}
          className="border rounded p-1"
        />
      )}
      <div className="flex-1 text-center font-semibold">
        Tuần {format(weekStart, 'dd/MM')} – {format(addDays(weekStart, 6), 'dd/MM')}
      </div>
      <button onClick={nextWeek} className="px-3 py-1 bg-purple-600 text-white rounded">Tuần sau ›</button>
      <button onClick={goToToday} className="px-3 py-1 bg-red-500 text-white rounded">Hôm nay</button>
    </div>
  );
}
