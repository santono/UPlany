'use strict';

import { hat } from './views/planyhatsview.js';
import { loader } from './views/loaderView.js';
import { ajaxConfig } from './config/ajaxconfiguration.js';
import { menugetplan } from './views/menugetplanview.js';
import { uPlanEntity } from './models/UPlanEntity.js';
let semclocks = [{ id: 1, name: '0 0 1', clocks: [0, 0, 1] },
  { id: 2, name: '0 0 2', clocks: [0, 0, 2] },
  { id: 3, name: '0 0 3', clocks: [0, 0, 3] },
  { id: 4, name: '1 0 1', clocks: [1, 0, 1] },
  { id: 5, name: '1 1 0', clocks: [1, 1, 0] },
  { id: 6, name: '1 0 1', clocks: [1, 2, 0] },
  { id: 7, name: '2 0 1', clocks: [2, 0, 1] },
  { id: 8, name: '2 0 2', clocks: [2, 0, 2] },
  { id: 9, name: '2 0 3', clocks: [2, 0, 3] },
  { id: 10, name: '2 3 0', clocks: [2, 3, 0] }
];
var up;
var user;

class User {
  constructor(name, rights, shifrKaf) {
    this.name = name;
    this.rights = rights;
    this.shifrKaf = shifrKaf;
  }

  getName() {
    return this.name;
  }

  getRights() {
    return this.rights;
  }

  getShifrKaf() {
    return this.shifrKaf;
  }
}
class Up {
  constructor(uplanouter, bodyfinded) {
    this.disciplina = null;
    this.cycle = null;
    this.part = null;
    this.discRow = null;
    this.savedDiscRow = null;
    this.uplan = uplanouter;
    this.body = bodyfinded;
  }

  saveDiscRow() {
    if (this.discRow) this.savedDiscRow = JSON.parse(JSON.stringify(this.discRow));
  }

  fillDiscRow(did) {
    let discipline;
    let i;
    let cycle;
    if (!this.uplan.cycly) return;
    if (!Array.isArray(this.uplan.cycly)) return;
    if (this.uplan.cycly.length < 1) return;
    for (i = 0; i < this.uplan.cycly.length; i++) {
      cycle = this.uplan.cycly[i];
      if (cycle.basepart) {
        if (cycle.basepart.disciplines
                    && Array.isArray(cycle.basepart.disciplines)
                    && cycle.basepart.disciplines.length > 0) {
          discipline = cycle.basepart.disciplines.find(disc=>+disc.did === +did);
          if (discipline) {
            this.discRow = discipline;
            return;
          }
        }
      }
      if (cycle.varpart) {
        if (cycle.varpart.parts) {
          if (cycle.varpart.parts.vyz) {
            if (cycle.varpart.parts.vyz.disciplines) {
              if (Array.isArray(cycle.varpart.parts.vyz.disciplines)) {
                if (cycle.varpart.parts.vyz.disciplines.length > 0) {
                  discipline = cycle.varpart.parts.vyz.disciplines.find(disc=>+disc.did === +did);
                  if (discipline) {
                    this.discRow = discipline;
                    return;
                  }
                }
              }
            }
          }
        }
      }
      if (cycle.varpart) {
        if (cycle.varpart.parts) {
          if (cycle.varpart.parts.student) {
            if (cycle.varpart.parts.student.disciplines) {
              if (Array.isArray(cycle.varpart.parts.student.disciplines)) {
                if (cycle.varpart.parts.student.disciplines.length > 0) {
                  discipline = cycle.varpart.parts.student.disciplines
                    .find(disc=>+disc.did === +did);
                  if (discipline) {
                    this.discRow = discipline;
                    return;
                  }
                }
              }
            }
          }
        }
      }
      if (cycle.disciplines) {
        if (Array.isArray(cycle.disciplines) && cycle.disciplines.length > 0) {
          discipline = cycle.disciplines.find(disc=>+disc.did === +did);
          if (discipline) {
            this.discRow = discipline;
            return;
          }
        }
      }
    }
    this.discRow = discipline;
  }

  calculateClocksUsingSemestry() {
    let clockLek = 0;
    let clockLab = 0;
    let clockPra = 0;
    let clockSam = 0;
    let self = this;
    if (this.discRow.semestry
            && Array.isArray(this.discRow.semestry)) {
      clockLek = this.discRow.semestry.reduce((clockSum, current) => {
        let clockTmp; let nomSemestra; let weeks; let sumTmp;
        clockTmp = current.clocks
                              && Array.isArray(current.clocks)
                              && current.clocks.length === 3 ? current.clocks[0] : 0;
        nomSemestra = current.nomsemestra;
        weeks = (nomSemestra && nomSemestra > 0 && nomSemestra < 9)
          ? self.uplan.weekpersemestr[nomSemestra - 1] : 0;
        sumTmp = clockTmp * weeks;
        return clockSum + sumTmp;
      }, 0);
      clockLab = this.discRow.semestry.reduce((clockSum, current) => {
        let clockTmp; let nomSemestra; let weeks; let sumTmp;
        clockTmp = current.clocks
                              && Array.isArray(current.clocks)
                              && current.clocks.length === 3 ? current.clocks[1] : 0;
        nomSemestra = current.nomsemestra;
        weeks = nomSemestra && nomSemestra > 0 && nomSemestra < 9
          ? self.uplan.weekpersemestr[nomSemestra - 1] : 0;
        sumTmp = clockTmp * weeks;
        return clockSum + sumTmp;
      }, 0);
      clockPra = this.discRow.semestry.reduce((clockSum, current) => {
        let clockTmp; let nomSemestra; let weeks; let sumTmp;
        clockTmp = current.clocks
                              && Array.isArray(current.clocks)
                              && current.clocks.length === 3 ? current.clocks[2] : 0;
        nomSemestra = current.nomsemestra;
        weeks = nomSemestra && nomSemestra > 0 && nomSemestra < 9
          ? self.uplan.weekpersemestr[nomSemestra - 1] : 0;
        sumTmp = clockTmp * weeks;
        return clockSum + sumTmp;
      }, 0);
      clockSam = this.discRow - clockLek - clockLab - clockSam;
      this.discRow.clocklek = clockLek;
      this.discRow.clocklab = clockLab;
      this.discRow.clockpra = clockPra;
      this.discRow.clocksam = clockSam;
    }
  }

  fillUpdateDiscFormEkzZachIndz() {
    // Заполнить поля списков экзаменов, зачетов и индивидуальных заданий
    //  на форме
    let s; let
      i;
    $('#iekz').val('');
    if (this.discRow.ekzpersemestr) {
      if (Array.isArray(this.discRow.ekzpersemestr)) {
        if (this.discRow.ekzpersemestr.length > 0) {
          s = '';
          for (i = 0; i < this.discRow.ekzpersemestr.length; i++) {
            if (i > 0) {
              s += ',';
            }
            s += this.discRow.ekzpersemestr[i];
          }
          $('#iekz').val(s);
        }
      }
    }
    $('#izach').val('');
    if (this.discRow.zachpersemestr) {
      if (Array.isArray(this.discRow.zachpersemestr)) {
        if (this.discRow.zachpersemestr.length > 0) {
          s = '';
          for (i = 0; i < this.discRow.zachpersemestr.length; i++) {
            if (i > 0) {
              s += ',';
            }
            s += this.discRow.zachpersemestr[i];
          }
          $('#izach').val(s);
        }
      }
    }
    $('#iindz').val('');
    if (this.discRow.indzpersemestr) {
      if (Array.isArray(this.discRow.indzpersemestr)) {
        if (this.discRow.indzpersemestr.length > 0) {
          s = '';
          for (i = 0; i < this.discRow.indzpersemestr.length; i++) {
            if (i > 0) {
              s += ',';
            }
            s += this.discRow.indzpersemestr[i];
          }
          $('#iindz').val(s);
        }
      }
    }
  }

  fillUpdateParPlanForm() {
    $('#iokr').val(this.uplan.okr);
    $('#iyear').val(this.uplan.yearpost);
    $('#ikaf').val(this.uplan.kafedra);
    $('#iugnp').val(this.uplan.UGNP.shifr);
    $('#iugnpname').val(this.uplan.UGNP.name);
    $('#inapr').val(this.uplan.napr.shifr);
    $('#inaprname').val(this.uplan.napr.name);
    $('#iprofil').val(this.uplan.profil.shifr);
    $('#iprofilname').val(this.uplan.profil.name);
    $('#iformaob').val(this.uplan.formaob);
    $('#isrokob').val(parseInt(this.uplan.srokob, 10));
    $('#iamntofsemesters').val(this.uplan.amntofsemesters);
    $('#iweekpersemestr').val(this.uplan.weekpersemestr.join(','));
  }

  fillUpdateDiscForm() {
    let i; let j;
    let s; let s0; let s1; let s2; let n;
    $('#ishifr').val(this.discRow.shifr);
    $('#iname').val(this.discRow.name);

    this.fillUpdateDiscFormEkzZachIndz();
    $('#ikursp').val(this.discRow.kursp);
    $('#ikursr').val(this.discRow.kursr);
    $('#iclocktot').val(this.discRow.clocktot);
    $('#iclocklek').val(this.discRow.clocklek);
    $('#iclocklab').val(this.discRow.clocklab);
    $('#iclockpra').val(this.discRow.clockpra);
    $('#iclocksam').val(this.discRow.clocksam);
    j = 0;
    for (i = 0; i < this.uplan.amntofsemesters; i++) {
      n = '#isem' + (i + 1);
      s = '';
      if (this.discRow.semestry
                && Array.isArray(this.discRow.semestry)
                && (this.discRow.semestry.length > j)
                && (+this.discRow.semestry[j].nomsemestra === +(i + 1))) {
        s0 = this.discRow.semestry[j].clocks[0] > 0 ? this.discRow.semestry[j].clocks[0].toString() : '0';
        s1 = this.discRow.semestry[j].clocks[1] > 0 ? this.discRow.semestry[j].clocks[1].toString() : '0';
        s2 = this.discRow.semestry[j].clocks[2] > 0 ? this.discRow.semestry[j].clocks[2].toString() : '0';
        s = s0 + ' ' + s1 + ' ' + s2;
        j += 1;
      }
      $(n).val(s);
    }
  }

  fillUpdateEkzForm(mode) {
    let i; let
      j;
    let s; let
      arr;
    j = 0;
    for (i = 0; i < this.uplan.amntofsemesters; i++) {
      s = '#iekz' + (i + 1);
      $(s).prop('checked', false);
    }
    if (mode === 'zach') {
      $('#modeekz').val(mode);
      $('#hatekz').text('Распределение зачетов по семестрам');
      arr = this.discRow.zachpersemestr;
    } else
    if (mode === 'indz') {
      $('#modeekz').val(mode);
      $('#hatekz').text('Распределение индивидуальных заданий по семестрам');
      arr = this.discRow.indzpersemestr;
    } else {
      $('#modeekz').val('ekz');
      $('#hatekz').text('Распределение экзаменов по семестрам');
      arr = this.discRow.ekzpersemestr;
    }
    if (arr
            && Array.isArray(arr)
            && arr.length > 0) {
      for (i = 0; i < arr.length; i++) {
        j = arr[i];
        s = '#iekz' + j;
        //              $(s).attr('checked','checked');
        $(s).prop('checked', true);
      }
    }
  }

  fillDiscRecFromForm() {
    this.discRow.shifr = $('#ishifr').val();
    this.discRow.name = $('#iname').val();
    this.discRow.kursp = $('#ikursp').val();
    this.discRow.kursr = $('#ikursr').val();
    this.discRow.clocktot = Number($('#iclocktot').val());
    this.discRow.clocklek = Number($('#iclocklek').val());
    this.discRow.clocklab = Number($('#iclocklab').val());
    this.discRow.clockpra = Number($('#iclockpra').val());
    this.discRow.clocksam = Number($('#iclocksam').val());
    this.discRow.semestry = [];
    for (let i = 0; i < this.uplan.amntofsemesters; i++) {
      let n = '#isem' + (i + 1);
      let s = $(n).val();
      if (s && s.trim().length === 5) {
        let s0 = parseInt(s.charAt(0), 10);
        let s1 = parseInt(s.charAt(2), 10);
        let s2 = parseInt(s.charAt(4), 10);
        let semestr = {
          nomsemestra: i + 1,
          clocks: [0, 0, 0]
        };
        semestr.nomsemestra = i + 1;
        semestr.clocks[0] = s0;
        semestr.clocks[1] = s1;
        semestr.clocks[2] = s2;
        this.discRow.semestry.push(semestr);
      }
    }
  }

  fillDiscRecFromFormEkz() {
    let i; let j; let
      n;
    let s; let arr; let
      mode;
    mode = $('#modeekz').val();

    arr = [];
    j = 0;
    for (i = 0; i < this.uplan.amntofsemesters; i++) {
      s = '#iekz' + (i + 1);
      n = $(s).prop('checked');
      if (n) {
        j = i + 1;
        if (arr.length < 4) arr.push(j);
      }
    }
    if (mode === 'zach') {
      this.discRow.zachpersemestr = JSON.parse(JSON.stringify(arr));
    } else
    if (mode === 'indz') {
      this.discRow.indzpersemestr = JSON.parse(JSON.stringify(arr));
    } else this.discRow.ekzpersemestr = JSON.parse(JSON.stringify(arr));
  }

  validateEkzListOnFormEkz() {
    let i; let j; let
      n;
    let s;
    j = 0;
    for (i = 0; i < this.uplan.amntofsemesters; i++) {
      s = '#iekz' + (i + 1);
      n = $(s).prop('checked');
      if (n) j += 1;
    }
    //        alert('j='+j);
    if (j > 4) {
      return false;
    }
    return true;
  }

  cmpDiscs() {
    let disc1 = this.savedDiscRow;
    let disc2 = this.discRow;
    let cmpClock = (clock1, clock2)=> {
      if (!clock1 && clock2 && clock2 !== 0) return false;
      if (!clock2 && clock1 && clock1 !== 0) return false;
      if (clock1
                && clock2
                && clock1 !== clock2) return false;
      return true;
    };
    let cmpIntArr = (arr1, arr2)=> {
      if (!arr1 && !arr2) return true;
      if (!(Array.isArray(arr1)
                    && Array.isArray(arr2)
                    && arr1.length === arr2.length)) return false;
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
      }
      return true;
    };
    if (!cmpClock(disc1.did, disc2.did)) return false;
    if (!disc1.shifr || !disc2.shifr) return false;
    if (disc1.shifr !== disc2.shifr) return false;
    if (!disc1.name || !disc2.name) return false;
    if (disc1.name !== disc2.name) return false;
    if (!cmpIntArr(disc1.ekzpersemestr, disc2.ekzpersemestr)) return false;

    if (!cmpIntArr(disc1.zachpersemestr, disc2.zachpersemestr)) return false;
    if (!cmpClock(disc1.kursp, disc2.kursp)) return false;
    if (!cmpClock(disc1.kursr, disc2.kursr)) return false;


    if (!cmpIntArr(disc1.indzpersemestr, disc2.indzpersemestr)) return false;

    if (!cmpClock(disc1.clocktot, disc2.clocktot)) return false;
    if (!cmpClock(disc1.ze, disc2.ze)) return false;
    if (!cmpClock(disc1.clocklek, disc2.clocklek)) return false;
    if (!cmpClock(disc1.clocklab, disc2.clocklab)) return false;
    if (!cmpClock(disc1.clockpra, disc2.clockpra)) return false;
    if (!cmpClock(disc1.clocksam, disc2.clocksam)) return false;
    if (!disc1.semestry && !disc2.semestry) return true;
    if (!(Array.isArray(disc1.semestry)
                && Array.isArray(disc2.semestry)
                && disc1.semestry.length === disc2.semestry.length)) return false;
    for (let i = 0; i < disc1.semestry.length; i++) {
      if (JSON.stringify(disc1.semestry[i])
                !== JSON.stringify(disc2.semestry[i])
      ) return false;
    }
    return true;
  }

  makeUPlanMarking() {
    if (!this.uplan.cycly) return;
    if (this.uplan.cycly.length < 1) return;
    for (let i = 0; i < this.uplan.cycly.length; i++) {
      const cycle = this.uplan.cycly[i];
      cycle.cid = i + 1;
      if (cycle.basepart) {
        if (cycle.basepart.disciplines
                    && Array.isArray(cycle.basepart.disciplines)
                    && cycle.basepart.disciplines.length > 0) {
          const disciplines = cycle.basepart.disciplines;
          for (let j = 0; j < disciplines.length; j++) {
            const disciplina = disciplines[j];
            disciplina.did = cycle.cid * 1000 + (j + 1);
            disciplina.dcycle = cycle.cid;
          }
        }
      }
      if (cycle.varpart) {
        if (cycle.varpart.parts) {
          if (cycle.varpart.parts.vyz) {
            if (cycle.varpart.parts.vyz.disciplines) {
              if (Array.isArray(cycle.varpart.parts.vyz.disciplines)) {
                if (cycle.varpart.parts.vyz.disciplines.length > 0) {
                  const disciplines = cycle.varpart.parts.vyz.disciplines;
                  for (let j = 0; j < disciplines.length; j++) {
                    const disciplina = disciplines[j];
                    disciplina.did = 1 * 1000000 + cycle.cid * 1000 + (j + 1);
                    disciplina.dcycle = cycle.cid;
                  }
                }
              }
            }
          }
        }
      }
      if (cycle.varpart) {
        if (cycle.varpart.parts) {
          if (cycle.varpart.parts.student) {
            if (cycle.varpart.parts.student.disciplines) {
              if (Array.isArray(cycle.varpart.parts.student.disciplines)) {
                if (cycle.varpart.parts.student.disciplines.length > 0) {
                  const disciplines = cycle.varpart.parts.student.disciplines;
                  for (let j = 0; j < disciplines.length; j++) {
                    const disciplina = disciplines[j];
                    disciplina.did = 2 * 1000000 + cycle.cid * 1000 + (j + 1);
                    disciplina.dcycle = cycle.cid;
                  }
                }
              }
            }
          }
        }
      }
      if (cycle.disciplines
                && Array.isArray(cycle.disciplines)) {
        if (cycle.disciplines.length > 0) {
          const disciplines = cycle.disciplines;
          for (let j = 0; j < disciplines.length; j++) {
            const disciplina = disciplines[j];
            disciplina.did = 3 * 1000000 + cycle.cid * 1000 + (j + 1);
            disciplina.dcycle = i;
          }
        }
      }
      if (cycle.footer) {
        cycle.footer.cid = cycle.cid;
        cycle.footer.fid = cycle.cid;
      }
    }
  }

  addTd(tr, text, colspan, clazz) {
    let td = document.createElement('td');
    if (text || text === '0') td.innerText = text;
    else td.innerText = ' ';

    if (arguments.length === 4) {
      if (colspan > 1) td.setAttribute('colspan', colspan);
      if (clazz && clazz.length > 3) td.className = clazz;
    }
    tr.appendChild(td);
  }

  makeDisciplinaLine(disciplina) {
    const classCenterBorderNone = 'center border-none';
    const classCenterBorderLeft = 'center border-left';
    const classCenterBorderRight = 'center border-right';
    let tr = document.createElement('tr');
    let curre = 0;
    let e; let n; let nameClass; let nameClass0; let nameClass1; let
      nameClass2;
    this.addTd(tr, disciplina.shifr, 1, ' shifrd');
    this.addTd(tr, disciplina.name, 1, ' named');
    this.addTd(tr, disciplina.shifrkaf, 1, 'center shifrk');
    tr.dataset.did = disciplina.did;
    tr.dataset.cid = disciplina.dcycle;
    for (e = 0; e < 4; e++) {
      nameClass = ' ekz' + (e + 1);
      if ((disciplina.ekzpersemestr)
                && (disciplina.ekzpersemestr.length > 0)) {
        n = disciplina.ekzpersemestr[curre];
        curre += 1;
        this.addTd(tr, n, 1, e === 3 ? classCenterBorderRight + nameClass : classCenterBorderNone + nameClass);
      } else this.addTd(tr, '  ', 1, e === 3 ? classCenterBorderRight + nameClass : classCenterBorderNone + nameClass);
    }
    curre = 0;
    for (e = 0; e < 4; e++) {
      nameClass = ' zach' + (e + 1);
      if ((disciplina.zachpersemestr)
                && (disciplina.zachpersemestr.length > 0)) {
        n = disciplina.zachpersemestr[curre];
        curre += 1; 
        this.addTd(tr, n, 1, classCenterBorderNone + nameClass);
      } else this.addTd(tr, '', 1, classCenterBorderNone + nameClass);
    }
    this.addTd(tr, disciplina.kursp ? disciplina.kursp : '', 1, 'center kursp');
    this.addTd(tr, disciplina.kursr ? disciplina.kursr : '', 1, 'center kursr');
    curre = 0;
    for (e = 0; e < 4; e++) {
      nameClass = ' indz' + (e + 1);
      if ((disciplina.indzpersemestr)
                && (disciplina.indzpersemestr.length > 0)) {
        n = disciplina.indzpersemestr[curre];
        curre += 1;
        this.addTd(tr, n, 1, classCenterBorderNone + nameClass);
      } else this.addTd(tr, '', 1, classCenterBorderNone + nameClass);
    }
    this.addTd(tr, disciplina.clocktot, 1, 'center clocks clocktot');
    this.addTd(tr, disciplina.ze, 1, 'center clocks clockze');
    this.addTd(tr, disciplina.clocklek ? disciplina.clocklek : '', 1, 'center clocks clocklek');
    this.addTd(tr, disciplina.clocklab ? disciplina.clocklab : '', 1, 'center clocks clocklab');
    this.addTd(tr, disciplina.clockpra ? disciplina.clockpra : '', 1, 'center clocks clockpra');
    this.addTd(tr, disciplina.clocksam ? disciplina.clocksam : '', 1, 'center clocks clocksam');
    curre = -1;
    let nomsemestra = 0;
    if ((disciplina.semestry)
            && (disciplina.semestry.length > 0)) {
      curre = 0;
      nomsemestra = disciplina.semestry[curre].nomsemestra;
    }
    for (e = 0; e < this.uplan.amntofsemesters; e++) {
      nameClass0 = ' sem' + (e + 1) + 'lek';
      nameClass1 = ' sem' + (e + 1) + 'lab';
      nameClass2 = ' sem' + (e + 1) + 'pra';
      if ((e + 1) === +nomsemestra) {
        this.addTd(tr, disciplina.semestry[curre].clocks[0], 1, classCenterBorderLeft + nameClass0);
        this.addTd(tr, disciplina.semestry[curre].clocks[1], 1, classCenterBorderNone + nameClass1);
        this.addTd(tr, disciplina.semestry[curre].clocks[2], 1, classCenterBorderNone + nameClass2);
        curre += 1;
        if (curre < disciplina.semestry.length) {
          nomsemestra = disciplina.semestry[curre].nomsemestra;
        }
        continue;
      }
      this.addTd(tr, '', 1, classCenterBorderLeft + nameClass0);
      this.addTd(tr, '', 1, classCenterBorderNone + nameClass1);
      this.addTd(tr, '', 1, classCenterBorderNone + nameClass2);
    }
    this.body.appendChild(tr);
  } // end of makeDisciplinaLine

  makeCycleFooter(cycle, footerLine) {
    let e;
    let summaClockTot = 0;
    let summaZE = 0;
    let summaClockLek = 0;
    let summaClockLab = 0;
    let summaClockPra = 0;
    let summaClockSam = 0;
    let summySem = [0, 0, 0, 0, 0, 0, 0, 0];
    let tr; let disciplines;
    let semClassName;

    function sumDisciplines(discipliny) {
      let i; let
        j;
      for (i = 0; i < discipliny.length; i++) {
        summaClockTot += discipliny[i].clocktot ? discipliny[i].clocktot : 0;
        summaZE += discipliny[i].ze ? discipliny[i].ze : 0;
        summaClockLek += discipliny[i].clocklek ? discipliny[i].clocklek : 0;
        summaClockLab += discipliny[i].clocklab ? discipliny[i].clocklab : 0;
        summaClockPra += discipliny[i].clockpra ? discipliny[i].clockpra : 0;
        summaClockSam += discipliny[i].clocksam ? discipliny[i].clocksam : 0;
        if (discipliny[i].semestry && discipliny[i].semestry.length > 0) {
          for (j = 0; j < discipliny[i].semestry.length; j++) {
            if (discipliny[i].semestry[j].nomsemestra
                            && discipliny[i].semestry[j].nomsemestra > 0
                            && discipliny[i].semestry[j].nomsemestra < 9) {
              let val1 = +discipliny[i].semestry[j].clocks[0]
                ? discipliny[i].semestry[j].clocks[0] : 0;
              let val2 = +discipliny[i].semestry[j].clocks[1]
                ? discipliny[i].semestry[j].clocks[1] : 0;
              let val3 = +discipliny[i].semestry[j].clocks[2]
                ? discipliny[i].semestry[j].clocks[2] : 0;
              let r = val1 + val2 + val3;
              summySem[discipliny[i].semestry[j].nomsemestra - 1] += r;
            }
          }
        }
      }
    } // end of function sumDisciplines(disciplines)


    if (cycle.basepart) {
      if (cycle.basepart.disciplines && cycle.basepart.disciplines.length > 0) {
        disciplines = cycle.basepart.disciplines;
        sumDisciplines(disciplines);
      }
    }
    if (cycle.varpart && cycle.varpart.parts && cycle.varpart.parts.vyz) {
      if (cycle.varpart.parts.vyz && cycle.varpart.parts.vyz.disciplines.length > 0) {
        disciplines = cycle.varpart.parts.vyz.disciplines;
        sumDisciplines(disciplines);
      }
    }
    if (cycle.varpart && cycle.varpart.parts && cycle.varpart.parts.student) {
      if (cycle.varpart.parts.student && cycle.varpart.parts.student.disciplines.length > 0) {
        disciplines = cycle.varpart.parts.student.disciplines;
        sumDisciplines(disciplines);
      }
    }
    if (cycle.disciplines && cycle.disciplines.length > 0) {
      disciplines = cycle.disciplines;
      sumDisciplines(disciplines);
    }
    if (arguments.length < 2) {
      tr = document.createElement('tr');
      tr.dataset.fid = cycle.footer.fid;
      tr.className = 'cyclefooter';
      this.addTd(tr, cycle.footer.shifr, 1, ' cyclefooter');
      this.addTd(tr, cycle.footer.name, 16, ' cyclefooter');
      this.addTd(tr, summaClockTot, 1, ' clocktot');
      this.addTd(tr, summaZE, 1, ' center clockze');
      this.addTd(tr, summaClockLek > 0 ? summaClockLek : '', 1, 'center clocklek');
      this.addTd(tr, summaClockLab > 0 ? summaClockLab : '', 1, 'center clocklab');
      this.addTd(tr, summaClockPra > 0 ? summaClockPra : '', 1, 'center clockpra');
      this.addTd(tr, summaClockSam > 0 ? summaClockSam : '', 1, 'center clocksam');

      for (e = 0; e < this.uplan.amntofsemesters; e++) {
        semClassName = 'sem' + (e + 1);
        if (e < 7) this.addTd(tr, summySem[e] > 0 ? summySem[e] : '', 3, ' center ' + semClassName);
        else {
        //                    this.addTd(tr, summySem[e] > 0 ? summySem[e] : "", 3, "center border-top border-left border-right " + semClassName);
          this.addTd(tr, summySem[e] > 0 ? summySem[e] : '', 3, ' center ' + semClassName); 
        }
      }
      this.body.appendChild(tr);
    } else
    if (!cycle.footer.name.includes('акультатив')) {
      footerLine.summaClockTot += summaClockTot;
      footerLine.summaZE += summaZE;
      footerLine.summaClockLek += summaClockLek;
      footerLine.summaClockLab += summaClockLab;
      footerLine.summaClockPra += summaClockPra;
      footerLine.summaClockSam += summaClockSam;
      for (e = 0; e < this.uplan.amntofsemesters; e++) footerLine.summySem[e] += summySem[e];
    }
  } // end of makeCycleFooter(

  makePlanFooter() {
    let footerLine = {
      summaClockTot: 0,
      summaZE: 0,
      summaClockLek: 0,
      summaClockLab: 0,
      summaClockPra: 0,
      summaClockSam: 0,
      summySem: [0, 0, 0, 0, 0, 0, 0, 0]
    };
    let i; let cycle; let e; let tr; let
      semClassName;
    for (i = 0; i < this.uplan.cycly.length; i++) {
      cycle = this.uplan.cycly[i];
      this.makeCycleFooter(cycle, footerLine);
    }
    tr = document.createElement('tr');
    //    tr.dataset.fid=cycle.footer.fid;
    tr.className = 'planfooter';
    this.addTd(tr, this.uplan.footer.shifr, 1, '');
    this.addTd(tr, this.uplan.footer.name, 16, '');
    this.addTd(tr, footerLine.summaClockTot, 1, 'center clocktot');
    this.addTd(tr, footerLine.summaZE, 1, 'center clockze');
    this.addTd(tr, footerLine.summaClockLek > 0 ? footerLine.summaClockLek : '', 1, 'center clocklek');
    this.addTd(tr, footerLine.summaClockLab > 0 ? footerLine.summaClockLab : '', 1, 'center clocklab');
    this.addTd(tr, footerLine.summaClockPra > 0 ? footerLine.summaClockPra : '', 1, 'center clockpra');
    this.addTd(tr, footerLine.summaClockSam > 0 ? footerLine.summaClockSam : '', 1, 'center clocksam');
    for (e = 0; e < this.uplan.amntofsemesters; e++) {
      semClassName = 'sem' + (i + 1);
      this.addTd(tr, footerLine.summySem[e] > 0 ? footerLine.summySem[e] : '', 3, 'center ' + semClassName);
    }
    this.body.appendChild(tr);
  }

  // end of makePlanFooter
  replaceUPlanDiscRowInHTMLTable() {
    let rootSelector = 'tr[data-did="' + this.discRow.did + '"] td';
    let currSelector = rootSelector + '.shifrd';
    $(currSelector).text(this.discRow.shifr);
    $(rootSelector + '.named').text(this.discRow.name);
    for (let i = 0; i < 4; i++) {
      let val = '';
      currSelector = rootSelector + '.ekz' + (i + 1);
      if (this.discRow.ekzpersemestr
                && this.discRow.ekzpersemestr[i]
                && this.discRow.ekzpersemestr[i] > 0) {
        val = this.discRow.ekzpersemestr[i].toString();
      }
      $(currSelector).text(val);
    }
    for (let i = 0; i < 4; i++) {
      let val = '';
      currSelector = rootSelector + '.zach' + (i + 1);
      if (this.discRow.zachpersemestr
                && this.discRow.zachpersemestr[i]
                && this.discRow.zachpersemestr[i] > 0) {
        val = this.discRow.zachpersemestr[i].toString();
      }
      $(currSelector).text(val);
    }
    $(rootSelector + '.kursp').text(this.discRow.kursp);
    $(rootSelector + '.kursr').text(this.discRow.kursr);
    for (let i = 0; i < 4; i++) {
      let val = '';
      currSelector = rootSelector + '.indz' + (i + 1);
      if (this.discRow.indzpersemestr
                && this.discRow.indzpersemestr[i]
                && this.discRow.indzpersemestr[i] > 0) {
        val = this.discRow.indzpersemestr[i].toString();
      }
      $(currSelector).text(val);
    }
    $(rootSelector + '.clocktot').text(this.discRow.clocktot);
    $(rootSelector + '.clockze').text(this.discRow.ze);
    $(rootSelector + '.clocklek').text(this.discRow.clocklek > 0 ? this.discRow.clocklek : '');
    $(rootSelector + '.clocklab').text(this.discRow.clocklab > 0 ? this.discRow.clocklab : '');
    $(rootSelector + '.clockpra').text(this.discRow.clockpra > 0 ? this.discRow.clockpra : '');
    $(rootSelector + '.clocksam').text(this.discRow.clocksam > 0 ? this.discRow.clocksam : '');
    for (let i = 0; i < this.uplan.amntofsemesters; i++) {
      let nameSem = '.sem' + (i + 1) + 'lek';
      $(rootSelector + nameSem).text('');
      nameSem = '.sem' + (i + 1) + 'lab';
      $(rootSelector + nameSem).text('');
      nameSem = '.sem' + (i + 1) + 'pra';
      $(rootSelector + nameSem).text('');
    }
    if (this.discRow.semestry
            && Array.isArray(this.discRow.semestry)
            && this.discRow.semestry.length > 0) {
      for (let i = 0; i < this.discRow.semestry.length; i++) {
        if (this.discRow.semestry[i].clocks
                    && Array.isArray(this.discRow.semestry[i].clocks)
                    && this.discRow.semestry[i].clocks.length === 3) {
          let nameSem = '.sem' + this.discRow.semestry[i].nomsemestra + 'lek';
          $(rootSelector + nameSem).text(this.discRow.semestry[i].clocks[0]);
          nameSem = '.sem' + this.discRow.semestry[i].nomsemestra + 'lab';
          $(rootSelector + nameSem).text(this.discRow.semestry[i].clocks[1]);
          nameSem = '.sem' + this.discRow.semestry[i].nomsemestra + 'pra';
          $(rootSelector + nameSem).text(this.discRow.semestry[i].clocks[2]);
        }
      }
    }
  }

  replaceUPlanCycleFooterRowInHTMLTable() {
    let footerLine = {
      summaClockTot: 0,
      summaZE: 0,
      summaClockLek: 0,
      summaClockLab: 0,
      summaClockPra: 0,
      summaClockSam: 0,
      summySem: [0, 0, 0, 0, 0, 0, 0, 0]
    };
    let need = false;
    for (let i = 0; i < this.uplan.cycly.length; i++) {
      let cycle = this.uplan.cycly[i];
      if (+cycle.cid === +this.discRow.dcycle) {
        need = true;
        this.makeCycleFooter(cycle, footerLine);
      }
    }
    if (!need) return;
    let rootSelector = 'tr[data-fid="' + this.discRow.dcycle + '"] td';
    let currSelector;
    $(rootSelector + '.clocktot').text(footerLine.summaClockTot);
    $(rootSelector + '.clockze').text(footerLine.summaZE);
    $(rootSelector + '.clocklek').text(footerLine.summaClockLek);
    $(rootSelector + '.clocklab').text(footerLine.summaClockLab);
    $(rootSelector + '.clockpra').text(footerLine.summaClockPra);
    $(rootSelector + '.clocksam').text(footerLine.summaClockSam);
    for (let i = 0; i < this.uplan.amntofsemesters; i++) {
      let val = '';
      let j = i + 1;
      currSelector = rootSelector + '.sem' + j;
      if (footerLine.summySem[i] > 0) {
        val = footerLine.summySem[i].toString();
      }
      $(currSelector).text(val);
    }
  }

  // end of replaceUPlanCycleRowInHTMLTable()
  replaceUPlanTotalFooterRowInHTMLTable() {
    let footerLine = {
      summaClockTot: 0,
      summaZE: 0,
      summaClockLek: 0,
      summaClockLab: 0,
      summaClockPra: 0,
      summaClockSam: 0,
      summySem: [0, 0, 0, 0, 0, 0, 0, 0]
    };

    for (let i = 0; i < this.uplan.cycly.length; i++) {
      let cycle = this.uplan.cycly[i];
      this.makeCycleFooter(cycle, footerLine);
    }
    let rootSelector = 'tr.planfooter td';
    $(rootSelector + '.clocktot').text(footerLine.summaClockTot);
    $(rootSelector + '.clockze').text(footerLine.summaZE);
    $(rootSelector + '.clocklek').text(footerLine.summaClockLek);
    $(rootSelector + '.clocklab').text(footerLine.summaClockLab);
    $(rootSelector + '.clockpra').text(footerLine.summaClockPra);
    $(rootSelector + '.clocksam').text(footerLine.summaClockSam);
    for (let i = 0; i < this.uplan.amntofsemesters; i++) {
      let val = '';
      let j = i + 1;
      let currSelector = rootSelector + '.sem' + j;
      if (footerLine.summySem[i] > 0) {
        val = footerLine.summySem[i].toString();
      }
      $(currSelector).text(val);
    }
  }

  // end of replaceUPlanCycleRowInHTMLTable()
  makeUPlanLines() {
    this.body.innerHTML = '';
    let i; let j; let tr; let cycle; let part; let
      disciplina;
    for (i = 0; i < this.uplan.cycly.length; i++) {
      tr = document.createElement('tr');
      tr.dataset.cid = this.uplan.cycly[i].cid;
      this.addTd(tr, this.uplan.cycly[i].shifr, 1, 'cycleheader');
      this.addTd(tr, this.uplan.cycly[i].name, this.isBakalavr() ? 50 : 50 - 12, 'cycleheader');
      this.body.appendChild(tr);
      if (this.uplan.cycly[i].basepart) {
        cycle = this.uplan.cycly[i].basepart;
        tr = document.createElement('tr');
        this.addTd(tr, cycle.shifr, 1, 'cycleheader');

        this.addTd(tr, cycle.name, this.isBakalavr() ? 50 : 50 - 12, 'cycleheader');
        this.body.appendChild(tr);
        for (j = 0; j < cycle.disciplines.length; j++) {
          disciplina = cycle.disciplines[j];
          this.makeDisciplinaLine(disciplina);
        }
      }
      if (this.uplan.cycly[i].varpart) {
        cycle = this.uplan.cycly[i].varpart;
        tr = document.createElement('tr');
        this.addTd(tr, cycle.shifr, 1, 'cycleheader');
        this.addTd(tr, cycle.name, this.isBakalavr() ? 50 : 50 - 12, 'cycleheader');
        this.body.appendChild(tr);
        part = cycle.parts.vyz;
        tr = document.createElement('tr');
        this.addTd(tr, part.shifr, 1, 'cycleheader');
        this.addTd(tr, part.name, this.isBakalavr() ? 50 : 50 - 12, 'cycleheader');
        this.body.appendChild(tr);
        for (j = 0; j < part.disciplines.length; j++) {
          disciplina = part.disciplines[j];
          this.makeDisciplinaLine(disciplina);
        }
        part = cycle.parts.student;
        tr = document.createElement('tr');
        this.addTd(tr, part.shifr, 1, 'cycleheader');
        this.addTd(tr, part.name, this.isBakalavr() ? 50 : 50 - 12, 'cycleheader');
        this.body.appendChild(tr);
        for (j = 0; j < part.disciplines.length; j++) {
          disciplina = part.disciplines[j];
          this.makeDisciplinaLine(disciplina);
        }
      }
      if (this.uplan.cycly[i].disciplines && this.uplan.cycly[i].disciplines.length > 0) {
        for (j = 0; j < this.uplan.cycly[i].disciplines.length; j++) {
          disciplina = this.uplan.cycly[i].disciplines[j];
          this.makeDisciplinaLine(disciplina);
        }
      }
      if (this.uplan.cycly[i].footer) {
        cycle = this.uplan.cycly[i];
        this.makeCycleFooter(cycle);
      }
    }
  }

  // end of makeUPlanLines;
  isBakalavr() {
    if (this.uplan.okr.toUpperCase() === 'БАКАЛАВР') return true;
    return false;
  }

  isMagistr() {
    if (this.uplan.okr === 'Магистр') return true;
    return false;
  }

  makeUPlanHat() {
    let planHat;
    if (this.isMagistr()) planHat = hat(2);
    else planHat = hat(1);
    $('#idplanhat').empty();
    let el = document.querySelector('#idplanhat');
    el.innerHTML = planHat;
  }

  makeInformPart() {
    let tr = document.createElement('tr');
    let praktics = [];
    for (let i = 0; i < 5; i++) {
      praktics.push({
        npp: 0, name: '', nomsemestra: 0, nmbofweek: 0, ze: 0
      });
    }
    if (this.uplan.praktics
            && Array.isArray(this.uplan.praktics)
            && this.uplan.praktics.length > 0) {
      for (let i = 0; i < this.uplan.praktics.length; i++) {
        if (i < 5) {
          praktics[i].npp = this.uplan.praktics[i].npp;
          praktics[i].name = this.uplan.praktics[i].name;
          praktics[i].nmbofweek = this.uplan.praktics[i].nmbofweek;
          praktics[i].nomsemestra = this.uplan.praktics[i].nomsemestra;
          praktics[i].ze = this.uplan.praktics[i].ze;
        }
      }
    }
    //    tr.dataset.fid=cycle.footer.fid;
    tr.className = 'planfooter';
    tr.dataset.cid = 101;
    this.addTd(tr, 'Информационная часть', this.isBakalavr() ? 51 : 51 - 12, ' center');
    this.body.appendChild(tr);
    tr = document.createElement('tr');
    this.addTd(tr, 'Практики', 17, ' center');
    this.addTd(tr, 'Учебные занятия (часов в неделю)', 6, '');
    for (let i = 0; i < this.uplan.amntofsemesters; i++) {
      this.addTd(tr, this.uplan.clocksperweek[i], 3, ' center');
    }
    this.body.appendChild(tr);
    tr = document.createElement('tr');
    this.addTd(tr, '№', 1, ' center');
    this.addTd(tr, 'Название', 2, ' center');
    this.addTd(tr, 'Семестр', 5, ' center');
    this.addTd(tr, 'Кол. недель', 5, ' center');
    this.addTd(tr, 'ЗЕ', 4, ' center');
    this.addTd(tr, 'Курсовые проекты', 5, '');
    let totalAmntOfKursP = 0;
    let totalAmntOfKursR = 0;
    let totalAmntOfIndZ = 0;
    let totalAmntOfEkz = 0;
    let totalAmntOfZach = 0;
    if (this.uplan.nmbofkursp && Array.isArray(this.uplan.nmbofkursp)) {
      this.uplan.nmbofkursp.forEach((item)=>{ if (+item > 0) totalAmntOfKursP += 1; });
    }
    this.addTd(tr, totalAmntOfKursP, 1, 'center');
    for (let i = 0; i < this.uplan.amntofsemesters; i++) {
      this.addTd(tr, this.uplan.nmbofkursp[i] > 0 ? this.uplan.nmbofkursp[i] : '-', 3, ' center');
    }
    this.body.appendChild(tr);
    for (let j = 0; j < 5; j++) {
      tr = document.createElement('tr');
      if (praktics[j].npp > 0) {
        this.addTd(tr, praktics[j].npp, 1, ' center');
        this.addTd(tr, praktics[j].name, 2, '');
        this.addTd(tr, praktics[j].nomsemestra, 5, ' center');
        this.addTd(tr, praktics[j].nmbofweek, 5, ' center');
        this.addTd(tr, praktics[j].ze, 4, ' center');
      } else {
        this.addTd(tr, '', 1, ' center');
        this.addTd(tr, '', 2, ' center');
        this.addTd(tr, '', 5, ' center');
        this.addTd(tr, '', 5, ' center');
        this.addTd(tr, '', 4, ' center');
      }
      switch (j) {
        case 0:
          this.addTd(tr, 'Курсовые работы', 5, '');
          if (this.uplan.nmbofkursr && Array.isArray(this.uplan.nmbofkursr)) {
            this.uplan.nmbofkursr.forEach((item)=>{ if (+item > 0) totalAmntOfKursR += item; });
          }
          this.addTd(tr, +totalAmntOfKursR, 1, 'center');
          for (let i = 0; i < this.uplan.amntofsemesters; i++) {
            this.addTd(tr, this.uplan.nmbofkursr[i] > 0 ? this.uplan.nmbofkursr[i] : '-', 3, ' center');
          }
          break;
        case 1:
          this.addTd(tr, 'Индивидуальные задания', 5, '');
          //                    if (this.uplan.nmbofindz && Array.isArray(this.uplan.nmbofindz))
          //                       this.uplan.nmbofindz.forEach((item)=>{if (+item>0) totalAmntOfIndZ=totalAmntOfIndZ+item});
          for (let i = 0; i < this.uplan.amntofsemesters; i++) {
            totalAmntOfIndZ = totalAmntOfIndZ + this.uplan.nmbofindz[i] > 0
              ? this.uplan.nmbofindz[i] : 0;
          }
          this.addTd(tr, +totalAmntOfIndZ, 1, 'center');
          for (let i = 0; i < this.uplan.amntofsemesters; i++) {
            this.addTd(tr, this.uplan.nmbofindz[i] > 0 ? this.uplan.nmbofindz[i] : '-', 3, ' center');
          }
          break;
        case 2:
          this.addTd(tr, 'Экзамены', 5, '');
          if (this.uplan.nmbofekz
            && Array.isArray(this.uplan.nmbofekz)) {
            this.uplan.nmbofekz.forEach((item)=>{ if (+item > 0) totalAmntOfEkz += item; });
          }
          this.addTd(tr, +totalAmntOfEkz, 1, 'center');
          for (let i = 0; i < this.uplan.amntofsemesters; i++) {
            this.addTd(tr, this.uplan.nmbofekz[i] > 0 ? this.uplan.nmbofekz[i] : '-', 3, ' center');
          }
          break;
        case 3:
          this.addTd(tr, 'Зачеты', 5, '');
          if (this.uplan.nmbofzach && Array.isArray(this.uplan.nmbofzach)) {
            this.uplan.nmbofzach.forEach(item=>{ if (+item > 0) totalAmntOfZach += item; });
          }
          this.addTd(tr, +totalAmntOfZach, 1, 'center');
          for (let i = 0; i < this.uplan.amntofsemesters; i++) {
            this.addTd(tr, this.uplan.nmbofzach[i] > 0 ? this.uplan.nmbofzach[i] : '-', 3, ' center');
          }
          break;
        case 4:
          this.addTd(tr, 'ЗЕ', 6, '');
          for (let i = 0; i < this.uplan.amntofsemesters; i++) {
            this.addTd(tr, this.uplan.nmbofze[i] > 0 ? this.uplan.nmbofze[i] : '-', 3, ' center');
          }
          break;
        default:
          // statements_def
          break;
      }
      this.body.appendChild(tr);
    }
    tr = document.createElement('tr');
    this.addTd(tr, 'Количество изучаемых дисциплин', 8, ' right');
    this.addTd(tr, '50', 9, ' center');
    this.addTd(tr, 'ЗЕ за учебный год', 6, '');
    for (let i = 0; i < this.uplan.amntofsemesters / 2; i++) {
      this.addTd(tr, this.uplan.nmbofze[i * 2] + this.uplan.nmbofze[i * 2 + 1] > 0 ? this.uplan.nmbofze[i * 2] + this.uplan.nmbofze[i * 2 + 1] : '-', 6, ' center');
    }
    this.body.appendChild(tr);
    tr = document.createElement('tr');
    tr.className = 'planfooter';
    tr.dataset.cid = 102;
    this.addTd(tr, 'ГОСУДАРСТВЕННАЯ АТТЕСТАЦИЯ', this.isBakalavr() ? 51 : 51 - 12, ' center');
    this.body.appendChild(tr);
    tr = document.createElement('tr');
    this.addTd(tr, '№', 1, ' center');
    this.addTd(tr, 'Программа подготовки', 1, ' center');
    this.addTd(tr, 'Название', this.isBakalavr() ? 36 : 36 - 12, ' center');
    this.addTd(tr, 'Семестр', 5, ' center');
    this.addTd(tr, 'ЗЕ', 4, ' center');
    this.body.appendChild(tr);
    if (this.uplan.gosattestaciya
         && Array.isArray(this.uplan.gosattestaciya)
         && this.uplan.gosattestaciya.length > 0) {
      for (let i = 0; i < this.uplan.gosattestaciya.length; i++) {
        tr = document.createElement('tr');
        this.addTd(tr, this.uplan.gosattestaciya[i].npp, 1, ' center');
        this.addTd(tr, this.uplan.gosattestaciya[i].okr, 1, '');
        this.addTd(tr, this.uplan.gosattestaciya[i].name, this.isBakalavr() ? 36 : 36 - 12, '');
        this.addTd(tr, this.uplan.gosattestaciya[i].nomsemestra, 5, ' center');
        this.addTd(tr, this.uplan.gosattestaciya[i].ze, this.isBakalavr() ? 36 : 36 - 12, ' center');
        this.body.appendChild(tr);
      }
    }
  }

  showPlan() {
    this.makeUPlanMarking();
    this.makeUPlanHat();
    this.makeUPlanLines();
    this.makePlanFooter();
    this.makeInformPart();
  }

  fillSemestryRecForDisc(nomSemestra, index) {
    let findedSemestr;
    if (index < 0) {
      let findedIndex = -1;
      if (this.discRow.semestry
              && Array.isArray(this.discRow.semestry)) {
        findedIndex = this.discRow.semestry.findIndex(elemSem=>+elemSem.nomsemestra === +nomSemestra);
      }
      if (findedIndex >= 0) {
        this.discRow.semestry.splice(findedIndex, 1);
      }
      return;
    }
    if (this.discRow.semestry
            && Array.isArray(this.discRow.semestry)) {
      findedSemestr = this.discRow.semestry.find(elemSem=>+elemSem.nomsemestra === +nomSemestra);
    }
    if (findedSemestr) {
      findedSemestr.clocks = [];
      findedSemestr.clocks.push(semclocks[index].clocks[0]);
      findedSemestr.clocks.push(semclocks[index].clocks[1]);
      findedSemestr.clocks.push(semclocks[index].clocks[2]);
    } else {
      let o = {
        nomsemestra: +nomSemestra,
        clocks: []
      };
      o.clocks.push(semclocks[index].clocks[0]);
      o.clocks.push(semclocks[index].clocks[1]);
      o.clocks.push(semclocks[index].clocks[2]);
      if (!(this.discRow.semestry
                  && Array.isArray(this.discRow.semestry))) this.discRow.semestry = [];
      this.discRow.semestry.push(o);
      if (this.discRow.semestry.length > 1) {
        this.discRow.semestry.sort((a, b) => a.nomsemestra - b.nomsemestra);
      }
    }
  }

  createListForSemestrSelectOnScreen(nomSemestra, clocks) {
    let select = document.createElement('select');
    select = document.createElement('select');
    select.style.width = '100%';
    select.setAttribute('id', 'selsem');
    select.setAttribute('data-nomsemestra', nomSemestra);
    let opt = document.createElement('option');
    opt.setAttribute('value', '');
    let text = document.createTextNode('...');
    opt.appendChild(text);
    select.appendChild(opt);
    for (let i = 0; i < semclocks.length; i++) {
      opt = document.createElement('option');
      opt.setAttribute('value', semclocks[i].id);
      text = document.createTextNode(semclocks[i].name);
      opt.appendChild(text);
      if (clocks
                && Array.isArray(clocks)
                && clocks.length === 3) {
        if (+semclocks[i].clocks[0] === +clocks[0]
                 && +semclocks[i].clocks[1] === +clocks[1]
                 && +semclocks[i].clocks[2] === +clocks[2]) {
          //                    alert("enter selected");
          opt.setAttribute('selected', 'selected');
        }
      }
      select.appendChild(opt);
    }
    let nameSemB = '#isem' + nomSemestra + 'b';
    let elem = document.querySelector(nameSemB);
    select.addEventListener('change', function (ev) {
      let nomSemestr = this.attributes.getNamedItem('data-nomsemestra').value;
      let nameSemestra = '#isem' + nomSemestr;
      let index = this.options[this.selectedIndex].value;
      let s = '';
      if (index > 0) {
        index -= 1;
        s = '' + semclocks[index].clocks[0] + ' ' + semclocks[index].clocks[1] + ' ' + semclocks[index].clocks[2];
        $(nameSemestra).val(s);
        this.fillSemestryRecForDisc(nomSemestra, index);
      } else {
        s = '';
        $(nameSemestra).val(s);
        this.fillSemestryRecForDisc(nomSemestra, -1);
      }

      elem.removeChild(this);
      $(nameSemestra).toggleClass('active');
      this.calculateClocksUsingSemestry();
      $('#iclocklek').val(this.discRow.clocklek);
      $('#iclocklab').val(this.discRow.clocklab);
      $('#iclockpra').val(this.discRow.clockpra);
      $('#iclockSam').val(this.discRow.clocksam);
    });
    if (elem) {
      elem.appendChild(select);
    }
  }

  fillUpdateSelectSemestrClocks(nomSemestra) {
    let clocks = [];
    let findedSemestr;
    if (this.discRow.semestry
            && Array.isArray(this.discRow.semestry)) {
      findedSemestr = this.discRow.semestry.find(elem=>+elem.nomsemestra === +nomSemestra);
    }
    if (findedSemestr) {
      if (findedSemestr.clocks) {
        if (Array.isArray(findedSemestr.clocks)) {
          if (findedSemestr.clocks.length === 3) {
            clocks.push(findedSemestr.clocks[0]);
            clocks.push(findedSemestr.clocks[1]);
            clocks.push(findedSemestr.clocks[2]);
          }
        }
      }
    }
    this.createListForSemestrSelectOnScreen(nomSemestra, clocks);
  }

  insertUPlanIntoMDB() {
    //          return;
    let fixedURL = ajaxConfig.mongoURL + 'uplany?apiKey=' + ajaxConfig.apiKey;
    //          let fixedURL="https://api.mlab.com/api/1/databases/uplany/collections/uplany?apiKey=kaUDFzJwz5GfBtAeUnriufsAYkJLyfLf";
    //            $.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey",
    loader.showWait('Загрузка учебного плана');
    $.ajax({
      url: fixedURL,
      data: JSON.stringify(this.uplan),
      type: 'POST',
      contentType: 'application/json'
    })
      .done(() => {
        loader.hideWait();
        loader.showFinished('План записан в БД');
        //             alert( "План сохранен" );
      })
      .fail((jqXHR, textStatus) => {
        //            alert( "Ошибка сохранения плана "+ textStatus );
        loader.showFinished(`Ошибка сохранения плана ${textStatus}`);
      });
  }

  putUPlanIntoMDB() {
    //          return;
    let fixedURL = ajaxConfig.mongoURL + 'uplany?apiKey=' + ajaxConfig.apiKey;
    //          let fixedURL="https://api.mlab.com/api/1/databases/uplany/collections/uplany?apiKey=kaUDFzJwz5GfBtAeUnriufsAYkJLyfLf";
    //            $.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey",
    loader.showWait('Загрузка учебного плана');
    $.ajax({
      url: fixedURL,
      data: JSON.stringify(this.uplan),
      type: 'POST',
      contentType: 'application/json'
    })
      .done(() => {
        loader.hideWait();
        loader.showFinished('План записан в БД');
        //             alert( "План сохранен" );
      })
      .fail((jqXHR, textStatus) => {
        //            alert( "Ошибка сохранения плана "+ textStatus );
        loader.showFinished(`Ошибка сохранения плана ${textStatus}`);
      });
  }

  getUPlanFromMDB(id) {
    let apiKey = ajaxConfig.apiKey;
    let fixedURL = ajaxConfig.mongoURL + 'uplany/';
    //          let fixedURL="https://api.mlab.com/api/1/databases/uplany/collections/uplany/";
    //          let q='q={"_id": ObjectId("'+id+'") }';
    let q = id;
    let URL = fixedURL + q + '?apiKey=' + apiKey;
    let self = this;

    loader.showWait('Чтение учебного плана');
    $.ajax({
      url: URL,
      type: 'GET'
    })
      .done(function (data) {
        loader.hideWait();
        let iplans = JSON.stringify(data);
        let iplan = JSON.parse(iplans);
        //        let body = document.querySelector('#planbody');
        self.uplan = iplan;
        uPlanEntity = iplan;
        self.showPlan();
        //             window.up.showPlan();
        //             loader.showFinished('Список прочтен из БД');
      })
      .fail((jqXHR, textStatus) => {
        //            alert( "Ошибка сохранения плана "+ textStatus );
        loader.hideWait();
        loader.showFinished(`Ошибка чтения списка планов ${textStatus}`);
      });
  }

  selectUPlanFromMDB() {
    //          return;
    let apiKey = ajaxConfig.apiKey;
    //          let fixedURL="https://api.mlab.com/api/1/databases/uplany/collections/uplany?apiKey=kaUDFzJwz5GfBtAeUnriufsAYkJLyfLf";
    //          let fixedURL="https://api.mlab.com/api/1/databases/uplany/collections/uplany?q={"active": true}&f={"firstName": 1, "lastName": 1}&c=true&apiKey=";
    let fixedURL = ajaxConfig.mongoURL + 'uplany?';
    //          let fixedURL="https://api.mlab.com/api/1/databases/uplany/collections/uplany?";
    //          let q='q={"napr.shifr": "09.03.02";
    let q = 'q={"napr.shifr": {$in: ["09.03.02","09.04.02"]}}';
    //        status: { $in: [ "A", "D" ] }}';
    let f = 'f={"napr.name": 1, "yearpost": 1, "formaob":1,"okr":1}';
    //            $.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey",
    let URL = fixedURL + q + '&' + f + '&apiKey=' + apiKey;
    loader.showWait('Чтение списка учебных планов');

    $.ajax({
      url: URL,
      //     data: JSON.stringify( this.uplan ),
      type: 'GET'
      //    contentType: "application/json" }
    })
      .done((data) => {
        loader.hideWait();
        loader.showFinished('Список прочтен из БД');
      })
      .fail((jqXHR, textStatus) => {
        //            alert( "Ошибка сохранения плана "+ textStatus );
        loader.hideWait();
        loader.showFinished(`шибка чтения списка планов ${textStatus}`);
      });
  }
} // Конец класса
// $(document).ready(
//     $.fn.center = function () {
//       this.css("position", "absolute");
//       this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
//       this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
//       return this;
//     }
//     );
function finishMenu() {
  $('.fg-button').on({
    mouseenter: function () { $(this).removeClass('ui-state-default').addClass('ui-state-focus'); },
    mouseleave: function () { $(this).removeClass('ui-state-focus').addClass('ui-state-default'); }
  });

  $('#loadbtn').menu({
    content: $('#loadbtn').next().html(),
    backLink: true,
    crumbDefaultText: ' ',
    flyOut: true,
    width: '20vmax',
    selectCallback: up.getUPlanFromMDB.bind(up)
  });
}
window.onload = function () {
  //   saveSprToLS();
  let body = document.querySelector('#planbody');
  user = new User('Ромашка Е.В.', 'usekretar', 95);
  if (localStorage.getItem('UPlan')) {
    let upl = JSON.parse(localStorage.getItem('UPlan'));
    up = new Up(upl, body);
  } else {
    up = new Up(uPlanEntity, body);
  }
  menugetplan({ user: user, rootElement: '#userselectplan', callback: finishMenu });
  //    up.insertUPlanIntoMDB();
  //    up.selectUPlanFromMDB();
  /* methods */
  /* actions */
  up.showPlan();
  body.onclick = function (event) {
    let target = event.target;
    let parent;
    let did;
    while (target !== this) {
      if (target.tagName === 'TD') {
        // нашли элемент, который нас интересует!
        if (target.classList.contains('named')) {
          parent = target.parentElement;
          if (parent.tagName === 'TR') {
            did = parent.dataset.did;
            up.fillDiscRow(did);
            if (up.discRow) {
              up.saveDiscRow();
              up.fillUpdateDiscForm();
            }
          }
          if (up.isMagistr()) {
            $('#isem5b').hide();
            $('#isem6b').hide();
            $('#isem7b').hide();
            $('#isem8b').hide();
          } else {
            $('#isem5b').show();
            $('#isem6b').show();
            $('#isem7b').show();
            $('#isem8b').show();
          }


          $('#blackwindow').toggleClass('active');
          $('#updatediscform').toggleClass('active');
          //         target.innerText=newName;
        } else
        if (target.classList.contains('ekz1')
                    || target.classList.contains('ekz2')
                    || target.classList.contains('ekz3')
                    || target.classList.contains('ekz4')) {
          parent = target.parentElement;
          if (parent.tagName === 'TR') {
            did = parent.dataset.did;
            up.fillDiscRow(did);
            if (up.discRow) {
              up.saveDiscRow();
              up.fillUpdateEkzForm('ekz');
              $('#modesrc').val('table');
            }
          }
          $('#blackwindowekz').toggleClass('active');
          $('#updateekzform').toggleClass('active');
        } else
        if (target.classList.contains('zach1')
                    || target.classList.contains('zach2')
                    || target.classList.contains('zach3')
                    || target.classList.contains('zach4')) {
          parent = target.parentElement;
          if (parent.tagName === 'TR') {
            did = parent.dataset.did;
            up.fillDiscRow(did);
            if (up.discRow) {
              up.saveDiscRow();
              up.fillUpdateEkzForm('zach');
              $('#modesrc').val('table');
            }
          }
          $('#blackwindowekz').toggleClass('active');
          $('#updateekzform').toggleClass('active');
        } else
        if (target.classList.contains('indz1')
                    || target.classList.contains('indz2')
                    || target.classList.contains('indz3')
                    || target.classList.contains('indz4')) {
          parent = target.parentElement;
          if (parent.tagName === 'TR') {
            did = parent.dataset.did;
            up.fillDiscRow(did);
            if (up.discRow) {
              up.saveDiscRow();
              up.fillUpdateEkzForm('indz');
              $('#modesrc').val('table');
            }
          }

          $('#blackwindowekz').toggleClass('active');
          $('#updateekzform').toggleClass('active');
        } else alert('clicked');
        return;
      }
      target = target.parentNode;
    }
  };
  let hatelem = document.querySelector('#idplanhat');
  hatelem.onclick = function (event) {
    let target = event.target;
    let parent;
    let did;
    while (target !== this) {
      if (target.tagName === 'TH') {
        up.fillUpdateParPlanForm();
        $('#blackwindow').toggleClass('active');
        $('#updateparplanformcontainer').toggleClass('active');
      } else
      if (target.tagName === 'TD') {
        // нашли элемент, который нас интересует!
        if (target.classList.contains('named')) {
          parent = target.parentElement;
          if (parent.tagName === 'TR') {
            did = parent.dataset.did;
            up.fillDiscRow(did);
            if (up.discRow) {
              up.saveDiscRow();
              up.fillUpdateDiscForm();
            }
          }
          if (up.isMagistr()) {
            $('#isem5b').hide();
            $('#isem6b').hide();
            $('#isem7b').hide();
            $('#isem8b').hide();
          } else {
            $('#isem5b').show();
            $('#isem6b').show();
            $('#isem7b').show();
            $('#isem8b').show();
          }


          $('#blackwindow').toggleClass('active');
          $('#updatediscform').toggleClass('active');
          //         target.innerText=newName;
        } else
        if (target.classList.contains('ekz1')
                    || target.classList.contains('ekz2')
                    || target.classList.contains('ekz3')
                    || target.classList.contains('ekz4')) {
          parent = target.parentElement;
          if (parent.tagName === 'TR') {
            did = parent.dataset.did;
            up.fillDiscRow(did);
            if (up.discRow) {
              up.saveDiscRow();
              up.fillUpdateEkzForm('ekz');
              $('#modesrc').val('table');
            }
          }
          $('#blackwindowekz').toggleClass('active');
          $('#updateekzform').toggleClass('active');
        } else
        if (target.classList.contains('zach1')
                    || target.classList.contains('zach2')
                    || target.classList.contains('zach3')
                    || target.classList.contains('zach4')) {
          parent = target.parentElement;
          if (parent.tagName === 'TR') {
            did = parent.dataset.did;
            up.fillDiscRow(did);
            if (up.discRow) {
              up.saveDiscRow();
              up.fillUpdateEkzForm('zach');
              $('#modesrc').val('table');
            }
          }
          $('#blackwindowekz').toggleClass('active');
          $('#updateekzform').toggleClass('active');
        } else
        if (target.classList.contains('indz1')
                    || target.classList.contains('indz2')
                    || target.classList.contains('indz3')
                    || target.classList.contains('indz4')) {
          parent = target.parentElement;
          if (parent.tagName === 'TR') {
            did = parent.dataset.did;
            up.fillDiscRow(did);
            if (up.discRow) {
              up.saveDiscRow();
              up.fillUpdateEkzForm('indz');
              $('#modesrc').val('table');
            }
          }

          $('#blackwindowekz').toggleClass('active');
          $('#updateekzform').toggleClass('active');
        } else alert('clicked');
        return;
      }
      target = target.parentNode;
    }
  };
  $('#blackwindow,#closeform,#closeparplanform').on('click', function (ev) {
    if ($('#selsem').length > 0) {
      let nomSemestra = $('#selsem').attr('data-nomsemestra');
      let nameSemestra = '#isem' + nomSemestra;
      $('#selsem').remove();
      $(nameSemestra).toggleClass('active');
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }

    $('#blackwindow').toggleClass('active');
    if ($('#updatediscform').hasClass('active')) $('#updatediscform').toggleClass('active');
    if ($('#updateparplanformcontainer').hasClass('active')) $('#updateparplanformcontainer').toggleClass('active');
  });
  $('#blackwindowekz,#closeformekz').on('click', function () {
    $('#blackwindowekz').toggleClass('active');
    $('#updateekzform').toggleClass('active');
  });
  //   let localSavedDiscRow = up.savedDiscRow;
  let clickHandler = function (ev) {
    ev.preventDefault();
    ev.stopPropagation();

    up.fillDiscRecFromForm();
    if (up.cmpDiscs()) alert('Данные не менялись');
    else {
      up.replaceUPlanDiscRowInHTMLTable();
      up.replaceUPlanCycleFooterRowInHTMLTable();
      up.replaceUPlanTotalFooterRowInHTMLTable();
      $('#blackwindow').toggleClass('active');
      $('#updatediscform').toggleClass('active');
    }
  };
  $('#btnaccept').on('click', clickHandler);
  $('#btnacceptekz').on('click', function (ev) {
    let mode;
    ev.preventDefault();
    ev.stopPropagation();

    up.fillDiscRecFromFormEkz();
    if (up.cmpDiscs()) alert('Данные не менялись');
    else if (!up.validateEkzListOnFormEkz()) {
      alert('Отметок не более 4-х');
    } else {
      up.replaceUPlanDiscRowInHTMLTable();
      mode = $('#modesrc').val();
      if (mode === 'form') up.fillUpdateDiscFormEkzZachIndz();
      $('#blackwindowekz').toggleClass('active');
      $('#updateekzform').toggleClass('active');
    }
  });
  $('#iekz').on('click', function () {
    up.fillUpdateEkzForm('ekz');
    $('#modesrc').val('form');
    $('#blackwindowekz').toggleClass('active');
    $('#updateekzform').toggleClass('active');
  });
  $('#izach').on('click', function () {
    up.fillUpdateEkzForm('zach');
    $('#modesrc').val('form');
    $('#blackwindowekz').toggleClass('active');
    $('#updateekzform').toggleClass('active');
  });
  $('#iindz').on('click', function () {
    up.fillUpdateEkzForm('indz');
    $('#modesrc').val('form');
    $('#blackwindowekz').toggleClass('active');
    $('#updateekzform').toggleClass('active');
  });
  $('#isem1b,#isem2b,#isem3b,#isem4b,#isem5b,#isem6b,#isem7b,#isem8b').on('click', function (ev) {
    let semnames = ['isem1', 'isem2', 'isem3', 'isem4', 'isem5', 'isem6', 'isem7', 'isem8'];
    if ($('#selsem').length > 0) return;
    let elem = ev.target;
    let elems = JSON.stringify(elem);
    let nomSemestra = 0;
    let nameSemestra = elem.id;
    if (nameSemestra && nameSemestra.length > 0) nomSemestra = parseInt(nameSemestra.charAt(nameSemestra.length - 1));
    if (nomSemestra > 0 && nomSemestra < 9) {
      $('#' + nameSemestra).toggleClass('active');
      up.fillUpdateSelectSemestrClocks(nomSemestra);
    }
  });
  $('#asidemenubtn,#asidemenuboxheader').on('click', function () {
    $('#asidemenubox').toggleClass('active');
  });
  $('#saveuplanbtn').on('click', function () {
    if (!up.uplan) {
      alert('План отсутствует!');
      return;
    }
    alert('_id=' + JSON.stringify(up.uplan._id));
  });
  $('#impfrxlsxbtn').on('click', function () {
    document.location.assign('./static/importe.html');
  });
};
// mongodb://santono:ar1737@ds237445.mlab.com:37445/uplany
// db.uplany.insert({ "foo" : "bar" })
//  API key: kaUDFzJwz5GfBtAeUnriufsAYkJLyfLf
// https://api.mlab.com/api/1/databases?apiKey=kaUDFzJwz5GfBtAeUnriufsAYkJLyfLf
// List collections https://api.mlab.com/api/1/databases/my-db/collections?apiKey=myAPIKey
// List documents https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey
