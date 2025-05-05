export type Section = {
  id: string;
  label: string;
  subLabel: string;
  paddingClasses: string;
  onClick: () => void;
};

export type Props = {
  destination: string;
  checkIn: string;
  checkOut: string;
  setShowDestinationSuggestions: (v: boolean) => void;
  guests: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  setShowGuestPicker: (v: boolean) => void;
  setShowDatePickers: (v: boolean) => void;
};