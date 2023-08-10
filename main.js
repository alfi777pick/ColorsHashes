// 1) Главная функция.
// 2)Функция которая генерирует рандомный цвет.
//3) Ф-ция которая найдет колонки и каждой колонке присвоит фоновый цвет и название цвета (hex цывета)
// 3)Функция которая выводит хэш в кнопку.
// 4)Функция которая сохраняет хэш в буффер обмена.
// 5)функция которая меняет иконку замочка.
// 6)функция которая ловит цвет и сохраняет его при повторном вызове главной функции.
// 7) функция которая выводит в адрессную строку хэш номера  при полном комплекте сорхранненых цветов.
// 8)функция которая загружает цвета из url

function initApp() {
  setColors();
  document.addEventListener('click', handleClick);
} 

function randomColor() {
  // #648946
  //#ff0000
  let result = "";
  let hex = "0123456789abcdef";
   
  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * hex.length);
    result += hex[randomIndex];
  }
  return `#${result}`;
}


function setColors() {
  let columns = document.querySelectorAll(".colors__item");
  columns.forEach((col, i) => {
    let colorsHash = col.querySelector(".colors__hash");
    let icon = col.querySelector(".unlock");
    let color = randomColor();
    let isUnLocked = Boolean(icon);
    
    if (!isUnLocked) {
      return;
    } 
    
    col.style.background = color;
    colorsHash.textContent = color;
  })
}

function copyDeclar(colorHashBtn) {
  let div = document.createElement('div');
  div.className = "div"; // TODO добавить класс в scss
  div.textContent = "Скопированно";
  colorHashBtn.after(div);

  // TODO Логика удаления этого элемента через 1.5 сек.
}

function bufferCopy(colorsHash) {
  if (!navigator) {
    return;
  }
  navigator.clipboard
    .writeText(colorsHash.textContent)
    .then(() => copyDeclar(colorsHash));
}

function handleClick(evt) {
  evt.target;

  if (evt.target.classList.contains('colors__hash')) {
    let colorsHash = evt.target;
    bufferCopy(colorsHash)
  }
}
initApp();