import { useCallback, useMemo, useState } from "react";
import calendarize from "calendarize";

export const useRootPage = () => {
  const [selectedDate, updateDate] = useState<Date>(new Date());

  const handleClickNextMonth = useCallback(() => {
    const nextMonth = new Date(
      new Date(selectedDate).setMonth(selectedDate.getMonth() + 1)
    );
    updateDate(nextMonth);
  }, [selectedDate]);

  const handleClickPrevMonth = useCallback(() => {
    const prevMonth = selectedDate.getMonth() - 1;
    const prevDate = new Date(new Date(selectedDate).setMonth(prevMonth));
    updateDate(prevDate);
  }, [selectedDate]);

  const currentMonthLayout = useMemo(
    () => calendarize(new Date(selectedDate)),
    [selectedDate]
  );

  return {
    selectedDate,
    handleClickNextMonth,
    handleClickPrevMonth,
    currentMonthLayout,
  };
};
