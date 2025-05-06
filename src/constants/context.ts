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
  setShowCategoryPicker: (v: boolean) => void;
  selectedCategory: string;
  setShowDatePickers: (v: boolean) => void;
};