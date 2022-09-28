import React from 'react';
import imgError from '../../assets/img/Error.svg';
import btn from '../../assets/img/btnHideError.svg';
import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ onClick }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img className={styles.error} src={imgError} alt="error" />
        <img onClick={() => onClick(false)} className={styles.button} src={btn} alt="button hide" />
      </div>
    </div>
  );
};

export default React.memo(ErrorMessage);
