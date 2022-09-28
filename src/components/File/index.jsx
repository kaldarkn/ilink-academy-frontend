import React from 'react';
import Spinner from '../Spinner';
import iconJpg from '../../assets/img/jpg_icon.png';
import iconDelete from '../../assets/img/delete.png';
import iconDeleteHover from '../../assets/img/delete_hover.png';
import styles from './File.module.scss';

const File = ({ name, size, progressLoaded, load, handlerDeleteFile }) => {
  // console.log(`${progressLoaded}/${progressTotal}`);
  return (
    <div className={styles.fileInfo}>
      <img className={styles.iconJpg} src={iconJpg} alt="jpg-icon" />
      <div>
        <label>{name}</label>
        <progress id="file" max={size} value={progressLoaded}></progress>
      </div>

      {load ? (
        <img
          className={styles.deleteIcon}
          onClick={handlerDeleteFile}
          onMouseOver={(e) => {
            e.target.src = iconDeleteHover;
          }}
          onMouseOut={(e) => {
            e.target.src = iconDelete;
          }}
          src={iconDelete}
          alt="delete"
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default React.memo(File);
