var moment = require('moment-weekdaysin');

function sortDates(dates, inputDate) {
  let dateContainer = [];
  if (inputDate) {
    dateContainer = dateContainer.concat(dates).concat(inputDate);
    return dateContainer.sort((a, b) => {
      return a.date - b.date;
    });
  } else {
    dateContainer = dateContainer.concat(dates);
    return dateContainer.sort((a, b) => {
      return a.date - b.date;
    });
  }
}

function getDatesOfNthWeekdaysInMonth(date, schedule) {
  let result = [];
  for (let i = 0; i < schedule.daysOfWeek.length; i++) {
    let weekDaysInMonth = moment(date.date).weekdaysInMonth(
      schedule.daysOfWeek[i]
    );

    if (!weekDaysInMonth[schedule.positions[i] - 1]) {
      return 'That schedule is not possible';
    }
    result.push({
      date: weekDaysInMonth[schedule.positions[i] - 1],
      type: 'schedule'
    });
  }
  return result;
}

function getDatesOfNthWeekdaysInQuarter(date, schedule) {
  let currentQuarter = moment(date.date).quarter();
  let result = [];
  for (var i = 0; i < schedule.daysOfWeek.length; i++) {
    let initMonthOfQuarter = moment(date.date).startOf('quarter');
    let weekDaysInQuarter = [];
    while (initMonthOfQuarter.quarter() === currentQuarter) {
      let weekdaysInMonth = moment(initMonthOfQuarter).weekdaysInMonth(
        schedule.daysOfWeek[i]
      );
      weekDaysInQuarter = weekDaysInQuarter.concat(weekdaysInMonth);
      initMonthOfQuarter.add(1, 'M');
    }
    if (!weekDaysInQuarter[schedule.positions[i] - 1]) {
      return 'That schedule is not possible';
    }
    result.push({
      date: weekDaysInQuarter[schedule.positions[i] - 1],
      type: 'schedule'
    });
  }
  return result;
}

function getDatesOfNthWeekDayInWeek(date, schedule) {
  let result = [];
  for (var i = 0; i < schedule.daysOfWeek.length; i++) {
    let initDayWeek = moment(date.date).startOf('week');
    if (schedule.positions[i] !== 1 || schedule.daysOfWeek > 6) {
      return 'That schedule is not possible';
    }
    if (initDayWeek.day() === schedule.daysOfWeek[i]) {
      result.push({ date: initDayWeek, type: 'schedule' });
    } else {
      initDayWeek.add(schedule.daysOfWeek[i], 'd');
      result.push({ date: initDayWeek, type: 'schedule' });
    }
  }

  return result;
}

function findMissingPeriod(date, schedule, directionOfPeriod) {
  if (schedule.periodOfTime === 'q') {
    let targetDate, result, inputDate;
    if (directionOfPeriod === 'previous') {
      targetDate = moment(date).subtract(1, 'quarter').startOf('quarter');
      inputDate = { date: targetDate.format(), type: 'input-date' };
      result = getDatesOfNthWeekdaysInQuarter(inputDate, schedule);
      return result;
    } else {
      targetDate = moment(date).add(1, 'quarter').startOf('quarter');
      inputDate = { date: targetDate.format(), type: 'input-date' };
      result = getDatesOfNthWeekdaysInQuarter(inputDate, schedule);
      return result;
    }
  } else if (schedule.periodOfTime === 'm') {
    if (directionOfPeriod === 'previous') {
      targetDate = moment(date).subtract(1, 'month').startOf('month');
      inputDate = { date: targetDate.format(), type: 'input-date' };
      result = getDatesOfNthWeekdaysInMonth(inputDate, schedule);
      return result;
    } else {
      targetDate = moment(date).add(1, 'month').startOf('month');
      inputDate = { date: targetDate.format(), type: 'input-date' };
      result = getDatesOfNthWeekdaysInMonth(inputDate, schedule);
      return result;
    }
  } else {
    if (directionOfPeriod === 'previous') {
      targetDate = moment(date).subtract(1, 'w').startOf('w');
      inputDate = { date: targetDate.format(), type: 'input-date' };
      result = getDatesOfNthWeekDayInWeek(inputDate, schedule);
      return result;
    } else {
      targetDate = moment(date).add(1, 'w').startOf('w');
      inputDate = { date: targetDate.format(), type: 'input-date' };
      result = getDatesOfNthWeekDayInWeek(inputDate, schedule);
      return result;
    }
  }
}

module.exports = {
  findMissingPeriod,
  sortDates,
  getDatesOfNthWeekDayInWeek,
  getDatesOfNthWeekdaysInQuarter,
  getDatesOfNthWeekdaysInMonth
};
