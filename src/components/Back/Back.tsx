import React, { useCallback } from 'react';
import router from 'umi/router';

import styles from './Back.css';

function goBack() {
  router.goBack();
}

export default function Back() {
  return (
    <div className={styles.back} onClick={goBack} />
  );
}
