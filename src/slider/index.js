'use strict';

import './slider.styl'

export default class Slider {
  constructor({
    elem,
    min = 100,
    max = 200,
    current = min
  }) {

    // make slider
    this._slider = this._makeSlider(elem);

    // set slider
    this._slider.min = min;
    this._slider.max = max;
    this._setPointValue();
    this.setValue(current);

    console.log(this._slider);

    document.addEventListener('mousedown', event => this._mouseDown(event));
    document.addEventListener('mouseup', event => this._mouseUp(event));
  }

  _makeSlider(elem) {
    let sliderLine = document.createElement('div');
    let sliderThumb = document.createElement('div');

    sliderLine.classList.add('slider__line');
    sliderThumb.classList.add('slider__thumb');
    sliderLine.appendChild(sliderThumb);

    sliderThumb.ondragstart = () => false;

    elem.appendChild(sliderLine);

    return {
      elem: elem,
      thumb: sliderThumb,
      line: sliderLine,
      moveHandler: this._mouseMove.bind(this)
    }
  }

  _mouseDown(event) {
    console.log('down');

    const thumb = event.target.closest('.slider__thumb');

    if (!thumb) return;

    document.addEventListener('mousemove', this._slider.moveHandler);
  }

  _mouseUp(event) {
    console.log('up');

    document.removeEventListener('mousemove', this._slider.moveHandler);
  }

  _mouseMove(event) {
    const cursorX = event.clientX;
    const sliderLeftGround = this._slider.line.getBoundingClientRect().left;
    const thumbCenter  = this._slider.thumb.getBoundingClientRect().width / 2;

    // value calculate
    let value = cursorX - sliderLeftGround - thumbCenter;

    this._setCoords(value);
  }

  _setCoords(value){
    // limits calculate
    const max = this._slider.line.getBoundingClientRect().width - this._slider.thumb.getBoundingClientRect().width;
    const min = 0;

    // move limits
    if (value < min) {
      // left limit
      value = min
    } else if (value > max) {
      // right limit
      value = max;
    }

    this._slider.thumb.style.left = value + 'px';
  }

  setValue(value){
    // check value
    if (value < this._min) {
      // left limit
      value = this._min
    } else if (value > this._max) {
      // right limit
      value = this._max;
    }

    // set value
    this._slider.value = value;

    this._setCoords((value * this._slider.point) - (this._slider.min * this._slider.point))
  }

  getValue(){
    return this._slider.value;
  }

  _setPointValue(){
    const lineWidth = this._slider.line.getBoundingClientRect().width;
    const vlueRange = this._slider.max - this._slider.min;
    this._slider.point = lineWidth / vlueRange;
  }

}