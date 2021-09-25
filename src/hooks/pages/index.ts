import { useCallback, useMemo, useState } from "react";
import calendarize from "calendarize";
import { ResponseType } from "../../schema";
import { isSameDay } from "../../util";
import { Calendar, Game } from "../../type";

export const useRootPage = (data: ResponseType) => {
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

  const currentMonthLayout = useMemo(() => {
    const layout = calendarize(selectedDate);
    const calendar: Calendar = layout.map((week) =>
      week.map((date) => {
        if (date === 0) return { date: undefined, game: undefined };
        const targetDate = new Date(new Date(selectedDate).setDate(date));
        const game: Game = data.find((d) => {
          const publishDate = new Date(d.published);
          return isSameDay(publishDate, targetDate);
        });
        return { date: targetDate, game };
      })
    );
    return calendar;
  }, [selectedDate]);

  return {
    selectedDate,
    handleClickNextMonth,
    handleClickPrevMonth,
    currentMonthLayout,
  };
};
