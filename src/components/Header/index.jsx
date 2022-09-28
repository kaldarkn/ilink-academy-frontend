import React from 'react';
import styles from './Header.module.scss';
import userPhoto from '../../assets/img/photo.jpg';
import ilinkLogo from '../../assets/img/ilink.svg';
import academyLogo from '../../assets/img/academy.svg';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.user}>
        <img src={userPhoto} alt="user-avatar" />
        <p></p>
      </div>
      <div className={styles.logo}>
        <img className={styles.ilink} src={ilinkLogo} alt="ilink" />
        <img className={styles.academy} src={academyLogo} alt="academy" />
      </div>
      <button>Панель управления</button>
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="2" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.4116 14.0759C22.4116 16.5234 20.4492 18.4859 17.9999 18.4859C15.5515 18.4859 13.5883 16.5234 13.5883 14.0759C13.5883 11.6283 15.5515 9.66666 17.9999 9.66666C20.4492 9.66666 22.4116 11.6283 22.4116 14.0759ZM17.9999 26.3333C14.3852 26.3333 11.3333 25.7458 11.3333 23.4791C11.3333 21.2116 14.4044 20.6449 17.9999 20.6449C21.6154 20.6449 24.6666 21.2324 24.6666 23.4991C24.6666 25.7667 21.5954 26.3333 17.9999 26.3333Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default React.memo(Header);
