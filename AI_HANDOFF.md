# AI_HANDOFF

公開：https://noraelf-creator.github.io/mother-president-index/
Git repo: review_site/.git （main）。synced sources/ と元シナリオ資料は編集禁止。

## 本文

build-v2.py が build.py を呼び原資料から生成後、v2拡張。catalog.jsが正本の表示データ、分野JSONは派生ビュー。旧page_idと既存data-sectionは維持。新メモは同じpage_id/section_idを使う。原ファイルはarchive/にバイト一致コピー。本文detailsはINDEX内でsectionへ変換。原HTML自体は無変更。

作者指定の変更はサラー【横暴】とcard_09特殊調査の公開条件のみ。card_09_before_yokoboとarchive/reviews/に修正前を保存。他資料へ設定を推測で広げない。初期HOを最新と偽らず旧稿表示。

## メモ

js/store.js + backend/worker.mjs。旧localStorage mother-index-local-v1 は保全。mother-index-outbox-v2は未同期下書き、mother-index-author-v2は専用トークンだけ。編集キーを保存しない。サーバーSecret AUTHOR_KEY_HASH で256bitランダムキーのSHA256を照合。実デプロイ未実施。data/config.js memoApiは空。編集は無効。

アカウントへの接続が次の必須作業。設定完了後PC-A/PC-Bで実確認し、未完了表示を更新。旧supabase.sqlはv1互換資料で現在使用しない。メール/パスワード認証へ戻さない。

## 検証・公開

python build-v2.py → node test-v2.mjs → python validate-v2.py → python release-v2.py。
test-v2.mjsはローカルSQLiteとjsdomでの試験。実DB試験や実ブラウザーとは区別。
公開は review_site をgit commit/push。旧publish.cjsは使用しない（旧docsを上書きする）。ブラウザーでHTTPS公開版を確認。release-v2.pyでZIP更新、ZIPは公開git内に入れない。
