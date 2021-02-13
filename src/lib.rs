#![recursion_limit = "128000"]

#[macro_use]
extern crate serde_derive;
extern crate serde_yaml;
use calendarize;
use chrono::*;
use std::collections::HashMap;
use wasm_bindgen::prelude::*;
use yew::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn getISOString() -> String;
}

#[derive(Debug, PartialEq, Serialize, Deserialize, Clone)]
struct Game {
    title: String,
    published: NaiveDate,
    url: String,
}

type MonthDate = (u32, u32);
type MonthDateGames = Option<(MonthDate, Vec<Game>)>;
type WeekData = Vec<MonthDateGames>;
type MonthData = Vec<WeekData>;

struct Model {
    link: ComponentLink<Self>,
    selected_month: u32,
    raw_games: Vec<Game>,
    games: MonthData,
    today: NaiveDate,
}

const CURRENT_YEAR: i32 = 2021; // TODO: 日付ライブラリから取得する
const CURRENT_MONTH: u32 = 2; // TODO: 日付ライブラリから取得する

impl Model {
    fn render_all_items(&self, all_games: &MonthData) -> Html {
        let games = all_games.iter().flatten().collect::<Vec<_>>();
        html! {
            <div class="items">{for games.iter().map(|game| {
                html! {self.render_sp_item(game)}
                })}
            </div>
        }
    }

    fn render_sp_item(&self, game: &MonthDateGames) -> Html {
        html! {
            { match game {
                Some(game) => html!{
                    <div class="item">
                      <div class="date">{game.0.1}{"日"}</div>
                      <ul class="games">
                     {for game.1.iter().map(|g| html!{
                            <li>
                              <a href={g.url.to_string()} target="_blank" rel="noreferrer">{g.title.to_string()}</a>
                             </li>
                         })}
                      </ul>
                    </div>
                },
                None => html!{<></>}
            }}

        }
    }

    fn render_week(&self, week: &WeekData) -> Html {
        html! {
                  <tr>{for week.iter().map(|day| self.render_day(day))}</tr>
        }
    }

    fn render_day(&self, day_games: &MonthDateGames) -> Html {
        match day_games {
            Some(day_games) => {
                let is_selected_month = self.today.month() == day_games.0 .0;
                let is_selected_day = self.today.day() == day_games.0 .1;
                let is_selected = is_selected_day && is_selected_month;

                html! {
                    <td class={if is_selected {"selected"} else {""}}>
                    <div class="day">{day_games.0.1}</div>
                    <div class="games">
                    {for day_games.1.iter().map(|game| {html! {<a href={game.url.to_string()} target="_blank" rel="noreferrer">{game.title.to_string()}</a>}})}
                    </div>
                    </td>
                }
            }
            None => {
                html! {<td>{"-"}</td>}
            }
        }
    }
}

enum Msg {
    NextMonth,
    PrevMonth,
}

fn create_games_date(games: &Vec<Game>, month: u32) -> MonthData {
    let date = NaiveDate::from_ymd(CURRENT_YEAR, month, 1);
    let calendar = calendarize::calendarize(date);
    let mut m = HashMap::new();
    for week in &calendar {
        for day in week.iter() {
            let filterd_games: Vec<Game> = games
                .iter()
                .filter(|&game| game.published.month() == month && game.published.day() == *day)
                .cloned()
                .collect();
            match day {
                0 => {
                    // log::error!("unexpected date: {:?}", day);
                    m.entry((month, *day)).or_insert(None);
                }
                _ => {
                    m.entry((month, *day)).or_insert(Some(filterd_games));
                }
            }
        }
    }
    let game_and_date = calendar
        .iter()
        .map(|week| {
            let week_data = week
                .iter()
                .map(|&day| {
                    let games = m.get(&(month, day));
                    let data: MonthDateGames = match games {
                        Some(games) => {
                            let data: MonthDateGames = match games {
                                Some(games) => {
                                    let copied_games = games
                                        .iter()
                                        .map(|game| Game {
                                            title: game.title.to_string(),
                                            published: game.published,
                                            url: game.url.to_string(),
                                        })
                                        .collect::<Vec<_>>();
                                    let date: MonthDate = (month, day);
                                    let data: (MonthDate, Vec<Game>) = (date, copied_games);
                                    Some(data)
                                }
                                None => None,
                            };
                            data
                        }
                        None => None,
                    };
                    data
                })
                .collect::<Vec<_>>();
            week_data
        })
        .collect::<Vec<_>>();
    game_and_date
}

impl Component for Model {
    type Message = Msg;
    type Properties = ();

    fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
        let iso = getISOString(); // 宙に浮いた参照を防ぐ
        log::info!("interop check {:?}", iso);
        let current_date = iso.as_str();
        let parse_from_str = NaiveDate::parse_from_str;
        let today =
            parse_from_str(current_date, "%Y-%m-%d").unwrap_or(NaiveDate::from_ymd(2021, 1, 1));
        let s = include_str!("./data.yaml");
        let games: Vec<Game> = serde_yaml::from_str(s).unwrap();
        let game_and_date = create_games_date(&games, CURRENT_MONTH);
        Self {
            link,
            games: game_and_date,
            selected_month: CURRENT_MONTH,
            raw_games: games,
            today: today,
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::NextMonth => {
                let next_month_date =
                    NaiveDate::from_ymd_opt(CURRENT_YEAR, self.selected_month + 1, 1)
                        .unwrap_or(NaiveDate::from_ymd(CURRENT_YEAR + 1, 1, 1));
                self.selected_month = next_month_date.month();
                self.games = create_games_date(&self.raw_games, next_month_date.month());
            }
            Msg::PrevMonth => {
                let pred_month_date =
                    NaiveDate::from_ymd_opt(CURRENT_YEAR, self.selected_month - 1, 1)
                        .unwrap_or(NaiveDate::from_ymd(CURRENT_YEAR - 1, 12, 1));
                self.selected_month = pred_month_date.month();
                self.games = create_games_date(&self.raw_games, pred_month_date.month());
            }
        }
        true
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        html! {
            <div>
              <h1 class="title">{"☆ソシャゲのリリース日一覧☆"}</h1>
              <p class="description">{"ソーシャルゲームのリリース日の一覧です。これらの日に近いタイミングで開始すると"}
              <b>{"たくさんアイテムがもらえたり、ガチャを引ける"}</b>
              {"と思います。"}</p>
              <p class="description">{"当サイトはオープンソースプロジェクトとして運営しています。追加したいゲームがあれば、"}
              <a href="https://github.com/sadnessOjisan/birthstone" class="github" target="_blank" rel="noreferrer">{"こちら"}</a>
             {"から追加できます。開発ロードマップの確認や機能要望もGitHubからお願いします。"}</p>
              <h2 class="month">{self.selected_month}{"月"}</h2>
              <div class="button-row">
                <button onclick=self.link.callback(|_| Msg::PrevMonth) class="prev month-button">{"先月"}</button>
                <button onclick=self.link.callback(|_| Msg::NextMonth) class="next month-button">{"翌月"}</button>
              </div>
              <table class="game-table">{for self.games.iter().map(|x| self.render_week(x))}</table>
              <div class="game-list">{self.render_all_items(&self.games)}</div>
              <div class="button-row">
                <button onclick=self.link.callback(|_| Msg::PrevMonth) class="prev month-button">{"先月"}</button>
                <button onclick=self.link.callback(|_| Msg::NextMonth) class="next month-button">{"翌月"}</button>
              </div>
            </div>
        }
    }
}

#[wasm_bindgen(start)]
pub fn run_app() {
    wasm_logger::init(wasm_logger::Config::default());
    App::<Model>::new().mount_to_body();
}
