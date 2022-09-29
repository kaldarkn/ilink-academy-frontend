import axios from 'axios';
import { useState, createContext, useEffect } from 'react';
import Header from './components/Header';
import UserCard from './components/UserCard';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import Form from './components/Form';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import userPhoto from './assets/img/photo.jpg';
import styles from './App.module.scss';

const SERVER_PATH = process.env.REACT_APP_API_URL;

const MY_INFO = {
  name: 'Калдар Кайрат',
  birthday: '27.06.1996',
  city: 'Томск',
  sex: 'мужчина',
  age: '25',
  info: `Привет! Меня зовут Кайрат, мне 25 лет. Уже 3.5 года работаю
  инженером-программистом в сфере Автоматизации технологических процессов. Но сейчас всерьёз
  задумываюсь о смене сферы деятельности: хочу стать Front-end разработчиком. Изучаю HTML,
  CSS, native JS, ReactJS. Скоро залечу в сферу IT и стану классным разработчиком! 💻`,
  ps: 'Кстати, у меня есть брат-близнец :)',
  pet: 'нет',
};

export const CommentsContext = createContext({});

function App() {
  let [formOpened, setFormOpened] = useState(false);
  let [fetchSuccess, setFetchSuccess] = useState(false);
  let [fetchError, setFetchError] = useState(false);
  let [comments, setComments] = useState([]);

  //Получим все комментарии
  useEffect(() => {
    try {
      axios
        .get(`${SERVER_PATH}comments`)
        .then((res) => setComments(res.data))
        .catch((err) => alert('Произошла ошибка', err));
    } catch (error) {
      console.warn(error);
      alert('Произошла ошибка при запросе на сервер');
    }
  }, [formOpened]);

  const handlerOpenForm = () => {
    setFormOpened(!formOpened);
    window.scrollTo(0, 0);
  };

  return (
    <CommentsContext.Provider value={comments}>
      <div className={styles.App}>
        {formOpened && (
          <Form openForm={handlerOpenForm} setSuccess={setFetchSuccess} setError={setFetchError} />
        )}
        <Header />
        <div className={styles.content}>
          <h1 className={styles.welcome}>Добро пожаловать в академию!</h1>
          <img className={styles.avatar} src={userPhoto} alt="user-avatar" />
          <div className={styles.card}>
            <UserCard {...MY_INFO} />
          </div>
          <div className={styles.reviews}>
            <Reviews openForm={handlerOpenForm} />
          </div>
        </div>
        {fetchSuccess && <SuccessMessage onClick={setFetchSuccess} />}
        {fetchError && <ErrorMessage onClick={setFetchError} />}
        <Footer />
      </div>
    </CommentsContext.Provider>
  );
}

export default App;
