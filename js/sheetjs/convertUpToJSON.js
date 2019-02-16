convertUpToJSON=(function() {
   let selfSheet=null;
   let getStringFromCell=function(cell) {
       let r=cell.r-1;
       let c=cell.c-1;
       let retVal=undefined;
       let cellRef=XLSX.utils.encode_cell({c:c,r:r});
       try {
          retVal=selfSheet[XLSX.utils.encode_cell({c:c,r:r})].v;
       } catch (error) {
          retVal=undefined;
       }  
       if (retVal) {
          if (!(retVal instanceof String)) retVal=String(retVal);
          retVal = retVal.trim();
       }
       return retVal;
   }

   let getIntegerFromCell=function(cell) {
       let retVal;
       retVal=getStringFromCell(cell);
       if (retVal) {
          retVal=parseInt(retVal);
         if (isNaN(retVal)) retVal=0;
       }
       return retVal; 
   }
   let getFloatFromCell=function(cell) {
       let retVal;
       retVal=getStringFromCell(cell);
       if (retVal) {
          retVal=parseFloat(retVal);
         if (isNaN(retVal)) retVal=0.0;
       }
       return retVal; 
   }
   let getArrayOfIntegerStartFromCell=function(cell,cnt,step) {
       let r=cell.r-1;
       let c=cell.c-1;
       let retVal =[];
       let retValI;
       for (let i=0;i<cnt;i++) {
          let c1=c+i*step;
          let cells=XLSX.utils.encode_cell({c:c1,r:r});
          let s=selfSheet[cells].v;
          retValI=parseInt(s);
          if (isNaN(retValI)) retValI=0;
          retVal.push(retValI);
       }
       return retVal;
   }
   let getArrayOfFloatStartFromCell=function(cell,cnt,step) {
       let r=cell.r-1;
       let c=cell.c-1;
       let retVal =[];
       let retValF;
       for (let i=0;i<cnt;i++) {
          let c1=c+i*step;
          let cells=XLSX.utils.encode_cell({c:c1,r:r});
          let s=selfSheet[cells].v;
          retValF=parseFloat(s);
          if (isNaN(retValF)) retValF=0.0;
          retVal.push(retValF);
       }
       return retVal;
   }
   let getArrayOfPodpisi=function(configUPlanXLS) {
       let podpisi=[];
       let rstart=configUPlanXLS.podpisiRow;
       for (let i=0;i<3;i++) {
          let r=rstart+i*2;
          let s=getStringFromCell({c:2,r:r});
          let s1=getStringFromCell({c:3,r:r});
          let dolg=s.trim()+' '+s1.trim();
          let fio=getStringFromCell({c:39,r:r});
          podpisi.push({dolg:dolg,fio:fio});
       }
       return podpisi;
   }
   let getArrayOfGosAte=function(configUPlanXLS) {
       let gosattestaciya=[];
       let rstart=configUPlanXLS.atestacRow;
       for (let i=0;i<configUPlanXLS.amntOfAte;i++){
          let r    = rstart+i;
          let c    = configUPlanXLS.ateSemestrCol; 
          let sem  = getIntegerFromCell({c:c,r:r});
          c    = configUPlanXLS.ateZeCol; 
          let ze   = getFloatFromCell({c:c,r:r});
          let name = getStringFromCell({c:3,r:r});
          let okr  = getStringFromCell({c:2,r:r});
          let npp  = i+1;
          gosattestaciya.push({npp:npp,okr:okr,name:name,nomsemestra:sem,ze:ze});
       }
       return gosattestaciya;

   }
   let getArrayOfPractics=function(configUPlanXLS) {
       let practics=[];
       let rstart=configUPlanXLS.praktRow;
       for (let i=0;i<configUPlanXLS.amntOfPrakt;i++){
          let r    = rstart+i;
          let name  = getStringFromCell({c:2,r:r});
          let sem   = getIntegerFromCell({c:4,r:r});
          let aow   = getIntegerFromCell({c:9,r:r});
          let ze    = getFloatFromCell({c:14,r:r});
          let npp  = i+1;
          practics.push({npp:npp,name:name,nomsemestra:sem,nmbofweek:aow,ze:ze});
       }
       return practics;
   }
   let getArrayOfCyclesForPlan=function(configUPlanXLS) {
       let getListOfInteger= function(row,col,amntOfCol) {
            let retVal=[];
            for (let i=0;i<amntOfCol;i++) {
                let c=col+i;
                let iVal=getIntegerFromCell({r:row,c:c});
                if (iVal>0)
                   retVal.push(iVal);
            }
            return retVal;
       }

       let getDiscplinyFromCycle= function(firstRow,lastRow) {
           let iVal,aVal;
           let s,s1;
           let disciplines=[];
           for (let i=firstRow;i<=lastRow;i++) {
               s  = getStringFromCell({r:i,c:configUPlanXLS.nomerDCol});
               s1 = getStringFromCell({r:i,c:configUPlanXLS.nameDiscCol});
               if (!s1 || s1.length < 1) break;
               let disciplina      = {};
               disciplina.shifr    = s;
               disciplina.name     = s1;
               disciplina.shifrkaf = 0;
               let ekzpersemestr = getListOfInteger(i,configUPlanXLS.ekzCol,4);
               if (ekzpersemestr.length>0)
                  disciplina.ekzpersemestr=ekzpersemestr;
               let zachpersemestr = getListOfInteger(i,configUPlanXLS.zachCol,4);
               if (zachpersemestr.length>0)
                  disciplina.zachpersemestr=zachpersemestr;
               iVal = getIntegerFromCell({r:i,c:configUPlanXLS.kursPrCol});
               if (iVal && iVal>0) 
                  disciplina.kursp=iVal;
               iVal = getIntegerFromCell({r:i,c:configUPlanXLS.kursRabCol});
               if (iVal && iVal>0) 
                  disciplina.kursr=iVal;
               let indzpersemestr = getListOfInteger(i,configUPlanXLS.indZCol,4);
               if (indzpersemestr.length>0)
                  disciplina.indzpersemestr=indzpersemestr;

               iVal = getIntegerFromCell({r:i,c:configUPlanXLS.clocksCol});
               disciplina.clocktot=iVal;
               aVal = getFloatFromCell({r:i,c:configUPlanXLS.kreditsCol});
               disciplina.ze=aVal;
               iVal = getIntegerFromCell({r:i,c:configUPlanXLS.clockLekCol});
               if (iVal>0) disciplina.clocklek=iVal;
               iVal = getIntegerFromCell({r:i,c:configUPlanXLS.clockLabCol});
               if (iVal>0) disciplina.clocklab=iVal;
               iVal = getIntegerFromCell({r:i,c:configUPlanXLS.clockPrCol});
               if (iVal>0) disciplina.clockpra=iVal;
               iVal = getIntegerFromCell({r:i,c:configUPlanXLS.clockSamCol});
               if (iVal>0) disciplina.clocksam=iVal;
               let semestry = [];
               let cntSem   = 0 ;
               for (let j=0;j<configUPlanXLS.amntOfSemestrsValue;j++) {
                   let currCol=configUPlanXLS.semestr1Col+3*j;
                   let currCol1=currCol+1;
                   let currCol2=currCol+2;
                   let iLek=getIntegerFromCell({r:i,c:currCol});
                   let iLab=getIntegerFromCell({r:i,c:currCol1});
                   let iPra=getIntegerFromCell({r:i,c:currCol2});
                   if  (!((iLek && iLek>0) || (iLab && iLab>0) || (iPra && iPra>0))) continue;
                   cntSem++;
                   let clocks=[];
                   clocks.push((iLek && iLek>0)?iLek:0);
                   clocks.push((iLab && iLab>0)?iLab:0);
                   clocks.push((iPra && iPra>0)?iPra:0);
                   semestry.push({nomsemestra:cntSem,clocks:clocks});
               }
               disciplina.semestry=semestry;
               disciplines.push(disciplina);
            }
           return disciplines;
       }

       let getCycleForPlan=function(blockRow,basePartRow,varPartRow,vuzRow,studRow,footerRow) {
           let cycle={};
           let s,s1;
           s  = getStringFromCell({c:1,r:blockRow,}).trim();
           s1 = getStringFromCell({c:2,r:blockRow,}).trim();
           cycle.shifr = s;
           cycle.name  = s1;
           if (varPartRow>0) {
              s  = getStringFromCell({c:1,r:basePartRow}).trim();
              s1 = getStringFromCell({c:2,r:basePartRow}).trim();
              let basepart={};
              basepart.shifr = s ;
              basepart.name  = s1;
              let discipliny=getDiscplinyFromCycle(basePartRow+1,varPartRow-1);
              basepart.disciplines=discipliny;
              cycle.basepart=basepart;
           } else {
              let discipliny=getDiscplinyFromCycle(blockRow+1,basePartRow-1);
              cycle.disciplines=discipliny;
           }
           if (varPartRow>0) {
              s  = getStringFromCell({c:1,r:varPartRow}).trim();
              s1 = getStringFromCell({c:2,r:varPartRow}).trim();
              let varpart={};
              varpart.shifr = s ;
              varpart.name  = s1;
              let parts     = {};
              let vyz       = {};
              vyz.shifr     = " ";
              vyz.name      = "Обязательныедисциплины (выборВУЗа)";
              let discipliny=getDiscplinyFromCycle(vuzRow+1,studRow-1);
              vyz.disciplines=discipliny;
              parts.vyz=vyz;
              let student   = {};
              student.shifr = " "; 
              student.name  = "Обязательныедисциплины (выборВУЗа)";
              discipliny=getDiscplinyFromCycle(studRow+1,footerRow-1);
              student.disciplines=discipliny;
              parts.student=student;
              varpart.parts=parts;
              cycle.varpart=varpart;
           }
           s  = getStringFromCell({c:1,r:footerRow}).trim();
           s1 = getStringFromCell({c:2,r:footerRow}).trim();
           footer={};
           footer.shifr = s;
           footer.name  = s1;
           cycle.footer=footer;


           return cycle;
       }


//     Начало главной программы импорта циклов    
       let cycly=[];
       if (configUPlanXLS.block1Row && configUPlanXLS.block1Row>0) {
          let cycle=getCycleForPlan(
                      configUPlanXLS.block1Row
                    , configUPlanXLS.base1PartRow
                    , configUPlanXLS.var1PartRow
                    , configUPlanXLS.vuz1Row
                    , configUPlanXLS.stud1Row
                    , configUPlanXLS.footer1Row);
          cycly.push(cycle);
        }
       if (configUPlanXLS.block2Row && configUPlanXLS.block2Row>0) {
          let cycle=getCycleForPlan(
                      configUPlanXLS.block2Row
                    , configUPlanXLS.base2PartRow
                    , configUPlanXLS.var2PartRow
                    , configUPlanXLS.vuz2Row
                    , configUPlanXLS.stud2Row
                    , configUPlanXLS.footer2Row);
          cycly.push(cycle);
        }
       if (configUPlanXLS.block3Row && configUPlanXLS.block3Row>0) {
          let cycle=getCycleForPlan(
                      configUPlanXLS.block3Row
                    , configUPlanXLS.base3PartRow
                    , configUPlanXLS.var3PartRow
                    , configUPlanXLS.vuz3Row
                    , configUPlanXLS.stud3Row
                    , configUPlanXLS.footer3Row);
          cycly.push(cycle);
        }
       if (configUPlanXLS.praktikiRow && configUPlanXLS.praktikiRow>0) {
          let cycle=getCycleForPlan(
                      configUPlanXLS.praktikiRow
                    , configUPlanXLS.footerPraktRow
                    , configUPlanXLS.var3PartRow
                    , configUPlanXLS.vuz3Row
                    , configUPlanXLS.stud3Row
                    , configUPlanXLS.footerPraktRow);
          cycly.push(cycle);
        }
       if (configUPlanXLS.itogGosAtestacRow
        && configUPlanXLS.footerIgsRow
        && configUPlanXLS.itogGosAtestacRow>0
        && configUPlanXLS.itogGosAtestacRow<configUPlanXLS.footerIgsRow) {
          let cycle=getCycleForPlan(
                      configUPlanXLS.itogGosAtestacRow
                    , configUPlanXLS.footerIgsRow
                    , 0
                    , 0
                    , 0
                    , configUPlanXLS.footerIgsRow);
          cycly.push(cycle);
        }
       if (configUPlanXLS.fizVospRow
        && configUPlanXLS.footerFizVospRow
        && configUPlanXLS.fizVospRow>0
        && configUPlanXLS.fizVospRow<configUPlanXLS.footerFizVospRow) {
          let cycle=getCycleForPlan(
                      configUPlanXLS.fizVospRow
                    , configUPlanXLS.footerFizVospRow
                    , 0
                    , 0
                    , 0
                    , configUPlanXLS.footerFizVospRow);
          cycly.push(cycle);
        }
       if (configUPlanXLS.facultativRow
        && configUPlanXLS.footerFctvRow
        && configUPlanXLS.facultativRow>0
        && configUPlanXLS.facultativRow<configUPlanXLS.footerFctvRow) {
          let cycle=getCycleForPlan(
                      configUPlanXLS.facultativRow
                    , configUPlanXLS.footerFctvRow
                    , 0
                    , 0
                    , 0
                    , configUPlanXLS.footerFctvRow);
          cycly.push(cycle);
        }

       return cycly;

   }

  return function (sheet,configUPlanXLS){
   if (!sheet) return;
   selfSheet=sheet;
   UPlan={};
   if (localStorage.getItem("UPlan")) {
       localStorage.removeItem("UPlan");
   }
   let s  = getStringFromCell(configUPlanXLS.UGNPShifrCell);
   let s1 = getStringFromCell(configUPlanXLS.UGNPNameCell);
   UPlan.UGNP={shifr:s,name:s1};
   s  = getStringFromCell(configUPlanXLS.naprShifrCell);
   s1 = getStringFromCell(configUPlanXLS.naprNameCell);
   UPlan.napr={shifr:s,name:s1};
   s  = getStringFromCell(configUPlanXLS.profilShifrCell);
   s1 = getStringFromCell(configUPlanXLS.profilNameCell);
   UPlan.profil={shifr:s,name:s1};
   s  = getStringFromCell(configUPlanXLS.formaObCell);
   UPlan.formaob=s;
   s  = getIntegerFromCell(configUPlanXLS.yearPostCell);
   UPlan.yearpost=s;
   s  = getStringFromCell(configUPlanXLS.okrCell);
   UPlan.okr=s;
   s  = getIntegerFromCell(configUPlanXLS.srokObCell);
   UPlan.srokob=s;
   s  = getStringFromCell(configUPlanXLS.kafedraCell);
   UPlan.kafedra=s;
   s  = configUPlanXLS.amntOfSemestrsValue;
   UPlan.amntofsemesters=parseInt(s);
   let wps=getArrayOfIntegerStartFromCell(configUPlanXLS.weekPerSemestrCell,UPlan.amntofsemesters,3);
   UPlan.weekpersemestr=wps;
   let cycly=getArrayOfCyclesForPlan(configUPlanXLS);
   UPlan.cycly=cycly;
   s  = getStringFromCell({r:configUPlanXLS.footerGlobalRow,c:1});
   s1 = getStringFromCell({r:configUPlanXLS.footerGlobalRow,c:2});
   UPlan.footer={shifr:s,name:s1};
   let cpw=getArrayOfIntegerStartFromCell(configUPlanXLS.clocksPerWeekCell,UPlan.amntofsemesters,3);
   UPlan.clocksperweek=cpw;
   let nkp=getArrayOfIntegerStartFromCell(configUPlanXLS.nmbOfKursPCell,UPlan.amntofsemesters,3);
   UPlan.nmbofkursp=nkp;
   let nkr=getArrayOfIntegerStartFromCell(configUPlanXLS.nmbOfKursRCell,UPlan.amntofsemesters,3);
   UPlan.nmbofkursr=nkr;
   let niz=getArrayOfIntegerStartFromCell(configUPlanXLS.nmbOfIndZCell,UPlan.amntofsemesters,3);
   UPlan.nmbofindz=niz;
   let nek=getArrayOfIntegerStartFromCell(configUPlanXLS.nmbOfEkzCell,UPlan.amntofsemesters,3);
   UPlan.nmbofekz=nek;
   let nza=getArrayOfIntegerStartFromCell(configUPlanXLS.nmbOfZachCell,UPlan.amntofsemesters,3);
   UPlan.nmbofzach=nza;
   let nze=getArrayOfFloatStartFromCell(configUPlanXLS.nmbOfZeCell,UPlan.amntofsemesters,3);
   UPlan.nmbofze=nze;
   let nzepy=getArrayOfFloatStartFromCell(configUPlanXLS.nmbOfZePerYearCell,UPlan.amntofsemesters/2,6);
   UPlan.nmbofzeperyear=nzepy;
   let practics=getArrayOfPractics(configUPlanXLS);
   UPlan.praktics=practics;
   let gosattestaciya=getArrayOfGosAte(configUPlanXLS);
   UPlan.gosattestaciya=gosattestaciya;
   let podpisi=getArrayOfPodpisi(configUPlanXLS);
   UPlan.podpisi=podpisi;
   
   localStorage.setItem("UPlan",JSON.stringify(UPlan)); 
  }
}());