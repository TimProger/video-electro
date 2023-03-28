import React from "react";

export function createRipple(s: any, event: React.MouseEvent<HTMLElement>) {
  const button = event.currentTarget;

  const circle = document.createElement('span');
  circle.classList.add(s.ripple);

  const rect = button.getBoundingClientRect();
  let size = Math.max(rect.width, rect.height);
  let offsetX = event.clientX - rect.left;
  let offsetY = event.clientY - rect.top;

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.left = `${offsetX - size/2}px`;
  circle.style.top = `${offsetY - size/2}px`;

  const ripple = button.getElementsByClassName(s.ripple)[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}