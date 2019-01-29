menugetplan=(function(conf) {
//     let fixedURL = "https://api.mlab.com/api/1/databases/uplany/collections/usersplany?";
//     let apiKey   = "kaUDFzJwz5GfBtAeUnriufsAYkJLyfLf";
//    let user     = {shifrKaf:95};
     let idplan;
     let config={
         mongoURL : "https://api.mlab.com/api/1/databases/uplany/collections/usersplany?",
         apiKey   : "kaUDFzJwz5GfBtAeUnriufsAYkJLyfLf",
         user     : window.user,
         rootElement : null,
         callBack : null 

     }
     let convertToHierarchyMenu=function(root,data) {
                if (!data) return;
                let li=document.createElement("li");
                let a=document.createElement("a");
                a.innerText=data.name;
                a.setAttribute("href", "#");
                li.appendChild(a); 
     //           console.log(data.childrens);
                if (data.childrens
                   && Array.isArray(data.childrens)
                   && data.childrens.length>0) {
                   let ul=document.createElement("ul");
                   for (let i=0;i<data.childrens.length;i++) {
                        convertToHierarchyMenu(ul,data.childrens[i]);
                   }
                   li.appendChild(ul);  
                } else {
                  a.dataset.id=data.id;
                }
//                console.log(root);
                root.appendChild(li);
     }
     let buildDOM = function(conf,data) {
              if (!data) 
                return;
              if (!Array.isArray(data))
                return;
              if (data.length==0)
                return;
              let ul=document.createElement("ul");
              for (let i=0;i<data[0].childrens.length;i++) {
                       convertToHierarchyMenu(ul,data[0].childrens[i]);
              }
 //             console.log(ul);
              let r=document.querySelector(conf.rootElement);
 //             console.log(r);
              r.appendChild(ul);
 //             console.log(conf.callback);
              if (conf.callback) {
//                 console.log($(conf.rootElement).html());
                 conf.callback.call(window.document); 
              }      
     }
     let buildMenuList = function(conf) {
          let q='q={"shifrkaf":'+conf.user.shifrKaf+'}';
          let URL=conf.mongoURL+q+"&apiKey="+conf.apiKey;
          let self=this;
          loader.showWait('Чтение списка учебных планов');
          $.ajax( { url: URL,
                  type: "GET"
          })
          .done(function(data) {
             loader.hideWait();
//             loader.showFinished('Список прочтен из БД');
             buildDOM(conf,data);
          })
          .fail(function( jqXHR, textStatus) {
             loader.hideWait();
             loader.showFinished('Ошибка чтения списка планов'+textStatus);
          });
     }

     return function(confpar) { 
              let conf=$.extend(config,confpar);
//              console.log(conf);
              if (!conf.rootElement)
                 return null; 
              let r=document.querySelector(conf.rootElement);
              if (!r)
                 return null; 
              buildMenuList(conf);
            return idplan;
     }
}());