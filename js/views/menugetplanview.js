'use strict';

import { ajaxConfig } from '../config/ajaxconfiguration.js';
import { loader } from '../views/loaderView.js';
export let menugetplan = (function (conf) {
//     let fixedURL = "https://api.mlab.com/api/1/databases/uplany/collections/usersplany?";
//     let apiKey   = "kaUDFzJwz5GfBtAeUnriufsAYkJLyfLf";
//    let user     = {shifrKaf:95};
  let idplan;
  let config = {
    mongoURL: ajaxConfig.mongoURL + '/usersplany?',
    apiKey: ajaxConfig.apiKey,
    user: window.user,
    rootElement: null,
    callBack: null
  };
  let convertToHierarchyMenu = (root, data) => {
    if (!data) return;
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.innerText = data.name;
    a.setAttribute('href', '#');
    li.appendChild(a);
     //           console.log(data.childrens);
    if (data.childrens
      && Array.isArray(data.childrens)
      && data.childrens.length > 0) {
      let ul = document.createElement('ul');
      for (let i = 0; i < data.childrens.length; i++) {
        convertToHierarchyMenu(ul, data.childrens[i]);
      }
      li.appendChild(ul);
    } else {
      a.dataset.id = data.id;
    }
//                console.log(root);
    root.appendChild(li);
  };
  let buildDOM = (conf, data) => {
    if (!data) {
      return;
    }
    if (!Array.isArray(data)) {
      return;
    }
    if (data.length === 0) {
      return;
    }
    let ul = document.createElement('ul');
    for (let i = 0; i < data[0].childrens.length; i++) {
      convertToHierarchyMenu(ul, data[0].childrens[i]);
    }
//              console.log(conf.rootElement);
    let r = document.querySelector(conf.rootElement);
 //             console.log(r);
    r.appendChild(ul);
 //             console.log(conf.callback);
    if (conf.callback) {
//                 console.log($(conf.rootElement).html());
      conf.callback.call(window.document);
    }
  };
  let buildMenuList = (confpar) => {
    let q = 'q={"shifrkaf":' + confpar.user.shifrKaf + '}';
    let URL = confpar.mongoURL + q + '&apiKey=' + confpar.apiKey;
 //   let self = this;
    loader.showWait('Чтение списка учебных планов');
    $.ajax({
      url: URL,
      type: 'GET'
    })
      .done((data) => {
        loader.hideWait();
        localStorage.setItem('userPlany', JSON.stringify(data));
        buildDOM(conf, data);
      })
      .fail((jqXHR, textStatus) => {
        loader.hideWait();
        loader.showFinished(`Ошибка чтения списка планов ${textStatus}`);
      });
  };

  let buildMenuListFromLocalStorage = (confpar) => {
    let dataS = localStorage.getItem('userPlany');
    let data = JSON.parse(dataS);
    buildDOM(confpar, data);
  };

  return (confpar) => {
    let confin = $.extend(config, confpar);
//              console.log(conf);
    if (!confin.rootElement) {
      return null;
    }
    let r = document.querySelector(confin.rootElement);
    if (!r) {
      return null;
    }
//               console.log(localStorage);
    let datas = localStorage.getItem('userPlany');
    let data = JSON.parse(datas);
    let shifrKaf1 = null;
    let shifrKaf2 = confin.user.shifrKaf;
//               console.log(data);
    if (data) {
//                  console.log(" userPlany.shifrkaf="+data[0].shifrkaf); 
      shifrKaf1 = data[0].shifrkaf;
    }
//                console.log('shifrKaf1='+shifrKaf1+' shifrKaf2='+shifrKaf2);
    if ((typeof (Storage) === 'undefined')
      || (shifrKaf1 !== shifrKaf2)) {
//                console.log("ajax ");
      buildMenuList(confin);
    } else {
//               console.log("localStorage");
      buildMenuListFromLocalStorage(confin);
    }
    return idplan;
  };
}());
