'use strict';

export let uPlanEntity = {
  UGNP: { shifr: '09.00.00', name: 'Информатика и вычислительная техника' },
  napr: { shifr: '09.03.02', name: 'Информационные системы и технологии' },
  profil: { shifr: '09.03.02.02', name: 'Информационные системы и технологии' },
  formaob: 'Очная',
  yearpost: 2018,
  okr: 'Бакалавр',
  srokob: 4,
  kafedra: 'Информационных и управляющих систем',
  facultet: { shifr: 'ИТ', kindname: 'факультет', name: 'компьютерных систем и информационных технологий' },
  amntofsemesters: 8,
  weekpersemestr: [17, 17, 17, 17, 17, 17, 14, 14],
  cycly: [{
    shifr: 'Б1',
    name: 'Гуманитарный, социальный и экономический цикл',
    basepart: {
      shifr: 'Б1.Б',
      name: 'Базовая часть',
      disciplines: [{
        shifr: 'Б1.Б1',
        name: 'История',
        shifrkaf: 0,
        ekzpersemestr: [2],
        clocktot: 108,
        ze: 3,
        clocklek: 34,
        clockpra: 17,
        clocksam: 57,
        semestry: [{
          nomsemestra: 2,
          clocks: [2, 0, 1]
        }]
      },
      {
        shifr: 'Б1.Б2',
        name: 'Философия',
        shifrkaf: 0,
        ekzpersemestr: [4],
        clocktot: 108,
        ze: 3,
        clocklek: 34,
        clocklab: 0,
        clockpra: 17,
        clocksam: 57,
        semestry: [{
          nomsemestra: 4,
          clocks: [2, 0, 1]
        }]
      },
      {
        shifr: 'Б1.Б3',
        name: 'Иностранный язык',
        shifrkaf: 0,
        ekzpersemestr: [4],
        zachpersemestr: [1, 2, 3],
        clocktot: 252,
        ze: 7,
        clockpra: 136,
        clocksam: 116,
        semestry: [{
          nomsemestra: 1,
          clocks: [0, 0, 2]
        },
        {
          nomsemestra: 2,
          clocks: [0, 0, 2]
        },
        {
          nomsemestra: 3,
          clocks: [0, 0, 2]
        },
        {
          nomsemestra: 4,
          clocks: [0, 0, 2]
        }
        ]
      }
      ]
    },
    varpart: {
      shifr: 'Б1.В',
      name: 'Вариативная часть',
      parts: {
        vyz: {
          shifr: ' ',
          name: 'Обязательные дисциплины (выбор ВУЗа)',
          disciplines: [{
            shifr: 'Б1.B1',
            name: 'Русский язык и культура речи',
            shifrkaf: 0,
            zachpersemestr: [3],
            clocktot: 108,
            ze: 3,
            clockpra: 51,
            clocksam: 57,
            semestry: [{
              nomsemestra: 3,
              clocks: [0, 0, 3]
            }]
          },
          {
            shifr: 'Б1.B2',
            name: 'Экономика',
            shifrkaf: 0,
            zachpersemestr: [7],
            clocktot: 108,
            ze: 3,
            clocklek: 28,
            clockpra: 14,
            clocksam: 66,
            semestry: [{
              nomsemestra: 7,
              clocks: [2, 0, 1]
            }]
          },
          {
            shifr: 'Б1.B3',
            name: 'Управление IT проектами',
            shifrkaf: 0,
            zachpersemestr: [8],
            clocktot: 144,
            ze: 4,
            clocklek: 28,
            clocklab: 42,
            clocksam: 74,
            semestry: [{
              nomsemestra: 8,
              clocks: [2, 3, 0]
            }]
          }
          ]
        },
        student: {
          shifr: ' ',
          name: 'Дисциплины по выбору студента',
          disciplines: [{
            shifr: 'Б1.ДВ1',
            name: 'Политология',
            shifrkaf: 0,
            zachpersemestr: [6],
            clocktot: 72,
            ze: 2,
            clocklek: 17,
            clockpra: 17,
            clocksam: 38,
            semestry: [{
              nomsemestra: 6,
              clocks: [1, 0, 1]
            }]
          },
          {
            shifr: 'Б1.ДВ2',
            name: 'Социология',
            shifrkaf: 0,
            zachpersemestr: [6],
            clocktot: 72,
            ze: 2,
            clocklek: 17,
            clockpra: 17,
            clocksam: 38,
            semestry: [{
              nomsemestra: 6,
              clocks: [1, 0, 1]
            }]
          },
          {
            shifr: 'Б1.ДВ3',
            name: 'Профессиональный иностранный язык',
            shifrkaf: 0,
            zachpersemestr: [5, 6, 7, 8],
            clocktot: 180,
            ze: 5,
            clockpra: 96,
            clocksam: 84,
            semestry: [{
              nomsemestra: 5,
              clocks: [0, 0, 2]
            }, {
              nomsemestra: 6,
              clocks: [0, 0, 2]
            }, {
              nomsemestra: 7,
              clocks: [0, 0, 1]
            }, {
              nomsemestra: 8,
              clocks: [0, 0, 1]
            }]
          },
          {
            shifr: 'Б1.ДВ4',
            name: 'Психология и педагогика',
            shifrkaf: 0,
            zachpersemestr: [8],
            clocktot: 72,
            ze: 2,
            clocklek: 14,
            clockpra: 14,
            clocksam: 44,
            semestry: [{
              nomsemestra: 8,
              clocks: [1, 0, 1]
            }]
          },
          {
            shifr: 'Б1.ДВ5',
            name: 'Управление организациями и предприятиями',
            shifrkaf: 0,
            zachpersemestr: [8],
            clocktot: 72,
            ze: 2,
            clocklek: 14,
            clockpra: 14,
            clocksam: 44,
            semestry: [{
              nomsemestra: 8,
              clocks: [1, 0, 1]
            }]
          }
          ]
        }
      }
    },
    footer: {
      shifr: '#',
      name: 'Всего по  гуманитарному, социальному и экономическому циклу'
    }
  },
  {
    shifr: 'Б2',
    name: 'Математический и естественно-научный цикл',
    basepart: {
      shifr: 'Б2.Б',
      name: 'Базовая часть',
      disciplines: [{
        shifr: 'Б2.Б1',
        name: 'Математический анализ',
        shifrkaf: 0,
        ekzpersemestr: [1, 2, 3],
        indzpersemestr: [1, 2, 3],
        clocktot: 324,
        ze: 9,
        clocklek: 102,
        clockpra: 102,
        clocksam: 120,
        semestry: [{
          nomsemestra: 1,
          clocks: [2, 0, 2]
        }, {
          nomsemestra: 2,
          clocks: [2, 0, 2]
        }, {
          nomsemestra: 3,
          clocks: [2, 0, 2]
        }]
      }, {
        shifr: 'Б2.Б2',
        name: 'Алгебра и геометрия',
        shifrkaf: 0,
        ekzpersemestr: [1],
        indzpersemestr: [1],
        clocktot: 144,
        ze: 4,
        clocklek: 34,
        clockpra: 34,
        clocksam: 76,
        semestry: [{
          nomsemestra: 1,
          clocks: [2, 0, 2]
        }]
      }, {
        shifr: 'Б2.Б3',
        name: 'Информатика',
        shifrkaf: 0,
        ekzpersemestr: [2],
        zachpersemestr: [1],
        indzpersemestr: [1, 2],
        clocktot: 252,
        ze: 7,
        clocklek: 51,
        clocklab: 68,
        clocksam: 133,
        semestry: [{
          nomsemestra: 1,
          clocks: [2, 2, 0]
        }, {
          nomsemestra: 2,
          clocks: [1, 2, 0]
        }]
      }, {
        shifr: 'Б2.Б4',
        name: 'Физика',
        shifrkaf: 0,
        ekzpersemestr: [1, 2],
        clocktot: 396,
        ze: 11,
        clocklek: 68,
        clocklab: 68,
        clocksam: 260,
        semestry: [{
          nomsemestra: 1,
          clocks: [2, 2, 0]
        }, {
          nomsemestra: 2,
          clocks: [2, 2, 0]
        }]
      }, {
        shifr: 'Б2.Б5',
        name: 'Теория вероятностей и математическая статистика',
        shifrkaf: 0,
        zachpersemestr: [4],
        indzpersemestr: [4],
        clocktot: 108,
        ze: 3,
        clocklek: 34,
        clockpra: 34,
        clocksam: 40,
        semestry: [{
          nomsemestra: 4,
          clocks: [2, 0, 2]
        }]
      }]
    },
    varpart: {
      shifr: 'Б2.В',
      name: 'Вариативная часть',
      parts: {
        vyz: {
          shifr: ' ',
          name: 'Обязательные дисциплины (выбор ВУЗа)',
          disciplines: [{
            shifr: 'Б2.B1',
            name: 'Экология',
            shifrkaf: 0,
            zachpersemestr: [1],
            clocktot: 72,
            ze: 2,
            clocklek: 17,
            clocklab: 17,
            clocksam: 38,
            semestry: [{
              nomsemestra: 1,
              clocks: [1, 1, 0]
            }]
          },
          {
            shifr: 'Б2.B2',
            name: 'Безопасность жизнедеятельности',
            shifrkaf: 0,
            zachpersemestr: [7],
            clocktot: 108,
            ze: 3,
            clocklek: 14,
            clocklab: 14,
            clocksam: 80,
            semestry: [{
              nomsemestra: 7,
              clocks: [1, 1, 0]
            }]
          },
          {
            shifr: 'Б2.B3',
            name: 'Дискретная математика',
            shifrkaf: 0,
            zachpersemestr: [2],
            indzpersemestr: [2],
            clocktot: 108,
            ze: 3,
            clocklek: 34,
            clockpra: 34,
            clocksam: 40,
            semestry: [{
              nomsemestra: 2,
              clocks: [2, 0, 2]
            }]
          },
          {
            shifr: 'Б2.B4',
            name: 'Численные методы',
            shifrkaf: 0,
            ekzpersemestr: [5],
            indzpersemestr: [5],
            clocktot: 108,
            ze: 3,
            clocklek: 34,
            clocklab: 34,
            clocksam: 40,
            semestry: [{
              nomsemestra: 5,
              clocks: [2, 2, 0]
            }]
          }, {
            shifr: 'Б2.B5',
            name: 'Объектно-ориентированное программирование',
            shifrkaf: 0,
            ekzpersemestr: [3, 4],
            kursr: 4,
            clocktot: 252,
            ze: 7,
            clocklek: 68,
            clocklab: 85,
            clocksam: 99,
            semestry: [{
              nomsemestra: 3,
              clocks: [2, 3, 0]
            }, {
              nomsemestra: 4,
              clocks: [2, 2, 0]
            }]
          },
          {
            shifr: 'Б2.B6',
            name: 'Электроника и микросхемотехника',
            shifrkaf: 0,
            zachpersemestr: [2],
            clocktot: 108,
            ze: 3,
            clocklek: 34,
            clocklab: 34,
            clocksam: 40,
            semestry: [{
              nomsemestra: 2,
              clocks: [2, 2, 0]
            }]
          }
          ]
        },
        student: {
          shifr: ' ',
          name: 'Дисциплины по выбору студента',
          disciplines: [{
            shifr: 'Б2.ДВ1',
            name: 'Кроссплатформенное программирование',
            shifrkaf: 0,
            ekzpersemestr: [6],
            zachpersemestr: [5],
            clocktot: 252,
            ze: 7,
            clocklek: 68,
            clocklab: 68,
            clocksam: 116,
            semestry: [{
              nomsemestra: 5,
              clocks: [2, 2, 0]
            }, {
              nomsemestra: 6,
              clocks: [2, 2, 0]
            }]
          },
          {
            shifr: 'Б2.ДВ2',
            name: 'Моделирование информационных систем',
            shifrkaf: 0,
            zachpersemestr: [3],
            clocktot: 108,
            ze: 3,
            clocklek: 34,
            clocklab: 34,
            clocksam: 40,
            semestry: [{
              nomsemestra: 3,
              clocks: [2, 2, 0]
            }]
          }
          ]
        }
      }
    },

    footer: {
      shifr: '#',
      name: 'Всего по математическому и естественно-научному циклу'
    }

  },
  {
    shifr: 'Б3',
    name: 'Профессиональный цикл',
    basepart: {
      shifr: 'Б3.Б',
      name: 'Базовая часть',
      disciplines: [{
        shifr: 'Б3.Б1',
        name: 'Базы данных',
        shifrkaf: 0,
        ekzpersemestr: [6],
        zachpersemestr: [5],
        indzpersemestr: [5, 6],
        clocktot: 252,
        ze: 7,
        clocklek: 68,
        clocklab: 68,
        clocksam: 116,
        semestry: [{
          nomsemestra: 5,
          clocks: [2, 2, 0]
        }, {
          nomsemestra: 6,
          clocks: [2, 2, 0]
        }]
      }, {
        shifr: 'Б3.Б2',
        name: 'Компьютерная графика',
        shifrkaf: 0,
        ekzpersemestr: [4],
        clocktot: 144,
        ze: 4,
        clocklek: 34,
        clocklab: 34,
        clocksam: 76,
        semestry: [{
          nomsemestra: 4,
          clocks: [2, 2, 0]
        }]
      }, {
        shifr: 'Б3.Б3',
        name: 'Информационные технологии',
        shifrkaf: 0,
        ekzpersemestr: [1],
        clocktot: 144,
        ze: 4,
        clocklek: 34,
        clocklab: 34,
        clocksam: 76,
        semestry: [{
          nomsemestra: 1,
          clocks: [2, 2, 0]
        }]
      }, {
        shifr: 'Б3.Б4',
        name: 'Теория информации и кодирования',
        shifrkaf: 0,
        zachpersemestr: [3],
        clocktot: 144,
        ze: 4,
        clocklek: 34,
        clocklab: 34,
        clocksam: 76,
        semestry: [{
          nomsemestra: 3,
          clocks: [2, 2, 0]
        }]
      }, {
        shifr: 'Б3.Б5',
        name: 'Архитектура информационных систем и облачных технологий',
        shifrkaf: 0,
        ekzpersemestr: [6],
        clocktot: 144,
        ze: 4,
        clocklek: 34,
        clocklab: 34,
        clocksam: 76,
        semestry: [{
          nomsemestra: 6,
          clocks: [2, 2, 0]
        }]
      }, {
        shifr: 'Б3.Б6',
        name: 'Технологии программирования',
        shifrkaf: 0,
        ekzpersemestr: [1, 2],
        clocktot: 252,
        ze: 7,
        clocklek: 51,
        clocklab: 68,
        clocksam: 133,
        semestry: [{
          nomsemestra: 1,
          clocks: [2, 2, 0]
        }, {
          nomsemestra: 2,
          clocks: [1, 2, 0]
        }]
      }, {
        shifr: 'Б3.Б7',
        name: 'Технологии обработки информации',
        shifrkaf: 0,
        ekzpersemestr: [3],
        clocktot: 144,
        ze: 4,
        clocklek: 34,
        clocklab: 34,
        clocksam: 76,
        semestry: [{
          nomsemestra: 3,
          clocks: [2, 2, 0]
        }]
      }, {
        shifr: 'Б3.Б8',
        name: 'Интеллектуальные системы и технологии',
        shifrkaf: 0,
        ekzpersemestr: [7],
        clocktot: 144,
        ze: 4,
        clocklek: 28,
        clocklab: 28,
        clocksam: 88,
        semestry: [{
          nomsemestra: 7,
          clocks: [2, 2, 0]
        }]
      }, {
        shifr: 'Б3.Б9',
        name: 'Инструментальные средства информационных систем',
        shifrkaf: 0,
        zachpersemestr: [4],
        clocktot: 144,
        ze: 4,
        clocklek: 34,
        clocklab: 51,
        clocksam: 59,
        semestry: [{
          nomsemestra: 4,
          clocks: [2, 3, 0]
        }]
      }, {
        shifr: 'Б3.Б10',
        name: 'Методы и средства проектирования информационных систем и технологий',
        shifrkaf: 0,
        ekzpersemestr: [7],
        clocktot: 144,
        ze: 4,
        clocklek: 28,
        clocklab: 28,
        clocksam: 88,
        semestry: [{
          nomsemestra: 7,
          clocks: [2, 2, 0]
        }]
      }, {
        shifr: 'Б3.Б11',
        name: 'Инфокоммуникационные системы и сети',
        shifrkaf: 0,
        ekzpersemestr: [4, 5],
        kursr: 5,
        clocktot: 216,
        ze: 6,
        clocklek: 68,
        clocklab: 68,
        clocksam: 80,
        semestry: [{
          nomsemestra: 4,
          clocks: [2, 2, 0]
        }, {
          nomsemestra: 5,
          clocks: [2, 2, 0]
        }]
      }, {
        shifr: 'Б3.Б12',
        name: 'Надежность и диагностика информационных систем',
        shifrkaf: 0,
        zachpersemestr: [7],
        clocktot: 144,
        ze: 4,
        clocklek: 28,
        clocklab: 28,
        clocksam: 88,
        semestry: [{
          nomsemestra: 7,
          clocks: [2, 2, 0]
        }]
      }, {
        shifr: 'Б3.Б13',
        name: 'Введение в информационные системы',
        shifrkaf: 0,
        zachpersemestr: [2],
        clocktot: 108,
        ze: 3,
        clocklek: 17,
        clocklab: 34,
        clocksam: 57,
        semestry: [{
          nomsemestra: 2,
          clocks: [1, 2, 0]
        }]
      }, {
        shifr: 'Б3.Б14',
        name: 'Системный анализ',
        shifrkaf: 0,
        zachpersemestr: [6],
        clocktot: 108,
        ze: 3,
        clocklek: 34,
        clocklab: 34,
        clocksam: 40,
        semestry: [{
          nomsemestra: 6,
          clocks: [2, 2, 0]
        }]
      }]
    },
    varpart: {
      shifr: 'Б3.В',
      name: 'Вариативная часть',
      parts: {
        vyz: {
          shifr: ' ',
          name: 'Обязательные дисциплины (выбор ВУЗа)',
          disciplines: [{
            shifr: 'Б3.B1',
            name: 'Технологии защиты информации',
            shifrkaf: 0,
            ekzpersemestr: [5],
            clocktot: 144,
            ze: 4,
            clocklek: 34,
            clocklab: 34,
            clocksam: 76,
            semestry: [{
              nomsemestra: 5,
              clocks: [2, 2, 0]
            }]
          },
          {
            shifr: 'Б3.B2',
            name: 'Информационные системы электронного документооборота',
            shifrkaf: 0,
            ekzpersemestr: [8],
            clocktot: 144,
            ze: 4,
            clocklek: 28,
            clocklab: 42,
            clocksam: 74,
            semestry: [{
              nomsemestra: 8,
              clocks: [2, 3, 0]
            }]
          },
          {
            shifr: 'Б3.B3',
            name: 'Разработка приложений для мобильных устройств',
            shifrkaf: 0,
            ekzpersemestr: [8],
            clocktot: 144,
            ze: 4,
            clocklek: 28,
            clocklab: 42,
            clocksam: 74,
            semestry: [{
              nomsemestra: 8,
              clocks: [2, 3, 0]
            }]
          },
          {
            shifr: 'Б3.B4',
            name: 'Операционные системы, среды и оболочки',
            shifrkaf: 0,
            zachpersemestr: [4],
            clocktot: 144,
            ze: 4,
            clocklek: 34,
            clocklab: 34,
            clocksam: 76,
            semestry: [{
              nomsemestra: 4,
              clocks: [2, 2, 0]
            }]
          },
          {
            shifr: 'Б3.B5',
            name: 'Построение распределённых систем мониторинга',
            shifrkaf: 0,
            zachpersemestr: [7],
            clocktot: 108,
            ze: 3,
            clocklek: 28,
            clocklab: 28,
            clocksam: 52,
            semestry: [{
              nomsemestra: 7,
              clocks: [2, 2, 0]
            }]
          },
          {
            shifr: 'Б3.B6',
            name: 'Основы проектирования информационных микрокомпьютерных систем',
            shifrkaf: 0,
            ekzpersemestr: [7],
            clocktot: 144,
            ze: 4,
            clocklek: 28,
            clocklab: 28,
            clocksam: 88,
            semestry: [{
              nomsemestra: 7,
              clocks: [2, 2, 0]
            }]
          },
          {
            shifr: 'Б3.B7',
            name: 'Архитектура информационных компьютерных систем',
            shifrkaf: 0,
            ekzpersemestr: [3],
            clocktot: 144,
            ze: 4,
            clocklek: 34,
            clocklab: 34,
            clocksam: 76,
            semestry: [{
              nomsemestra: 3,
              clocks: [2, 2, 0]
            }]
          }
          ]
        },
        student: {
          shifr: ' ',
          name: 'Дисциплины по выбору студента',
          disciplines: [{
            shifr: 'Б3.ДВ1',
            name: 'Интеллектуальные датчики',
            shifrkaf: 0,
            ekzpersemestr: [7],
            clocktot: 108,
            ze: 3,
            clocklek: 28,
            clocklab: 28,
            clocksam: 52,
            semestry: [{
              nomsemestra: 7,
              clocks: [2, 2, 0]
            }]
          },
          {
            shifr: 'Б3.ДВ2',
            name: 'Технологии компьютерного проектирования',
            shifrkaf: 0,
            ekzpersemestr: [5, 6],
            kursr: 6,
            clocktot: 252,
            ze: 7,
            clocklek: 68,
            clocklab: 68,
            clocksam: 116,
            semestry: [{
              nomsemestra: 5,
              clocks: [2, 2, 0]
            }, {
              nomsemestra: 6,
              clocks: [2, 2, 0]
            }]
          },
          {
            shifr: 'Б3.ДВ3',
            name: 'Web-программирование и web-дизайн',
            shifrkaf: 0,
            ekzpersemestr: [6],
            zachpersemestr: [5],
            kursp: 6,
            clocktot: 216,
            ze: 6,
            clocklek: 68,
            clocklab: 68,
            clocksam: 80,
            semestry: [{
              nomsemestra: 5,
              clocks: [2, 2, 0]
            }, {
              nomsemestra: 6,
              clocks: [2, 2, 0]
            }]
          },
          {
            shifr: 'Б3.ДВ4',
            name: 'Администрирование баз данных Oracle',
            shifrkaf: 0,
            ekzpersemestr: [8],
            clocktot: 144,
            ze: 4,
            clocklek: 28,
            clocklab: 42,
            clocksam: 74,
            semestry: [{
              nomsemestra: 8,
              clocks: [2, 3, 0]
            }]
          },
          {
            shifr: 'Б3.ДВ5',
            name: 'Прикладное программное обеспечение для управления предприятиями',
            shifrkaf: 0,
            ekzpersemestr: [8],
            kursr: 8,
            clocktot: 144,
            ze: 4,
            clocklek: 28,
            clocklab: 42,
            clocksam: 74,
            semestry: [{
              nomsemestra: 8,
              clocks: [2, 3, 0]
            }]
          }
          ]
        }
      }
    },

    footer: {
      shifr: '#',
      name: 'Всего по профессиональному циклу'
    }

  },
  {
    shifr: 'Б4',
    name: 'Практики, НИР',
    disciplines: [{
      shifr: 'Б4.Б1',
      name: 'Учебная практика',
      shifrkaf: 0,
      zachpersemestr: [4],
      clocktot: 162,
      ze: 4.5,
      clocksam: 162
    },
    {
      shifr: 'Б4.Б2',
      name: 'Производственная практика',
      shifrkaf: 0,
      zachpersemestr: [6],
      clocktot: 216,
      ze: 6,
      clocksam: 216
    },
    {
      shifr: 'Б4.Б3',
      name: 'Преддипломная практика',
      shifrkaf: 0,
      zachpersemestr: [8],
      clocktot: 162,
      ze: 4.5,
      clocksam: 162
    }
    ],
    footer: {
      shifr: '#',
      name: 'Всего по практикам'
    }
  },
  {
    shifr: 'Б5',
    name: 'Итоговая государственная аттестация',
    disciplines: [{
      shifr: 'Б5.Б1',
      name: 'Государственный экзамен',
      shifrkaf: 0,
      ekzpersemestr: [8],
      clocktot: 54,
      ze: 1.5,
      clocksam: 54
    },
    {
      shifr: 'Б5.Б2',
      name: 'Выпускная квалификационная работа бакалавра',
      shifrkaf: 0,
      clocktot: 270,
      ze: 7.5,
      clocksam: 270
    }
    ],
    footer: {
      shifr: '#',
      name: 'Всего по циклу итоговая государственная аттестация'
    }
  },
  {
    shifr: 'Б6',
    name: 'Физическое воспитание',
    disciplines: [{
      shifr: 'Б6.Б1',
      name: 'Физическая культура (Культура здоровья)',
      shifrkaf: 0,
      zachpersemestr: [1],
      clocktot: 72,
      ze: 2,
      clocklek: 17,
      clockpra: 17,
      clocksam: 38,
      semestry: [{
        nomsemestra: 1,
        clocks: [1, 0, 1]
      }]
    },
    {
      shifr: 'Б6.Б2',
      name: 'Физическая культура',
      shifrkaf: 0,
      zachpersemestr: [2, 4, 6],
      clocktot: 328,
      clockpra: 306,
      clocksam: 22,
      semestry: [{
        nomsemestra: 1,
        clocks: [0, 0, 2]
      }, {
        nomsemestra: 2,
        clocks: [0, 0, 2]
      }, {
        nomsemestra: 3,
        clocks: [0, 0, 4]
      }, {
        nomsemestra: 4,
        clocks: [0, 0, 4]
      }, {
        nomsemestra: 5,
        clocks: [0, 0, 4]
      }, {
        nomsemestra: 6,
        clocks: [0, 0, 2]
      }]
    }
    ],
    footer: {
      shifr: '#',
      name: 'Всего по циклу физическое воспитание'
    }
  },
  {
    shifr: 'Б7',
    name: 'Факультативы',
    disciplines: [{
      shifr: 'Б7.1',
      name: 'Современная теория управления',
      shifrkaf: 0,
      zachpersemestr: [7],
      clocktot: 72,
      ze: 2,
      clocklek: 14,
      clocklab: 14,
      clocksam: 44,
      semestry: [{
        nomsemestra: 7,
        clocks: [1, 1, 0]
      }]
    },
    {
      shifr: 'Б7.2',
      name: 'Алгоритмы цифровой обработки аналоговых сигналов',
      shifrkaf: 0,
      zachpersemestr: [4],
      clocktot: 72,
      ze: 2,
      clocklek: 17,
      clocklab: 17,
      clocksam: 38,
      semestry: [{
        nomsemestra: 4,
        clocks: [1, 1, 0]
      }]
    },
    {
      shifr: 'Б7.3',
      name: 'Украинский язык',
      shifrkaf: 0,
      zachpersemestr: [4],
      clocktot: 72,
      ze: 2,
      clockpra: 34,
      clocksam: 38,
      semestry: [{
        nomsemestra: 4,
        clocks: [0, 0, 2]
      }]
    },
    {
      shifr: 'Б7.4',
      name: 'Классические регуляторы систем автоматического управления',
      shifrkaf: 0,
      zachpersemestr: [5],
      clocktot: 108,
      ze: 3,
      clocklek: 17,
      clocklab: 34,
      clocksam: 57,
      semestry: [{
        nomsemestra: 5,
        clocks: [1, 2, 0]
      }]
    }
    ],
    footer: {
      shifr: '#',
      name: 'Всего по циклу факультативы'
    }
  }
  ], // Массив циклов
  footer: {
    shifr: '#',
    name: 'Всего за нормативный срок обучения'
  },
  clocksperweek: [30, 28, 30, 30, 30, 30, 30, 30],
  nmbofkursp: [0, 0, 0, 0, 0, 1, 0, 0],
  nmbofkursr: [0, 0, 0, 1, 1, 1, 0, 1],
  nmbofindz: [3, 4, 2, 2, 2, 1, 0, 0],
  nmbofekz: [5, 5, 4, 5, 4, 5, 4, 4],
  nmbofzach: [4, 3, 4, 3, 4, 4, 5, 4],
  nmbofze: [30.00, 30.00, 30.00, 30.00, 30.00, 30.00, 30.00, 30.00],
  nmbofzeperyear: [],

  praktics: [{
    npp: 1,
    name: 'Учебная практика',
    nomsemestra: 4,
    nmbofweek: 3.0,
    ze: 4.5
  },
  {
    npp: 2,
    name: 'Производственная практика',
    nomsemestra: 6,
    nmbofweek: 4.0,
    ze: 6.0
  },
  {
    npp: 3,
    name: 'Преддипломная практика',
    nomsemestra: 8,
    nmbofweek: 3.0,
    ze: 4.5
  }
  ],
  gosattestaciya: [{
    npp: 1,
    okr: 'Бакалавр',
    name: 'Государственный экзамен',
    nomsemestra: 8,
    ze: 1.5
  },
  {
    npp: 2,
    okr: 'Бакалавр',
    name: 'Выпускная квалификационная работа бакалавра',
    nomsemestra: 8,
    ze: 7.5
  }
  ],
  podpisi: [
    {
      dolg: 'Заведующий кафедрой инофрмационных и управляющих систем ',
      fio: 'Горбунов А.И.'
    },
    {
      dolg: 'Декан факультета компьютизированных систем и информационных технологий ',
      fio: 'Кочевский А.А.'
    },
    {
      dolg: 'Директор департамента управления учебныи процессом ',
      fio: 'Серебряков А.И.'
    }
  ]
};
