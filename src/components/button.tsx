import { FC } from "react";

type Props = {
  skin: "hot" | "cool";
  onClick: () => void;
};

export const Button: FC<Props> = (props) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};
