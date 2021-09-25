import { GetStaticProps } from "next";
import { useState, VFC } from "react";
import { Button } from "../components/button";
import { Calendar } from "../components/calendar";
import { DATA_ENDPOINT } from "../const";
import { useRootPage } from "../hooks/pages";
import { ResponseType, schema } from "../schema";

type Props = {
  data: ResponseType;
};

const Root: VFC<Props> = (props) => {
  const {
    now,
    handleClickNextMonth,
    handleClickPrevMonth,
    currentMonthLayout,
  } = useRootPage();

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
      <div className="body">
        <Calendar calendar={currentMonthLayout} />
      </div>
    </div>
  );
};

export default Root;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch(DATA_ENDPOINT);

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
