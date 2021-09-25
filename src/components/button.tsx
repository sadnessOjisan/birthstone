import { css } from "@stitches/react";
import { FC } from "react";

type Props = {
  skin: "hot" | "cool";
  onClick: () => void;
};

const styles = {
  wrapper: css({
    padding: "4px",
    variants: {
      color: {
        cool: {
          backgroundColor: "blueviolet",
        },
        hot: {
          backgroundColor: "red",
        },
      },
    },
  }),
};

export const Button: FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={styles.wrapper({ color: props.skin })}
    >
      {props.children}
    </button>
  );
};
