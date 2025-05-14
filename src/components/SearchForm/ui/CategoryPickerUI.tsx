import { motion } from 'framer-motion'

const CategoryPickerUI = ({
  selectedCategory,
  setSelectedCategory,
  setShowCategoryPicker,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setShowCategoryPicker: (show: boolean) => void;
}) => {
  return (
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
  )
}

export default CategoryPickerUI