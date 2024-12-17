"use client";

import { useDispatch, useSelector } from "react-redux";
import { getDaysAgo, setDaysAgo } from "../homeSlice";

const listOptions = [
  {
    uiName: "1D",
    value: 1,
  },
  {
    uiName: "7D",
    value: 8,
  },
  {
    uiName: "14D",
    value: 14,
  },
  {
    uiName: "1M",
    value: 30,
  },
  {
    uiName: "6M",
    value: 180,
  },
  {
    uiName: "1Y",
    value: 365,
  },
];

function IntervalSelector() {
  const daysAgo = useSelector(getDaysAgo);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center">
      <ul className="dark:bg-dark-200 dark:text-greys-lavender-200 flex gap-1 rounded-md bg-cryptoblue-250 bg-opacity-35 p-1 text-[#81825]">
        {listOptions.map((element) => (
          <button
            key={element.value}
            className={`basis-[32px] cursor-pointer rounded-md px-3 py-1 text-center ${
              daysAgo === element.value &&
              "dark:text-greys-lavender-100 ring-dark-75 bg-light-100 bg-opacity-50 font-medium ring-1"
            } `}
            onClick={() => dispatch(setDaysAgo(element.value))}
          >
            {element.uiName}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default IntervalSelector;
