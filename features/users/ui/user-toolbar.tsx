import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Filter, FilterItemGroup } from "@/components/shared/filter";

const FILTER_ITEMS: FilterItemGroup[] = [
  {
    title: "Completed Todos",
    list: [
      { value: "completed_gt_10", label: "More than 10" },
      { value: "completed_lt_10", label: "Less than 10" },
    ],
  },
  {
    title: "Pending Todos",
    list: [
      { value: "pending_gt_10", label: "More than 10" },
      { value: "pending_lt_10", label: "Less than 10" },
    ],
  },
];

interface UserToolbarProps {
  search: string;
  onSearchChange: (val: string) => void;
  onFilterChange: (val: string[]) => void;
}

const UserToolbar = ({ search, onSearchChange, onFilterChange }: UserToolbarProps) => {
  const [filter, setFilter] = useState<string[]>([]);

  const handleApplyFilter = (val: string[]) => {
    setFilter(val);
    onFilterChange(val);
  };

  const handleResetFilter = () => {
    setFilter([]);
    onFilterChange([]);
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search users by name or email"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>

      <Filter
        title="Status Todos"
        items={FILTER_ITEMS}
        activeCount={filter.length}
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
      />
    </div>
  );
};

export default UserToolbar;
