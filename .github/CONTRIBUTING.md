## ゲーム情報の追加

[/functions/src/data.ts](https://github.com/sadnessOjisan/birthstone/blob/main/functions/src/data.ts) に json 形式で追加してください。

```json
[
  {
    "title": "プリンセスコネクト！Re:Dive",
    "published": "2018-02-15",
    "url": "https://priconne-redive.jp/"
  }
]
```

## 機能要望

Issue からお願いします。

## バグ報告

Issue からお願いします。

## ソースコード本体への修正

アプリケーションは NextJS, データの管理や PUSH 通知は firebase hosting で管理されています。

### App

```
npm i

npx next dev
```

### Functions

```
cd functions

npm i
```

### デプロイ

Github Actions 経由で行っています。
