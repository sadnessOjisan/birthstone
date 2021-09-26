import { VFC } from "react";
import { ResponseType } from "../schema";
import { Calendar as CalendarType } from "../type";
import { isSameDay } from "../util";
import { css } from "../util/stitches.config";

type Props = {
  calendar: CalendarType;
  now: Date;
  data: ResponseType;
};

const styles = {
  item: css({
    display: "flex",
    alignItems: "center",
    padding: 12,
    fontSize: "1.8rem",
    border: "solid 1px #ffffff",
    borderBottom: "none",
    "&:last-child": {
      border: "solid 1px #ffffff",
    },
  }),
  gameListItem: css({
    listStyle: "none",
    marginBottom: 12,
    "&:last-child": {
      marginBottom: 0,
    },
  }),
  dateBlock: css({
    marginRight: 24,
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
};

export const MobileCalendar: VFC<Props> = (props) => {
  return (
    <div>
      {props.calendar
        .flat()
        .filter((d) => d.date !== undefined)
        .map((date) => (
          <div className={styles.item()}>
            <div
              className={styles.dateBlock({
                now: isSameDay(new Date(), date.date) ? "true" : "false",
              })}
            >
              {date.date.getMonth() + 1}/{date.date.getDate()}
            </div>
            <ul>
              {date.game.map((g) => (
                <li className={styles.gameListItem()}>
                  <a href={g.url} className={styles.link()} target="_blank">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};
