import React from 'react';
import styles from './Label.module.scss';

const Label = ({ text, infoValid }) => {
  return (
    <label className={styles.question} htmlFor="name">
      {text} <sup>{infoValid}</sup>
    </label>
  );
};

export default React.memo(Label);
