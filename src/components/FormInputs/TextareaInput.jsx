import React from "react";
import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const TextareaInput = ({
  field,
  label,
  placeholder,
  description,
  id,
  value,
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea placeholder={placeholder} {...field} id={id} value={value} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

export default TextareaInput;
