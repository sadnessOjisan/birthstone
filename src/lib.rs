#![recursion_limit = "128000"]

#[macro_use]
extern crate serde_derive;
extern crate serde_yaml;
use calendarize;
use chrono::*;
use std::collections::HashMap;
use wasm_bindgen::prelude::*;
use yew::prelude::*;

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
}

impl Model {
    fn render_week(&self, week: &WeekData) -> Html {
        html! {
                  <div class="row" style="display: flex">{for week.iter().map(|day| self.render_day(day))}</div>
        }
    }

    fn render_day(&self, day_games: &MonthDateGames) -> Html {
        match day_games {
            Some(day_games) => {
                html! {
                    <div>
                    <span class="day">{day_games.0.1}{"日"}</span>
                    <div class="games">
                    {for day_games.1.iter().map(|game| {html! {<div>{game.title.to_string()}</div>}})}
                    </div>
                    </div>
                }
            }
            None => {
                html! {<div>{"aa"}</div>}
            }
        }
    }
}

enum Msg {
    SelectMonth(u32),
}

fn create_games_date(games: &Vec<Game>, month: u32) -> MonthData {
    let date = NaiveDate::from_ymd(2021, month, 1);
    let calendar = calendarize::calendarize(date);
    let mut m = HashMap::new();
    for week in &calendar {
        for day in week.iter() {
            let filterd_games: Vec<Game> = games
                .iter()
                .filter(|&game| game.published.month() == month && game.published.day() == *day)
                .map(|game| game)
                .cloned()
                .collect();
            match day {
                0 => {
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
                                    let data:(MonthDate, Vec<Game>) = (date, copied_games);
                                    Some(data)
                                }
                                None => {
                                    let date: MonthDate = (month, day);
                                    None
                                }
                            };
                            data
                        }
                        None => {
                            let date: MonthDate = (month, day);
                            None
                        }
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
        let s = include_str!("./data.yaml");
        let games: Vec<Game> = serde_yaml::from_str(s).unwrap();
        let first_month = 1; // TODO: 今の月
        let game_and_date = create_games_date(&games, first_month);
        Self {
            link,
            games: game_and_date,
            selected_month: first_month,
            raw_games: games,
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::SelectMonth(month) => {
                self.selected_month = month;
                self.games = create_games_date(&self.raw_games, month);
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
                <button onclick=self.link.callback(|_| Msg::SelectMonth(1))>{"1月"}</button>
                <button onclick=self.link.callback(|_| Msg::SelectMonth(2))>{"2月"}</button>
                {self.selected_month}{"月"}
                {for self.games.iter().map(|x| self.render_week(x))}
            </div>
        }
    }
}

#[wasm_bindgen(start)]
pub fn run_app() {
    App::<Model>::new().mount_to_body();
}
