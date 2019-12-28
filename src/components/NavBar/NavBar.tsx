import React from 'react';
import styles from './NavBar.css';
import Back from '@/components/Back/Back';

export default function NavBar({ title = '' }) {
  return (
    <div className={styles.navBar}>
      <div className={styles.navBarContainer}>
        <Back />
        <h2>{title}</h2>
      </div>
    </div>
  );
}
