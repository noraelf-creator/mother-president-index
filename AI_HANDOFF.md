# AI_HANDOFF

- サイトURL：https://noraelf-creator.github.io/mother-president-index/
- GitHub：https://github.com/noraelf-creator/mother-president-index
- 公開：mainブランチのルート、GitHub Pages。
- 現在の本文：data/catalog.js。ページ一覧・本文・検索・制作状況を共有。本文は既存資料抽出。
- 原資料：mother_president_review_v3.html（正本候補）、2026-09-24第0事件ロック仕様書、clean原文保存資料、制作スタジオ成果物。
- 編集：本文を変えるなら根拠を確認しcatalog.jsまたはビルド元を更新。build.py再実行はcatalog.jsを置換するため注意。sources/は編集禁止。
- 同期：data/config.jsにSupabase URLと公開キーだけ設定。service_roleは禁止。SQLはsupabase.sql。author_notesはpage_id／section_id／title／body／status／character／card／created_at／updated_at／owner_id／kind。
- 作者権限：author_private.index_authorsのUUIDだけ書込可能。RLS必須。SQLのポリシー／トリガーは初回用。
- メモ・TODOは共通テーブル。公開閲覧／作者のみ書込。20秒再取得。更新日時で競合検出。
- 未設定時は編集無効。明示的に有効化した仮保存はlocalStorageのみ、クラウドとは称さない。
- 次工程：作者のSupabase設定、RLS匿名書込拒否・2端末同期の実確認、実ココフォリア検証、HO PDF作成。
- 更新：git add、commit、push。公開URLのHTTP確認後に完了を報告。
- 巨大未使用素材・INDD・BGM・他作品画像・認証情報は公開しない。
