import React from 'react';
import plusIcon from '../../assets/img/plus.svg';
import styles from './Uploader.module.scss';

const Uploader = ({ handleChangeInputFile, disabled }) => {
  return (
    <label
      className={disabled ? `${styles.uploader} ${styles.disabled}` : styles.uploader}
      htmlFor="file">
      <img src={plusIcon} alt="plus" />
      Загрузить фото
      <input
        disabled={disabled}
        onChange={(e) => handleChangeInputFile(e)}
        type="file"
        name="file"
        id="file"
        accept=".jpg, .jpeg"
      />
    </label>
  );
};

export default React.memo(Uploader);
