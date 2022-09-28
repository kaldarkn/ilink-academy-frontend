import React from 'react';
import styles from './UserCard.module.scss';
import iconSex from '../../assets/img/sex_icon.svg';
import iconDogFood from '../../assets/img/dogFood.svg';

const UserCard = ({ name, birthday, city, sex, age, info, ps, pet }) => {
  return (
    <div className={styles.info}>
      <div className={styles.cardHeader}>
        <h1>{name}</h1>
        <h3>{birthday}</h3>
      </div>
      <ul>
        <li>
          <b>Город:</b> {city}
        </li>
        <li>
          <b>Пол:</b> {sex}
        </li>
        <img src={iconSex} alt="sex" />
        <li>
          <b>Возраст:</b> {age}
        </li>
      </ul>

      <p>
        <b>О себе:</b> {info}
        <br />
        <i>{ps}</i>
      </p>

      <div className={styles.cardFooter}>
        <img src={iconDogFood} alt="dog-food" />
        <h4>
          <b>Домашнее животное:</b> {pet}
        </h4>
      </div>
    </div>
  );
};

export default React.memo(UserCard);
