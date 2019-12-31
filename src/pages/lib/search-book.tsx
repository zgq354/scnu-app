
import React, { useCallback, useState, ChangeEvent } from 'react';

import NavBar from '@/components/NavBar/NavBar';
import router from 'umi/router';
import commonStyles from './common.css';
import styles from './search-book.css';

import { useInput } from '@/utils/util';

export default function SearchBook() {
  const { value, bind, reset } = useInput('');
  const startSearch = useCallback(() => {
    if (!value) return;
    router.push({
      pathname: '/lib/search-result',
      query: {
        keywords: value,
      },
    });
  }, [value]);

  return (
    <div className={commonStyles.page}>
      <NavBar title="书籍搜索" />
      <div className={commonStyles.pageContainer}>
        <div className={[commonStyles.pageBody, styles.pageBody].join(' ')}>
          <div className={styles.searchPageTitle}>
            <div className={styles.searchPageIcon} />
            <h3>馆藏书籍搜索</h3>
          </div>
          <div className={styles.searchPageInput}>
            <input
              placeholder="输入查找关键字"
              type="text"
              {...bind}
              onKeyPress={handleSearchInputEnter}
            />
          </div>
          <div className={styles.searchBtnWrapper}>
            <div className={styles.searchBtn} onClick={startSearch} />
          </div>
          <div className={styles.boardcast}>
            <p>
              <a href="https://mp.weixin.qq.com/s?__biz=MzI5NTcwMzAyMQ==&mid=2247488356&idx=1&sn=39a98782663c1b600ec1f07008e87f6e" target="_blank">
                第四届阅读马拉松阅读主题公布&书单票选！
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  function handleSearchInputEnter(ev: any) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      startSearch();
    }
  }
}
