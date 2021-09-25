import { useState } from "react";
import { Month } from "../../type";

export const useRootPage = () => {
  const [currentMonth, updateMonth] = useState<Month>(1);

  const handleClickNextMonth = () => {
    if (currentMonth === 12) {
      updateMonth(1);
    } else {
      const nextMonth = (currentMonth + 1) as Month;
      updateMonth(nextMonth);
    }
  };

  const handleClickPrevMonth = () => {
    if (currentMonth === 1) {
      updateMonth(12);
    } else {
      const prevMonth = (currentMonth - 1) as Month;
      updateMonth(prevMonth);
    }
  };

  return { currentMonth, handleClickNextMonth, handleClickPrevMonth };
};
