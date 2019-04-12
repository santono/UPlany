'use strict';

import { planService } from '../services/uPlanService.js';
import { hat } from './planyhatsview.js';

export let planView = () => {};
planView.makeUPlanHat = () => {
  let planHat;
  if (planService.isMagistr()) planHat = hat(2);
  else planHat = hat(1);
  $('#idplanhat').empty();
  let el = document.querySelector('#idplanhat');
  el.innerHTML = planHat;
};

planView.addTd = function (tr, text, colspan, clazz) {
  let td = document.createElement('td');
  if (text || text === '0') td.innerText = text;
  else td.innerText = ' ';
  if (arguments.length === 4) {
    if (colspan > 1) td.setAttribute('colspan', colspan);
    if (clazz && clazz.length > 3) td.className = clazz;
  }
  tr.appendChild(td);
};
