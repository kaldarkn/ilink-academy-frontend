import React, { useState } from 'react';
import styles from './Reviews.module.scss';
import btnAddBig from '../../assets/img/bigBtnAdd.svg';
import btnAddSmall from '../../assets/img/smallBtnAdd.svg';
import btnPrev from '../../assets/img/btnPrev.svg';
import btnNext from '../../assets/img/btnNext.svg';
import Slider from '../Slider';

const Reviews = ({ openForm }) => {
  let [numberOfSliderPages, setNumberOfSliderPages] = useState(0); //кол-во страниц слайдера
  let [currentSliderPage, setCurrentSliderPage] = useState(0); //активная страница слайдера

  const clickNext = () => {
    currentSliderPage < numberOfSliderPages - 1
      ? setCurrentSliderPage((currentPage) => currentPage + 1)
      : setCurrentSliderPage(0);
  };

  const clickPrev = () => {
    currentSliderPage > 0
      ? setCurrentSliderPage((currentPage) => currentPage - 1)
      : setCurrentSliderPage(numberOfSliderPages - 1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.reviews}>
        <div className={styles.header}>
          <h1>Отзывы</h1>
          <img onClick={openForm} className={styles.bigBtn} src={btnAddBig} alt="add" />
          <img onClick={openForm} className={styles.smallBtn} src={btnAddSmall} alt="add" />
        </div>
        <Slider
          numberOfSliderPages={numberOfSliderPages}
          setNumberOfSliderPages={setNumberOfSliderPages}
          currentSliderPage={currentSliderPage}
          setCurrentSliderPage={setCurrentSliderPage}
          clickNext={clickNext}
          clickPrev={clickPrev}
        />
      </div>
      <img onClick={clickPrev} className={styles.prevBtn} src={btnPrev} alt="button-prev" />
      <img onClick={clickNext} className={styles.nextBtn} src={btnNext} alt="button-next" />
    </div>
  );
};

export default Reviews;
