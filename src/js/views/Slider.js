
 export default class Slider {
    constructor() {
}

drag() {
const dialogHandle = document.querySelector('.effect-level__pin');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelDepth = document.querySelector('.effect-level__depth');
const previewImg = document.querySelector('.img-upload__preview img');
const onePx = 46;
const propoption = 10;
const propPhobos = 2;
const propHeat = 153;
let startCoords = {};
let dragged = '';
const maxX = 455;
const minX = 5;

const Effect = {
  none: 'effects__preview--none',
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat',
};

function filterChrome() {
  const grayscale = Math.round(effectLevelValue.value /onePx) /propoption;
  previewImg.style.filter = `grayscale(${grayscale})`;
}
function filterSepia() {
  const sepia = Math.round(effectLevelValue.value / onePx) /propoption;
  previewImg.style.filter = `sepia(${sepia})`;
}

function filterMarvin() {
  const marvin = Math.round(effectLevelValue.value / onePx * propoption);
  previewImg.style.filter = `invert(${marvin}%)`;
}

function filterPhobos() {
  const phobos = Math.round(effectLevelValue.value / onePx / propPhobos);
  previewImg.style.filter = `blur(${phobos}px)`;
}

function filterHeat() {
  let heat;
  if (effectLevelValue.value <= propHeat) {
    heat = 1;
  } else if (effectLevelValue.value > propHeat && effectLevelValue.value <= propHeat * 2) {
    heat = 2;
  } else {
    heat = 3;
  }
  previewImg.style.filter = `brightness(${heat})`;
}
/* применяет нужный фильтр определяя класс */
function howClass() {
  switch (previewImg.className) {
    case Effect.chrome:
       filterChrome();
       break;
    case Effect.sepia:
       filterSepia();
       break;
    case Effect.marvin:
      filterMarvin();
      break;
    case Effect.phobos:
     filterPhobos();
     break;
    case Effect.heat:
     filterHeat();
     break;
    default:
    previewImg.style.filter = '';
  }
}  

/* изменение положения ползунка слайдера */
function moveSlider(move) {
effectLevelValue.value = move;
effectLevelDepth.style.width = `${move}px`;
howClass();
}

/* двигает ползунок */
function onMouseMove(evt) {
const moveEvt = evt;
moveEvt.preventDefault();

const shift = {
  x: startCoords.x - moveEvt.clientX,
  y: startCoords.y - moveEvt.clientY,
};

startCoords = {
  x: moveEvt.clientX,
  y: moveEvt.clientY,
};

if (dialogHandle.offsetLeft - shift.x <= minX) {
  dialogHandle.style.left = `${minX}px`;
} else if (dialogHandle.offsetLeft - shift.x >= maxX) {
  dialogHandle.style.left = `${maxX}px`;
} else {
dialogHandle.style.left = `${dialogHandle.offsetLeft - shift.x}px`;
}

dialogHandle.style.top = '2px';
moveSlider(dialogHandle.offsetLeft - shift.x);
}

function onMouseUp(upEvt) {
upEvt.preventDefault();
if (dragged) {
  const onClickPreventDefault = (evt) => {
    evt.preventDefault();
    dialogHandle.removeEventListener('click', () => onClickPreventDefault());
  };
  dialogHandle.addEventListener('click', () =>  onClickPreventDefault());
}

document.removeEventListener('mousemove', onMouseMove);
document.removeEventListener('mouseup', onMouseUp);
}

function onMouseDown(evt) {
evt.preventDefault(); 

startCoords = {
  x: evt.clientX,
  y: evt.clientY,
};

dragged = false;
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);  
    }
    
    dialogHandle.addEventListener('mousedown', (e) => { onMouseDown(e) });
  }
}  