import React from 'react';
import styles from './Footer.module.scss';
import iconVK from '../../assets/img/vkontakte.svg';
import iconHZ from '../../assets/img/hz.svg';
import iconTG from '../../assets/img/telegram.svg';

const Footer = () => {
  return (
    <div className={styles.container}>
      <h1>© iLINK ACADEMY. ALL RIGHTS RESERVED. 2022</h1>
      <div>
        <a href="https://vk.com/kaldar">
          <img src={iconVK} alt="vkontakte" />
        </a>
        <a href="/">
          <img src={iconHZ} alt="hz" />
        </a>
        <a href="https://t.me/thenotoriousmma9">
          <img src={iconTG} alt="telegram" />
        </a>
      </div>
    </div>
  );
};

export default React.memo(Footer);
