"use strict"
let configBak={sheetupno          : 3,
               rangeminrow        : 21,
               rangemaxrow        : 220,
               UGNPShifrCell      : {r:4,c:18} ,
               UGNPNameCell       : {r:4,c:22} ,
               naprShifrCell      : {r:6,c:18} ,
               naprNameCell       : {r:6,c:22} ,
               profilShifrCell    : {r:8,c:18} ,
               profilNameCell     : {r:8,c:22} ,
               formaObCell        : {r:10,c:13},
               yearPostCell       : {r:10,c:23},
               okrCell            : {r:5,c:36} ,
               srokObCell         : {r:7,c:36} ,
               kafedraCell        : {r:9,c:36} ,
               amntOfSemestrsValue : 8,
               weekPerSemestrCell : {r:17,c:24},
               nomerDCol          : 1,
               nameDiscCol        : 2,
               ekzCol             : 4,
               zachCol            : 8,
               kursPrCol          : 12,
               kursRabCol         : 13,
               indZCol            : 14,
               clocksCol          : 18,
               kreditsCol         : 19,
               clockLekCol        : 20,
               clockLabCol        : 21,
               clockPrCol         : 22,
               clockSamCol        : 23,
               semestr1Col        : 24,
               block1Row          : 21,
               base1PartRow       : 22,
               var1PartRow        : 38,
               vuz1Row            : 39,
               stud1Row           : 50,
               footer1Row         : 61,
               block2Row          : 63,
               base2PartRow       : 64,
               var2PartRow        : 80,
               vuz2Row            : 81,
               stud2Row           : 92,
               footer2Row         : 103,
               block3Row          : 105,
               base3PartRow       : 106,
               var3PartRow        : 127,
               vuz3Row            : 128,
               stud3Row           : 144,
               footer3Row         : 161,
               praktikiRow        : 163,
               footerPraktRow     : 170,
               itogGosAtestacRow  : 172,
               footerIgsRow       : 178,
               fizVospRow         : 180,
               footerFizVospRow   : 184,
               facultativRow      : 186,
               footerFctvRow      : 199,
               footerGlobalRow    : 201,
               clocksPerWeekCell  : {r:204,c:24},
               nmbOfKursPCell     : {r:205,c:24},
               nmbOfKursRCell     : {r:206,c:24},
               nmbOfIndZCell      : {r:207,c:24},
               nmbOfEkzCell       : {r:208,c:24},
               nmbOfZachCell      : {r:209,c:24},
               nmbOfZeCell        : {r:210,c:24},
               nmbOfZePerYearCell : {r:211,c:24},
               praktRow           : 206,
               amntOfPrakt        : 3,
               atestacRow         : 215,
               ateSemestrCol      : 39,
               ateZeCol           : 44, 
               amntOfAte          : 2,
               podpisiRow         : 221,
               podpFioCol         : 39
}
let configBak2019={sheetupno          : 3,
               sheetTitulNo       : 0,
               rangeminrow        : 21,
               rangemaxrow        : 220,
               UGNPShifrCell      : {r:14,c:15} ,
               UGNPNameCell       : {r:14,c:20} ,
               naprShifrCell      : {r:16,c:15} ,
               naprNameCell       : {r:16,c:20} ,
               profilShifrCell    : {r:18,c:15} ,
               profilNameCell     : {r:18,c:20} ,
               formaObCell        : {r:28,c:10} ,
               yearPostCell       : {r:26,c:50} ,
               okrCell            : {r:26,c:10} ,
               srokObCell         : {r:29,c:10} ,
               kafedraCell        : {r:21,c:6}  ,
               facultetCell       : {r:23,c:6}  ,
               standartCell       : {r:18,c:50} ,
               amntOfSemestrsValue : 8,
               weekPerSemestrCell : {r:17,c:24},
               nomerDCol          : 1,
               nameDiscCol        : 2,
               ekzCol             : 4,
               zachCol            : 8,
               kursPrCol          : 12,
               kursRabCol         : 13,
               indZCol            : 14,
               clocksCol          : 18,
               kreditsCol         : 19,
               clockLekCol        : 20,
               clockLabCol        : 21,
               clockPrCol         : 22,
               clockSamCol        : 23,
               semestr1Col        : 24,
               block1Row          : 21,
               base1PartRow       : 22,
               var1PartRow        : 38,
               vuz1Row            : 39,
               stud1Row           : 50,
               footer1Row         : 61,
               block2Row          : 63,
               base2PartRow       : 64,
               var2PartRow        : 80,
               vuz2Row            : 81,
               stud2Row           : 92,
               footer2Row         : 103,
               block3Row          : 105,
               base3PartRow       : 106,
               var3PartRow        : 127,
               vuz3Row            : 128,
               stud3Row           : 144,
               footer3Row         : 161,
               praktikiRow        : 163,
               footerPraktRow     : 170,
               itogGosAtestacRow  : 172,
               footerIgsRow       : 178,
               fizVospRow         : 180,
               footerFizVospRow   : 184,
               facultativRow      : 186,
               footerFctvRow      : 199,
               footerGlobalRow    : 201,
               clocksPerWeekCell  : {r:204,c:24},
               nmbOfKursPCell     : {r:205,c:24},
               nmbOfKursRCell     : {r:206,c:24},
               nmbOfIndZCell      : {r:207,c:24},
               nmbOfEkzCell       : {r:208,c:24},
               nmbOfZachCell      : {r:209,c:24},
               nmbOfZeCell        : {r:210,c:24},
               nmbOfZePerYearCell : {r:211,c:24},
               praktRow           : 206,
               amntOfPrakt        : 3,
               atestacRow         : 215,
               ateSemestrCol      : 39,
               ateZeCol           : 44, 
               amntOfAte          : 2,
               podpisi            : { row     : 33,
                                      dolgCol : 35,
                                      fioCol  : 65
                                    }
}