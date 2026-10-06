# AI_HANDOFF — 共有同期版

現行コードは index_site/（作業環境では review_site/）と cloudflare/。旧 backend/・旧検証記録は前版です。旧 release-v2.py / publish.cjs を実行すると接続待ちの説明へ戻るため使用しないでください。

公開：https://noraelf-creator.github.io/mother-president-index/
API：https://mother-president-sync.noraelf-mta-review.workers.dev
D1：mother-president-author-notes / b433abe3-b76c-48ca-ab47-0ac852f575ec
projectId：mother_president

Worker Secret AUTHOR_EDIT_KEY。キー実値は配布物・GitHubへ含めない。作者ローカルの .private/作者用編集キー.txt に保管。トークンは30日、DBにはハッシュ保存。GETは公開、書込みはOrigin＋作品スコープ付きトークン照合。

メモは(project_id,page_id,section_id)、TODOは(project_id,todo_key)で一意。revision一致時のみ更新、409時は端末下書き保持。DELETEはソフト削除。旧稿と現在版のIDを統合しない。

js/store.js がD1 API＋スコープ付きキャッシュ／outbox／旧ローカル移行。js/site.jsが既存ページ直下UI。45秒更新中もフォーカス中・編集中を置換しない。未反映MarkdownとJSONは毎回D1を取得。JSON復元は不足項目のみ、新UUIDで追加。

実サーバー試験22項目とローカルDOM試験18項目成功。物理的な別PCは未試験。シナリオ本文を改変していない。README_CLOUDFLARE.md、WEB_VALIDATION.md、validation-sync-*.json参照。
