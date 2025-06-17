import { FaSearch } from "react-icons/fa";

function SearchInput({ search, setSearch, region }) {
  return (
    <div className="relative flex-1">
      <FaSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      <input
        className="font-lexend focus:border-poke-red-400 focus:ring-poke-red-200 w-full rounded-xl border border-gray-300 bg-gray-50 py-2 pr-3 pl-10 text-base shadow focus:ring-2 focus:outline-none"
        placeholder={`Search in ${region.name}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
