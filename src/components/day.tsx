import { Week } from "calendarize";
import { VFC } from "react";

type Props = {
  day: Week[number];
};

export const Day: VFC<Props> = (props) => {
  return <div>{props.day}</div>;
};
