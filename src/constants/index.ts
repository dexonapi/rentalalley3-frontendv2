import { formatDate } from '../lib/utils';
import { Section, Props } from './context';
  
export const destinationSuggestions = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
];

export const getFormSections = ({
  destination,
  checkIn,
  checkOut,
  setShowDestinationSuggestions,
  setShowDatePickers,
  setShowCategoryPicker,
  selectedCategory,
}: Omit<Props, 'guests' | 'setShowGuestPicker'> & { setShowCategoryPicker: (v: boolean) => void; selectedCategory: string }): Section[] => [
  {
    id: 'search',
    label: 'Where',
    subLabel: destination || 'Search destinations',
    onClick: () => {
      setShowDestinationSuggestions(true);
      setShowCategoryPicker(false);
      setShowDatePickers(false);
    },
    paddingClasses: 'pl-21 pr-24',
  },
  {
    id: 'checkIn',
    label: 'Add dates',
    subLabel: checkIn ? formatDate(checkIn) : 'Check in',
    onClick: () => {
      setShowDestinationSuggestions(false);
      setShowCategoryPicker(false);
      setShowDatePickers(true);
    },
    paddingClasses: 'pl-6 pr-10',
  },
  {
    id: 'checkOut',
    label: 'Add dates',
    subLabel: checkOut ? formatDate(checkOut) : 'Check out',
    onClick: () => {
      setShowDestinationSuggestions(false);
      setShowCategoryPicker(false);
      setShowDatePickers(true);
    },
    paddingClasses: 'pl-6 pr-10',
  },
  {
    id: 'category',
    label: 'Category',
    subLabel: selectedCategory || 'Select a category',
    onClick: () => {
      setShowCategoryPicker(true);
      setShowDestinationSuggestions(false);
      setShowDatePickers(false);
    },
    paddingClasses: 'pl-6 pr-45',
  },
];



