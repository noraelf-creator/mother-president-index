# お母さんは大統領 作者用INDEX

**作者用・重大なネタバレを含む。** GitHub Pagesは公開サイトです。URL共有・検索等で第三者が到達できます。noindexと折りたたみはアクセス制御ではありません。完全非公開が必要な場合はCloudflare Access等の認証付きホスティングに移行してください。

## 閲覧

index.htmlを開くと動作します。GitHub PagesではPCを閉じていても閲覧可能です。サイト自体にローカルサーバーは不要です。data/catalog.jsが本文と制作状況の共通データで、各ページ・目次・検索から参照します。各資料の版と出典を確認してください。

現時点で確認できた原文、レビューv3、第0事件ロック仕様書、制作スタジオを収録しています。全構想の完成を保証するものではなく、不足・未確定資料を明示したINDEXです。旧稿を最新仕様へ自動改稿していません。

## 訂正メモ・TODO

Supabase接続は未設定。初期状態ではメモ編集無効。「作者ログイン・同期設定」で明示的に有効にすると、そのブラウザーだけへ仮保存できます。他PCと同期しないことを常時表示します。

クラウド用コードとSQLを同梱。設定後は作者ログイン＋RLS、公開閲覧、20秒ごとの再取得、更新日時による競合検出に対応。クラウド障害時にローカルへ黙って保存しません。メモ本文はHTMLとして実行せずテキスト表示します。未対応メモからMarkdownの修正指示を出力できます。

公開メモには秘密鍵・パスワード・個人情報を書かないでください。設定はpages/setup.htmlを参照。

## 正本の範囲

- 第0事件：2026-09-24ロック仕様。
- 別荘事件：review_v3の正本候補。作者の最終承認は未確認。
- HO・ED・カーチェイス：保存原文。別荘v3との最終整合は未確認。
- ココフォリア：制作スタジオの動作確認版。本番本文ではなくテスト文章を含みます。
- 完成率は推測しません。資料の収録数と制作状態を表示します。

## ダウンロードと素材

FINAL_CCFOLIA.zip、CARD_PNG.zip、READ_ALOUD_PNG.zip、test.project.json、制作スタジオZIP、review_v3.htmlを収録。generator/からスタジオも開けます。

HO完成PDFは確認できず、ダウンロード項目を捏造していません。INDD、BGM、他作品素材、パロディ画像集、未使用巨大4x素材は公開しません。未使用素材は権利・公開許諾・用途を確認してから個別に追加してください。巨大ファイルの無差別追加は転送量・リポジトリ容量・公開範囲を増やします。

## 更新

本文はdata/catalog.js、接続情報はdata/config.js。ローカルのbuild.pyは既存資料を読むビルド用です。再ビルドは手編集したcatalog.jsを置換するため、原資料の更新かビルド設定の更新を先に行ってください。公開先はPROJECT_STATUS.mdとAI_HANDOFF.mdを参照。

クラウド権限設計： https://supabase.com/docs/guides/database/postgres/row-level-security

GitHub Pages： https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
