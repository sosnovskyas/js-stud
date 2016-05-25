'use strict';

import './slider.styl'

export default class Slider {
  constructor({
    elem
  }) {
    this.slider = this.makeSlider(elem);

    this.slider.lineCoords = this.slider.line.getBoundingClientRect();

    // this.sliderLineCoords = sliderLine.getBoundingClientRect();
    // this.sliderThumbCoords = sliderThumb.getBoundingClientRect();

    // events
    this.slider.thumb.ondragstart = () => false;
    this.mouseMoveHandler = this.mouseMove.bind(this);
    document.addEventListener('mousedown', event => this.mouseDown(event));
    document.addEventListener('mouseup', event => this.mouseUp(event));
  }

  makeSlider(elem){
    let sliderLine = document.createElement('div');
    let sliderThumb = document.createElement('div');

    sliderLine.classList.add('slider__line');
    sliderThumb.classList.add('slider__thumb');
    sliderLine.appendChild(sliderThumb);

    elem.appendChild(sliderLine);

    return {
      elem: elem,
      thumb: sliderThumb,
      line: sliderLine,
      moveHandler: this.mouseMove.bind(this)
    }
  }

  mouseDown(event) {
    console.log('down');

    const thumb = event.target.closest('.slider__thumb');

    if (!thumb) return;

    // document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mousemove', this.slider.moveHandler);
  }

  mouseUp(event) {
    console.log('up');
    // document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mousemove', this.slider.moveHandler);
  }

  mouseMove(event) {
    console.log('mouseMove');
    /*
    if (((event.clientX - this.sliderLineCoords.left) > 0) &&((this.sliderLineCoords.right - this.sliderLineCoords.left) > event.clientX)) {
      this.thumb.style.left = event.clientX - this.sliderLineCoords.left + 'px';
    }
    */
  }

}