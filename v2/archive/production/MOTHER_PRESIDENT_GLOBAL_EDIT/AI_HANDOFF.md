# AI引継ぎ：全体編集モード第1弾

## 変更範囲

基礎は直前成果物 MOTHER_PRESIDENT_TEMPLATE_UPDATE。元フォルダおよび読み取り専用sourcesは変更していない。
index.htmlの末尾にglobal-edit.jsを追加。mother-president.jsは描画部品の公開とPC背景・立ち絵・名前枠の分離だけ変更。標準L座標、slot数、テンプレートIDは維持。

## 設計

state.layoutOverrides[templateId][nodeId] = {x,y,w,h,z,locked}。
親付きノードの数値はテンプレート基準座標系。world()が親の移動・拡縮を合成する。親を編集しても子の基準値は変わらない。
描画は親背景→z順の子。zは同一親内、親の重なり順はグループ全体に適用。
ON時と調整値がある時だけ拡張描画。OFFかつ調整なしの場合は元drawに委譲し、既存テンプレートの見た目を維持。
選択状態・ON/OFFは一時UI状態。保存するのは位置・サイズ・順序・ロック。既存saveProject/loadProjectでJSONに保持される。
調整済みのBACK/NEXTは新しい位置でクリック判定する。
pointerイベントをcaptureして元のレイアウトドラッグと競合させない。全体編集ON中は旧レイアウトドックを非表示。

## 検証

verification.json：実ドラッグ4対象、PC子追従・内部編集、数値リサイズ、キー操作、ロック、z保存、保存ボタンダウンロードと再読込、初期化、12テンプレート画像一致、実行エラー。
extra-verification.json：実リサイズハンドル、追加スクリーン／マーカー数値編集。
未調整時の比較基準は MOTHER_PRESIDENT_TEMPLATE_UPDATE/index.html。

## 次段階で注意

今回の出力対象は調整済みJSON/PNG。既存ココフォリア・素材ZIPにoverrideを適用する処理は未追加。出力操作には警告確認あり。次段階でZIP出力拡張が要求されたら、独立アイテム・マーカーの位置・寸法・zをworld()から得て、PC子の個別位置を含めて処理すること。今回はZIP合成や工房機能へ進まない。
他テンプレートの内部画像を母専用と同粒度で編集するには個別レンダラー対応が必要。
グループ解除／複数選択は任意項目で未実装。
