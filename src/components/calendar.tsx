import { css } from "@stitches/react";
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
    background: "rgb(37, 40, 44)",
    boxShadow: "rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset",
    borderRadius: 4,
  }),
  cell: css({
    height: "200px",
    width: "calc(100% / 7)",
    padding: 12,
    fontSize: "1.4rem",
    verticalAlign: "top",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: 4,
    },
  }),
  header: css({
    height: 60,
    fontSize: 16,
    fontWeight: "bold",
  }),
  date: css({
    marginBottom: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.2)",
    variants: {
      now: {
        true: {
          color: "#ffffff",
          fontWeight: "bold",
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
  item: css({ listStyle: "none", marginBottom: 8 }),
};

export const Calendar: VFC<Props> = (props) => {
  return (
    <table className={styles.table()}>
      <thead className={styles.header()}>
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
                {item.date === undefined ? null : (
                  <div
                    className={styles.date({
                      now:
                        item.date !== undefined &&
                        isSameDay(new Date(), item.date)
                          ? "true"
                          : "false",
                    })}
                  >
                    {item.date.getDate()}
                  </div>
                )}
                <ul>
                  {item.game.map((g) => (
                    <li className={styles.item()}>
                      <a href={g.url} className={styles.link()} target="_blank">
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
