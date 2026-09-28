# カード工房 第2弾 引継ぎ

基礎：MOTHER_PRESIDENT_GLOBAL_EDIT。既存mother-president.js/global-edit.js/mother-assets.jsはコピーのみ。index末尾にcard-maker.jsを追加。

state.cardMaker={version:1,cards:[...]}として既存プロジェクトJSONへ保存。board.cardGroups等は変更しない。
front/backに個別の本文・画像data URL・配色・サイズを保持。
renderCardは600×840 Canvasで描画・警告を返す。禁則処理ではなく文字幅に基づく折返し。明示改行は維持。自動縮小なし。
盤面はGlobalEdit.renderから描画し、対象slotノードのworld座標へcontainで仮配置。
manifestは画像ファイルパスとメタ情報・本文を保持。再編集の完全データはプロジェクトJSON。
packは既存zipStoreを再利用。全表裏のPNGとmanifest/READMEを出力。本文等の収まり警告、重複配置・不正ID・ファイル名衝突があれば出力抑止。
BASE_BOARD合成や工房以外の新規機能へ進んでいない。

検証はverification.json/regression.json。CARD_PACK内は12カード・24PNG、manifest参照欠落0。
注意：ローカルフォント依存のため環境により折返し差が出得る。配布確定版には出力PNGを使用する。
