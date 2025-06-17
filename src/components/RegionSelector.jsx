import { FaFilter } from "react-icons/fa";
import { REGIONS } from "../constants/pokedexConfig";

function RegionSelector({ region, setRegion }) {
  return (
    <div className="relative">
      <FaFilter className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      <select
        className="font-lexend focus:border-poke-red-400 focus:ring-poke-red-200 appearance-none rounded-xl border border-gray-300 bg-gray-50 py-2 pr-8 pl-10 text-base shadow focus:ring-2 focus:outline-none"
        value={region.name}
        onChange={(e) => {
          const selectedRegion = REGIONS.find((r) => r.name === e.target.value);
          setRegion(selectedRegion);
        }}
      >
        {REGIONS.map((r) => (
          <option key={r.name} value={r.name}>
            {r.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RegionSelector;
