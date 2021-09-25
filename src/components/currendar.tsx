import { Week as WeekType } from "calendarize";
import { VFC } from "react";
import { Week } from "./week";

type Props = {
  calendar: WeekType[];
};

export const Carrendar: VFC<Props> = (props) => {
  return (
    <div>
      {props.calendar.map((week) => (
        <Week week={week} />
      ))}
    </div>
  );
};
