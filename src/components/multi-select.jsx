import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { ChevronsUpDown } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const MultiSelect = ({
  options,
  value = [],
  onChange,
  error,
  searchPlaceHolder,
  placeholder,
  handleSelectSearch,
  multiSelectInputText,
  setMultiSelectInputText,
  setHandleMultiSelectOptions,
}) => {
  const [open, setOpen] = React.useState(false);
  const showSelectedOptions = 2;
  const ShowValues = () => {
    let count = 0;

    return (
      <span className="flex flex-row flex-wrap gap-2">
        {value.length > 0 && (
          <>
            {value.map((val, index) => {
              if (index < showSelectedOptions) {
                return <Badge>{val}</Badge>;
              } else {
                count++;
              }
            })}

            {count > 0 && <Badge>+ {count}</Badge>}
          </>
        )}
      </span>
    );
  };

  function handleSetValues(currentValue) {
    let newValues;
    if (value.includes(currentValue)) {
      newValues = value.filter((val) => val !== currentValue);
    } else {
      newValues = [...value, currentValue];
    }

    onChange(newValues);
  }

  useEffect(() => {
    if (!open) {
      setHandleMultiSelectOptions([]);
      setMultiSelectInputText("");
    }
  }, [open, setHandleMultiSelectOptions, setMultiSelectInputText]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant={error ? "error" : "outline"}
          role="combobox"
          type="button"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left font-normal",
            "text-muted-foreground"
          )}
        >
          {value.length > 0 ? <ShowValues /> : placeholder || "Select an item"}
          <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0 w-full">
        <Command>
          <CommandInput
            placeholder={searchPlaceHolder || "Please Select"}
            className="h-9"
            value={multiSelectInputText}
            onValueChange={(e) => handleSelectSearch(e)}
          />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options &&
                options.map((user) => (
                  <CommandItem
                    key={user.value}
                    value={user.value}
                    onSelect={() => handleSetValues(user.value)}
                    className="flex gap-2 items-center"
                  >
                    <Checkbox
                      checked={value.includes(user.value)}
                      className="pointer-events-none"
                    />
                    <span className="text-sm">{user.label}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
