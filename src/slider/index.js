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

    this._slider.elem.addEventListener('mousedown', event => this._mouseDown(event));
    document.addEventListener('mouseup', event => this._mouseUp(event));
    this._slider.input.addEventListener('input', event => this._inputHandler(event));
  }

  _makeSlider(elem) {
    let sliderLine = document.createElement('div');
    let sliderThumb = document.createElement('div');
    let sliderInput = document.createElement('input');


    sliderLine.classList.add('slider__line');
    sliderThumb.classList.add('slider__thumb');
    sliderInput.classList.add('slider__input');
    sliderInput.type = 'text';
    sliderLine.appendChild(sliderThumb);
    sliderThumb.ondragstart = () => false;

    elem.appendChild(sliderLine);
    elem.appendChild(sliderInput);

    return {
      elem: elem,
      thumb: sliderThumb,
      line: sliderLine,
      input: sliderInput,
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
    const thumbCenter = this._slider.thumb.getBoundingClientRect().width / 2;

    // value calculate
    let value = cursorX - sliderLeftGround - thumbCenter;
    //(value * this._slider.point) - (this._slider.min * this._slider.point)
    this.setValue(this._slider.min + (value / this._slider.point));
    // this._setCoords(value);
  }

  _setCoords(value) {
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

  _inputHandler(event) {
    const value = parseInt(event.target.value) ? parseInt(event.target.value) : 'error';

    if (typeof value !== 'number') {
      this._slider.input.style.borderColor = 'red';
      this._slider.input.style.outlineColor = 'red';
      console.warn('error: input value can\'t transform to number type');
    } else if ((value < this._slider.min) || (value > this._slider.max)) {
      this._slider.input.style.borderColor = 'yellow';
      this._slider.input.style.outlineColor = 'yellow';
      console.warn('error: out of range');
    } else {
      this._slider.input.style.borderColor = '';
      this._slider.input.style.outlineColor = '';
      this.setValue(value);
    }
  }

  setValue(value) {
    // check value
    if (typeof value !== 'number') {
      console.warn('set value, error: value not a number');
      return;
    } else if (value < this._slider.min) {
      // left limit
      value = this._slider.min
    } else if (value > this._slider.max) {
      // right limit
      value = this._slider.max;
    }

    value = Math.round(value);
    // set value
    this._slider.value = value;
    this._slider.input.value = value;
    this._setCoords((value * this._slider.point) - (this._slider.min * this._slider.point))
  }

  getValue() {
    return this._slider.value;
  }

  _setPointValue() {
    const lineWidth = this._slider.line.getBoundingClientRect().width;
    const vlueRange = this._slider.max - this._slider.min;
    this._slider.point = lineWidth / vlueRange;
  }

}