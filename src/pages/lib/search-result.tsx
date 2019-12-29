import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';

import NavBar from '@/components/NavBar/NavBar';
import Loading from '@/components/Loading';
import styles from './search-result.css';
import commonStyles from './common.css';

import routerTypes from 'umi/routerTypes';
import Axios from 'axios';

const searchResultListInitial = [
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
];

const EmptyResult: React.FC = () => {
  return <div>找不到结果，换个关键字试试？</div>;
}

// Override location
interface routerTypesWithQuery extends Omit<routerTypes, 'location'> {
  location: Location & { query: {
    keywords: string,
  }};
};

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

const SearchResult: React.FC<routerTypesWithQuery> = (props) => {
  const { keywords: initialKeywords } = props.location.query;
  const { value: keywords, bind, reset} = useInput(initialKeywords);
  const [currentKeywords, setCurrentKeywords] = useState(initialKeywords);
  const [loading, setLoading] = useState(true);
  const [searchResultList, setSearchResultList] = useState(searchResultListInitial);

  const fetchSearchResult = useCallback((async () => {
    setLoading(true);
    const { data } = await Axios.get('/api/library/search', {
      params: {
        keywords,
      }
    });
    setLoading(false);
    setSearchResultList(data.content || []);
    setCurrentKeywords(keywords);
  }), [keywords]);

  useEffect(() => {
    fetchSearchResult();
  }, []);

  return (
    <div className={commonStyles.page}>
      <NavBar title="搜索结果" />
      <div className={commonStyles.pageContainer}>
        <div className={commonStyles.pageBody}>
          <div className={styles.sectionSearchBox}>
            <input type="text" placeholder="输入查找关键字" {...bind} onKeyPress={handleSearchInputEnter} />
            <div className={styles.searchBtn} onClick={handleSearchBtnClick} />
          </div>
          <div className={styles.sectionSearchResult}>
            {loading ? (
              <Loading />
            ) : searchResultList.length <= 0 ? (
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

  function handleSearchInputEnter(ev: any) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      handleSearchBtnClick();
    }
  }

  function handleSearchBtnClick() {
    // if (currentKeywords != keywords) {
    //   fetchSearchResult();
    // }
    fetchSearchResult();
  }
}

export default SearchResult;
