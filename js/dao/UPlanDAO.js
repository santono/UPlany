'use strict';

import { uPlanEntity, setUPlanEntity } from '../models/UPlanEntity.js';
import { ajaxConfig } from '../config/ajaxconfiguration.js';
import { loader } from '../views/loaderView.js';

export let planDAO = () => {};
planDAO.getUPlanFromMDB = (id) => {
  return new Promise((resolve, reject) => {
    let apiKey = ajaxConfig.apiKey;
    let fixedURL = ajaxConfig.mongoURL + 'uplany/';
    //          let fixedURL="https://api.mlab.com/api/1/databases/uplany/collections/uplany/";
    //          let q='q={"_id": ObjectId("'+id+'") }';
    let q = id;
    let URL = fixedURL + q + '?apiKey=' + apiKey;
    loader.showWait('Чтение учебного плана');
    $.ajax({
      url: URL,
      type: 'GET'
    })
      .done((data) => {
        loader.hideWait();
        let iplans = JSON.stringify(data);
        let iplan = JSON.parse(iplans);
        //        let body = document.querySelector('#planbody');
        setUPlanEntity(iplan);
        resolve();
      //             window.up.showPlan();
      //             loader.showFinished('Список прочтен из БД');
      })
      .fail((jqXHR, textStatus) => {
      //            alert( "Ошибка сохранения плана "+ textStatus );
        loader.hideWait();
        const errMessage = `Ошибка чтения учебного плана ${textStatus}`;
        loader.showFinished(errMessage);
//        const error = errMessage;
        reject();
//        reject(error);
//        reject(`Ошибка чтения учебного плана ${textStatus}`);
      });
  });
};
planDAO.insertUPlanIntoMDB = () => {
  return new Promise((resolve, reject) => {
    //          return;
    let fixedURL = ajaxConfig.mongoURL + 'uplany?apiKey=' + ajaxConfig.apiKey;
    //          let fixedURL="https://api.mlab.com/api/1/databases/uplany/collections/uplany?apiKey=kaUDFzJwz5GfBtAeUnriufsAYkJLyfLf";
    //            $.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey",
    loader.showWait('Вставка учебного плана в БД');
    $.ajax({
      url: fixedURL,
      data: JSON.stringify(uPlanEntity),
      type: 'POST',
      contentType: 'application/json'
    })
      .done(() => {
        loader.hideWait();
        loader.showFinished('План записан в БД');
        resolve();
        //             alert( "План сохранен" );
      })
      .fail((jqXHR, textStatus) => {
        //            alert( "Ошибка сохранения плана "+ textStatus );
        loader.showFinished(`Ошибка сохранения плана ${textStatus}`);
        reject();
      });
  });
};
planDAO.checkUPlanExistsInMDB = () => {
  return new Promise((resolve, reject) => {
    let apiKey = ajaxConfig.apiKey;
    //          let fixedURL="https://api.mlab.com/api/1/databases/uplany/collections/uplany?apiKey=kaUDFzJwz5GfBtAeUnriufsAYkJLyfLf";
    //          let fixedURL="https://api.mlab.com/api/1/databases/uplany/collections/uplany?q={"active": true}&f={"firstName": 1, "lastName": 1}&c=true&apiKey=";
    let fixedURL = ajaxConfig.mongoURL + 'uplany?';
    //          let fixedURL="https://api.mlab.com/api/1/databases/uplany/collections/uplany?";
    //          let q='q={"napr.shifr": "09.03.02";
    //let q = `q={"napr.shifr":"${uPlanEntity.napr.shifr}","yearpost":"${uPlanEntity.yearpost}","formaob":"${uPlanEntity.formaob}","okr":"${uPlanEntity.okr}"}`;
    let q = `q={"napr.shifr":"${uPlanEntity.napr.shifr}","yearpost":"2017","formaob":{$regex:'${uPlanEntity.formaob}',$opltions:'i'}},"okr":{$regex:'${uPlanEntity.okr}',$options:'i'}}`;
    //        status: { $in: [ "A", "D" ] }}';
    let f = 'f={"_id":1}';
    let l = 'l=1';
    //            $.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey",
    let URL = fixedURL + q + '&' + f + '&' + l + '&apiKey=' + apiKey;
    console.log(URL);
    loader.showWait('Чтение учебного плана');

    $.ajax({
      url: URL,
      //     data: JSON.stringify( this.uplan ),
      type: 'GET'
      //    contentType: "application/json" }
    })
      .done((data) => {
        loader.hideWait();
        loader.showFinished('Учебный план прочтен из БД');
        resolve(data);
      })
      .fail((jqXHR, textStatus) => {
        //            alert( "Ошибка сохранения плана "+ textStatus );
        loader.hideWait();
        const errMessage = `Ошибка чтения плана ${textStatus}`;
        loader.showFinished(errMessage);
        reject();
      });
  });
};
