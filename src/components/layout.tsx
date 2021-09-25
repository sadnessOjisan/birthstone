import { css } from "@stitches/react";
import { FC } from "react";

const styles = {
  wrapper: css({
    backgroundColor: "#151618",
    fontFamily: `"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
    "Hiragino Sans", "BIZ UDPGothic", Meiryo, sans-serif`,
    touchAction: "manipulation",
    minHeight: "100vh",
  }),
  inner: css({
    maxWidth: 1200,
    margin: "0 auto",
    color: "#a9abbc",
    padding: 24,
  }),
};

export const Layout: FC = (props) => {
  return (
    <div className={styles.wrapper()}>
      <div className={styles.inner()}>{props.children}</div>
    </div>
  );
};
