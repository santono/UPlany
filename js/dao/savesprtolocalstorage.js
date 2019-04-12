'use strict';

import { ajaxConfig } from '../config/ajaxconfiguration.js';
import { loader } from '../views/loaderView.js';
export let saveSprToLS = (function dummySTS() {
  if (typeof (Storage) === 'undefined') {
    alert('Локальная БД не поддерживается Вашим броузером');
    return;
  }
//   localStorage.clear();
// 1. Загрузить список кафедр
  let loadListKaf = function dummyLLK() {
//    let q = '';
    let f = 'f={"shifrkaf":1,"namekaf":1,"_id":0}';
    let URL = ajaxConfig.mongoURL + 'kafedry?' + f + '&apiKey=' + ajaxConfig.apiKey;
//    let self = this;
    loader.showWait('Чтение списка кафедр');
    $.ajax({
      url: URL,
      type: 'GET'
    })
      .done((data) => {
        loader.hideWait();
//             loader.showFinished('Список прочтен из БД');
//             let listKaf=JSON.parse(data);
        localStorage.setItem('listKaf', JSON.stringify(data));
//             console.log(JSON.parse(localStorage.getItem("listKaf")));
//               console.log(data);
      })
      .fail((jqXHR, textStatus) => {
        loader.hideWait();
        loader.showFinished(`Ошибка чтения списка кафедр ${textStatus}`);
      });
  };
  let loadAllLists = () => {
    loadListKaf();
  };
  return function () {
    loadAllLists();
  };

// 2. Загрузить спикок ОКР

}());
