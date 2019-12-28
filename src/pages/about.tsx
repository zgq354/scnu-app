
import React from 'react';

import Back from '@/components/Back/Back';
import styles from './about.css';


export default function() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.navbar}>
        <Back />
      </div>
      <div className={styles.header}>
        <h2>关于 SCNU.APP</h2>
      </div>
      <div className={styles.body}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consequatur sint laboriosam deleniti obcaecati non quaerat sit incidunt explicabo exercitationem, numquam vitae et dolore quasi fugiat illo commodi aliquid veritatis?</p>
      </div>
    </div>
  );
}
