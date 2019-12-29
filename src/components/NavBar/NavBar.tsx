import React from 'react';
import router from 'umi/router';
import styles from './NavBar.css';
import withRouter from 'umi/withRouter'
import RouterTypes from 'umi/routerTypes';

function goBack() {
  router.goBack();
}

function goHome() {
  router.push('/');
}

function Back() {
  return (
    <div className={styles.back} onClick={goBack} />
  );
}

function Home() {
  return (
    <div className={styles.home} onClick={goHome} />
  );
}
const NavBar: React.FC<RouterTypes & { title?: string }> = ({ title = '', history, location }) => {
  const isHome = history.length === 1 && location.pathname !== '/';
  return (
    <div className={styles.navBar}>
      <div className={styles.navBarContainer}>
        {isHome ? <Home /> : <Back />}
        <div>{title}</div>
      </div>
    </div>
  );
}

export default withRouter(NavBar);
