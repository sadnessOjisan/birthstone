import { css } from "@stitches/react";
import { FC } from "react";

type Props = {
  skin: "hot" | "cool";
  onClick: () => void;
};

const styles = {
  wrapper: css({
    padding: "4px",
    width: 100,
    height: 40,
    fontSize: "1.6rem",
    cursor: "pointer",
    textAlign: "center",
    color: "#ffffff",
    borderRadius: "0.8rem",
    transition: "all 0.3s",
    borderColor: "#151618",
    fontFamily: `"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
    "Hiragino Sans", "BIZ UDPGothic", Meiryo, sans-serif`,
    letterSpacing: "0.1rem",
    "&:hover": {
      transform: "scale(1.04)",
    },
    variants: {
      color: {
        cool: {
          backgroundImage: `-webkit-gradient(
            linear,
            left top,
            right top,
            from(#007adf),
            to(#00ecbc)
          )`,
        },
        hot: {
          backgroundImage: `-webkit-gradient(
          linear,
          left top,
          right top,
          from(rgba(254, 212, 117, 1)),
          to(rgba(229, 61, 93, 1))
        )`,
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
