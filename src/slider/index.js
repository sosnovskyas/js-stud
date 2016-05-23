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

    this.mouseMoveHandler = this.mouseMove.bind(this);

    this.elem.addEventListener('mousedown', event => this.mouseDown(event));
    document.addEventListener('mouseup', event => this.mouseUp(event));
  }

  mouseDown(event) {
    let target = event.target;
    let thumb = target.closest('.slider__thumb');

    if (!thumb) return;

    window.addEventListener('mousemove', this.mouseMoveHandler);
    console.log('down');
  }

  mouseUp(event) {
    window.removeEventListener('mousemove', this.mouseMoveHandler);
    console.log('up');
  }

  mouseMove(event) {
    //this.thumb.style.left = event.layerX + 'px';
    console.log(this.thumb);
    console.log(event.layerX, this.thumb);
  }

}