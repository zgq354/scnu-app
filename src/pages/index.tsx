import React, { useCallback } from 'react';
import styles from './index.css';
import router from 'umi/router';

function navigateTo({ currentTarget }: Partial<Event>) {
  router.push((currentTarget as HTMLDivElement).dataset.url || '');
}

export default function() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2>SCNU Web APPs</h2>
        <p style={{ fontSize: '14px' }}>一些实用的在线小工具，持续更新中</p>
      </div>
      <div className={styles.body}>
        <ul className={styles.appList}>
          <li>
            <div className={styles.appItem} data-url='/lib/' onClick={navigateTo}>
              馆藏书籍搜索
            </div>
          </li>
          <li>
            <div className={styles.appItem} data-url='/about/' onClick={navigateTo}>
              关于本站
            </div>
          </li>
        </ul>
        <div className={styles.more}>更多应用开发中，敬请期待</div>
      </div>
      <div className={styles.footer}>
        by{' '}
        <a href="https://blog.izgq.net/" target="_blank">
          zgq354
        </a> @ <a href="https://i.scnu.edu.cn/" target="_blank">ISCNU</a>
      </div>
    </div>
  );
}
