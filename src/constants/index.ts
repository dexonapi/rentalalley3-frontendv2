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
  setShowGuestPicker,
  setShowDatePickers,
  guests,
}: Props): Section[] => [
  {
    id: 'search',
    label: 'Where',
    subLabel: destination || 'Search destinations',
    onClick: () => {
      setShowDestinationSuggestions(true);
      setShowGuestPicker(false);
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
      setShowGuestPicker(false);
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
      setShowGuestPicker(false);      
      setShowDatePickers(true);
    },
    paddingClasses: 'pl-6 pr-10',
  },
  {
    id: 'guest',
    label: 'Who',
    subLabel: 
    guests.adults + guests.children + guests.infants + guests.pets > 0
      ? [
          guests.adults + guests.children > 0 ? `${guests.adults + guests.children} guest${guests.adults + guests.children > 1 ? 's' : ''}` : null,
          guests.infants > 0 ? `${guests.infants} infant${guests.infants > 1 ? 's' : ''}` : null,
          guests.pets > 0 ? `${guests.pets} pet${guests.pets > 1 ? 's' : ''}` : null
        ].filter(Boolean).join(', ')
      : 'Add guests',
    onClick: () => {
      setShowGuestPicker(true);
      setShowDestinationSuggestions(false);
      setShowDatePickers(false);
    },
    paddingClasses: 'pl-6 pr-45',
  },
];



