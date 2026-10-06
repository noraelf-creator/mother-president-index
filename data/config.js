// 公開してよい設定だけを書く。作者キーやその他の秘密はここに書かない。
window.SITE_CONFIG = {
  projectId: 'mother_president',
  memoApi: 'https://mother-president-sync.noraelf-mta-review.workers.dev',
  // 改訂版のページのメモは page_id の先頭にこれを付けて保存する（旧版v2のメモと混ざらない）
  pagePrefix: 'rv1-',
  // 旧版v2で解除済みの端末なら、その解除状態をそのまま使う
  legacySessionKey: 'mother-index-v3:mother_president:session',
  v2Url: 'v2/'
};
