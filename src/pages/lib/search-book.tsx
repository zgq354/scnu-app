
import React from 'react';

import styles from './search-book.css';
import Back from '@/components/Back/Back';

export default function() {
  return (
    <div className={styles.pageContainer}>
      <Back />
      <div className={styles.pageBody}>
        <div className={styles.searchPageTitle}>
          <div className={styles.searchPageIcon} />
          <h3>馆藏书籍搜索</h3>
        </div>
        <div className={styles.searchPageInput}>
          <input placeholder="输入查找关键字" />
        </div>
        <div className={styles.searchBtn} />
      </div>
    </div>
  );
}
