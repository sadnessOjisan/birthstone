import { css } from "@stitches/react";
import { Week as WeekType } from "calendarize";
import { VFC } from "react";
import { ResponseType } from "../schema";
import { Calendar as CalendarType } from "../type";
import { isSameDay } from "../util";

type Props = {
  calendar: CalendarType;
  now: Date;
  data: ResponseType;
};

const styles = {
  table: css({
    borderCollapse: "collapse",
    width: "100%",
  }),
  cell: css({
    border: "solid 1px black",
    height: "100px",
    width: "calc(100% / 7)",
    padding: 12,
    fontSize: "1.4rem",
  }),
  date: css({
    variants: {
      now: {
        true: {
          color: "red",
        },
        false: {
          color: "inherit",
        },
      },
    },
  }),
  link: css({
    color: "#a9abbc",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  }),
  item: css({ listStyle: "none" }),
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
            {week.map((item) => (
              <td className={styles.cell()}>
                <span
                  className={styles.date({
                    now:
                      item.date !== undefined &&
                      isSameDay(
                        new Date(
                          new Date(props.now).setDate(item.date.getDate())
                        ),
                        new Date()
                      )
                        ? "true"
                        : "false",
                  })}
                >
                  {item.date === undefined ? null : item.date.getDate()}
                </span>
                <ul>
                  {item.game.map((g) => (
                    <li className={styles.item()}>
                      <a href={g.url} className={styles.link()}>
                        {g.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
