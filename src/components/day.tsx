import { Week } from "calendarize";
import { VFC } from "react";

type Props = {
  day: Week[number];
};

export const Day: VFC<Props> = (props) => {
  return <div key={props.day}>{props.day}</div>;
};
