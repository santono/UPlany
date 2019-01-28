    let hat=(function() {   
       let bakhat=`<!--<thead>-->
            <tr>
                <th class="center border-top border-bottom border-left border-right" colspan=51>2018-2019 уч.г.</th>
            </tr>
            <tr>
                <th rowspan=6>№ п/п</th>
                <th rowspan=6>Название дисциплины</th>
                <th rowspan=6>
                    <div class=vertical>
                        <nobr>Шфр каф.</nobr>
                    </div>
                </th>
                <th colspan=14>Распределение по семестрам</th>
                <th colspan=6>Объем часов</th>
                <th colspan=24>
                    <nobr>Распределение по курсам и семестрам</nobr>
                </th>
            </tr>
            <tr>
                <th colspan=4 rowspan=5>
                    <div class="vertical">Экзамены</div>
                </th>
                <th colspan=4 rowspan=5>
                    <div class="vertical">Зачёты</div>
                </th>
                <td rowspan=5>
                    <div class="vertical">Курс. проект</div>
                </td>
                <th rowspan=5>
                    <div class="vertical">Курс. работа</div>
                </th>
                <th colspan=4 rowspan=5>
                    <div class="vertical">Инд. задание</div>
                </th>
                <th colspan=2>Всего</th>
                <th rowspan=5>
                    <div class="vertical">Лекции</div>
                </th>
                <th rowspan=5>
                    <div class="vertical">Лаб. раб.</div>
                </th>
                <th rowspan=5>
                    <div class="vertical">Практ. зан.</div>
                </th>
                <th rowspan=5>
                    <div class="vertical">Самост. раб.</div>
                </th>
                <th colspan=6>I</th>
                <th colspan=6>II</th>
                <th colspan=6>III</th>
                <th colspan=6>IV</th>
            </tr>
            <tr>
                <th rowspan=4>
                    <div class="vertical">Часы</div>
                </th>
                <th rowspan=4>ЗЕ</th>
                <th colspan=3>1</th>
                <th colspan=3>2</th>
                <th colspan=3>3</th>
                <th colspan=3>4</th>
                <th colspan=3>5</th>
                <th colspan=3>6</th>
                <th colspan=3>7</th>
                <th colspan=3>8</th>
            </tr>
            <tr>
                <th colspan=24>
                    <nobr>количество недель теоретического обучения в семестре</nobr>
                </th>
            </tr>
            <tr>
                <th colspan=3>17</th>
                <th colspan=3>17</th>
                <th colspan=3>17</th>
                <th colspan=3>17</th>
                <th colspan=3>17</th>
                <th colspan=3>17</th>
                <th colspan=3>14</th>
                <th colspan=3>14</th>
            </tr>
            <tr>
                <th colspan=24>количество аудиторных часов в неделю</th>
            </tr>
            <tr>
                <th>1</th>
                <th>2</th>
                <th>2.1</th>
                <th colspan="4">3</th>
                <th colspan="4">4</th>
                <th>5</th>
                <th>6</th>
                <th colspan="4s">7</th>
                <th>8</th>
                <th>8.1</th>
                <th>9</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
                <th colspan="3">13</th>
                <th colspan="3">14</th>
                <th colspan="3">15</th>
                <th colspan="3">16</th>
                <th colspan="3">17</th>
                <th colspan="3">18</th>
                <th colspan="3">19</th>
                <th colspan="3">20</th>
            </tr>
       <!-- </thead> -->`;
       let maghat=`<!-- <thead> -->
            <tr>
                <th class="center border-top border-bottom border-left border-right" colspan=51>2018-2019 уч.г.</th>
            </tr>
            <tr>
                <th rowspan=6>№ п/п</th>
                <th rowspan=6>Название дисциплины</th>
                <th rowspan=6>
                    <div class=vertical>
                        <nobr>Шфр каф.</nobr>
                    </div>
                </th>
                <th colspan=14>Распределение по семестрам</th>
                <th colspan=6>Объем часов</th>
                <th colspan=12>
                    <nobr>Распределение по курсам и семестрам</nobr>
                </th>
            </tr>
            <tr>
                <th colspan=4 rowspan=5>
                    <div class="vertical">Экзамены</div>
                </th>
                <th colspan=4 rowspan=5>
                    <div class="vertical">Зачёты</div>
                </th>
                <td rowspan=5>
                    <div class="vertical">Курс. проект</div>
                </td>
                <th rowspan=5>
                    <div class="vertical">Курс. работа</div>
                </th>
                <th colspan=4 rowspan=5>
                    <div class="vertical">Инд. задание</div>
                </th>
                <th colspan=2>Всего</th>
                <th rowspan=5>
                    <div class="vertical">Лекции</div>
                </th>
                <th rowspan=5>
                    <div class="vertical">Лаб. раб.</div>
                </th>
                <th rowspan=5>
                    <div class="vertical">Практ. зан.</div>
                </th>
                <th rowspan=5>
                    <div class="vertical">Самост. раб.</div>
                </th>
                <th colspan=6>I</th>
                <th colspan=6>II</th>
            </tr>
            <tr>
                <th rowspan=4>
                    <div class="vertical">Часы</div>
                </th>
                <th rowspan=4>ЗЕ</th>
                <th colspan=3>1</th>
                <th colspan=3>2</th>
                <th colspan=3>3</th>
                <th colspan=3>4</th>
            </tr>
            <tr>
                <th colspan=12>
                    <nobr>количество недель теоретического обучения в семестре</nobr>
                </th>
            </tr>
            <tr>
                <th colspan=3>12</th>
                <th colspan=3>12</th>
                <th colspan=3>12</th>
                <th colspan=3>0</th>
            </tr>
            <tr>
                <th colspan=12>количество аудиторных часов в неделю</th>
            </tr>
            <tr>
                <th>1</th>
                <th>2</th>
                <th>2.1</th>
                <th colspan="4">3</th>
                <th colspan="4">4</th>
                <th>5</th>
                <th>6</th>
                <th colspan="4">7</th>
                <th>8</th>
                <th>8.1</th>
                <th>9</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
                <th colspan="3">13</th>
                <th colspan="3">14</th>
                <th colspan="3">15</th>
                <th colspan="3">16</th>
            </tr>
        <!--</thead>-->`;
       return function (code) {
              let retVal=bakhat;
              if (code && code!=1) 
                retVal=maghat;
              return retVal;
       } 
    }());
