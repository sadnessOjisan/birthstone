import { GetStaticProps } from "next";
import { VFC } from "react";
import { ResponseType, schema } from "../schema";

type Props = {
  data: ResponseType;
};

const Root: VFC<Props> = (props) => {
  return <div>hello {JSON.stringify(props.data)}!!</div>;
};

export default Root;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await fetch(
    "https://us-central1-birthstone-b73d7.cloudfunctions.net/getData"
  );

  const parsed = schema.parse(data);

  return {
    props: {
      data: parsed,
    },
  };
};
