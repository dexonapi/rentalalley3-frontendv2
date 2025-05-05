import { useState } from "react";

const DatePicker = ({ onSelect, onClose, title }: { onSelect: (date: string) => void; onClose: () => void; title: string }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onSelect(selectedDate.toISOString().split('T')[0]); // Store as YYYY-MM-DD
    onClose();
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);

    // Add empty slots for days before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }

    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <button
          key={day}
          className="w-10 h-10 flex items-center justify-center text-[#222222] hover:bg-[#D8D8D8] rounded-full"
          onClick={() => handleDateSelect(day)}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="rounded-4xl bg-white p-4 z-30">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-[#222222] hover:bg-[#D8D8D8] p-2 rounded-full">
          ←
        </button>
        <span className="text-[#222222] font-medium">
          {title} - {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={nextMonth} className="text-[#222222] hover:bg-[#D8D8D8] p-2 rounded-full">
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-[#222222] mb-2">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
};

export default DatePicker;
