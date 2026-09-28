# 第3弾 マーカー工房 引継ぎ

基礎はMOTHER_PRESIDENT_CARD_MAKER。既存JS4ファイルはそのままコピー。index.htmlへmarker-maker.jsを追加。

state.markerMaker={version:1,panels:[]}としてプロジェクトJSONへ保存。
各レコード：id/name/type/entityType/image(data URL)/width/height/x/y/zIndex/fixed/preserveIdAcrossScenes/replaceableImage。
画像のアップロード先は既存レコードのimageだけ。IDの再生成やシーンエンティティの新規作成はしない。
reading_panel作成ボタンは同IDの既存レコードがあれば選択する。
manifestには画像パス・配置値・方針を出力。sharedEntityIdまたはsceneScopedIdPatternは将来の合成処理用であり、ココフォリア標準スキーマを名乗らない。roomImportReady=false。
pack()はデータをスナップショットしてPNG・manifest・READMEを既存zipStoreでまとめる。
既存state.extraPanels/state.phases/state.cardGroupsへは書き込まない。
個別PNGは透明維持contain。画像なしは仮枠を描画しisPlaceholder=true。

テスト：verification.json（21項目）、MARKER_PACKは3PNGで参照欠落0。実UI画像アップロード2回、ID・レコード数不変を確認。12テンプレートの未編集画像は第2弾と一致。
今回は独立作成まで。既存ルーム更新・ZIP合成・シーン自動作成へ進まない。
