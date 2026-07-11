import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const SearchBar = ({ value, onSearch }) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(text);
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className="relative w-full max-w-xl">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search blog..."
        className="
          w-full
          rounded-xl
          border
          px-11
          py-3
          outline-none
          focus:ring-2
          focus:ring-blue-500
          dark:bg-gray-900
        "
      />

    </div>
  );
};

export default SearchBar;