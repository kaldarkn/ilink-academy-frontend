import React from 'react';
import styles from './Dots.module.scss';

const Dots = ({ numberOfSliderPages, currentSliderPage, setCurrentSliderPage }) => {
  return (
    <div className={styles.dotsContainer}>
      {Array(numberOfSliderPages)
        .fill(0)
        .map((val, index) => {
          return (
            <React.Fragment key={index + 'Fragment'}>
              <input
                type="radio"
                name="radioDots"
                id={index}
                onChange={() => setCurrentSliderPage(index)}
                checked={currentSliderPage === index}
              />
              <label htmlFor={index}></label>
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default React.memo(Dots);
