const form = document.querySelector('.form');
const input = document.querySelector('.input'); 
const header = document.querySelector('.header');

function removeFn() {
  const prevCard = document.querySelector('.card');
  if (prevCard) {
    prevCard.remove();
  };
};

//Слушаем отправку:
form.addEventListener('submit', valueOfInput);

function valueOfInput(event) {
  //Отменяем отправку формы:
  event.preventDefault();

  //Берём значение из инпута:
  let city = input.value.trim();

  //Адерс запроса:
  const apiKey = '970d8852c3f441dbb4e133749240701';
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  
  //Выполняем запрос:
  fetch(url)
    .then((response) => {
     return response.json();         //Данные получили в JSON, тем самым тут мы их парсим
  })
   .then((data) => {
    //Проверка на ошибку:
    if (data.error) {

      removeFn();
      
      const html = `<div class="card">${data.error.message}</div>`;
      header.insertAdjacentHTML('afterend', html);
    } else {

      removeFn();

     //Разметка карточки:
     const html = ` <div class="card">
                       <h2 class="card-city">${data.location.name}<span class="card-span">${data.location.country}</span></h2>
 
                        <div class="card-weather">
                       <div class="card-value">${Math.round(data.current.temp_c)}<sup>°c</sup></div>
                           <img class="card-img" src="./img/day/weather.png" alt="Weather">
                       </div>
 
                        <div class="card-description">${data.current.condition.text}</div>
                    </div>`;

    //Отображаем карточку на странице:
    header.insertAdjacentHTML('afterend', html);
    };
  });
};