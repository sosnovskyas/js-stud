'use strict';

import './slider.styl'

export default class Slider {
  constructor({
    elem
  }) {
    this.elem = elem;
    let sliderLine = document.createElement('div');
    let sliderThumb = document.createElement('div');

    sliderLine.classList.add('slider__line');
    sliderThumb.classList.add('slider__thumb');
    sliderLine.appendChild(sliderThumb);
    this.elem.appendChild(sliderLine);

    this.thumb = sliderThumb;
    this.sliderLineCoords = sliderLine.getBoundingClientRect();
    this.sliderThumbCoords = sliderThumb.getBoundingClientRect();

    this.mouseMoveHandler = this.mouseMove.bind(this);

    document.addEventListener('mousedown', event => this.mouseDown(event));
    document.addEventListener('mouseup', event => this.mouseUp(event));
  }

  mouseDown(event) {
    const thumb = event.target.closest('.slider__thumb');

    if (!thumb) return;

    document.addEventListener('mousemove', this.mouseMoveHandler);
    console.log('down');
  }

  mouseUp(event) {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    console.log('up');
  }

  mouseMove(event) {
    if (((event.clientX - this.sliderLineCoords.left) > 0) &&((this.sliderLineCoords.right - this.sliderLineCoords.left) > event.clientX)) {
      this.thumb.style.left = event.clientX - this.sliderLineCoords.left + 'px';
    }
    // console.log(this.thumb);
    console.log('clientX:', event.clientX, 'coord:', this.sliderLineCoords.right);
  }

}