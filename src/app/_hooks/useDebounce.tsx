import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number = 300): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  //   The useEffect hook runs whenever the value or delay changes. Here’s how it works:
  //   1.	Initial Flow:
  //   •	When the value changes (e.g., from 't' to 'th'), the effect is triggered.
  //   •	A setTimeout is scheduled to update the debouncedValue state after the specified delay (e.g., 300ms).
  //   2.	Cleanup Behavior:
  //   •	Before the next effect runs, the cleanup function (clearTimeout) is executed. This cancels the previously scheduled setTimeout to prevent unnecessary updates.
  //   •	For example:
  //   •	The value starts as 't', and a timeout is set to update debouncedValue to 't' after 300ms.
  //   •	If the user types 'h' before 300ms elapses (making value 'th'), the cleanup function cancels the earlier timeout for 't'.
  //   •	A new timeout is then scheduled to update the state to 'th' after 300ms.
  //   3.	Result:
  //   •	The state (debouncedValue) only updates after the user stops changing the input for the given delay period.
  //   •	This ensures that rapid updates to value (e.g., typing) do not trigger frequent state updates.

  // In summary: useDebounce essentially delays updating the state until the input (value) has remained unchanged for a specified duration (delay).

  // If the input changes before the delay period ends, the previous timeout is cleared, and a new one is scheduled. This ensures the state only updates after the user stops interacting (e.g., typing) for the given delay time.
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // Cleanup previous timeout
  }, [value, delay]);

  return debouncedValue;
};
