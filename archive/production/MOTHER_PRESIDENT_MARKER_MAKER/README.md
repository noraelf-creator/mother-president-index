# マーカー工房 第3弾

index.htmlを開き、プレビュー上部の「マーカー工房」を選択してください。第1弾の全体編集と第2弾のカード工房を維持しています。元の成果物は変更していません。

## 操作

1. 「新規作成」または「reading_panel作成」を押します。
2. ID、名前、用途、マーカー／スクリーン、幅・高さ、初期x/y、z-indexを入力します。
3. 固定／可動、シーンを跨いで同一IDを維持、画像差し替え対象を指定します。
4. 画像を登録します。HO／カーチェイス／追加HOは正式本マーク素材からも選択できます。EXの黒本は文字なし素材です。
5. 単体と初期配置を確認し、個別PNG・marker_manifest.json・MARKER_PACK.zipを出力します。
6. 編集再開用データは「プロジェクトJSON保存」。既存の「プロジェクト読込」で復元できます。

## IDと差し替え

- 画像登録・差し替えでIDは変更しません。パネルも増やしません。
- reading_panel作成を繰り返しても既存の同IDを選択します。
- 同一ID維持ONを初期値とします。manifestのsharedEntityIdにIDを保存。
- OFFの場合はper_scene方針とsceneScopedIdPatternを保存するだけで、シーンごとのパネルは生成しません。
- IDの手動変更・複製は別パネルを作る操作です。運用開始後の差し替えではIDを変えないでください。
- IDは80文字以内の英数字・ハイフン・下線。大小文字を無視した重複を検出します。
- 「画像差し替え対象」は運用方針のメタ情報です。OFFでも工房内の画像編集は禁止しません。

## 出力と範囲

MARKER_PACK.zip内：panels/ID.png、marker_manifest.json、README.txt。
PNGは指定した幅・高さ。画像は縦横比維持、透明部分を保持。座標・z-index・固定等はmanifestに保持します。
画像未登録時は仮画像を出力し、manifestのisPlaceholder=trueで明示します。読み合わせ本文は生成しません。
固定＝編集ロックそのものではなく、後の配置処理へ渡す設定です。工房内ではいつでも設定変更できます。

このパックはココフォリアのルームZIPではありません。既存ルームへの画像差し替え適用、シーンへのID割当、BASE_BOARDとのZIP合成は未実装です。ココフォリア実サービスの動作検証は今回行っていません。

## サンプル・確認

sample.project.json：reading_panel（仮枠）、ho_pc1（正式HO素材）、fixed_screen（可動・シーン別方針の確認例）。
reading_panel.png、fixed_screen.png、MARKER_PACK.zip、marker_manifest.jsonを出力済み。
verification.json：21項目。2回の画像差し替えでID・枚数維持、設定保存／読込、重複ID抑止、既存盤面非変更、12テンプレート画像一致など。
PACKの3PNGとmanifest参照は欠落0件。
