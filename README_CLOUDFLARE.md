# お母さんは大統領・共有同期の使い方

## すでに公開・接続済みです

- サイト：https://noraelf-creator.github.io/mother-president-index/
- Worker：https://mother-president-sync.noraelf-mta-review.workers.dev
- D1：mother-president-author-notes
- projectId：mother_president
- 静的サイトは既存GitHub Pagesを維持。Cloudflare Pagesへの移転は不要です。

## 普段の使い方

1. サイトを開きます。閲覧には認証不要。
2. 上部「編集モードを解除」で作者用編集キーを入力します。
3. 資料のすぐ下へメモを書くと、約1.8秒後／フォーカス移動時に保存。「保存」ボタンも使用できます。
4. 別端末で同じURLを開くとD1の最新状態が表示されます。ページ再表示・画面復帰・45秒ごとの更新にも対応。「共有状態を更新」で手動取得できます。
5. TODO・反映済みチェックも共有されます。旧稿は別page_id/section_idなので現在版と混ざりません。

編集キーは、このPCの成果物フォルダ内 `.private/作者用編集キー.txt` に保管しています。公開サイト・GitHub・成果物ZIPには同梱していません。信頼できる自分の端末へ安全な方法で移し、パスワード管理先へ保管してください。キーをメモ欄・Chatへ貼らないでください。

ブラウザーが保存するのは作品限定・最大30日のランダムトークンだけです。キーはWorker Secret `AUTHOR_EDIT_KEY` に登録。D1にはトークンのハッシュを保存します。キー変更だけでは既存セッションは即失効しないため、緊急時は専用のedit_sessionsを失効させてください。

## 保存できない／他端末と衝突したとき

- 「同期できませんでした」と表示されたら、本文を消さず「再同期」を実行します。入力直後から端末内の下書きへ退避します。
- 同じセクションを別端末が更新した場合は409で拒否し、黙って上書きしません。「下書きの比較」で現在の共有本文を確認してから反映します。
- 通信失敗中にページを閉じても下書きは保持します。ブラウザーのサイトデータを消すと未同期下書きも失われます。
- 以前のv1/v2端末内メモは削除していません。編集設定の「再同期・旧メモを共有保存へ送る」で移行します。重複時は比較が必要です。
- ローカルHTMLをfile://で開く場合、読み取り専用資料として使ってください。共有編集は公開HTTPSサイトで行います。

## バックアップ

「全メモ一覧」→「メモ・TODO JSON保存」でD1の最新memos/todosを保存します。未反映MarkdownもD1から最新を取得して出力します。取得に失敗したとき、古いキャッシュを最新として出力しません。

「JSONから復元」は同じprojectIdの不足レコードだけを追加し、既存データは上書きしません。競合は個別確認してください。端末の未同期下書きは別の「端末下書きJSON保存」で控えられます。

## 初心者向け：新しい環境で再設定する場合

現在のDBを作り直す必要はありません。以下は移設・復旧時の手順です。既存のmta-author-notesには触れないでください。

1. Node.jsを用意し、cloudflareフォルダを開く。
2. `npx wrangler login` を実行し、自分のCloudflareアカウントで認証。
3. 新規環境だけ `npx wrangler d1 create mother-president-author-notes` を実行。返ったdatabase_idをwrangler.jsoncへ登録。既存環境は同梱IDを維持。
4. `npx wrangler d1 migrations apply mother-president-author-notes --remote` でテーブルを用意。既存データのDROPはありません。
5. `npx wrangler secret put AUTHOR_EDIT_KEY` に自分のランダムな作者キーを入力。HTML・JS・JSONへ記載しない。
6. `npx wrangler deploy` でWorkerを作成／更新。出たURLをサイトのdata/config.jsのmemoApiへ設定。projectIdはmother_president。
7. 静的サイトはGitHubのmainへpushし、GitHub Pagesで公開。Cloudflare Pagesを選ぶ場合はindex_siteをアップロードし、新しいサイトのOriginをWorkerのALLOWED_ORIGINへ設定して再配置します。
8. Workerの `/api/health` がapi=ok,d1=okになること、サイトでメモ保存→別端末で表示を確認。

## API・分離・安全性

- GET /api/memos?projectId=mother_president
- GET /api/memos/:pageId?projectId=mother_president
- POST /api/memos / PUT・DELETE /api/memos/:id
- GET・POST /api/todos / PUT・DELETE /api/todos/:id
- GET /api/health、POST /api/auth/unlock、GET /api/auth/session、POST /api/auth/lock

すべての作品データ問い合わせにprojectId必須。書込みは作品限定トークン必須（未認証403）、revision比較で競合409。GETは公開。DELETEは論理削除で、DB内には復旧用レコードを保持します。UIには不用意な削除ボタンを設けません。

CORSはhttps://noraelf-creator.github.ioだけ。Originなし／別Originの書込みも拒否します。CORSは閲覧の秘密保護ではありません。既存MTAのWorker・DB・編集キーは変更していません。他作品を追加する場合は別キーとprojectIdを用意し、追加Secret ADDITIONAL_PROJECT_KEYSで作品ごとのキーを分離できます。

作者メモも公開閲覧されます。個人情報や認証情報は書かないでください。料金・プラン変更を伴う契約操作は行っていません。

公式資料：[D1初期設定](https://developers.cloudflare.com/d1/get-started/) / [Worker Secret](https://developers.cloudflare.com/workers/configuration/secrets/)
