import React from 'react';
import btnHide from '../../assets/img/btnHide.svg';
import styles from './FormTitle.module.scss';

const FormTitle = ({ btnHandler, text }) => {
  return (
    <div className={styles.header}>
      <h1>{text}</h1>
      <img onClick={() => btnHandler()} className={styles.hideForm} src={btnHide} alt="hide" />
    </div>
  );
};

export default React.memo(FormTitle);
