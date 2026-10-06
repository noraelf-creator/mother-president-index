# 第4弾 PACK ASSEMBLER / パック合成

index.htmlの上部「パック合成」を開いてください。第1〜3弾は維持しています。以前の成果物は変更していません。

## 最短で確認

既存の「プロジェクト読込」から final.project.json を選ぶと、合成・最終調整済みのサンプルを復元できます。
完成画像はfinal_preview.png、ルーム用出力はFINAL_CCFOLIA.zipです。

## 新しく合成する

1. 必要なら「現在の盤面をBASE_BOARD.zip出力」。mother_presidentの画像部品と固定配置先を、同じIDで各シーンへ出力します。
2. BASE_BOARD.zip、CARD_PACK.zip、MARKER_PACK.zipを追加。複数ファイル・追加読込に対応。
3. 競合一覧で採用するBASE/PACKを1件ずつ選択。未選択なら合成できません。同一カードIDの競合を選んだ後、配置先の競合が現れる場合があります。
4. マーカーの位置・サイズについてBASE優先かPACK優先を選びます。新規マーカーはPACK座標を使います。
5. 「選択内容で合成」→シーンを選んで確認→「全体編集で最終調整」。ドラッグ・数値・リサイズ・重なり順等を調整できます。
6. 「パック合成」へ戻り、完成プロジェクトJSON、FINAL_CCFOLIA.zip、final_manifest.json、プレビューPNG、導入READMEを個別に保存。

再合成は最終調整を初期化するため確認が出ます。元のテンプレートを編集したい場合は「元の盤面へ戻る」を使用してください。

## 意味的マージ

- investigation_01とslot_investigation_01を同じ配置先として解決。捜査10枠・議論12枠・EX12枠。
- 新BASEのbase_manifest.jsonのslots、および旧mother_presidentのmp_card_*/mp_ex_*を認識。
- 同じ配置先を複数カードが使用する場合も競合として表示。
- マーカーはtargetMarkerがあれば優先、なければidで解決。存在するIDを維持して画像・設定を差し替えます。
- ho_pc1等の既存工房名をmp_ho_0_0等の既存本マーカーへ対応づけます。
- 画像名の衝突は画像内容のハッシュで分離。ZIP名による上書きではありません。
- 共通マーカーの最終位置調整は、同じIDの全シーンへ適用。
- シーン別ID方針の新規マーカーのみID__sceneIdで展開。既存IDへの置換はそのIDを優先して保持。
- カード表裏は参照PNGを保持。横長枠へ入る縦長カードは比率維持の余白を画像へ焼き込み、最終ZIPで文字が横に伸びるのを防ぎます。

## 制限・未検証

- 対象は今回のmother_president互換ZIP。80×45座標系＝1600×900。未知の形式・参照欠落・未配置カードは停止して報告します。
- 複数BASEは同じシーンID構成が必要。主BASEのルーム・シーン定義・非パネル情報を使用し、他BASEのパネルを競合候補として扱います。別シナリオ全体を自動統合する機能ではありません。
- STORE/DEFLATE ZIP対応。暗号化・分割・ZIP64、画像以外のBASEリソースは非対応。
- 合成後は輸入した独立パネルが編集単位です。元のPC親子グループ情報はルームZIPにないため復元しません。
- EXがマーカーパネルの場合、表面画像を表示します。カード裏面参照は保持しますが、実サービス上のマーカー反転操作は未検証です。
- サンプルは動作確認用。reading_panelは仮画像、fixed_screenは黒本の仮配置です。完成シナリオ素材ではありません。
- ログインを伴う実ココフォリアへのインポートは未実施。構造検査合格はサービス上の登録成功を保証しません。

## 検証済み

verification.json / extra-verification.json：合計28項目。
実ZIP読込→競合選択→12カード合成→実ドラッグ→保存→再読込→最終ZIP。
同じマーカーIDと調整座標を9シーンで維持。PACK同士のID競合、BASE/PACK位置優先、DEFLATE読込、未解決配置先拒否、全画像参照欠落0を確認。
既存12テンプレートの未編集表示は第3弾と一致。

## 導入

ルームへ読み込むのはFINAL_CCFOLIA.zipのみです。アプリ一式ZIPとは別物です。
manifest・README・プレビュー・プロジェクトJSONはルームZIPの外へ分離しました。
公式案内：https://docs.ccfolia.com/gm-only/room-option/room-settings/room-data
公式注意事項：https://docs.ccfolia.com/information/problems
