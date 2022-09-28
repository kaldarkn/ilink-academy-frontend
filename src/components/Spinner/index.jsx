import React from 'react';
import spinner from '../../assets/img/spinner.gif';
import styles from './Spinner.module.scss';

const Spinner = () => {
  return <img className={styles.spinner} src={spinner} alt="spinner" />;
};

export default React.memo(Spinner);
