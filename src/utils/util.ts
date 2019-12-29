import { useState } from "react";

// Input Hooks
export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event: React.ChangeEvent) => {
        setValue((event.target as HTMLInputElement).value);
      }
    }
  };
};
