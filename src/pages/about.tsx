
import React from 'react';
import NavBar from '@/components/NavBar/NavBar';

import styles from './about.css';

import wxImg from '../assets/0x0001.jpg';

export default function() {
  return (
    <div>
      <NavBar title="关于" />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h2>关于 SCNU.APP</h2>
        </div>
        <div className={styles.body}>
          <p>如你所见，这是一个网页版的 APP，初衷是集合一些方便华师同学学习生活的小工具。</p>
          <p>除了图书查询之外，暂时什么都还没有呢，先这样吧哈哈哈，说明什么的回头再加上。</p>
          <p>反正，在任何一个能点击链接的地方，<br/>输入 <b>scnu.app</b>，就能回到这里啦(๑╹ヮ╹๑)ﾉ</p>
          <p style={{ textAlign: 'center', marginTop: '3em' }}><img src={wxImg} style={{ maxWidth: '150px' }} /></p>
          <p style={{ textAlign: 'center', fontSize: '13px' }}>有任何疑问，欢迎联系作者 zgq354</p>
        </div>
      </div>
    </div>
  );
}
