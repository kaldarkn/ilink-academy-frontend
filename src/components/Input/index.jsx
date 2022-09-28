import React from 'react';
import styles from './Input.module.scss';

const Input = ({ name, placeholder, handleValidation, handleOnBlur, value, children }) => {
  return (
    <div className={styles.author}>
      <input
        onInput={(e) => handleValidation(e)}
        onBlur={(e) => handleOnBlur(e)}
        value={value}
        autoComplete="off"
        type="text"
        name={name}
        placeholder={placeholder}
        spellCheck={false}
      />
      {children}
    </div>
  );
};

export default React.memo(Input);
