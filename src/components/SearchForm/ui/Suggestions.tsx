import { motion } from 'framer-motion'

const Suggestions = ({destinationSuggestions, setDestination}: {destinationSuggestions: string[], setDestination: (destination: string) => void} ) => {
  return (
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
  )
}

export default Suggestions