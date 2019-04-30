'use strict';

import { planView } from './views/uPlanView.js';
import { loader } from './views/loaderView.js';
import { ajaxConfig } from './config/ajaxconfiguration.js';
import { menugetplan } from './views/menugetplanview.js';
import { uPlanEntity } from './models/UPlanEntity.js';
import { User } from './models/userEntity.js';
import { semclocks } from './models/semClocks.js';
import { planService } from './services/uPlanService.js';
import { planDAO } from './dao/UPlanDAO.js';
var up;
var user;

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
    let discipline = planService.getDisciplineReference(did);
    if (discipline) {
      this.discRow = { ...discipline };
    }
  }

  fillDisciplineFromDiscRow() {
    if (!this.discRow) return;
    if (!this.discRow.did) return;
    if (this.discRow.did < 1) return;
    let kz = planService.putDisciplineIntoPlan(this.discRow);
    if (kz < 0) {
      alertify.alert('Возникла ошибка сохранения записи. Пожалуйста сообщите системному администратору.', function(){});
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

/*
  fillDiscRecFromFormEkz() {
    let j; let
      n;
    let s; let arr; let
      mode;
    mode = $('#modeekz').val();

    arr = [];
    j = 0;
    for (let i = 0; i < uPlanEntity.amntofsemesters; i++) {
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
*/
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
  // end of replaceUPlanCycleRowInHTMLTable()
  showPlan() {
    planService.makeUPlanMarking();
    planView.makeUPlanHat();
    planView.makeUPlanLines(this.body);
    planView.makePlanFooter(this.body);
    planView.makeInformPart(this.body);
  }
/*
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
*/
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
    let self = this;
    select.addEventListener('change', function (ev) {
      let nomSemestr = this.attributes.getNamedItem('data-nomsemestra').value;
      let nameSemestra = '#isem' + nomSemestr;
      let index = this.options[this.selectedIndex].value;
      let s = '';
      if (index > 0) {
        index -= 1;
        s = '' + semclocks[index].clocks[0] + ' ' + semclocks[index].clocks[1] + ' ' + semclocks[index].clocks[2];
        $(nameSemestra).val(s);
//        self.fillSemestryRecForDisc(nomSemestra, index);
        self.discRow = planService.fillSemestryRecForDisc(nomSemestra, index, self.discRow);
      } else {
        s = '';
        $(nameSemestra).val(s);
//        self.fillSemestryRecForDisc(nomSemestra, -1);
        self.discRow = planService.fillSemestryRecForDisc(nomSemestra, -1, self.discRow);
      }

      elem.removeChild(this);
      $(nameSemestra).toggleClass('active');
      self.discRow = planService.calculateClocksUsingSemestry(self.discRow);
      $('#iclocklek').val(self.discRow.clocklek);
      $('#iclocklab').val(self.discRow.clocklab);
      $('#iclockpra').val(self.discRow.clockpra);
      $('#iclockSam').val(self.discRow.clocksam);
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
/*
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
*/

  insertUPlanIntoMDB() {
    planView.insertUPlanIntoMDB()
      .then(()=>{})
      .catch(()=>{});
  }

  putUPlanIntoMDB() {
    planDAO.selectUPlanFromMDB()
      .then((data)=>{
         console.log(data);
      })
      .then(()=>{})
      .catch(()=>{});

    planView.insertUPlanIntoMDB()
      .then(()=>{})
      .catch(()=>{});
  }
/*
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
*/
  getUPlanFromMDB(id) {
    planDAO.getUPlanFromMDB(id)
      .then(()=>this.showPlan())
      .catch(()=>{});
  }
/*  
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
  */
  checkUPlanExistsInMDB() {
    planDAO.checkUPlanExistsInMDB()
      .then((data)=> {
        if (Array.isArray(data)) {
          if (data.length > 0) {
            let rec = data[0];
            let id = '' + rec._id.$oid;
            console.log(id); 
          }
        }
      })
      .catch(()=>{}); 
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
 // up.selectUPlanFromMDB();
  up.checkUPlanExistsInMDB();
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
          if (planService.isMagistr()) {
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
          if (planService.isMagistr()) {
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

    up.discRow = planView.fillDiscRecFromForm(up.discRow);
    if (planService.cmpDiscs(up.discRow, up.savedDiscRow)) alert('Данные не менялись');
    else {
//      up.replaceUPlanDiscRowInHTMLTable();
      planView.replaceUPlanDiscRowInHTMLTable(up.discRow);
      planView.replaceUPlanCycleFooterRowInHTMLTable(up.discRow.dcycle);
      planView.replaceUPlanTotalFooterRowInHTMLTable();
      up.fillDisciplineFromDiscRow();
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
    if (planService.cmpDiscs(up.discRow,up.savedDiscRow)) alert('Данные не менялись');
    else if (!up.validateEkzListOnFormEkz()) {
      alert('Отметок не более 4-х');
    } else {
//      up.replaceUPlanDiscRowInHTMLTable();
      planView.replaceUPlanDiscRowInHTMLTable(up.discRow);
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
