// 1) Главная функция.
// 2)Функция которая генерирует рандомный цвет.
// 3)Функция которая выводит хэш в кнопку.
// 4)Функция которая сохраняет хэш в буффер обмена.
// 5)функция которая меняет иконку замочка.
// 6)функция которая ловит цвет и сохраняет его при повторном вызове главной функции.
// 7) функция которая выводит в адрессную строку хэш номера  при полном комплекте сорхранненых цветов.
// 8)функция которая загружает цвета из url 

function initApp() {
randomColor();
} 

document.addEventListener("DOMContentLoaded", initApp);

function randomColor() {
  // #648946
  //#ff0000
  let result = "";
  let hex = "0123456789abcdef";
   
  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * hex.length);
    result += hex[randomIndex];
  }
  console.log(result);
}

