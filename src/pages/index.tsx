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
  title: css({
    fontSize: "4.8rem",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 24,
  }),
  text: css({
    fontSize: "1.6rem",
  }),
  textArea: css({
    marginBottom: 24,
    textAlign: "center",
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
      <h1 className={styles.title()}>Birthstone</h1>
      <div className={styles.textArea()}>
        <p className={styles.text()}>
          ソシャゲのリリース記念日が分かるサイト。周年記念に初めて石をたくさんもらってガチャを回そう。
        </p>
        <p className={styles.text()}>
          birthstone は OSS
          プロジェクトです。周年記念情報の提供やバグ修正、機能要望などのコントリビューションは
          <a
            href="https://github.com/sadnessOjisan/birthstone"
            target="_blank"
            style={{ color: "#ffffff", fontWeight: "bold" }}
          >
            こちら
          </a>
          からお願いします。
        </p>
      </div>
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
