
import React, { useCallback, useState, ChangeEvent } from 'react';

import NavBar from '@/components/NavBar/NavBar';
import router from 'umi/router';
import commonStyles from './common.css';
import styles from './search-book.css';

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event: ChangeEvent) => {
        setValue((event.target as HTMLInputElement).value);
      }
    }
  };
};

export default function SearchBook() {
  const { value, bind, reset } = useInput('');
  const startSearch = useCallback(() => {
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
            <input placeholder="输入查找关键字" type="text" {...bind} />
          </div>
          <div className={styles.searchBtn} onClick={startSearch} />
        </div>
      </div>
    </div>
  );
}
