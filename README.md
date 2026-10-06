# お母さんは大統領 制作INDEX（改訂版）

公開サイト：https://noraelf-creator.github.io/mother-president-index/
旧版（AUTHOR INDEX v2.1、2026-09-28）：https://noraelf-creator.github.io/mother-president-index/v2/

『お母さんは大統領』（マダミス4）の制作資料を読み、気になった箇所に修正案を残すためのサイト。2026-10-05の総点検・改稿の結果を載せている。

## 画面

- 左：大題（分類）と中題（ページ一覧＋見出し）の2列。幅はドラッグで変えられる
- 中央：本文。読み合わせは話者ごとの色分け、HOは見出しカード、カードは1枚ずつの枠
- 右：修正案。本文の段落・台詞・表の行にカーソルを合わせて「✎」→ その箇所の修正案を書く。たたむと細い帯になる
- 注意点・情報の限界は折りたたみ（必要なときだけ開く）。表の「情報の限界」「注意点」などの列は、表から外して折りたたみの注意点にする

## 修正案の保存先

- 閲覧は誰でも可。作者用の編集キーで解除すると、Cloudflare D1（`mother-president-sync` Worker、projectId `mother_president`）に共有保存される
- 改訂版のページのメモは `page_id` の先頭に `rv1-` を付けて保存する。旧版v2のメモとは混ざらない
- 解除していない間は、端末のブラウザーに下書きとして残る（あとで「下書きを共有へ送る」）
- 編集キーはこのリポジトリに含めない

## 更新のしかた

```
npm install          # 初回だけ（marked など）
npm run sync         # 改訂フォルダ（_マダミス改訂_20261004/お母さんは大統領）から content/改訂版 へ写す
npm run build        # content/ → data/site-data.js
npm run serve        # http://127.0.0.1:8765/ で確認（ローカルでは共有保存に接続できない）
```

`content/` がサイトの元データ。`content/参照/` は改訂元の正本（第0事件ロック仕様、別荘事件レビューv3）の写し。

## フォルダ

| 場所 | 内容 |
|---|---|
| `index.html`, `assets/` | 画面（静的サイト） |
| `data/site-data.js` | ビルド結果（全ページのHTMLと目次） |
| `data/config.js` | 共有保存の接続先（公開してよい値だけ） |
| `content/` | 元のMarkdown・HTML |
| `tools/` | 写し・ビルド・ローカル確認・スクリーンショット |
| `v2/` | 旧版（AUTHOR INDEX v2.1）一式。Workerのソースは `v2/cloudflare/` |
