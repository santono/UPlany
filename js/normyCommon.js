normyCommon={
  clocksPerZE:36 ,
  zePerWeek:1.5  ,
  formyOb:[{shifr:1,name:"Очная"}] ,
  kratnostObjema:[{discplines:1},{praktik:1.5}] ,
  weekPerYear:652
}
normyBakalavry={
 //Количество учебных недель 1 курс (осень/весна)
  weekPerSemestr:[ {
         shifr:1,          //Очная
         kurs:[[17,17],[17,17],[17,17],[14,14]]
     },
     {
         shifr:2,          //Заочная      
         kurs:[[1,1],[1,1],[1,1],[1,1]]
     }
  ],
  //Недельная аудиторная нагрузка
  audPerWeek:{
    dnewnMin:28,
    dnewbMax:30,
    zaochMin:80,
    zaochMax:90

  },
  //"Вилка" аудиторной нагрузки в процентах
  audProc:{
    dnewnMin:33.33,
    dnewnMax:66.67,
    zachMin:-1,        //Не оговаривается
    zaochMax:-1
  },
  //Max количество экзаменов в семестре
  maxNmbEkzPerSemestr:  [5,5,5,5,5,5,5,4],
  //Min количество экзаменов в семестре
  minNmbEkzPerSemestr:  [4,4,4,4,4,4,4,4],
  //Max количество зачётов в семестре
  maxNmbZachPerSemestr: [6,6,6,6,6,6,6,6],
  //Min количество экзаменов в семестре
  minNmbEkzPerSemestr:  [4,4,4,4,4,4,4,4],
  maxNmbOfKpAndKrTotal:6,  //Макс количество КП и КР за бакалавриат
  maxNmbOfKpAndKrPerSemestr:2, //Макс количество КП и КР за семестр
  maxNmbOfKpPerSemestr:1, //Макс количество КП  за семестр
  maxNmbOfKpAndKrAndIZPerSemestr:[5,5], //[Очное заочное]Max количество КР+ КП+ИЗ в семестр
  normaticnSrkObuch: {//Объем нормативного срока обучения бакалавриат
      clocks:{denvn:8968,zaoch:8640},
      ZE:240
  },
  //Max количество факультативов за бакалавриат (ЗЕ)
  maxNmbOfFacultativ:60,
  //Min объем дисциплины (ЗЕ)
  minZEPerDiscipline:2,
  //Min объем дисциплины для экзамена (ЗЕ)
  minZEForEzkz:3,
  //Min трудоемкость курсовых в рамках самостоятельной работы (ЗЕ)
  minTrudoemkostKp:1.5,
  minTrudoemkostKr:1,
  //Min объем дисциплины для ИЗ (ЗЕ)
  minDisciplineZEForIz:3,
  // Min объем дисциплины для КР и КП (ЗЕ)
  minDisciplineZEForKpAndKr:3,
  //Max количество дисциплин в бакалавриате
  maxNmbOfDisciplinePerBakavriat:54,
  //Суммарная трудоемкость практик (нед.)
  totalTrudoekostPraktikMin:10,
  totalTrudoekostPraktikMax:10,
  //Суммарная трудоемкость ИГА (нед.)
  totalTrudoekostIGAMin:6,
  totalTrudoekostIGAMax:6,
  //Трудоемкость государственного экзамена (нед.)
  trudoemkostGosEkzMin:1,
  trudoemkostGosEkzMax:1
}


