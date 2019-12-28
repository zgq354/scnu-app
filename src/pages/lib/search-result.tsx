import React from 'react';

import NavBar from '@/components/NavBar/NavBar';
import styles from './search-result.css';
import commonStyles from './common.css';

const searchResultList = [
  {
    author: '(挪威) 乔斯坦·贾德著',
    callNo: 'I533.45/J321:4',
    docTypeName: '中文图书',
    isbn: '978-7-5063-9486-4',
    marcRecNo: '4a314261656763305a6d4935334d5577424a664c62673d3d',
    num: 1,
    pubYear: '2017',
    publisher: '作家出版社',
    title: '苏菲的世界',
  },
  {
    author: '(挪威) 乔斯坦·贾德著',
    callNo: 'I533.45/J321:4',
    docTypeName: '中文图书',
    isbn: '978-7-5063-9486-4',
    marcRecNo: '4a314261656763305a6d4935334d5577424a664c62673d3d',
    num: 2,
    pubYear: '2017',
    publisher: '作家出版社',
    title: '苏菲的世界',
  },
];

function EmptyResult() {
  return <div>找不到结果，换个关键字试试？</div>;
}

export default function SearchResult() {
  return (
    <div className={commonStyles.page}>
      <NavBar title="搜索结果" />
      <div className={commonStyles.pageContainer}>
        <div className={commonStyles.pageBody}>
          <div className={styles.sectionSearchBox}>
            <input type="text" placeholder="输入查找关键字" />
            <div className={styles.searchBtn} />
          </div>
          <div className={styles.sectionSearchResult}>
            {searchResultList.length <= 0 ? (
              <EmptyResult />
            ) : (
              <div className={styles.resultList}>
                {searchResultList.map(item => {
                  return (
                    <div key={item.num} className={styles.bookItem}>
                      <div className={styles.bookCover}>
                        <img src="http://placehold.it/150x200" />
                      </div>
                      <div className={styles.bookInfo}>
                        <div className={styles.bookTitle}>{item.title}</div>
                        <p>{item.author}</p>
                        <p>
                          {item.publisher} {item.pubYear}
                        </p>
                        <p>{item.callNo}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
