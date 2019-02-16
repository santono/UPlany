var _target = document.getElementById('drop');
var _file = document.getElementById('file');

/** Spinner **/
var spinner;

var _workstart = function() { spinner = new Spinner().spin(_target); }
var _workend = function() { spinner.stop(); }

/** Alerts **/
var _badfile = function() {
  alertify.alert('Этот файл похоже не является коректным Excel файлом.', function(){});
};

var _pending = function() {
  alertify.alert('Пожалуйста подождите пока текущий файл обрабатывается.', function(){});
};

var _large = function(len, cb) {
  alertify.confirm("Этот файл имеет размер " + len + " байт, и его обработка требует некоторое время.  Ваш браузер может быть заблокирован на этот период.  Прободжить работу?", cb);
};

var _failed = function(e) {
  console.log(e, e.stack);
  alertify.alert('Возникла ошибка обработки. Пожалйста сообщите системному администратору.', function(){});
};


/** Drop it like it's hot **/
DropSheet({
  file: _file,
  drop: _target,
  on: {
    workstart: _workstart,
    workend: _workend,
    foo: 'bar'
  },
  errors: {
    badfile: _badfile,
    pending: _pending,
    failed: _failed,
    large: _large,
    foo: 'bar'
  }
})
