import { css } from "@stitches/react";
import { Week as WeekType } from "calendarize";
import { VFC } from "react";
import { isSameDay } from "../util";

type Props = {
  calendar: WeekType[];
  now: Date;
};

const styles = {
  table: css({
    borderCollapse: "collapse",
    width: "100%",
  }),
  cell: css({
    border: "solid 1px black",
    height: "100px",
  }),
  date: css({
    variants: {
      now: {
        true: {
          color: "red",
        },
        false: {
          color: "initial",
        },
      },
    },
  }),
};

export const Calendar: VFC<Props> = (props) => {
  return (
    <table className={styles.table()}>
      <thead>
        <th>日</th>
        <th>月</th>
        <th>火</th>
        <th>水</th>
        <th>木</th>
        <th>金</th>
        <th>土</th>
      </thead>
      <tbody>
        {props.calendar.map((week) => (
          <tr>
            {week.map((date) => (
              <td className={styles.cell()}>
                <span
                  className={styles.date({
                    now: isSameDay(
                      new Date(new Date(props.now).setDate(date)),
                      new Date()
                    )
                      ? "true"
                      : "false",
                  })}
                >
                  {date === 0 ? null : date}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
