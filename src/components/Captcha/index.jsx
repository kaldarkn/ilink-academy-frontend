import React from 'react';
import captchaImg from '../../assets/img/captcha.png';
import reload from '../../assets/img/reload.png';
import styles from './Captcha.module.scss';

const Captcha = ({ name, placeholder, handleValidation, handleOnBlur, value, info }) => {
  return (
    <div className={styles.captcha}>
      <div>
        <div>
          <label className={styles.question} htmlFor="captcha">
            Введите код с картинки:<sup>{info}</sup>
          </label>
          <input
            onInput={(e) => handleValidation(e)}
            onBlur={(e) => handleOnBlur(e)}
            value={value}
            type="text"
            name={name}
            placeholder={placeholder}
            spellCheck={false}
          />
        </div>
        <img className={styles.imgCaptcha} src={captchaImg} alt="captcha" />
        <img className={styles.iconReload} src={reload} alt="reload" />
      </div>
    </div>
  );
};

export default React.memo(Captcha);
