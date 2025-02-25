import { Search } from "lucide-react";

interface ShipmentFiltersProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  setFilterLocation: React.Dispatch<React.SetStateAction<string>>;
  uniqueLocations: string[];
}

function ShipmentFilters({
  searchQuery,
  setSearchQuery,
  setFilterStatus,
  setFilterLocation,
  uniqueLocations,
}: ShipmentFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="relative">
        <Search className="absolute w-5 h-5 left-3 top-1.5 text-gray-500" />
        <input
          type="text"
          placeholder="Search by order name..."
          className="pl-10 pr-4 py-1 border rounded w-[250px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <select
        onChange={(e) => setFilterStatus(e.target.value)}
        className="border rounded text-[14px] py-1 text-gray-500"
      >
        <option value="All">All Status</option>
        <option value="Delivered">Delivered</option>
        <option value="In Transit">In Transit</option>
        <option value="Pending">Pending</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <select
        onChange={(e) => setFilterLocation(e.target.value)}
        className="border rounded text-gray-500"
      >
        {uniqueLocations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ShipmentFilters;
