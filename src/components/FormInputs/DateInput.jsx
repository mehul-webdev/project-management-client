import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormDescription, FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

const DateInput = ({ field, label, placeholder, description, error }) => {
  const [open, setOpen] = useState(false);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            variant={error ? "error" : "outline"}
            type="button"
            className={cn(
              "w-full pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(new Date(field.value), "PPP")
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value ? new Date(field.value) : undefined}
            onSelect={(date) => {
              field.onChange(date); // update the form field
              setOpen(false); // close popover
            }}
            disabled={(date) =>
              date <= new Date() || date <= new Date("2020-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

export default DateInput;
