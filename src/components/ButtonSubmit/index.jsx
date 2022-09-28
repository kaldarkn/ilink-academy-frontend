import React from 'react';
import iconInfo from '../../assets/img/info_icon.png';
import styles from './ButtonSubmit.module.scss';

const ButtonSubmit = ({ disabled, handlerSubmit }) => {
  return (
    <div className={styles.submit}>
      <input
        onClick={(e) => handlerSubmit(e)}
        type="submit"
        value="Отправить отзыв"
        disabled={disabled}
      />
      <div className={styles.info}>
        <img className={styles.iconInfo} src={iconInfo} alt="icon-info" />
        <span>Все отзывы проходят модерацию в течение 2 часов</span>
      </div>
    </div>
  );
};

export default React.memo(ButtonSubmit);
