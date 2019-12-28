
import React from 'react';
import NavBar from '@/components/NavBar/NavBar';

import styles from './about.css';

export default function() {
  return (
    <div>
      <NavBar title="关于" />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h2>关于 SCNU.APP</h2>
        </div>
        <div className={styles.body}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consequatur sint laboriosam deleniti obcaecati non quaerat sit incidunt explicabo exercitationem, numquam vitae et dolore quasi fugiat illo commodi aliquid veritatis?</p>
        </div>
      </div>
    </div>
  );
}
