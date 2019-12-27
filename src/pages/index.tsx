import React from 'react';
import styles from './index.css';

export default function() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2>SCNU Web APPs</h2>
      </div>
      <div className={styles.body}>
        <ul className={styles.appList}>
          <li>
            <div className={styles.appItem}>图书馆藏查询</div>
          </li>
          <li>
            <div className={styles.appItem}>关于本站</div>
          </li>
        </ul>
        <div className={styles.more}>更多应用开发中，敬请期待</div>
      </div>
      <div className={styles.footer}>
         by <a href="https://blog.izgq.net/" target="_blank">@zgq354</a>
      </div>
    </div>
  );
}
