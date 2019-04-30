'use strict';

import { planService } from '../services/uPlanService.js';
import { hat } from './planyhatsview.js';
import { uPlanEntity } from '../models/UPlanEntity.js';

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
planView.showCycleFooter = (cycle, cycleFooter, planBody) => {
  let tr;
  tr = document.createElement('tr');
  tr.dataset.fid = cycle.footer.fid;
  tr.className = 'cyclefooter';
  planView.addTd(tr, cycle.footer.shifr, 1, ' cyclefooter');
  planView.addTd(tr, cycle.footer.name, 16, ' cyclefooter');
  planView.addTd(tr, cycleFooter.summaClockTot, 1, ' clocktot');
  planView.addTd(tr, cycleFooter.summaZE, 1, ' center clockze');
  planView.addTd(tr, cycleFooter.summaClockLek > 0 ? cycleFooter.summaClockLek : '', 1, 'center clocklek');
  planView.addTd(tr, cycleFooter.summaClockLab > 0 ? cycleFooter.summaClockLab : '', 1, 'center clocklab');
  planView.addTd(tr, cycleFooter.summaClockPra > 0 ? cycleFooter.summaClockPra : '', 1, 'center clockpra');
  planView.addTd(tr, cycleFooter.summaClockSam > 0 ? cycleFooter.summaClockSam : '', 1, 'center clocksam');
  for (let e = 0; e < uPlanEntity.amntofsemesters; e++) {
    let semClassName = 'sem' + (e + 1);
    if (e < 7) planView.addTd(tr, cycleFooter.summySem[e] > 0 ? cycleFooter.summySem[e] : '', 3, ' center ' + semClassName);
    else {
      planView.addTd(tr, cycleFooter.summySem[e] > 0 ? cycleFooter.summySem[e] : '', 3, ' center ' + semClassName);
    }
  }
  planBody.appendChild(tr);
//  return tr;
};
planView.showPlanFooter = (planFooterLine, planBody) => {
  let tr;
  tr = document.createElement('tr');
  //    tr.dataset.fid=cycle.footer.fid;
  tr.className = 'planfooter';
  planView.addTd(tr, uPlanEntity.footer.shifr, 1, '');
  planView.addTd(tr, uPlanEntity.footer.name, 16, '');
  planView.addTd(tr, planFooterLine.summaClockTot, 1, 'center clocktot');
  planView.addTd(tr, planFooterLine.summaZE, 1, 'center clockze');
  planView.addTd(tr, planFooterLine.summaClockLek > 0 ? planFooterLine.summaClockLek : '', 1, 'center clocklek');
  planView.addTd(tr, planFooterLine.summaClockLab > 0 ? planFooterLine.summaClockLab : '', 1, 'center clocklab');
  planView.addTd(tr, planFooterLine.summaClockPra > 0 ? planFooterLine.summaClockPra : '', 1, 'center clockpra');
  planView.addTd(tr, planFooterLine.summaClockSam > 0 ? planFooterLine.summaClockSam : '', 1, 'center clocksam');
  for (let e = 0; e < uPlanEntity.amntofsemesters; e++) {
    let semClassName = 'sem' + (e + 1);
    planView.addTd(tr, planFooterLine.summySem[e] > 0 ? planFooterLine.summySem[e] : '', 3, 'center ' + semClassName);
  }
  planBody.appendChild(tr);
};

planView.makePlanFooter = (planBody)=>{
  let planFooterLine = {
    summaClockTot: 0,
    summaZE: 0,
    summaClockLek: 0,
    summaClockLab: 0,
    summaClockPra: 0,
    summaClockSam: 0,
    summySem: [0, 0, 0, 0, 0, 0, 0, 0]
  };
  for (let i = 0; i < uPlanEntity.cycly.length; i++) {
    let cycle = uPlanEntity.cycly[i];
    planFooterLine = planService.makeCycleFooter(cycle, planFooterLine);
  }
  planView.showPlanFooter(planFooterLine, planBody);
};


planView.replaceUPlanTotalFooterRowInHTMLTable = () => {
  let planFooterLine = {
    summaClockTot: 0,
    summaZE: 0,
    summaClockLek: 0,
    summaClockLab: 0,
    summaClockPra: 0,
    summaClockSam: 0,
    summySem: [0, 0, 0, 0, 0, 0, 0, 0]
  };
  for (let i = 0; i < uPlanEntity.cycly.length; i++) {
    let cycle = uPlanEntity.cycly[i];
    planFooterLine = planService.makeCycleFooter(cycle, planFooterLine);
  }
  let rootSelector = 'tr.planfooter td';
  $(rootSelector + '.clocktot').text(planFooterLine.summaClockTot);
  $(rootSelector + '.clockze').text(planFooterLine.summaZE);
  $(rootSelector + '.clocklek').text(planFooterLine.summaClockLek);
  $(rootSelector + '.clocklab').text(planFooterLine.summaClockLab);
  $(rootSelector + '.clockpra').text(planFooterLine.summaClockPra);
  $(rootSelector + '.clocksam').text(planFooterLine.summaClockSam);
  for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
    let val = '';
    let j = i + 1;
    let currSelector = rootSelector + '.sem' + j;
    if (planFooterLine.summySem[i] > 0) {
      val = planFooterLine.summySem[i].toString();
    }
    $(currSelector).text(val);
  }
};
planView.replaceUPlanDiscRowInHTMLTable = (discRow) => {
  let rootSelector = 'tr[data-did="' + discRow.did + '"] td';
  let currSelector = rootSelector + '.shifrd';
  $(currSelector).text(discRow.shifr);
  $(rootSelector + '.named').text(discRow.name);
  for (let i = 0; i < 4; i++) {
    let val = '';
    currSelector = rootSelector + '.ekz' + (i + 1);
    if (discRow.ekzpersemestr
              && discRow.ekzpersemestr[i]
              && discRow.ekzpersemestr[i] > 0) {
      val = discRow.ekzpersemestr[i].toString();
    }
    $(currSelector).text(val);
  }
  for (let i = 0; i < 4; i++) {
    let val = '';
    currSelector = rootSelector + '.zach' + (i + 1);
    if (discRow.zachpersemestr
          && discRow.zachpersemestr[i]
          && discRow.zachpersemestr[i] > 0) {
      val = discRow.zachpersemestr[i].toString();
    }
    $(currSelector).text(val);
  }
  $(rootSelector + '.kursp').text(discRow.kursp);
  $(rootSelector + '.kursr').text(discRow.kursr);
  for (let i = 0; i < 4; i++) {
    let val = '';
    currSelector = rootSelector + '.indz' + (i + 1);
    if (discRow.indzpersemestr
        && discRow.indzpersemestr[i]
        && discRow.indzpersemestr[i] > 0) {
      val = discRow.indzpersemestr[i].toString();
    }
    $(currSelector).text(val);
  }
  $(rootSelector + '.clocktot').text(discRow.clocktot);
  $(rootSelector + '.clockze').text(discRow.ze);
  $(rootSelector + '.clocklek').text(discRow.clocklek > 0 ? discRow.clocklek : '');
  $(rootSelector + '.clocklab').text(discRow.clocklab > 0 ? discRow.clocklab : '');
  $(rootSelector + '.clockpra').text(discRow.clockpra > 0 ? discRow.clockpra : '');
  $(rootSelector + '.clocksam').text(discRow.clocksam > 0 ? discRow.clocksam : '');
  for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
    let nameSem = '.sem' + (i + 1) + 'lek';
    $(rootSelector + nameSem).text('');
    nameSem = '.sem' + (i + 1) + 'lab';
    $(rootSelector + nameSem).text('');
    nameSem = '.sem' + (i + 1) + 'pra';
    $(rootSelector + nameSem).text('');
  }
  if (discRow.semestry
      && Array.isArray(discRow.semestry)
      && discRow.semestry.length > 0) {
    for (let i = 0; i < discRow.semestry.length; i++) {
      if (discRow.semestry[i].clocks
        && Array.isArray(discRow.semestry[i].clocks)
        && discRow.semestry[i].clocks.length === 3) {
        let nameSem = '.sem' + discRow.semestry[i].nomsemestra + 'lek';
        $(rootSelector + nameSem).text(discRow.semestry[i].clocks[0]);
        nameSem = '.sem' + discRow.semestry[i].nomsemestra + 'lab';
        $(rootSelector + nameSem).text(discRow.semestry[i].clocks[1]);
        nameSem = '.sem' + discRow.semestry[i].nomsemestra + 'pra';
        $(rootSelector + nameSem).text(discRow.semestry[i].clocks[2]);
      }
    }
  }
};
planView.replaceUPlanCycleFooterRowInHTMLTable = (dcycle) => {
  let need = false;
  let cycleFooterLine = {
    summaClockTot: 0,
    summaZE: 0,
    summaClockLek: 0,
    summaClockLab: 0,
    summaClockPra: 0,
    summaClockSam: 0,
    summySem: [0, 0, 0, 0, 0, 0, 0, 0]
  };
  for (let i = 0; i < uPlanEntity.cycly.length; i++) {
    let cycle = uPlanEntity.cycly[i];
    if (+cycle.cid === +dcycle) {
      need = true;
      cycleFooterLine = planService.makeCycleFooter(cycle, cycleFooterLine);
    }
  }
  if (!need) return;
  let rootSelector = 'tr[data-fid="' + dcycle + '"] td';
  let currSelector;
  $(rootSelector + '.clocktot').text(cycleFooterLine.summaClockTot);
  $(rootSelector + '.clockze').text(cycleFooterLine.summaZE);
  $(rootSelector + '.clocklek').text(cycleFooterLine.summaClockLek);
  $(rootSelector + '.clocklab').text(cycleFooterLine.summaClockLab);
  $(rootSelector + '.clockpra').text(cycleFooterLine.summaClockPra);
  $(rootSelector + '.clocksam').text(cycleFooterLine.summaClockSam);
  for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
    let val = '';
    let j = i + 1;
    currSelector = rootSelector + '.sem' + j;
    if (cycleFooterLine.summySem[i] > 0) {
      val = cycleFooterLine.summySem[i].toString();
    }
    $(currSelector).text(val);
  }
};
planView.makeInformPart = (planBody) => {
  let tr = document.createElement('tr');
  let praktics = [];
  for (let i = 0; i < 5; i++) {
    praktics.push({
      npp: 0, name: '', nomsemestra: 0, nmbofweek: 0, ze: 0
    });
  }
  if (uPlanEntity.praktics
        && Array.isArray(uPlanEntity.praktics)
        && uPlanEntity.praktics.length > 0) {
    for (let i = 0; i < uPlanEntity.praktics.length; i++) {
      if (i < 5) {
        praktics[i].npp = uPlanEntity.praktics[i].npp;
        praktics[i].name = uPlanEntity.praktics[i].name;
        praktics[i].nmbofweek = uPlanEntity.praktics[i].nmbofweek;
        praktics[i].nomsemestra = uPlanEntity.praktics[i].nomsemestra;
        praktics[i].ze = uPlanEntity.praktics[i].ze;
      }
    }
  }
    //    tr.dataset.fid=cycle.footer.fid;
  tr.className = 'planfooter';
  tr.dataset.cid = 101;
  planView.addTd(tr, 'Информационная часть', planService.isBakalavr() ? 51 : 51 - 12, ' center');
  planBody.appendChild(tr);
  tr = document.createElement('tr');
  planView.addTd(tr, 'Практики', 17, ' center');
  planView.addTd(tr, 'Учебные занятия (часов в неделю)', 6, '');
  for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
    planView.addTd(tr, uPlanEntity.clocksperweek[i], 3, ' center');
  }
  planBody.appendChild(tr);
  tr = document.createElement('tr');
  planView.addTd(tr, '№', 1, ' center');
  planView.addTd(tr, 'Название', 2, ' center');
  planView.addTd(tr, 'Семестр', 5, ' center');
  planView.addTd(tr, 'Кол. недель', 5, ' center');
  planView.addTd(tr, 'ЗЕ', 4, ' center');
  planView.addTd(tr, 'Курсовые проекты', 5, '');
  let totalAmntOfKursP = 0;
  let totalAmntOfKursR = 0;
  let totalAmntOfIndZ = 0;
  let totalAmntOfEkz = 0;
  let totalAmntOfZach = 0;
  if (uPlanEntity.nmbofkursp && Array.isArray(uPlanEntity.nmbofkursp)) {
    uPlanEntity.nmbofkursp.forEach((item)=>{ if (+item > 0) totalAmntOfKursP += 1; });
  }
  planView.addTd(tr, totalAmntOfKursP, 1, 'center');
  for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
    planView.addTd(tr, uPlanEntity.nmbofkursp[i] > 0 ? uPlanEntity.nmbofkursp[i] : '-', 3, ' center');
  }
  planBody.appendChild(tr);
  for (let j = 0; j < 5; j++) {
    tr = document.createElement('tr');
    if (praktics[j].npp > 0) {
      planView.addTd(tr, praktics[j].npp, 1, ' center');
      planView.addTd(tr, praktics[j].name, 2, '');
      planView.addTd(tr, praktics[j].nomsemestra, 5, ' center');
      planView.addTd(tr, praktics[j].nmbofweek, 5, ' center');
      planView.addTd(tr, praktics[j].ze, 4, ' center');
    } else {
      planView.addTd(tr, '', 1, ' center');
      planView.addTd(tr, '', 2, ' center');
      planView.addTd(tr, '', 5, ' center');
      planView.addTd(tr, '', 5, ' center');
      planView.addTd(tr, '', 4, ' center');
    }
    switch (j) {
      case 0:
        planView.addTd(tr, 'Курсовые работы', 5, '');
        if (uPlanEntity.nmbofkursr && Array.isArray(uPlanEntity.nmbofkursr)) {
          uPlanEntity.nmbofkursr.forEach((item)=>{ if (+item > 0) totalAmntOfKursR += item; });
        }
        planView.addTd(tr, +totalAmntOfKursR, 1, 'center');
        for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
          planView.addTd(tr, uPlanEntity.nmbofkursr[i] > 0 ? uPlanEntity.nmbofkursr[i] : '-', 3, ' center');
        }
        break;
      case 1:
        planView.addTd(tr, 'Индивидуальные задания', 5, '');
        for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
          totalAmntOfIndZ = totalAmntOfIndZ + uPlanEntity.nmbofindz[i] > 0
            ? uPlanEntity.nmbofindz[i] : 0;
        }
        planView.addTd(tr, +totalAmntOfIndZ, 1, 'center');
        for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
          planView.addTd(tr, uPlanEntity.nmbofindz[i] > 0 ? uPlanEntity.nmbofindz[i] : '-', 3, ' center');
        }
        break;
      case 2:
        planView.addTd(tr, 'Экзамены', 5, '');
        if (uPlanEntity.nmbofekz
          && Array.isArray(uPlanEntity.nmbofekz)) {
          uPlanEntity.nmbofekz.forEach((item)=>{ if (+item > 0) totalAmntOfEkz += item; });
        }
        planView.addTd(tr, +totalAmntOfEkz, 1, 'center');
        for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
          planView.addTd(tr, uPlanEntity.nmbofekz[i] > 0 ? uPlanEntity.nmbofekz[i] : '-', 3, ' center');
        }
        break;
      case 3:
        planView.addTd(tr, 'Зачеты', 5, '');
        if (uPlanEntity.nmbofzach && Array.isArray(uPlanEntity.nmbofzach)) {
          uPlanEntity.nmbofzach.forEach(item=>{ if (+item > 0) totalAmntOfZach += item; });
        }
        planView.addTd(tr, +totalAmntOfZach, 1, 'center');
        for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
          planView.addTd(tr, uPlanEntity.nmbofzach[i] > 0 ? uPlanEntity.nmbofzach[i] : '-', 3, ' center');
        }
        break;
      case 4:
        planView.addTd(tr, 'ЗЕ', 6, '');
        for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
          planView.addTd(tr, uPlanEntity.nmbofze[i] > 0 ? uPlanEntity.nmbofze[i] : '-', 3, ' center');
        }
        break;
      default:
        // statements_def
        break;
    }
    planBody.appendChild(tr);
  }
  tr = document.createElement('tr');
  planView.addTd(tr, 'Количество изучаемых дисциплин', 8, ' right');
  planView.addTd(tr, '50', 9, ' center');
  planView.addTd(tr, 'ЗЕ за учебный год', 6, '');
  for (let i = 0; i < uPlanEntity.amntofsemesters / 2; i++) {
    planView.addTd(tr, uPlanEntity.nmbofze[i * 2] + uPlanEntity.nmbofze[i * 2 + 1] > 0 ? uPlanEntity.nmbofze[i * 2] + uPlanEntity.nmbofze[i * 2 + 1] : '-', 6, ' center');
  }
  planBody.appendChild(tr);
  tr = document.createElement('tr');
  tr.className = 'planfooter';
  tr.dataset.cid = 102;
  planView.addTd(tr, 'ГОСУДАРСТВЕННАЯ АТТЕСТАЦИЯ', planService.isBakalavr() ? 51 : 51 - 12, ' center');
  planBody.appendChild(tr);
  tr = document.createElement('tr');
  planView.addTd(tr, '№', 1, ' center');
  planView.addTd(tr, 'Программа подготовки', 1, ' center');
  planView.addTd(tr, 'Название', planService.isBakalavr() ? 36 : 36 - 12, ' center');
  planView.addTd(tr, 'Семестр', 5, ' center');
  planView.addTd(tr, 'ЗЕ', 4, ' center');
  planBody.appendChild(tr);
  if (uPlanEntity.gosattestaciya
        && Array.isArray(uPlanEntity.gosattestaciya)
        && uPlanEntity.gosattestaciya.length > 0) {
    for (let i = 0; i < uPlanEntity.gosattestaciya.length; i++) {
      tr = document.createElement('tr');
      planView.addTd(tr, uPlanEntity.gosattestaciya[i].npp, 1, ' center');
      planView.addTd(tr, uPlanEntity.gosattestaciya[i].okr, 1, '');
      planView.addTd(tr, uPlanEntity.gosattestaciya[i].name, planService.isBakalavr() ? 36 : 36 - 12, '');
      planView.addTd(tr, uPlanEntity.gosattestaciya[i].nomsemestra, 5, ' center');
      planView.addTd(tr, uPlanEntity.gosattestaciya[i].ze, planService.isBakalavr() ? 36 : 36 - 12, ' center');
      planBody.appendChild(tr);
    }
  }
};
planView.makeDisciplinaLine = (disciplina, planBody) => {
  const classCenterBorderNone = 'center border-none';
  const classCenterBorderLeft = 'center border-left';
  const classCenterBorderRight = 'center border-right';
  let tr = document.createElement('tr');
  let curre = 0;
  let n; let nameClass; let nameClass0; let nameClass1; let
    nameClass2;
  planView.addTd(tr, disciplina.shifr, 1, ' shifrd');
  planView.addTd(tr, disciplina.name, 1, ' named');
  planView.addTd(tr, disciplina.shifrkaf, 1, 'center shifrk');
  tr.dataset.did = disciplina.did;
  tr.dataset.cid = disciplina.dcycle;
  for (let e = 0; e < 4; e++) {
    nameClass = ' ekz' + (e + 1);
    if ((disciplina.ekzpersemestr)
      && (disciplina.ekzpersemestr.length > 0)) {
      n = disciplina.ekzpersemestr[curre];
      curre += 1;
      planView.addTd(tr, n, 1, e === 3 ? classCenterBorderRight + nameClass : classCenterBorderNone + nameClass);
    } else planView.addTd(tr, '  ', 1, e === 3 ? classCenterBorderRight + nameClass : classCenterBorderNone + nameClass);
  }
  curre = 0;
  for (let e = 0; e < 4; e++) {
    nameClass = ' zach' + (e + 1);
    if ((disciplina.zachpersemestr)
      && (disciplina.zachpersemestr.length > 0)) {
      n = disciplina.zachpersemestr[curre];
      curre += 1;
      planView.addTd(tr, n, 1, classCenterBorderNone + nameClass);
    } else planView.addTd(tr, '', 1, classCenterBorderNone + nameClass);
  }
  planView.addTd(tr, disciplina.kursp ? disciplina.kursp : '', 1, 'center kursp');
  planView.addTd(tr, disciplina.kursr ? disciplina.kursr : '', 1, 'center kursr');
  curre = 0;
  for (let e = 0; e < 4; e++) {
    nameClass = ' indz' + (e + 1);
    if ((disciplina.indzpersemestr)
      && (disciplina.indzpersemestr.length > 0)) {
      n = disciplina.indzpersemestr[curre];
      curre += 1;
      planView.addTd(tr, n, 1, classCenterBorderNone + nameClass);
    } else planView.addTd(tr, '', 1, classCenterBorderNone + nameClass);
  }
  planView.addTd(tr, disciplina.clocktot, 1, 'center clocks clocktot');
  planView.addTd(tr, disciplina.ze, 1, 'center clocks clockze');
  planView.addTd(tr, disciplina.clocklek ? disciplina.clocklek : '', 1, 'center clocks clocklek');
  planView.addTd(tr, disciplina.clocklab ? disciplina.clocklab : '', 1, 'center clocks clocklab');
  planView.addTd(tr, disciplina.clockpra ? disciplina.clockpra : '', 1, 'center clocks clockpra');
  planView.addTd(tr, disciplina.clocksam ? disciplina.clocksam : '', 1, 'center clocks clocksam');
  curre = -1;
  let nomsemestra = 0;
  if ((disciplina.semestry)
    && (disciplina.semestry.length > 0)) {
    curre = 0;
    nomsemestra = disciplina.semestry[curre].nomsemestra;
  }
  for (let e = 0; e < uPlanEntity.amntofsemesters; e++) {
    nameClass0 = ' sem' + (e + 1) + 'lek';
    nameClass1 = ' sem' + (e + 1) + 'lab';
    nameClass2 = ' sem' + (e + 1) + 'pra';
    if ((e + 1) === +nomsemestra) {
      planView.addTd(tr, disciplina.semestry[curre].clocks[0] ? disciplina.semestry[curre].clocks[0] : '0', 1, classCenterBorderLeft + nameClass0);
      planView.addTd(tr, disciplina.semestry[curre].clocks[1] ? disciplina.semestry[curre].clocks[1] : '0', 1, classCenterBorderNone + nameClass1);
      planView.addTd(tr, disciplina.semestry[curre].clocks[2] ? disciplina.semestry[curre].clocks[2] : '0', 1, classCenterBorderNone + nameClass2);
      curre += 1;
      if (curre < disciplina.semestry.length) {
        nomsemestra = disciplina.semestry[curre].nomsemestra;
      }
      continue;
    }
    planView.addTd(tr, '', 1, classCenterBorderLeft + nameClass0);
    planView.addTd(tr, '', 1, classCenterBorderNone + nameClass1);
    planView.addTd(tr, '', 1, classCenterBorderNone + nameClass2);
  }
  planBody.appendChild(tr);
};

planView.makeUPlanLines = (pPlanBody) => {
  let planBody = pPlanBody;
  planBody.innerHTML = '';
  let tr; let cycle; let part; let disciplina;
  for (let i = 0; i < uPlanEntity.cycly.length; i++) {
    tr = document.createElement('tr');
    tr.dataset.cid = uPlanEntity.cycly[i].cid;
    planView.addTd(tr, uPlanEntity.cycly[i].shifr, 1, 'cycleheader');
    planView.addTd(tr, uPlanEntity.cycly[i].name, planService.isBakalavr() ? 50 : 50 - 12, 'cycleheader');
    planBody.appendChild(tr);
    if (uPlanEntity.cycly[i].basepart) {
      cycle = uPlanEntity.cycly[i].basepart;
      tr = document.createElement('tr');
      planView.addTd(tr, cycle.shifr, 1, 'cycleheader');
      planView.addTd(tr, cycle.name, planService.isBakalavr() ? 50 : 50 - 12, 'cycleheader');
      planBody.appendChild(tr);
      for (let j = 0; j < cycle.disciplines.length; j++) {
        disciplina = cycle.disciplines[j];
        planView.makeDisciplinaLine(disciplina, planBody);
      }
    }
    if (uPlanEntity.cycly[i].varpart) {
      cycle = uPlanEntity.cycly[i].varpart;
      tr = document.createElement('tr');
      planView.addTd(tr, cycle.shifr, 1, 'cycleheader');
      planView.addTd(tr, cycle.name, planService.isBakalavr() ? 50 : 50 - 12, 'cycleheader');
      planBody.appendChild(tr);
      part = cycle.parts.vyz;
      tr = document.createElement('tr');
      planView.addTd(tr, part.shifr, 1, 'cycleheader');
      planView.addTd(tr, part.name, planService.isBakalavr() ? 50 : 50 - 12, 'cycleheader');
      planBody.appendChild(tr);
      for (let j = 0; j < part.disciplines.length; j++) {
        disciplina = part.disciplines[j];
        planView.makeDisciplinaLine(disciplina, planBody);
      }
      part = cycle.parts.student;
      tr = document.createElement('tr');
      planView.addTd(tr, part.shifr, 1, 'cycleheader');
      planView.addTd(tr, part.name, planService.isBakalavr() ? 50 : 50 - 12, 'cycleheader');
      planBody.appendChild(tr);
      for (let j = 0; j < part.disciplines.length; j++) {
        disciplina = part.disciplines[j];
        planView.makeDisciplinaLine(disciplina, planBody);
      }
    }
    if (uPlanEntity.cycly[i].disciplines && uPlanEntity.cycly[i].disciplines.length > 0) {
      for (let j = 0; j < uPlanEntity.cycly[i].disciplines.length; j++) {
        disciplina = uPlanEntity.cycly[i].disciplines[j];
        planView.makeDisciplinaLine(disciplina, planBody);
      }
    }
    if (uPlanEntity.cycly[i].footer) {
      cycle = uPlanEntity.cycly[i];
      let cycleFooter = {
        summaClockTot: 0,
        summaZE: 0,
        summaClockLek: 0,
        summaClockLab: 0,
        summaClockPra: 0,
        summaClockSam: 0,
        summySem: [0, 0, 0, 0, 0, 0, 0, 0]
      };
      cycleFooter = planService.makeCycleFooter(cycle, cycleFooter);
      planView.showCycleFooter(cycle, cycleFooter, planBody);
    }
  }
};

planView.fillDiscRecFromForm = ( dRow ) => {
  let discRow = Object.create(null);
  discRow = { ...dRow };
  discRow.shifr = $('#ishifr').val();
  discRow.name = $('#iname').val();
  discRow.kursp = $('#ikursp').val();
  discRow.kursr = $('#ikursr').val();
  discRow.clocktot = Number($('#iclocktot').val());
  discRow.clocklek = Number($('#iclocklek').val());
  discRow.clocklab = Number($('#iclocklab').val());
  discRow.clockpra = Number($('#iclockpra').val());
  discRow.clocksam = Number($('#iclocksam').val());
  discRow.semestry = [];
  for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
    let n = '#isem' + (i + 1);
    let s = $(n).val();
    if (s && s.trim().length === 5) {
      let s0 = parseInt(s.charAt(0), 10);
      let s1 = parseInt(s.charAt(2), 10);
      let s2 = parseInt(s.charAt(4), 10);
      let semestr = Object.create(null);
      semestr.nomsemestra = i + 1;
      semestr.clocks = [0, 0, 0];
      semestr.clocks[0] = s0;
      semestr.clocks[1] = s1;
      semestr.clocks[2] = s2;
      discRow.semestry.push(semestr);
    }
  }
  return discRow;
};
