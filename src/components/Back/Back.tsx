import React, { useCallback } from 'react';
import router from 'umi/router';

import styles from './Back.css';

export default function Back() {
  const goBack = useCallback(
    () => {
      router.goBack()
    },
    [],
  )
  return (
    <div className={styles.back} onClick={goBack}>
      {'<< 返回'}
    </div>
  );
}
