import React, { useState, useRef, useEffect, useContext } from 'react';
import ReviewCard from '../ReviewCard';
import Dots from '../Dots';
import styles from './Slider.module.scss';
import { CommentsContext } from '../../App';

//Данные с авторами и комментариями для тестирования
// const comments = [
//   {
//     name: 'Буба Бубенцов',
//     photo: require('../../assets/img/author1.png'),
//     date: '08.01.2022',
//     comment:
//       'Отличный коллектив, руководители понимают сам процесс работы каждого сотрудника и помогают всем без исключения. Система KPI позволяет реально хорошо зарабатывать по простому принципу - чем больше и лучше ты работаешь, тем больше денег получаешь. Соцпакет - отличная страховка ДМС, организовали курсы английского языка бесплатно, оплачивают тренажерный зал. Зарплату выплачивают всегда вовремя.',
//   },
//   {
//     name: 'Илья Анташкевич',
//     photo: require('../../assets/img/noPhoto.png'),
//     date: '08.01.2022',
//     comment:
//       'Год назад попытал счастье, откликнулся на вакансию, прошел собес и попал в компанию. Долго переживал что будет тяжело влиться, но тут прям классные ребята работают, все на одной волне. Всегда готовы помочь с любым вопросом. Для эффективной работы здесь нужно хорошо знать иностранные языки.',
//   },
//   {
//     name: 'Юрина Маргарита',
//     photo: require('../../assets/img/author3.png'),
//     date: '26.12.2021',
//     comment:
//       'Наша компания благодарна фирме ilink за сотрудничество. Хотелось бы отметить отличную работу сотрудников: все было выполнено качественно, со знанием дела, в установленные сроки. За время работы с компанией значительно увеличилась аудитория, сайт приносит стабильный доход, контент уникальный, грамотный и качественный. Будет продолжать работу и дальше. Мы довольны, что доверили создание сайта компании ilink.',
//   },
//   {
//     name: 'Дмитрий Иванов',
//     photo: require('../../assets/img/author4.png'),
//     date: '16.12.2021',
//     comment:
//       'Отвечала за найм и адаптацию сотрудников в компании, за поддержание на нужном уровне HR-бренда и трудового настроя коллектива. В компанию пришла без опыта работы HR-ом. Всему научилась здесь. Как теории, так и практике. Набрала опыт достаточно быстро. Есть программа обучения, поощряются различные курсы, и это большой плюс. В коллективе очень дружная атмосфера. Все дружелюбные, амбициозные.',
//   },
//   {
//     name: 'Кайрат Калдар',
//     photo: require('../../assets/img/author5.jpg'),
//     date: '26.09.2022',
//     comment:
//       'Наша компания благодарна фирме ilink за сотрудничество. Хотелось бы отметить отличную работу сотрудников: все было выполнено качественно, со знанием дела, в установленные сроки. За время работы с компанией значительно увеличилась аудитория, сайт приносит стабильный доход, контент уникальный, грамотный и качественный. Будет продолжать работу и дальше. Мы довольны, что доверили создание сайта компании ilink.',
//   },
//   {
//     name: 'Марк Цукерберг',
//     photo: require('../../assets/img/author6.jpg'),
//     date: '16.09.2022',
//     comment:
//       'Отвечала за найм и адаптацию сотрудников в компании, за поддержание на нужном уровне HR-бренда и трудового настроя коллектива. В компанию пришла без опыта работы HR-ом. Всему научилась здесь. Как теории, так и практике. Набрала опыт достаточно быстро. Есть программа обучения, поощряются различные курсы, и это большой плюс. В коллективе очень дружная атмосфера. Все дружелюбные, амбициозные.',
//   },
// ];

const Slider = ({
  numberOfSliderPages,
  setNumberOfSliderPages,
  currentSliderPage,
  setCurrentSliderPage,
  clickNext,
  clickPrev,
}) => {
  let comments = useContext(CommentsContext);
  let [touchStartX, setTouchStartX] = useState(null); //начальное значение координат X для свайпа
  let [touchEndX, setTouchEndX] = useState(null); //конечное значение координат X для свайпа
  let sliderWindowWidthRef = useRef(null); //ширина окна слайдера

  useEffect(() => {
    const checkScreenWidth = () => {
      //Получаю размер окна слайдера
      sliderWindowWidthRef.current = document.getElementById('window').offsetWidth;
      //Если мобильная версия браузера (width < 540px), то количество слайдов равна количеству фидбэков, Иначе количество слайдов равна половине количества фидбэков
      window.screen.width <= 540
        ? setNumberOfSliderPages(comments.length)
        : setNumberOfSliderPages(Math.ceil(comments.length / 2));

      //Устанавливаем активным слайдом самый первый
      setCurrentSliderPage(0);
    };

    checkScreenWidth();

    //Повторяем действия при Resize
    window.addEventListener('resize', () => {
      checkScreenWidth();
    });
  }, [comments]);

  const touchHandler = () => {
    if (touchStartX > touchEndX) {
      clickNext();
    } else if (touchStartX < touchEndX) {
      clickPrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <>
      <div
        id="window"
        className={styles.window}
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchMove={(e) => setTouchEndX(e.touches[0].clientX)}
        onTouchEnd={touchHandler}>
        <article
          id="slider"
          className={styles.slider}
          style={{
            transform: `translateX(-${currentSliderPage * sliderWindowWidthRef.current}px)`,
          }}>
          {comments.map((comment) => {
            return <ReviewCard key={comment._id} {...comment} />;
          })}
        </article>
      </div>
      <Dots
        numberOfSliderPages={numberOfSliderPages}
        currentSliderPage={currentSliderPage}
        setCurrentSliderPage={setCurrentSliderPage}
      />
    </>
  );
};

export default Slider;
