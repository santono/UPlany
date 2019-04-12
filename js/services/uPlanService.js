'use strict';

import { uPlanEntity } from '../models/UPlanEntity.js';
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
