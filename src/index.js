'use strict';

import Slider from './slider'
let root = document.createElement('div');
document.body.appendChild(root);

const slider = new Slider({
  elem: root,
  min: 10,
  max: 150,
  current:20
});
