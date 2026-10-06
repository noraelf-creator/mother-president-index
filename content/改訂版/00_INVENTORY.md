# 00_INVENTORY — お母さんは大統領（マダミス4）

作成：2026-10-05　担当：本チャット（お母さんは大統領のみ）
元ファイルは読み取りのみ。編集・移動・削除はしていない。

---

## 1. 作品の概要

| 項目 | 内容 |
|---|---|
| 作品名 | 『お母さんは大統領』（作者素材フォルダでは「マダミス4」） |
| ジャンル | コメディ・パロディ系マーダーミステリー（バック・トゥ・ザ・フューチャー／ターミネーター等） |
| PC | 4人：PC1 サラー・コーナー／PC2 ルーク・ウォーカー／PC3 ドク・エリオット／PC4 マーティ・テルミネーター |
| NPC | ジョン（謎の男）、教授、女子学生①②、サラー母（現大統領） |
| 構成 | 導入 → OP → 第0事件「未来人は誰だ！？」（ミニ推理）→ 大統領宣言・デロリアン衝突 → カーチェイス4ROUND → 休憩・追加HO → 別荘事件（サラーの異常な身体状態の調査）→ 最終推理Q1〜5 → 真相開示 → ED1〜7 → 任意ED（ルーク／サラー／ドク・マーティ）→ 感想戦 |
| 完成度 | **半分〜ほぼ完成**。真相・HO・カード・ED原稿・進行構造は揃っている。台本6系統と運用ルールの一部が欠けている（下記4） |
| PROJECT_MASTER.md | 存在しない（今回新規作成） |

---

## 2. 正本の判定

指示書の優先順位（指示書 → PROJECT_MASTER → MASTER指定資料 → 新しい資料 → 古い資料）に従った。PROJECT_MASTERがないため、最新の統合PROJECT（2026-10-02）と、そこが「作者用正本」として転記した資料を正とした。

| 優先 | 資料 | 扱い |
|---|---|---|
| 1 | `MOTHER_PRESIDENT_FULL_INTEGRATION_033_20261002/MADMIS_PRODUCTION_HARNESS_PACKAGE_V0.3.3/MOTHER_PRESIDENT/`（2026-10-02 17:43） | **最新統合版。正本の本体** |
| 2 | 同 `99_PROJECT_STATUS/DEFINITIONS/AUTHOR/*.json`（truth / characters / scenario_master / timeline_master / clue_design） | 作者用正本（別荘事件v3＋第0事件ロック仕様の転記） |
| 3 | 同 `DEFINITIONS/CURRENT/CASE0_LOCKED.md`（2026-09-24 ロック仕様） | 第0事件の正本。v2と食い違う箇所はこちらを優先 |
| 4 | `C:\00_【創作】一時フォルダ\mother_president_review_v3.html`（2026-09-26） | 別荘事件v3の正本候補（作者確認待ちのまま統合版に採用されている）。対応表・監査・未確定事項の出典 |
| 5 | 同 `ARCHIVE/source-snapshots/request.txt` | 統合指示（PART A〜T）。Q1〜5の文言、真相開示順、カーチェイス各ROUNDの仕様 |
| 6 | 同 `ARCHIVE/source-snapshots/case0_v2.md`（第0事件設計稿v2） | 参照。ロック仕様で上書きされた箇所は不採用 |
| 7 | 同 `ARCHIVE/source-snapshots/original_archive.html`、`missing_endings.html` | UZU版の原文。OP・読み合わせ・カーチェイス・EDの原文出典。旧別荘事件の内容は不採用 |

判断が分かれた点（統合版の★フォルダと◆_FINALで別荘HOの番号がずれている件など）は `CHANGELOG.md` の「仮定・判断」に記録した。

---

## 3. ファイル一覧と採用判定

### 3-1. 最新統合PROJECT（MOTHER_PRESIDENT/）

| ファイル | 種類 | 判定 | 理由・メモ |
|---|---|---|---|
| `03_PLAYER_HO/◆_FINAL/PC0x/HO_01.txt` | 初期HO（4人） | 採用・改稿対象 | 作者原文（ho_*）。旧目標欄は統合時に除外されていた |
| `03_PLAYER_HO/◆_FINAL/PC0x/HO_02.txt` | カーチェイスHO（4人×4ROUND） | 採用・改稿対象 | 作者原文 |
| `03_PLAYER_HO/◆_FINAL/PC0x/HO_03.txt` | 別荘追加HO（v3） | 採用・改稿対象 | レビューv3の正式配布本文。三人称寄りの説明文 |
| `03_PLAYER_HO/★_PC0x/HO_01.txt` | 別荘追加HO（v3） | 重複 | ◆_FINALのHO_03と同一。★側は番号が古い |
| `03_PLAYER_HO/★_PC0x/HO_03.txt` | 旧別荘追加HO（一人称） | **不採用（参考）** | `ARCHIVE/old-additional-ho` と同一。v3と原因・時系列が矛盾（毒瓶を自分で飲む、マーティの動機が違う等）。口調・ギャグ・心情は改稿の参考にした |
| `03_PLAYER_HO/★_PC0x/initial_ho.txt` | 初期HO | 重複 | ◆_FINALのHO_01と同一 |
| `03_PLAYER_HO/★_PC0x/case0_ho_*.txt` | 第0事件HO（個人TL・目標） | 採用・改稿対象 | ロック仕様§6〜7の転記。表形式のみで心情なし |
| `03_PLAYER_HO/★_PC01/case0_secret_choice.txt`、`CARD7_PRIVATE/` | サラー偽装3択 | 採用 | ロック仕様§9 |
| `03_PLAYER_HO/★_PC04/case0_marty_extra.txt` | マーティ追加情報 | 採用・改稿対象 | v2§11／ロック仕様§11 |
| `00_WORKBENCH/03_CARD_WORKBENCH/source.json` | カード25枚（第0事件8・別荘12・追加情報1・EX4） | 採用・改稿対象 | 別荘12枚は「現行本文維持」の指定あり。今回は文体規定に沿って短文化 |
| `99_PROJECT_STATUS/DEFINITIONS/CASE0_CARD7_VARIANTS.json` | カード7 A/B/C | 採用・改稿対象 | |
| `00_WORKBENCH/04_READ_ALOUD_WORKBENCH/source.json` | 読み合わせ22本 | 採用・改稿対象 | OP・第0事件・衝突・カーチェイス開始/終了・別荘到着・22時台の声・確定ギャグ・ED1〜7・任意ED3本 |
| `99_PROJECT_STATUS/DEFINITIONS/CURRENT/chase_round_1〜4.txt` | カーチェイス問題文 | 採用 | ROUND4は全選択肢が同じ遷移先 |
| `99_PROJECT_STATUS/FULL_GAME_FLOW.md` | 進行順（236シーン） | 採用 | 進行の骨格 |
| `99_PROJECT_STATUS/GM_MANUAL.md` | 手動進行ガイド | 参照 | EX配布・カード交換手順 |
| `99_PROJECT_STATUS/MISSING_ORIGINAL_TEXT.md` | 不足原稿リスト | 参照 | 下記4の根拠 |
| `99_PROJECT_STATUS/ARCHIVE/initial-ho-superseded/` | 旧初期HO（目標欄つき） | 一部採用 | 旧目標（全編の願い）を初期HOへ復元。理由はCHANGELOG |
| `99_PROJECT_STATUS/ARCHIVE/chase-extraction-before-cleaning/` | 整形前の抽出 | 不採用 | 整形版がCURRENTにある |
| `99_PROJECT_STATUS/ARCHIVE/rejected-reading-sections.json` | 統合時に除外した読み合わせ | 不採用 | 現行と矛盾 |
| `99_PROJECT_STATUS/ARCHIVE/studio-*`、`integration-before/`、`v0.2.1/`、`reference/` | ツール移行履歴 | 不採用（制作物） | 物語本文の正本ではない |
| `04_CCFOLIA/`、`FINAL_CCFOLIA.zip` | ココフォリア出力 | 参照のみ | 統合検証版。実取込は未検証 |

### 3-2. 旧稿・設計資料

| ファイル | 判定 | 理由 |
|---|---|---|
| `ARCHIVE/source-snapshots/case0_v2.md`（設計稿v2） | 参照 | HOの心情文、§16「投票先別の追加観察」、§17C「接続指示」を参照採用。公開TLのノート放置記載など、ロック仕様で上書きされた箇所は不採用 |
| `ARCHIVE/source-snapshots/original_archive.html`（UZU版原文） | 参照 | 旧別荘事件（毒瓶の注意書き「夢遊病・欲望に忠実」、足跡、調査8枚×ランダム、投票①〜⑤）は不採用。ただし投票⑤「ルークの性癖は？」はおまけ投票として復元（判断：CHANGELOG） |
| `ARCHIVE/source-snapshots/missing_endings.html` | 採用（出典） | ED6後半・ED7・任意EDの原文 |
| `ARCHIVE/source-snapshots/catalog.js`（作者INDEX v2.1） | 参照 | 155ページ。未確定事項（酒の配分、斧の位置、調査回数・公開順）を確認 |
| `mother_president_review_v1.html` / `.zip` | 不採用 | v3に置換済み |
| `C:\Users\81806\.codex\...\drafts\`（前半改稿案v1、設計稿v2、ロック仕様のZIP） | 参照 | 同内容がsource-snapshotsにある |
| `C:\Users\81806\.codex\...\president-archive\` | 参照 | original_archive.htmlと同内容 |

### 3-3. 制作ツール・盤面・検証フォルダ（内容の正本ではない）

以下は盤面画像・カード画像・ハーネス・検証用の生成物。物語本文の判定には使わない（REFERENCE）。

`MOTHER_PRESIDENT_CARD_DESIGN_V4` / `CARD_MAKER` / `CARD_TYPE_V5` / `GRID_V3_20260930` / `GRID_V4_20261001` / `GRID_V5_20261001` / `OUTPUT_LAYOUT_V2` / `OUTPUT_LAYOUT_V3` / `PACK_ASSEMBLER` / `MARKER_MAKER` / `TEMPLATE_UPDATE` / `ZFIX_20260930` / `REVISED_20260930` / `REVISED_V2_20260930` / `INTEGRATED`（V2〜V4） / `STUDIO` / `GLOBAL_EDIT` / `HO_PDF` / `INDEX_SITE` / `PRODUCTION_20260929` / `PRODUCTION_PROJECT`（V0.2.2〜V0.3.3） / `V5_HARNESS_*_VERIFY` / `FINAL_MANUAL_20260930` / `MURDER_MYSTERY_BOARD_MAKER_MOTHER_PRESIDENT`（＋zip）

### 3-4. 作者素材フォルダ

| 場所 | 判定 | 内容 |
|---|---|---|
| `E:\創作・作成用\【マダミス4】お母さんは大統領\` | 参照 | キャラ画像、BGM、背景、メッセージウィンドウ、HOのindd、OP会話CSV（OP読み合わせと同内容）、**山荘の地図（1F・2F）**。地図は位置関係の確認に使った（2Fに4人の部屋が並び、窓は南側。ジョンの部屋・倉庫・煙突穴あり） |

---

## 4. 欠けている資料

| 欠落 | 状況 | 今回の対応 |
|---|---|---|
| 第0事件・最多得票4分岐の台本 | ロック仕様§15に流れと終着点だけある | 仕様どおりに新規執筆（03_改稿） |
| カーチェイスROUND1〜3の成功／失敗台本 | 遷移先の名前だけ残る（UZU版にも本文なし） | 新規執筆。HP・サイコロ・ゲームオーバーは入れない |
| 別荘到着〜夜の進行〜収納箱・斧〜事件発見の台本 | v3の因果と順序だけ確定 | 新規執筆。順序はv3のとおり |
| 真相開示の全文 | 7段階の順序と確定ギャグ5行のみ | 新規執筆。確定ギャグ5行は原文のまま組み込む |
| 別荘の調査回数・公開順 | 「未確定」のまま | 進行ルールを仮定して決めた（CHANGELOGの仮定・判断） |
| 任意EDの解放条件 | 「以下条件達成でED解放」とだけあり、条件本文がない | おまけ投票を使う条件を仮定して設定。未達でも進める既存ルートは残す |
| 投票先別の追加観察（v2§16／ロック仕様§15） | 統合版に未実装 | 別荘の議論中に配る資料として作成 |
| テストプレイ記録 | なし | 今回の仮想プレイを最初の記録とする |
| 酒の入手・量、斧の置き場所 | v3で未確定 | 酒：食糧庫の強い酒（統合版HOの記述どおり）。斧：置き場所は本文で特定しない |

---

## 5. 他作品について

このチャットは『お母さんは大統領』だけを担当する。ワークスペース内の他作品（超マダミスガールズX、公安勇者パーティ、M.T.A.、DUNGEON OF THE MURDER、エルフ帝国の逆襲など）は対象外。
