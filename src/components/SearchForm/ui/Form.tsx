import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import { destinationSuggestions, getFormSections } from '../../../constants';
import { AnimatePresence, motion } from 'framer-motion';
import { CategoryPickerUI, DatePickerUI, Suggestions } from './';

const Form = ({ isScrolled }: { isScrolled: boolean }) => {
  const formRef = useRef<HTMLDivElement>(null);

  const [activeButton, setActiveButton] = useState('');
  const [isHovered, setIsHovered] = useState('false');
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [showDatePickers, setShowDatePickers] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!formRef.current?.contains(event.target as Node)) {
        setActiveButton('');
        setShowDestinationSuggestions(false);
        setShowCategoryPicker(false);
        setShowDatePickers(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleCheckInSelect = (date: Date) => {
    setCheckIn(date);
    if (checkOut) {
      setShowDatePickers(false);
    }
  };

  const handleCheckOutSelect = (date: Date) => {
    setCheckOut(date);
    if (checkIn) {
      setShowDatePickers(false);
    }
  };

  const formSections = getFormSections({
    destination,
    checkIn: checkIn ? new Date(checkIn) : null,
    checkOut: checkOut ? new Date(checkOut) : null,
    setShowDestinationSuggestions,
    setShowDatePickers,
    setShowCategoryPicker,
    selectedCategory,
  });

  return (
    <section className="flex justify-center max-container font-cereal-Bk overflow-visible ">
      <div ref={formRef} className={`flex flex-row justify-between items-center  rounded-full border-[0.5px] absolute border-[#D8D8D8] min-w-[850px] custom-shadow-form ${activeButton ? 'bg-[#e9e9e9]' : 'bg-white'}`}>
        <button className="bg-[#0DB2A9] rounded-full text-white ml-5 p-[9px] hover:bg-blue-600 absolute -left-1 z-30 transition-colors">
          <Search size={24} className="inline-block" />
        </button>

        {formSections.map((section, index) => (
          <React.Fragment key={section.id}>
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`text-[#222222] box-border relative
                ${
                  activeButton === section.id
                    ? 'bg-white custom-shadow rounded-4xl z-20'
                    : isHovered === section.id && activeButton === formSections[index - 1]?.id
                    ? 'rounded-4xl z-19 before:content-[""] before:absolute before:inset-0 before:-left-14 before:bg-[#D8D8D8] before:rounded-r-4xl before:z-5 before:shadow-[2px_0_4px_rgba(0,0,0,0.1)]'
                    : isHovered === section.id && activeButton === formSections[index + 1]?.id
                    ? 'rounded-4xl z-19 before:content-[""] before:absolute before:inset-0 before:-right-14 before:bg-[#D8D8D8] before:rounded-l-4xl before:z-5 before:shadow-[-2px_0_4px_rgba(0,0,0,0.1)]'
                    : 'rounded-4xl z-20'
                } 
                flex flex-start flex-col py-[11px] relative overflow-visible cursor-pointer ${section.paddingClasses} ${
                  activeButton === section.id ? '' : 'hover:bg-[#D8D8D8]'
                }`}
              onMouseEnter={() => setIsHovered(section.id)}
              onMouseLeave={() => setIsHovered('false')}
              
              onClick={() => {
                setActiveButton(section.id);
                section.onClick();
              }}
            >
              <div className="relative z-20">
                <span className="text-xs text-[#070707] w-full" onClick={section.onClick}>
                  {section.label}
                </span>
                <p className="text-sm text-slate-gray w-full">{section.subLabel}</p>
              </div>
            </motion.div>

            {index < formSections.length - 1 && (
              <span
              className={`w-[1px] h-[30px] bg-[#D8D8D8] ${
                // Check if the current section (index) or the next section (index + 1) is hovered
                isHovered === section.id || isHovered === formSections[index + 1]?.id
                  ? activeButton !== ''
                    ? 'bg-[#e9e9e9]' // Blue when adjacent section is hovered and any section is active
                    : 'bg-white' // White when adjacent section is hovered but no section is active
                  : activeButton === section.id || activeButton === formSections[index + 1]?.id
                  ? 'bg-[#e9e9e9]' // Light gray when adjacent section is active but not hovered
                  : 'bg-[#D8D8D8]' // Default gray
              }`}
              />
            )}

            <AnimatePresence>
              {showDestinationSuggestions && <Suggestions 
                destinationSuggestions={destinationSuggestions} 
                setDestination={setDestination} 
              />}
            </AnimatePresence>

            <AnimatePresence>
              {showDatePickers && <DatePickerUI
                handleCheckInSelect={handleCheckInSelect}
                handleCheckOutSelect={handleCheckOutSelect}
                setShowDatePickers={setShowDatePickers}
                checkIn={checkIn} 
                checkOut={checkOut}
              />}
            </AnimatePresence>

            <AnimatePresence>
              {showCategoryPicker && <CategoryPickerUI
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setShowCategoryPicker={setShowCategoryPicker}
              />}
            </AnimatePresence>
          </React.Fragment>
        ))}
      </div>  
    </section>
    )
}

export default Form;