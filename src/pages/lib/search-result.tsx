import React, { useState, useEffect, useCallback } from 'react';

import NavBar from '@/components/NavBar/NavBar';
import Loading from '@/components/Loading';
import styles from './search-result.css';
import commonStyles from './common.css';

import routerTypes from 'umi/routerTypes';
import Axios from 'axios';
import router from 'umi/router';
import { useInput } from '@/utils/util';

interface searchResultObjectType {
  total: number;
  cost: number;
  content: {
    author: string;
    callNo: string;
    docTypeName: string;
    isbn: string;
    marcRecNo: string;
    num: number;
    pubYear: string;
    publisher: string;
    title: string;
  }[];
}

const EmptyResult: React.FC<{ empty: boolean }> = ({ empty }) => {
  return (
    <div className={styles.resultEmpty}>
      <p>{empty ? '输入书籍关键词，点击搜索按钮开始搜索' : '找不到结果，换个关键字试试？'}</p>
    </div>
  );
};

// Override location
interface routerTypesWithQuery extends Omit<routerTypes, 'location'> {
  location: Location & { query: {
    keywords: string,
  }};
};

const SearchResult: React.FC<routerTypesWithQuery> = (props) => {
  const { keywords: initialKeywords } = props.location.query;
  const { value: keywords, bind, reset} = useInput(initialKeywords);
  const [loading, setLoading] = useState(false);
  const [searchResultList, setSearchResultList] = useState<searchResultObjectType>({
    total: 0,
    cost: 0,
    content: [],
  });

  const fetchSearchResult = useCallback((async () => {
    if (!keywords) return;
    setLoading(true);
    const { data } = await Axios.get('/api/library/search', {
      params: {
        keywords,
      }
    });
    setLoading(false);
    setSearchResultList(data || {});
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
            ) : searchResultList.content?.length <= 0 ? (
              <EmptyResult empty={!initialKeywords} />
            ) : (
              <React.Fragment>
                <div className={styles.resultInfo}>OPAC 为你找到了 {searchResultList.total} 条结果，耗时 {searchResultList.cost}s</div>
                <div className={styles.resultList}>
                  {searchResultList.content?.map(item => {
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
              </React.Fragment>
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
    if (!loading && keywords) {
      // router
      router.replace({
        pathname: '/lib/search-result',
        query: {
          keywords,
        },
      });
      fetchSearchResult();
    }
  }
}

export default SearchResult;
