# [birthstone](https://birthstone.web.app/)

ソシャゲの周年記念一覧。この日付近に始めるとたくさん石を貰えるよ

## dev

### add game data

data.yaml に追加

### develop app

```sh
cargo install

wasm-pack build --target web --out-name wasm --out-dir ./static

miniserve ./static --index index.html
```
