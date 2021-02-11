## ゲーム情報の追加

`src/data.yaml` に yaml 形式で追加してください。

```yaml
# example
- title: ブルーアーカイブ -Blue Archive-
  published: "2021-02-04"
  url: https://bluearchive.jp/
```

## 機能要望

Issue からお願いします。

## バグ報告

Issue からお願いします。

## ソースコード本体への修正

yew + wasmpack で実装されています。
ローカルで動かす場合は [こちら](https://yew.rs/docs/en/getting-started/build-a-sample-app) の環境構築を行ってください。

環境を構築すると、

```sh
$ wasm-pack build --target web --out-name wasm --out-dir ./static

# serve server. なんでも良い
$ miniserve ./static --index index.html
```

で立ち上がります。

CI は GitHub Actions で行っており、main ブランチへの merge で Firebase へホスティング、それ以外のブランチへの push でコンパイルを実行しています。
