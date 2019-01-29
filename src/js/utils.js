// возвращает число в диапазоне мин - макс
export const getRandomNum = (max, min) => Math.round(Math.random() * (max - min) + min);

// возвращает случайный елемент массива
export const getRandomElem = arr => arr[Math.floor(Math.random() * arr.length)];
