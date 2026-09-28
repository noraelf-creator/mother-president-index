# お母さんは大統領 AUTHOR INDEX v2

公開サイト：https://noraelf-creator.github.io/mother-president-index/

ローカルは index.html を開いてください。実体は review_site/ です。既存の公開URLとフォルダ構造を壊さないため維持しています。公開サイトはPC停止中も閲覧可能。

## 変更点

- 全文・秘密・真相・作者情報を常時表示。本文の開閉操作は不要。
- 資料・見出し・TL時刻の直下に作者メモ欄。保存ボタン、約1.8秒後／フォーカス移動時保存、反映済みチェック、未反映Markdown出力。
- 4人のHO総合。現在の追加HO・個別TL・EX導線と、旧初期HOをラベルを分けて併載。
- サラー【横暴】とカード09の条件を作者指示に従って変更。修正前カード・review原本は別保管。
- 旧稿・初期原文全体・途中成果物ZIP・原ファイルへのリンクと全文検索。

## 重要：クラウド保存は接続待ち

Cloudflare Worker＋D1用API、編集キー照合・30日トークン・競合検知・オフライン下書きを実装していますが、実アカウントへの配置は未実施です。現在は共有メモ編集を無効にし、接続待ちと表示しています。旧端末内メモは閲覧・書き出しでき、削除しません。backend/README.md に設定手順があります。

## 資料と不足

155ページ・原ファイル81件。現在のカード12枚、5人×10時刻TL、第0事件ロック仕様、旧HO/TL/カード/投票/ED、旧review、制作スタジオと途中成果物を収録。完成HO PDF、独立review_v2、実テストプレイ記録は未確認。未使用の巨大素材・BGM・INDD・他作品画像・過去チャット全文は含みません。

## ファイル

review_site/: 公開用HTML・pages/css/js/data/assets/downloads/archive/generator。
backend/: Worker・D1スキーマ・キー生成・設定手順（秘密キーは同梱しません）。
build.py → build-v2.py: 原資料抽出とv2拡張。実行するのは build-v2.py。元のsources/は読み取り専用。
validation-v2.json / validation-v2-unit.json: 今回の検証。旧validation.json等は前版の記録。

原資料は変更していません。公開本文の変更は今回許可された横暴・カード09の条件だけです。原ファイルはハッシュ照合で一致を確認。
