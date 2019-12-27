import React from 'react';
import styles from './index.css';
import Link from 'umi/link';

export default function() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2>SCNU Web APPs</h2>
      </div>
      <div className={styles.body}>
        <ul className={styles.appList}>
          <li>
            <Link to="/about">
              <div className={styles.appItem}>馆藏书籍搜索</div>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <div className={styles.appItem}>关于本站</div>
            </Link>
          </li>
        </ul>
        <div className={styles.more}>更多应用开发中，敬请期待</div>
      </div>
      <div className={styles.footer}>
        by{' '}
        <a href="https://blog.izgq.net/" target="_blank">
          @zgq354
        </a>
      </div>
    </div>
  );
}
