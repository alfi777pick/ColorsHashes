// 1) Главная функция.
// 2)Функция которая генерирует рандомный цвет.
//3) Ф-ция которая найдет колонки и каждой колонке присвоит фоновый цвет и название цвета (hex цывета)
// 3)Функция которая выводит хэш в кнопку.
// 4)Функция которая сохраняет хэш в буффер обмена.
// 5)функция которая меняет иконку замочка.
// 6)функция которая ловит цвет и сохраняет его при повторном вызове главной функции.
// 7) функция которая выводит в адрессную строку хэш номера  при полном комплекте сорхранненых цветов.
// 8)функция которая загружает цвета из url
let isLocationHash = window.location.hash.length > 1;
let colors = [];
function initApp() {
  // Если isLocationHash то вызвать ф-цию которая проходит по всем колонкам и меняет иконки
  hasLocationHash();
  if (isLocationHash) {
    closeIcon();
  }
  setColors();
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
} 

function closeIcon() {
  let columns = document.querySelectorAll(".colors__item"); // это не массив но можно вызватиь метод массива поскольку это коллекция!
  columns.forEach((col, i) => {
    let buttonLock = col.querySelector(".colors__catch");
    buttonLock.innerHTML = '<img class="lock" src="/lock.svg" alt="lock icon" width="40" height="40">';
  })
}

function setColors() {
  // TODO: Первоначальное условие на стр. 22 верное. 
  let columns = document.querySelectorAll(".colors__item");
  

  columns.forEach((col, i) => {
    let colorsHash = col.querySelector(".colors__hash");
    let locked = col.querySelector(".lock");
    let randomCol = isLocationHash ? colors[i] : randomColor();
    // console.log(randomCol);
    // TODO 1: Добавить проверку, когда есть hash всех цветов в url,
    // то кнопки с замками должны быть в статусе Заблокировано
    // нужно вызывать ф-цию которая меняет иконки

    // TODO 2: Добавить проверку, когда есть hash всех цветов в url
    // и разблокировали хотя бы одну колонку
    // тогда в randomCol нужно записать новый рандомный цвет
    // он запишится в массив цветов и применится для колонки

    // TODO 3: Исправить запись цвета в массив
    // Когда нажимаем пробел генерируются новые рандомные цвета для каждой колонки. 
    // Сейчас если колонка заблокирована, мы в массив записываем новый цвет. 
    // Но по коду срабатывает return и код ниже (строка 37, 38) не выполняется. 
    // Там лежит тот самый старый цвет колонки который мы заблокировали. 
    // Вот его и нужно записывать в массив цветов

    if (isLocationHash && Boolean(!locked)) {        //разобрать эту проверку которую добавил Никита для возмоности редактирования цветов пользоывателем кому отправленна ссылка!!
      console.log('not isLocked');
      randomCol = randomColor()
      colors[i] = randomCol;
    }
    
    if (!isLocationHash && Boolean(locked)) {   //добавили условие для корректной работы
      colors[i] = colorsHash.textContent; // оставляем старый (текущий цвет)
      return;
    }
    col.style.background = randomCol;
    colorsHash.textContent = randomCol;
  })
  console.log('colors', colors);
  setState();
}

function getState() {
  let state = window.location.hash;
  return state.substring(1).split('-').map((i) => '#' + i);
}

function setState() { 
  // TODO: Делаем проверку по двум условиям
  // Если кликнуть на колонку №5 Массив colors будет [, , , , '#112233']
  // 1. Нужно создать новый массив, очистив все пустые ячейки из массива colors. 
  // Текущий метод every не работает. Он проходит циклом только по тем элементам, которые существуют
  // Если существует один эл. #112233, колбек вызовется 1 раз. Условие выполнится и он вернет true
  // 2. Длинна нового массива должна быть равна === кол-ву колонок. Если да, то значит цвета по всем колонкам были заполнены
  const copyColors = colors.filter((color) => color)  //["#112233"]
  if (copyColors.length === 5) {
    console.log('setState'); 
    window.location.hash = colors.map((el) => String(el.substring(1))).join('-');
  };
}
function hasLocationHash() {
  if (isLocationHash) {
    colors = getState();
  }
}; 


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


function copyDeclar(colorHashBtn) {
  if (colorHashBtn.childNodes.length > 1) { 
    return;
  } 
  let div = document.createElement('div');
  div.className = "div"; 
  div.textContent = "Скопированно";
  div.style.background = "white";
  
  
  colorHashBtn.append(div); 
  setTimeout(() => div.remove(), 1500);
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
  if (evt.target.classList.contains('colors__hash')) {
    let colorsHash = evt.target;
    bufferCopy(colorsHash);
  } 

  if (evt.target.classList.contains('colors__catch') || evt.target.closest('.colors__catch')) {
    let button = evt.target.closest('.colors__catch');
    button.blur();
    changeIcon(button);
  }
}

function changeIcon(button) {
  let icon = ``;
  if (button.firstElementChild.classList.contains('unlock')) {
    icon = `<img class="lock" src="/lock.svg" alt="lock icon" width="40" height="40">`;
  } else if (button.firstElementChild.classList.contains('lock')) {
    icon = `<img class="unlock" src="/unlock.svg" alt="unlock icon" width="40" height="40">`;
  }
  button.innerHTML = icon;
}

function handleKeydown(evt) {
  if (evt.code === 'Space') {
    setColors(); 
  }
}




initApp();
