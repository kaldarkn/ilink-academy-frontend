import React from 'react';
import imgSuccess from '../../assets/img/Success.svg';
import btn from '../../assets/img/btnHideSuccess.svg';
import styles from './SuccessMessage.module.scss';

const SuccessMessage = ({ onClick }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img className={styles.success} src={imgSuccess} alt="success" />
        <img onClick={() => onClick(false)} className={styles.button} src={btn} alt="button hide" />
      </div>
    </div>
  );
};

export default React.memo(SuccessMessage);
