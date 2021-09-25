import { GetStaticProps } from "next";
import { useState, VFC } from "react";
import { css } from "@stitches/react";
import { Button } from "../components/button";
import { Calendar } from "../components/calendar";
import { DATA_ENDPOINT } from "../const";
import { useRootPage } from "../hooks/pages";
import { ResponseType, schema } from "../schema";
import { Layout } from "../components/layout";

type Props = {
  data: ResponseType;
};

const styles = {
  wrapper: css({
    padding: "12px",
    maxWidth: 1080,
    margin: "auto",
  }),
};

const Root: VFC<Props> = (props) => {
  const {
    selectedDate,
    handleClickNextMonth,
    handleClickPrevMonth,
    currentMonthLayout,
  } = useRootPage(props.data);

  return (
    <Layout>
      <div className="button-group">
        <Button skin="cool" onClick={handleClickPrevMonth}>
          先月
        </Button>
        <Button skin="hot" onClick={handleClickNextMonth}>
          次月
        </Button>
      </div>
      <div className="body">
        <span>
          {selectedDate.getFullYear()}/{selectedDate.getMonth() + 1}
        </span>
        <Calendar
          calendar={currentMonthLayout}
          now={selectedDate}
          data={props.data}
        />
      </div>
    </Layout>
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
