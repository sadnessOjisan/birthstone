import { VFC } from "react";
import { ResponseType } from "../schema";
import { Calendar as CalendarType } from "../type";

type Props = {
  calendar: CalendarType;
  now: Date;
  data: ResponseType;
};

export const MobileCalendar: VFC<Props> = (props) => {
  return (
    <div>
      {props.calendar.flat().map((date) => (
        <div>
          <div>
            {date.game.map((g) => (
              <li>
                <a href={g.url}>{g.title}</a>
              </li>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
