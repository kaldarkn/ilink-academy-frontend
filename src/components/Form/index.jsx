import { useState } from 'react';
import axios from 'axios';
import Uploader from '../Uploader';
import Captcha from '../Captcha';
import Textarea from '../Textarea';
import Input from '../Input';
import File from '../File';
import ButtonSubmit from '../ButtonSubmit';
import Label from '../Label';
import FormTitle from '../FormTitle';
import styles from './Form.module.scss';

const SERVER_PATH = 'http://192.168.0.102:4444';

//Правила валидации и информация в случае неправильной валидации
const VALIDATION_RULES = {
  name: (e) => [
    /^[А-ЯЁа-яё]*$|^[А-ЯЁа-яё][А-ЯЁа-яё ]*[А-ЯЁа-яё ]$/.test(e.target.value),
    'Используйте только кириллицу и пробелы',
  ],
  comment: (e) => [e.target.value.length <= 200, 'Нельзя ввести более 200 символов'],
  captcha: (e) => [true, 'Введите код с картинки'],
};

const Form = ({ openForm, setSuccess, setError }) => {
  let [fileData, setFileData] = useState({
    name: '',
    size: 0,
    progressLoaded: 0,
    url: '',
    loaded: false,
  });
  let [inputData, setInputData] = useState({ name: '', comment: '', captcha: '' });
  let [validationInfo, setValidationInfo] = useState({ name: '', comment: '', captcha: '' });

  //Обработчик выбора и отправки файла на сервер с прогрессбаром
  const handleChangeInputFile = (e) => {
    let file = e.target.files[0];
    e.target.value = null;
    //Если файл выбран
    if (file) {
      let date = new Date(Date.now());
      //Формируем дату добавления файла для имени
      const dd = `${date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : `${date.getUTCDate()}`}`;
      const mm = `${date.getUTCMonth() < 10 ? `0${date.getUTCMonth()}` : `${date.getUTCMonth()}`}`;
      const yyyy = `${date.getUTCFullYear()}`;
      const hour = `${date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`}`;
      const min = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`}`;
      let strDate = `${dd}-${mm}-${yyyy}-${hour}-${min}`;

      //Устанавливаем название, размер
      setFileData((data) => ({ ...data, name: `Photo ${strDate}`, size: file.size }));

      //Отправка картинки на сервер
      try {
        //Создаем объект formData для загрузки картинки на сервер
        const formData = new FormData();
        //Прикрепляю картинку с ключом photo
        formData.append('photo', file);
        //Конфигурация, чтобы отслеживать сколько уже загружено
        const config = {
          onUploadProgress: (progressEvent) => {
            setFileData((data) => ({
              ...data,
              progressLoaded: progressEvent.loaded,
            }));
          },
        };
        axios
          .post(`${SERVER_PATH}/upload`, formData, config)
          .then((res) => {
            //Сервер в ответе присылает URL картинки, который нужно сохранить в state
            setFileData((data) => ({
              ...data,
              url: `${SERVER_PATH}${res.data.photo}`,
              loaded: true,
            }));
          })
          .catch((error) => {
            console.warn(error);
            alert('Произошла ошибка при загрузке файла на сервер');
          });
      } catch (error) {
        console.warn(error);
        alert('Произошла ошибка при загрузке файла на сервер');
      }
    }
  };

  //Обработчик удаления файла с сервера
  const handlerDeleteFile = () => {
    try {
      axios
        .post(`${SERVER_PATH}/delete`, { photo: fileData.url.replace(`${SERVER_PATH}/`, '') })
        .then(() => {
          setFileData({ name: '', size: 0, progressLoaded: 0, url: '', loaded: false });
        })
        .catch((error) => {
          console.warn(error);
          alert('Произошла ошибка при удалении файла с сервера');
        });
    } catch (error) {
      console.warn(error);
      alert('Произошла ошибка при удалении файла с сервера');
    }
  };

  //Обработчик отправки данных на сервер
  const handlerSubmit = (e) => {
    e.preventDefault();
    try {
      const data = {
        name: inputData.name,
        comment: inputData.comment,
        photo: fileData.url,
      };
      axios
        .post(`${SERVER_PATH}/comments`, data)
        .then(() => {
          openForm(false);
          setSuccess(true);
        })
        .catch((error) => {
          openForm(false);
          setError(true);
          console.warn(error);
          alert('Произошла ошибка при отправке данных на сервер');
        });
    } catch (error) {
      setError(true);
      console.warn(error);
      alert('Произошла ошибка при отправке данных на сервер');
    }
  };

  const handleOnBlur = (e) => {
    //Если после отведения фокуса, поле осталось пустым, закрашиваем border красным цветом и выводим информацию для юзера
    if (e.target.value.length === 0) {
      e.target.style.borderColor = 'red';
      setValidationInfo((data) => ({ ...data, [e.target.name]: 'Поле не может быть пустым' }));
    } else {
      e.target.style.borderColor = '';
      setValidationInfo((data) => ({ ...data, [e.target.name]: '' }));
    }
  };

  const handleValidation = (e) => {
    const [rule, noValidInfo] = VALIDATION_RULES[e.target.name](e);

    if (rule) {
      setInputData((data) => ({ ...data, [e.target.name]: e.target.value }));
      setValidationInfo((data) => ({
        ...data,
        [e.target.name]: '',
      }));
    } else {
      setValidationInfo((data) => ({
        ...data,
        [e.target.name]: noValidInfo,
      }));
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} method="post" encType="multipart/form-data">
        <FormTitle text="Отзыв" btnHandler={openForm} />
        <Label text="Как вас зовут?" infoValid={validationInfo.name} />
        <Input
          name="name"
          placeholder="Имя Фамилия"
          handleValidation={handleValidation}
          handleOnBlur={handleOnBlur}
          value={inputData.name}>
          <Uploader handleChangeInputFile={handleChangeInputFile} disabled={fileData.loaded} />
        </Input>
        {fileData.name && (
          <File
            name={fileData.name}
            size={fileData.size}
            progressLoaded={fileData.progressLoaded}
            load={fileData.loaded}
            handlerDeleteFile={handlerDeleteFile}
          />
        )}
        <Label text="Всё ли вам понравилось?" infoValid={validationInfo.comment} />
        <Textarea
          name="comment"
          placeholder="Напишите пару слов о вашем опыте..."
          handleValidation={handleValidation}
          handleOnBlur={handleOnBlur}
          value={inputData.comment}
        />
        {fileData.loaded && (
          <Captcha
            name="captcha"
            placeholder="0000"
            handleValidation={handleValidation}
            handleOnBlur={handleOnBlur}
            value={inputData.captcha}
            info={validationInfo.captcha}
          />
        )}
        <ButtonSubmit
          handlerSubmit={handlerSubmit}
          disabled={
            inputData.name.length === 0 ||
            inputData.comment.length === 0 ||
            inputData.captcha.length === 0 ||
            inputData.captcha !== '0096' || //пока в виде ЗАГЛУШКИ
            fileData.loaded === false
          }
        />
      </form>
    </div>
  );
};

export default Form;
