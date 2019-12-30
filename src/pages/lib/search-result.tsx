import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroll-component';

import NavBar from '@/components/NavBar/NavBar';
import Loading, { Spinner } from '@/components/Loading';
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

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loadingSpinnerWrap}>
      <Spinner />
    </div>
  );
};

// Override location
interface routerTypesWithQuery extends Omit<routerTypes, 'location'> {
  location: Location & {
    query: {
      keywords: string;
    };
  };
}

const PageSize = 20;
const initialSearchResult = {
  total: 0,
  cost: 0,
  content: [],
};

const SearchResult: React.FC<routerTypesWithQuery> = props => {
  const { keywords: initialKeywords } = props.location.query;
  const { value: keywords, bind } = useInput(initialKeywords);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchResultList, setSearchResultList] = useState<searchResultObjectType>(
    initialSearchResult,
  );

  const fetchSearchResult = useCallback(
    async (currentPage = 1) => {
      if (!keywords) return;
      currentPage <= 1 && setLoading(true);
      try {
        const { data } = await Axios.get('/api/library/search', {
          params: {
            keywords,
            pageCount: currentPage,
            pageSize: PageSize,
          },
        });
        // 后台出错情况
        if (!data.content) throw new Error(data);
        currentPage <= 1 && setLoading(false);
        setPage(currentPage + 1);
        setSearchResultList(lastResult => {
          if (data) {
            const { total, cost, content } = data;
            return {
              total,
              cost,
              content: lastResult.content.concat(content),
            };
          } else {
            return lastResult;
          }
        });
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
    [keywords, PageSize],
  );

  useEffect(() => {
    fetchSearchResult();
  }, []);

  const title = initialKeywords
    ? `${initialKeywords} - 书籍搜索 - SCNU.APP`
    : '书籍搜索 - SCNU.APP';
  const hasMore = searchResultList.total > searchResultList.content?.length && page <= 5;

  return (
    <div className={commonStyles.page}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavBar title="搜索结果" />
      <div className={commonStyles.pageContainer}>
        <div className={commonStyles.pageBody}>
          <div className={styles.sectionSearchBox}>
            <input
              type="text"
              placeholder="输入查找关键字"
              {...bind}
              onKeyPress={handleSearchInputEnter}
            />
            <div className={styles.searchBtn} onClick={handleSearchBtnClick} />
          </div>
          <div className={styles.sectionSearchResult}>
            {loading ? (
              <Loading />
            ) : searchResultList.content?.length <= 0 ? (
              <EmptyResult empty={!initialKeywords} />
            ) : (
              <React.Fragment>
                <div className={styles.resultInfo}>
                  <a href="http://202.116.41.246:8080/opac/" target="_blank">OPAC</a> 为你找到了 {searchResultList.total} 条结果，耗时 {searchResultList.cost}s
                </div>
                <div className={styles.resultList}>
                  {/* “无限”滚动 */}
                  <InfiniteScroll
                    dataLength={searchResultList.content.length}
                    next={fetchMoreResult}
                    hasMore={hasMore}
                    loader={<LoadingSpinner key={-1} />}
                    endMessage={<div className={styles.reachBottom}>- 已经到底啦 ^_^ -</div>}
                    scrollThreshold="20px"
                    style={{ overflow: 'none' }}
                  >
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
                  </InfiniteScroll>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function fetchMoreResult() {
    fetchSearchResult(page);
  }

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
      setPage(1);
      setSearchResultList(initialSearchResult);
      fetchSearchResult();
    }
  }
};

export default SearchResult;
