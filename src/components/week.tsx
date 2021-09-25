import { Week as WeekType } from "calendarize";
import { VFC } from "react";
import { Day } from "./day";

type Props = {
  week: WeekType;
};
export const Week: VFC<Props> = (props) => {
  return (
    <div>
      {props.week.map((day) => (
        <Day day={day} />
      ))}
    </div>
  );
};
