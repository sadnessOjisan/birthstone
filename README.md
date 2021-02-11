# [birthstone](https://birthstone.web.app/)

ソシャゲの周年記念一覧。この日付近に始めるとたくさん石を貰えるよ

## dev

### ゲーム情報の追加

data.yaml に追加

### 機能追加

```sh
$ cargo install

$ wasm-pack build --target web --out-name wasm --out-dir ./static

# serve server. なんでも良い
$ miniserve ./static --index index.html
```
