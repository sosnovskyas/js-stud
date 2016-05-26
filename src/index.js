'use strict';

import Slider from './slider'
let root = document.createElement('div');
document.body.appendChild(root);

const slider = new Slider({
  elem: root,
  min: 10,
  max: 150,
  current: 20
});

let min = document.createElement('button');
min.value = 'min';
min.textContent = 'min';
min.onclick = ()=> {
  slider.setValue(10);
  console.log('set min')
};
document.body.appendChild(min);

let max = document.createElement('button');
max.value = 'max';
max.textContent = 'max';

max.onclick = ()=> {
  slider.setValue(250);
  console.log('set max')
};
document.body.appendChild(max);
