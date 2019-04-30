'use strict';

import { uPlanEntity } from '../models/UPlanEntity.js';
import { semclocks } from '../models/semClocks.js';
export let planService = () => {
};
planService.makeUPlanMarking = () => {
  if (!uPlanEntity) return;
  if (!uPlanEntity.cycly) return;
  if (uPlanEntity.cycly.length < 1) return;
  for (let i = 0; i < uPlanEntity.cycly.length; i++) {
    const cycle = uPlanEntity.cycly[i];
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
};
planService.isBakalavr = ()=> {
  if (uPlanEntity.okr.toUpperCase() === 'БАКАЛАВР') return true;
  return false;
};
planService.isMagistr = ()=> {
  if (uPlanEntity.okr.toUpperCase() === 'МАГИСТР') return true;
  return false;
};
planService.makeCycleFooter = (cycle, footerLine) => {
  let summaClockTot = 0;
  let summaZE = 0;
  let summaClockLek = 0;
  let summaClockLab = 0;
  let summaClockPra = 0;
  let summaClockSam = 0;
  let summySem = [0, 0, 0, 0, 0, 0, 0, 0];
  let disciplines;

  function sumDisciplines(discipliny) {
    for (let i = 0; i < discipliny.length; i++) {
      summaClockTot += discipliny[i].clocktot ? discipliny[i].clocktot : 0;
      summaZE += discipliny[i].ze ? discipliny[i].ze : 0;
      summaClockLek += discipliny[i].clocklek ? discipliny[i].clocklek : 0;
      summaClockLab += discipliny[i].clocklab ? discipliny[i].clocklab : 0;
      summaClockPra += discipliny[i].clockpra ? discipliny[i].clockpra : 0;
      summaClockSam += discipliny[i].clocksam ? discipliny[i].clocksam : 0;
      if (discipliny[i].semestry && discipliny[i].semestry.length > 0) {
        for (let j = 0; j < discipliny[i].semestry.length; j++) {
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
  let retLine = { ...footerLine };
  if (!cycle.footer.name.includes('акультатив')) {
    retLine.summaClockTot += summaClockTot;
    retLine.summaZE += summaZE;
    retLine.summaClockLek += summaClockLek;
    retLine.summaClockLab += summaClockLab;
    retLine.summaClockPra += summaClockPra;
    retLine.summaClockSam += summaClockSam;
    for (let e = 0; e < uPlanEntity.amntofsemesters; e++) retLine.summySem[e] += summySem[e];
  }
  return retLine;
}; // end of makeCycleFooter
planService.cmpDiscs = (disc1, disc2) => {
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
};
planService.getDisciplineReference = (did) => {
  let discipline;
  let cycle;
  if (!uPlanEntity.cycly) return null;
  if (!Array.isArray(uPlanEntity.cycly)) return null;
  if (uPlanEntity.cycly.length < 1) return null;
  for (let i = 0; i < uPlanEntity.cycly.length; i++) {
    cycle = uPlanEntity.cycly[i];
    if (cycle.basepart) {
      if (cycle.basepart.disciplines
        && Array.isArray(cycle.basepart.disciplines)
        && cycle.basepart.disciplines.length > 0) {
        discipline = cycle.basepart.disciplines.find(disc=>+disc.did === +did);
        if (discipline) {
          return discipline;
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
                  return discipline;
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
                  return discipline;
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
          return discipline;
        }
      }
    }
  }
  return null;
};
planService.putDisciplineIntoPlan = (discRow) => {
  let cycle;
  if (!uPlanEntity.cycly) return -1;
  if (!Array.isArray(uPlanEntity.cycly)) return -1;
  if (uPlanEntity.cycly.length < 1) return -1;
  let did = discRow.did;
  if (did <= 0) return -1;
  for (let i = 0; i < uPlanEntity.cycly.length; i++) {
    cycle = uPlanEntity.cycly[i];
    if (cycle.basepart) {
      if (cycle.basepart.disciplines
        && Array.isArray(cycle.basepart.disciplines)
        && cycle.basepart.disciplines.length > 0) {
        let index = cycle.basepart.disciplines.findIndex(disc=>+disc.did === +did);
        if (index >= 0) {
          cycle.basepart.disciplines[index] = { ...discRow };
          return null;
        }
      }
    }
    if (cycle.varpart) {
      if (cycle.varpart.parts) {
        if (cycle.varpart.parts.vyz) {
          if (cycle.varpart.parts.vyz.disciplines) {
            if (Array.isArray(cycle.varpart.parts.vyz.disciplines)) {
              if (cycle.varpart.parts.vyz.disciplines.length > 0) {
                let index = cycle.varpart.parts.vyz.disciplines.findIndex(disc=>+disc.did === +did);
                if (index >= 0) {
                  cycle.varpart.parts.vyz.disciplines[index] = { ...discRow };
                  return 0;
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
                let index = cycle.varpart.parts.student.disciplines
                  .findIndex(disc=>+disc.did === +did);
                if (index >= 0) {
                  cycle.varpart.parts.student.disciplines[index] = { ...discRow };
                  return 0;
                }
              }
            }
          }
        }
      }
    }
    if (cycle.disciplines) {
      if (Array.isArray(cycle.disciplines) && cycle.disciplines.length > 0) {
        let index = cycle.disciplines.findIndex(disc=>+disc.did === +did);
        if (index >= 0) {
          cycle.disciplines[index] = { ...discRow };
          return 0;
        }
      }
    }
  }
  return -1;
};
planService.calculateClocksUsingSemestry = (discRow) => {
  let clockLek = 0;
  let clockLab = 0;
  let clockPra = 0;
  let clockSam = 0;
  let retDiscRow = null;
  if (discRow.semestry
    && Array.isArray(discRow.semestry)) {
    clockLek = discRow.semestry.reduce((clockSum, current) => {
      let clockTmp;
      let nomSemestra;
      let weeks;
      let sumTmp;
      clockTmp = current.clocks
        && Array.isArray(current.clocks)
        && current.clocks.length === 3 ? current.clocks[0] : 0;
      nomSemestra = current.nomsemestra;
      weeks = (nomSemestra && nomSemestra > 0 && nomSemestra < 9)
        ? uPlanEntity.weekpersemestr[nomSemestra - 1] : 0;
      sumTmp = clockTmp * weeks;
      return clockSum + sumTmp;
    }, 0);
    clockLab = discRow.semestry.reduce((clockSum, current) => {
      let clockTmp;
      let nomSemestra;
      let weeks;
      let sumTmp;
      clockTmp = current.clocks
        && Array.isArray(current.clocks)
        && current.clocks.length === 3 ? current.clocks[1] : 0;
      nomSemestra = current.nomsemestra;
      weeks = nomSemestra && nomSemestra > 0 && nomSemestra < 9
        ? uPlanEntity.weekpersemestr[nomSemestra - 1] : 0;
      sumTmp = clockTmp * weeks;
      return clockSum + sumTmp;
    }, 0);
    clockPra = discRow.semestry.reduce((clockSum, current) => {
      let clockTmp;
      let nomSemestra;
      let weeks;
      let sumTmp;
      clockTmp = current.clocks
        && Array.isArray(current.clocks)
        && current.clocks.length === 3 ? current.clocks[2] : 0;
      nomSemestra = current.nomsemestra;
      weeks = nomSemestra && nomSemestra > 0 && nomSemestra < 9
        ? uPlanEntity.weekpersemestr[nomSemestra - 1] : 0;
      sumTmp = clockTmp * weeks;
      return clockSum + sumTmp;
    }, 0);
    clockSam = discRow.clocktot - clockLek - clockLab - clockPra;
    retDiscRow = { ...discRow };
    retDiscRow.clocklek = clockLek;
    retDiscRow.clocklab = clockLab;
    retDiscRow.clockpra = clockPra;
    retDiscRow.clocksam = clockSam;
  }
  return retDiscRow;
};
planService.fillSemestryRecForDisc = (nomSemestra, index, discRow) => {
  let findedSemestr;
  let retDiscRow = { ...discRow };
  if (index < 0) {
    let findedIndex = -1;
    if (discRow.semestry
      && Array.isArray(discRow.semestry)) {
      findedIndex = discRow.semestry.findIndex(elemSem=>+elemSem.nomsemestra === +nomSemestra);
    }
    if (findedIndex >= 0) {
      discRow.semestry.splice(findedIndex, 1);
    }
    retDiscRow = { ...retDiscRow };
    return retDiscRow;
  }
  retDiscRow = { ...discRow };
  if (retDiscRow.semestry
    && Array.isArray(retDiscRow.semestry)) {
    findedSemestr = retDiscRow.semestry.find(elemSem=>+elemSem.nomsemestra === +nomSemestra);
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
    if (!(retDiscRow.semestry
      && Array.isArray(retDiscRow.semestry))) retDiscRow.semestry = [];
    retDiscRow.semestry.push(o);
    if (retDiscRow.semestry.length > 1) {
      retDiscRow.semestry.sort((a, b) => a.nomsemestra - b.nomsemestra);
    }
  }
  return retDiscRow;
};
