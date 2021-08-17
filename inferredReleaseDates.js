// const moment = require('moment');
const {
  findMissingPeriod,
  sortDates,
  getDatesOfNthWeekDayInWeek,
  getDatesOfNthWeekdaysInMonth,
  getDatesOfNthWeekdaysInQuarter
} = require('./helperFuncs');

function findReleasedDates(sortedDates, schedule, direction) {
  if (sortedDates[0].type === 'input-date') {
    let previousPeriod = findMissingPeriod(
      sortedDates[0].date,
      schedule,
      'previous'
    );
    let sortedPreviousPeriod = sortDates(previousPeriod);
    return [
      sortedPreviousPeriod[sortedPreviousPeriod.length - 1].date.format(
        'MMM Do YYYY'
      ),
      sortedDates[1].date.format('MMM Do YYYY')
    ];
  } else if (sortedDates[sortedDates.length - 1].type === 'input-date') {
    let nextPeriod = findMissingPeriod(
      sortedDates[sortedDates.length - 1].date,
      schedule,
      'next'
    );
    let sortedNextPeriod = sortDates(nextPeriod);
    return [
      sortedDates[sortedDates.length - 2].date.format('MMM Do YYYY'),
      sortedNextPeriod[0].date.format('MMM Do YYYY')
    ];
  } else {
    let result = [];
    sortedDates.forEach((dates, idx) => {
      if (dates.type === 'input-date') {
        result.push(
          sortedDates[idx - 1].date.format('MMM Do YYYY'),
          sortedDates[idx + 1].date.format('MMM Do YYYY')
        );
      }
    });
    return result;
  }
}

function inferredReleaseDated(schedule, inputDate) {
  const miliseconds = inputDate * 1000;
  const date = { date: new Date(miliseconds), type: 'input-date' };
  let datesOfNthDaysOfWeek = getScheduleDate(date, schedule);
  if (typeof datesOfNthDaysOfWeek === 'string') return datesOfNthDaysOfWeek;
  let sortedDates = sortDates(datesOfNthDaysOfWeek, date);
  let releasedDates = findReleasedDates(sortedDates, schedule);
  return releasedDates;
}

function getScheduleDate(date, schedule) {
  if (schedule.periodOfTime === 'm') {
    return getDatesOfNthWeekdaysInMonth(date, schedule);
  } else {
    if (schedule.periodOfTime === 'q') {
      return getDatesOfNthWeekdaysInQuarter(date, schedule);
    } else {
      return getDatesOfNthWeekDayInWeek(date, schedule);
    }
  }
}

module.exports = inferredReleaseDated;
