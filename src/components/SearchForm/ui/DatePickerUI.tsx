import { motion } from 'framer-motion';
import DatePicker from '../../Shared/DatePicker';

const DatePickerUI = ({
    handleCheckInSelect,
    handleCheckOutSelect,
    setShowDatePickers,
    checkIn,
    checkOut
  }: {
    handleCheckInSelect: (date: Date) => void;
    handleCheckOutSelect: (date: Date) => void;
    setShowDatePickers: (show: boolean) => void;
    checkIn: Date | null;
    checkOut: Date | null;
  }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-[80px] left-0 right-0 flex justify-center z-30 rounded-4xl bg-white border-[0.5px] border-[#D8D8D8]">
        <div className="flex gap-4 my-5">
          <DatePicker
            title="Check-in"
            onSelect={(date: string) => handleCheckInSelect(new Date(date))}
            onClose={() => {
              if (checkIn && checkOut) {
                setShowDatePickers(false);
              }
            }}
          />
          <DatePicker
            title="Check-out"
            onSelect={(date: string) => handleCheckOutSelect(new Date(date))}
            onClose={() => {
              if (checkIn && checkOut) {
                setShowDatePickers(false);
              }
            }}
          />
        </div>
    </motion.div>
  )
}

export default DatePickerUI