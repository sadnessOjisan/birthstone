import { useMemo, useState } from "react";
import calendarize from "calendarize";
import { Month } from "../../type";

export const useRootPage = () => {
  const [now, updateDate] = useState<Date>(new Date());

  const handleClickNextMonth = () => {
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    updateDate(nextMonth);
  };

  const handleClickPrevMonth = () => {
    const prevMonth = new Date(now.setMonth(now.getMonth() + 1));
    updateDate(prevMonth);
  };

  const currentMonthLayout = useMemo(() => calendarize(now), [now]);

  return {
    now,
    handleClickNextMonth,
    handleClickPrevMonth,
    currentMonthLayout,
  };
};
