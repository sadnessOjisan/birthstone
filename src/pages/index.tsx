import { GetStaticProps } from "next";
import { useState, VFC } from "react";
import { Button } from "../components/button";
import { useRootPage } from "../hooks/pages";
import { ResponseType, schema } from "../schema";
import { Month } from "../type";

type Props = {
  data: ResponseType;
};

const Root: VFC<Props> = (props) => {
  const { currentMonth, handleClickNextMonth, handleClickPrevMonth } =
    useRootPage();

  return (
    <div>
      <div className="button-group">
        <Button skin="cool" onClick={handleClickPrevMonth}>
          先月
        </Button>
        <Button skin="hot" onClick={handleClickNextMonth}>
          次月
        </Button>
      </div>
      <div className="body"></div>
    </div>
  );
};

export default Root;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch(
    "https://us-central1-birthstone-b73d7.cloudfunctions.net/getData"
  );

  const data = await res.json();

  try {
    const parsed = schema.parse(data);

    return {
      props: {
        data: parsed,
      },
    };
  } catch (e) {
    console.error(data);
    console.error(e);
  }
};
