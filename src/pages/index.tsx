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
  buttonGroup: css({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 16,
  }),
  seletedDate: css({
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: 16,
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
      <div className={styles.buttonGroup()}>
        <Button skin="cool" onClick={handleClickPrevMonth}>
          先月
        </Button>
        <Button skin="hot" onClick={handleClickNextMonth}>
          次月
        </Button>
      </div>
      <div className="body">
        <p className={styles.seletedDate()}>
          {selectedDate.getFullYear()}/{selectedDate.getMonth() + 1}
        </p>
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
