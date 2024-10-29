export function isScrollAtBottom() {
  let windowHeight = window.innerHeight; // Высота окна браузера
  let documentHeight = document.documentElement.scrollHeight; // Высота всего документа
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Позиция прокрутки

  return scrollTop + windowHeight >= documentHeight - 800;
}