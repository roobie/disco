(function() {
  if(!moment) {
    return;
  }

  var currentMoment = new moment();

  var resetTimePart = function (mom) {
    var m = new moment({
      y: mom.year(),
      M: mom.month(),
      d: mom.date(),
      h: 0,
      m: 0,
      s: 0,
      ms: 0
    });
    return m;
  };

  var getFirstDayOfMonth = function (mom) {
    var m = new moment(mom);
    var d =  m.date();
    return m.subtract('days', d - 1);
  };

  var getFirstDayInWeek = function (mom) {
    var m = new moment(mom);
    var wd = m.weekday();
    return m.subtract('days', wd > 0 ? wd - 1 : 6);
  };

  var getWeek = function (mom) {
    var m = new moment(mom);
    var firstDayInWeek = getFirstDayInWeek(m);
    var result = [];

    for (var i = 0, max = 7; i < max; i++) {
      result.push(new moment(firstDayInWeek).add('days', i));
    }
    return result;
  };

  var getFirstWeekInMonth = function (mom) {
    var firstDayOfMonth = getFirstDayOfMonth(mom);
    return getWeek(firstDayOfMonth);
  };

  var getNextWeek = function (mom) {
    var m = new moment(mom);
    return getWeek(m.add('days', 7));
  };

  var getMonth = function (mom) {
    var m = new moment(mom);
    var firstDayOfMonth = getFirstDayOfMonth(m);
    var result = [];

    for (var i = 0, max = m.daysInMonth(); i < max; i++) {
      result.push(new moment(firstDayOfMonth).add('days', i));
    }
    return result;
  };

  var getMonthPlusAdjoining = function (mom) {
    var firstWeekInMonth = getFirstWeekInMonth(mom);
    var firstDayInFirstWeekInMonth = firstWeekInMonth[0];
    var moreThanFourWeeks = mom.daysInMonth() / 7 > 4;
    var result = fwim;
    var nextWeek;
    for (var i = 0, maxi = moreThanFourWeeks ? 4 : 3; i < maxi; i++) {
      nextWeek = getNextWeek(result.slice(-1)[0]);
      result = result.concat(nextWeek);
    }
    return result;
  };

}());
