# 第4弾 パック合成 引継ぎ

基礎MOTHER_PRESIDENT_MARKER_MAKER。indexにpack-assembler.js追加。global-edit.jsにassembledスコープとノード供給分岐を追加。他の工房JSは未変更。
state.packAssembler={sources,primary,choices,geometry,active,result,scene}をプロジェクト保存。sourceに解析済みJSONと画像data URLを保存するためJSONは大きい。
state.layoutOverrides.assembledは合成パネルの微調整。item:ID／marker:IDがノードID。
sourcesのBASEは主BASEをルーム構造として採用し、候補のitem・markerをIDで集約。CARDはcardId競合解決→targetSlot解決→対象エンティティ競合解決。MARKERはID競合解決→targetMarkerまたはid（既知別名あり）で対象解決。
plan()が競合を列挙し、choicesに明示選択がなければmerge()は停止する。採用画像は内容ハッシュで命名。BASEの同名ファイルへPACKの同名ファイルを上書きしない。
exportBase()はGlobalEditのノードから独立パネルを書き出す新しいBASE生成経路。既存の旧ココフォリア出力経路は変更していない。
finalZip()は結果を複製→全体編集調整を全シーンの同IDへ適用→カード比率維持画像を作成→参照画像だけ収集して出力。
FINAL_CCFOLIAには__data.json/.token/画像だけ。manifest/README/プロジェクトJSONを混ぜない。
旧通常出力ボタンではなく、新しい「パック合成」タブから最終ZIPを出すこと。
ZIPデコーダは中央ディレクトリ、CRC、サイズ、パス、重複ファイルを検査。STORE/DEFLATEのみ。
実ココフォリアインポート未検証。公式文書はZIPインポート操作のみ確認済みで、内部スキーマを保証する資料ではない。元アプリのplane/marker/room構造を維持して検証した。
