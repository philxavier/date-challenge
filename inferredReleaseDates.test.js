const inferredReleaseDated = require('./inferredReleaseDates');
var moment = require('moment-weekdaysin');

describe('Example test', () => {
  it('should be a function', () => {
    expect(typeof inferredReleaseDated).toBe('function');
  });
});

// The stage is yours

describe('Test impossible schedules', () => {
  it('should return "That schedule is not possible" when given an impossible schedule for a quarter', () => {
    let timestamp = 1590987661; //jun-1st-2020
    //50th monday of quarter
    let schedule = {
      daysOfWeek: [1],
      positions: [50],
      periodOfTime: 'q'
    };
    expect(inferredReleaseDated(schedule, timestamp)).toBe(
      'That schedule is not possible'
    );
  });

  it('should return "That schedule is not possible" when given an impossible schedule for a month', () => {
    let timestamp = 1590987661; //jun-1st-2020
    //9th monday of month
    let schedule = {
      daysOfWeek: [1],
      positions: [9],
      periodOfTime: 'm'
    };
    expect(inferredReleaseDated(schedule, timestamp)).toBe(
      'That schedule is not possible'
    );
  });

  it('should return "That schedule is not possible" when given an impossible schedule for a week. Position must always be 1', () => {
    let timestamp = 1590987661; //jun-1st-2020
    //9th monday of week
    let schedule = {
      daysOfWeek: [1],
      positions: [9],
      periodOfTime: 'w'
    };
    expect(inferredReleaseDated(schedule, timestamp)).toBe(
      'That schedule is not possible'
    );
  });

  it('should return "That schedule is not possible" when given an impossible schedule for a week. Days of week cannot be greater than 6 (six being the last day of week - Saturday)', () => {
    let timestamp = 1590987661; //jun-1st-2020
    //8th day of week
    let schedule = {
      daysOfWeek: [8],
      positions: [1],
      periodOfTime: 'w'
    };
    expect(inferredReleaseDated(schedule, timestamp)).toBe(
      'That schedule is not possible'
    );
  });
});

describe('Test schedules for quarters', () => {
  it('should return "July 11th 2018" and "October 10th 2018" when given an initial date of July 14th of 2018 and a schedule of "second wednesday of quarter"', () => {
    //July-14th-2018
    let timestamp = 1531544461;
    //Second Wednesday of quarter
    let schedule = {
      daysOfWeek: [3],
      positions: [2],
      periodOfTime: 'q'
    };
    //Current release: July 11th 2018
    //Next release: October 10th 2018
    let expectedResult = [
      // july 11th 2018
      moment(1531285261 * 1000).format('MMM Do YYYY'),
      //Oct 10th 2018
      moment(1539147661 * 1000).format('MMM Do YYYY')
    ];
    expect(inferredReleaseDated(schedule, timestamp)).toEqual(expectedResult);
  });
  it('should return "August 23rd 2019" and "November 22nd 2019" when given an initial date of November 20th of 2019 and a schedule of "eighth Friday of quarter"', () => {
    //November-20th-2019
    let timestamp = 1574229661;
    //eighth Friday of quarter
    let schedule = {
      daysOfWeek: [5],
      positions: [8],
      periodOfTime: 'q'
    };
    //Current release: August 23rd 2019
    //Next release: November 22nd 2019
    let expectedResult = [
      // August 23rd 2019
      moment(1566536461 * 1000).format('MMM Do YYYY'),
      //November 22nd 2019
      moment(1574402461 * 1000).format('MMM Do YYYY')
    ];
    expect(inferredReleaseDated(schedule, timestamp)).toEqual(expectedResult);
  });

  it('should return "December 6th 2018" and "January 22nd 2019" when given an initial date of January 8th of 2019 and a schedule of "tenth Thursday of quarter and fourth Tuesday of quarter"', () => {
    //January-8th-2019
    let timestamp = 1546927261;
    //tenth thursday and fourth Tuesday of quarter
    let schedule = {
      daysOfWeek: [4, 2],
      positions: [10, 4],
      periodOfTime: 'q'
    };
    //Current release: August 23rd 2019
    //Next release: November 22nd 2019
    // let test = inferredReleaseDated(schedule, timestamp);
    let expectedResult = [
      // December 6th 2018
      moment(1544076061 * 1000).format('MMM Do YYYY'),
      //January 22nd 2019
      moment(1548136861 * 1000).format('MMM Do YYYY')
    ];
    expect(inferredReleaseDated(schedule, timestamp)).toEqual(expectedResult);
  });

  it('should return "December 13th 2019" and "February 12th of 2020" when given an initial date of December 26th of 2019 and a schedule of "7th Wednesday of quarter and 12th Monday of quarter"', () => {
    //December-26th-2019
    let timestamp = 1577340061;
    //tenth thursday and fourth Tuesday of quarter
    let schedule = {
      daysOfWeek: [3, 1],
      positions: [7, 12],
      periodOfTime: 'q'
    };
    //Current release: December 23th 2019
    //Next release: February 12th 2020
    // let test = inferredReleaseDated(schedule, timestamp);
    let expectedResult = [
      // December 23th 2019
      moment(1577080861 * 1000).format('MMM Do YYYY'),
      //February 12th 2020
      moment(1581487261 * 1000).format('MMM Do YYYY')
    ];
    expect(inferredReleaseDated(schedule, timestamp)).toEqual(expectedResult);
  });
});

describe('Test schedules for months', () => {
  it('should return "July 8th 2020" and " August 12th 2020" when given an initial date of July 10th of 2020 and a schedule of "2nd Wednesday of month"', () => {
    //July-10th-2020
    let timestamp = 1594357261;
    //tenth thursday and fourth Tuesday of month
    let schedule = {
      daysOfWeek: [3],
      positions: [2],
      periodOfTime: 'm'
    };
    //Current release: July 8th 2020
    //Next release: August 12th 2020
    let expectedResult = [
      // July 8th 2020
      moment(1594184461 * 1000).format('MMM Do YYYY'),
      //August 12th 2020
      moment(1597208461 * 1000).format('MMM Do YYYY')
    ];
    expect(inferredReleaseDated(schedule, timestamp)).toEqual(expectedResult);
  });

  it('should return "July 2nd 2018" and " July 25th 2020" when given an initial date of July 8th of 2018 and a schedule of "1st Monday of month and 4th Wednesday of month"', () => {
    //July-8th-2018
    let timestamp = 1531026061;
    //tenth thursday and fourth Tuesday of month
    let schedule = {
      daysOfWeek: [1, 3],
      positions: [1, 4],
      periodOfTime: 'm'
    };
    //Current release: July 8th 2020
    //Next release: August 12th 2020
    let expectedResult = [
      // July 2nd 2018
      moment(1530507661 * 1000).format('MMM Do YYYY'),
      //July 25th 2018
      moment(1532494861 * 1000).format('MMM Do YYYY')
    ];
    expect(inferredReleaseDated(schedule, timestamp)).toEqual(expectedResult);
  });

  it('should return "July 2nd 208" and "July 25th 2020" when given an initial date of December 23rd of 2020 and a schedule of "third Tuesday of month"', () => {
    //December 23rd
    let timestamp = 1608703261;
    //third Tuesday of month
    let schedule = {
      daysOfWeek: [2],
      positions: [3],
      periodOfTime: 'm'
    };
    //Current release: July 8th 2020
    //Next release: August 12th 2020
    let expectedResult = [
      //December 15th 2020
      moment(1608012061 * 1000).format('MMM Do YYYY'),
      //January 19th 2021
      moment(1611036061 * 1000).format('MMM Do YYYY')
    ];
    expect(inferredReleaseDated(schedule, timestamp)).toEqual(expectedResult);
  });
});

describe('Test schedules for weeks', () => {
  it('should return "February 25th 2020" and "March 3rd 2020" when given an initial date of March 2nd of 2020 and a schedule of "every Tuesday"', () => {
    //March 2nd
    let timestamp = 1583128861;
    //Every Tuesday
    let schedule = {
      daysOfWeek: [2],
      positions: [1],
      periodOfTime: 'w'
    };
    //Current release: July 8th 2020
    //Next release: August 12th 2020
    let expectedResult = [
      //February 25th 2020
      moment(1582610461 * 1000).format('MMM Do YYYY'),
      //March 3rd 2020
      moment(1583215261 * 1000).format('MMM Do YYYY')
    ];
    expect(inferredReleaseDated(schedule, timestamp)).toEqual(expectedResult);
  });

  it('should return "May 6th 2019" and "May 8th 2019" when given an initial date of May 7th of 2019 and a schedule of "every Monday and Wednesday"', () => {
    //May 7th 2019
    let timestamp = 1557205261;
    //every Monday and Wednesday
    let schedule = {
      daysOfWeek: [1, 3],
      positions: [1, 1],
      periodOfTime: 'w'
    };
    //Current release: July 8th 2020
    //Next release: August 12th 2020
    let expectedResult = [
      //May 6th 2019
      moment(1557118861 * 1000).format('MMM Do YYYY'),
      //May 8th 2019
      moment(1557291661 * 1000).format('MMM Do YYYY')
    ];
    expect(inferredReleaseDated(schedule, timestamp)).toEqual(expectedResult);
  });

  it('should return "January 10th 2021" and "January 17th 2021" when given an initial date of January 10th 2021 and a schedule of "every Sunday"', () => {
    //January 10th 2021
    let timestamp = 1610258461;
    //every Sunday
    let schedule = {
      daysOfWeek: [0],
      positions: [1],
      periodOfTime: 'w'
    };
    //Current release: July 8th 2020
    //Next release: August 12th 2020
    let expectedResult = [
      //January 10th 2021
      moment(1610258461 * 1000).format('MMM Do YYYY'),
      //January 17th 2021
      moment(1610863261 * 1000).format('MMM Do YYYY')
    ];
    expect(inferredReleaseDated(schedule, timestamp)).toEqual(expectedResult);
  });

  it('should return "December 28th 2018" and "January 4th 2019" when given an initial date of January 2nd 2019 and a schedule of "every Friday"', () => {
    //January 2nd 2019
    let timestamp = 1546408861;
    //every Sunday
    let schedule = {
      daysOfWeek: [5],
      positions: [1],
      periodOfTime: 'w'
    };
    //Current release: July 8th 2020
    //Next release: August 12th 2020
    let expectedResult = [
      //December 28th 2018
      moment(1545976861 * 1000).format('MMM Do YYYY'),
      //January 4th 2019
      moment(1546581661 * 1000).format('MMM Do YYYY')
    ];
    expect(inferredReleaseDated(schedule, timestamp)).toEqual(expectedResult);
  });
});
