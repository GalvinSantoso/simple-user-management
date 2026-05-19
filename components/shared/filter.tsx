import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X, Filter as FilterIcon, Undo } from "lucide-react";
import { useState } from "react";

interface FilterItem {
  value: string;
  label: string;
}

export interface FilterItemGroup {
  title: string;
  list: FilterItem[];
}

interface FilterProps {
  title?: string;
  triggerLabel?: string;
  items: FilterItemGroup[];
  onApply: (selected: string[]) => void;
  onReset: () => void;
  activeCount?: number;
}

export const Filter = ({
  title = "Filter",
  triggerLabel = "Filter",
  items,
  onApply,
  onReset,
  activeCount = 0,
}: FilterProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleItem = (value: string, groupList: FilterItem[]) => {
    setSelected((prev) => {
      const isAlreadySelected = prev.includes(value);
      const filtered = prev.filter((v) => !groupList.some((item) => item.value === v));
      if (isAlreadySelected) {
        return filtered;
      } else {
        return [...filtered, value];
      }
    });
  };

  const hasSelection = selected.length > 0;

  const handleApply = () => {
    onApply(selected);
    setOpen(false);
  };

  const handleReset = () => {
    setSelected([]);
    onReset();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FilterIcon className="w-4 h-4" />
          {triggerLabel}
          {activeCount > 0 && (
            <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="font-semibold">{title}</h4>
          <Button variant="ghost" size="icon-xs" onClick={() => setOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="px-4 py-4 space-y-4">
          {items.map(({ title, list }) => {
            return (
              <div className="space-y-2" key={title}>
                <p className="text-sm text-muted-foreground">{title}</p>

                <div className="flex flex-wrap gap-2">
                  {list.map(({ label, value }) => {
                    const isActive = selected.includes(value);

                    return (
                      <button
                        key={value}
                        onClick={() => toggleItem(value, list)}
                        className={`
                    px-4 py-2 rounded-md border text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground cursor-pointer hover:bg-muted"
                    }
                  `}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t bg-muted/20 px-4 py-3">
          <Button
            variant="outline"
            className="gap-2"
            disabled={!hasSelection}
            onClick={handleReset}
          >
            <Undo className="w-4 aspect-square" />
            Reset
          </Button>
          <Button disabled={!hasSelection} onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
