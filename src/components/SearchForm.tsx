import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import { destinationSuggestions, getFormSections } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';
import DatePicker from './DatePicker';

const SearchForm = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const [activeButton, setActiveButton] = useState('');
  const [isHovered, setIsHovered] = useState('false');
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [showDatePickers, setShowDatePickers] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
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
  
  const handleCheckInSelect = (date: string) => {
    setCheckIn(date);
    if (checkOut) {
      setShowDatePickers(false);
    }
  };

  const handleCheckOutSelect = (date: string) => {
    setCheckOut(date);
    if (checkIn) {
      setShowDatePickers(false);
    }
  };

  const formSections = getFormSections({
    destination,
    checkIn,
    checkOut,
    setShowDestinationSuggestions,
    setShowDatePickers,
    setShowCategoryPicker,
    selectedCategory,
  });

  return (
    <section className="flex justify-center max-container mt-2 font-cereal-Bk overflow-visible ">
      <div ref={formRef} className={`flex flex-row justify-between items-center  rounded-full border-[0.5px] relative border-[#D8D8D8] min-w-[850px] custom-shadow-form ${activeButton ? 'bg-[#e9e9e9]' : 'bg-white'}`}>
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
                  isHovered === section.id || isHovered === formSections[index + 1].id ? `${activeButton === section.id ? 'bg-[#e9e9e9]' : 'bg-[#e9e9e9]'}` : 'bg-[#D8D8D8]'
                } ${activeButton && activeButton === section.id ? 'bg-[#e9e9e9]' : ''} ${activeButton === section.id || activeButton === formSections[index + 1].id ? 'bg-[#e9e9e9]' : 'bg-[#D8D8D8]'}`}
              />
            )}

            <AnimatePresence>
              {showDestinationSuggestions && (
                <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[80px] left-0 right-100 rounded-4xl bg-white border-[0.5px] border-[#D8D8D8]">
                  <ul className="my-5">
                    {destinationSuggestions.map((suggestion) => (
                      <li key={suggestion} className="py-2 px-9 cursor-pointer hover:bg-[#D8D8D8]" onClick={() => setDestination(suggestion)}>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
            {showDatePickers && (
              <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[80px] left-0 right-0 flex justify-center z-30 rounded-4xl bg-white border-[0.5px] border-[#D8D8D8]">
                <div className="flex gap-4 my-5">
                  <DatePicker
                    title="Check-in"
                    onSelect={handleCheckInSelect}
                    onClose={() => {
                      if (checkIn && checkOut) {
                        setShowDatePickers(false);
                      }
                    }}
                  />
                  <DatePicker
                    title="Check-out"
                    onSelect={handleCheckOutSelect}
                    onClose={() => {
                      if (checkIn && checkOut) {
                        setShowDatePickers(false);
                      }
                    }}
                  />
                </div>
              </motion.div>
            )}
            </AnimatePresence>

            <AnimatePresence>
            {showCategoryPicker && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[80px] left-90 right-0 rounded-4xl bg-white border-[0.5px] border-[#D8D8D8] p-6 z-30 grid grid-cols-2 gap-4"
              >
                {['Property', 'Cars', 'Bicycle', 'Rooms', 'Hotels', 'Trucks', 'Tools'].map((category) => (
                  <button
                    key={category}
                    className={`p-4 rounded-lg text-left hover:bg-gray-100 transition-colors ${selectedCategory === category ? 'bg-blue-50 border border-blue-200' : 'border border-transparent'}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryPicker(false);
                    }}
                  >
                    <div className="font-medium text-[#222222]">{category}</div>
                  </button>
                ))}
              </motion.div>
            )}
            </AnimatePresence>
          </React.Fragment>
        ))}
      </div>  
    </section>
    )
}

export default SearchForm