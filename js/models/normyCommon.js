'use strict';

export let normyCommon = {
  clocksPerZE: 36,
  zePerWeek: 1.5,
  formyOb: [{ shifr: 1, name: 'Очная' }, { shifr: 2, name: 'Заочная' }],
  kratnostObjema: [{ discplines: 1 }, { praktik: 1.5 }, { IGA: 1.5 }, { gosEkz: 1.5 }],
  weekPerYear: 52,
  okrs: [{ shifr: 1, name: 'бакалавр' }, { shifr: 2, name: 'магистр' }, { shifr: 3, name: 'специалист' }],
  structurUnit: [{ shifr: 1, name: 'институт' }, { shifr: 2, name: 'факультет' }],
  geoDistrict: [{ shifr: 1, name: 'Луганск' }, { shifr: 2, name: 'Антрацит' }, { shifr: 3, name: 'Краснодон' }, { shifr: 4, name: 'Стаханов' }],
  cycles: [{ shifr: 1, name: 'гуманитарный, социальный и экономический', shortName: 'ГЦ' },
    { shifr: 2, name: 'математический и естественно-научный', shortName: 'МЦ' },
    { shifr: 3, name: 'профессиональный', shortName: 'ПЦ' },
    { shifr: 4, name: 'общенаучный', shortName: 'ОЦ' },
    { shifr: 5, name: 'практики, НИР', shortName: 'ПрЦ' },
    { shifr: 6, name: 'итоговая государственная аттестация', shortName: 'ИаЦ' },
    { shifr: 7, name: 'физическое воспитание', shortName: 'ФЦ' },
    { shifr: 8, name: 'факультативы', shortName: 'ФаЦ' }
  ]
};

export let normyBakalavry = {
 // Количество учебных недель 1 курс (осень/весна)
  weekPerSemestr: [{
    shifr: 1,          // Очная
    kurs: [[17, 17], [17, 17], [17, 17], [14, 14]]
  },
  {
    shifr: 2,          // Заочная
    kurs: [[1, 1], [1, 1], [1, 1], [1, 1]]
  }
  ],
  // Недельная аудиторная нагрузка
  audPerWeek: {
    dnewnMin: 28,
    dnewbMax: 30,
    zaochMin: 80,
    zaochMax: 90

  },
  // "Вилка" аудиторной нагрузки в процентах
  audProc: {
    dnewnMin: 33.33,
    dnewnMax: 66.67,
    zachMin: -1,        // Не оговаривается
    zaochMax: -1
  },
  // Max количество экзаменов в семестре
  maxNmbEkzPerSemestr: [5, 5, 5, 5, 5, 5, 5, 4],
  //Min количество экзаменов в семестре
  minNmbEkzPerSemestr: [4, 4, 4, 4, 4, 4, 4, 4],
  //Max количество зачётов в семестре
  maxNmbZachPerSemestr: [6, 6, 6, 6, 6, 6, 6, 6],
  maxNmbOfKpAndKrTotal: 6,  // Макс количество КП и КР за бакалавриат
  maxNmbOfKpAndKrPerSemestr: 2, // Макс количество КП и КР за семестр
  maxNmbOfKpPerSemestr: 1, // Макс количество КП  за семестр
  maxNmbOfKpAndKrAndIZPerSemestr: [5, 5], //[ Очное заочное]Max количество КР+ КП+ИЗ в семестр
  normativnSrkObuch: {//Объем нормативного срока обучения бакалавриат
    clocks: { denvn: 8968, zaoch: 8640 },
    ZE: 240
  },
  // Max количество факультативов за бакалавриат (ЗЕ)
  maxNmbOfFacultativ: 60,
  // Min объем дисциплины (ЗЕ)
  minZEPerDiscipline: 2,
  // Min объем дисциплины для экзамена (ЗЕ)
  minZEForEkz: 3,
  // Min трудоемкость курсовых в рамках самостоятельной работы (ЗЕ)
  minTrudoemkostKp: 1.5,
  minTrudoemkostKr: 1,
  // Min объем дисциплины для ИЗ (ЗЕ)
  minDisciplineZEForIz: 3,
  // Min объем дисциплины для КР и КП (ЗЕ)
  minDisciplineZEForKpAndKr: 3,
  // Max количество дисциплин в бакалавриате
  maxNmbOfDisciplinePerBakavriat: 54,
  // Суммарная трудоемкость практик (нед.)
  totalTrudoemkostPraktikMin: 4,
  totalTrudoemkostPraktikMax: 26,
  // Трудоемкость НИР (нед.)
  trudoemkostNIRMin: 0,
  trudoemkostNIRMax: 0,
  // Суммарная тружонмкость практик и НИР (нед)
  totalTrudoemkostPraktikAndNIRMin: 4,
  totalTrudoemkostPraktikAndNIRMax: 26,
  // Суммарная трудоемкость ИГА (нед.)
  totalTrudoekostIGAMin: 4,
  totalTrudoekostIGAMax: 6,
  // Трудоемкость государственного экзамена (нед.)
  trudoemkostGosEkzMin: 0,
  trudoemkostGosEkzMax: 4
};
