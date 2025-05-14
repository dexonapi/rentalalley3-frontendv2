export type Section = {
  id: string;
  label: string;
  subLabel: string;
  paddingClasses: string;
  onClick: () => void;
};

export type Props = {
  destination: string;
  checkIn: Date | null;
  checkOut: Date | null;
  setShowDestinationSuggestions: (v: boolean) => void;
  setShowCategoryPicker: (v: boolean) => void;
  selectedCategory: string;
  setShowDatePickers: (v: boolean) => void;
};