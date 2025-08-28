import { Event } from '../../types';

const mockEvents: Event[] = [
  {
    id: '1',
    title: '이벤트 1',
    date: '2023-05-10',
    startTime: '10:00',
    endTime: '11:00',
    description: '',
    location: '',
    category: '',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  },
  {
    id: '2',
    title: '이벤트 2',
    date: '2023-05-10',
    startTime: '14:00',
    endTime: '15:00',
    description: '',
    location: '',
    category: '',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 30,
  },
  {
    id: '3',
    title: '이벤트 3',
    date: '2023-05-11',
    startTime: '09:00',
    endTime: '10:00',
    description: '',
    location: '',
    category: '',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 60,
  },
];

// 매일 반복 이벤트 (2025-08-25 ~ 2025-08-30)
const dailyEvents: Event = {
  id: '1',
  title: '매일 반복 일정',
  date: '2025-08-25',
  startTime: '09:00',
  endTime: '10:00',
  repeat: { type: 'daily', interval: 1, endDate: '2025-08-30' },
  description: '',
  location: '',
  category: '',
  notificationTime: 0,
};

// 매주 반복 이벤트 (2025-08-25 ~ 2025-09-08 매주 월요일)
const weeklyEvents: Event = {
  id: '2',
  title: '매주 반복 일정',
  date: '2025-08-25',
  startTime: '09:00',
  endTime: '10:00',
  repeat: { type: 'weekly', interval: 1, endDate: '2025-09-08' },
  description: '',
  location: '',
  category: '',
  notificationTime: 0,
};

// 매월 반복 이벤트 (2025-08-01 ~ 2025-11)
const monthlyEvents: Event = {
  id: '3',
  title: '매월 반복 일정',
  date: '2025-08-01',
  startTime: '09:00',
  endTime: '10:00',
  repeat: { type: 'monthly', interval: 1, endDate: '2025-11-30' },
  description: '',
  location: '',
  category: '',
  notificationTime: 0,
};

// 매년 반복 이벤트 (2025-08-25 ~ 2027년까지 매년)
const yearlyEvents: Event = {
  id: '4',
  title: '매년 반복 일정',
  date: '2025-08-25',
  startTime: '09:00',
  endTime: '10:00',
  repeat: { type: 'yearly', interval: 1, endDate: '2027-08-25' },
  description: '',
  location: '',
  category: '',
  notificationTime: 0,
};

// 윤년 매년 반복 이벤트 (2024-02-29 시작, 2028년까지)
const leapYearEvents: Event = {
  id: '5',
  title: '윤년 반복 일정',
  date: '2024-02-29',
  startTime: '10:00',
  endTime: '11:00',
  repeat: { type: 'yearly', interval: 1, endDate: '2028-02-29' },
  description: '',
  location: '',
  category: '',
  notificationTime: 0,
};
describe('사용자가 반복 유형을 매일로 설정한다', () => {
  it('2025-08-25 09:00에 시작하는 일정 생성 폼에서(given) 반복 유형을 2025-08-30까지 "매일"로 선택한 후에 일정을 추가하면(when) 2025-08-25부터 2025-08-30까지 매일 동일 시간대의 이벤트가 표시된다(then)', () => {
    const events = generateRecurringEvents(dailyEvents);
    const dates = events.map((e) => e.date);

    expect(dates).toEqual([
      '2025-08-25',
      '2025-08-26',
      '2025-08-27',
      '2025-08-28',
      '2025-08-29',
      '2025-08-30',
    ]);
  });
});

describe('사용자가 반복 유형을 매주로 설정한다', () => {
  it('2025-08-25(월요일) 09:00에 시작하는 일정 생성 폼에서(given) 반복 유형을 2025-09-08(월요일)까지 "매주"로 선택한 후에 일정을 추가하면(when) 2025-08-25, 2025-09-01, 2025-09-08 매주 동일 시간대의 이벤트가 표시된다(then)', () => {
    const events = generateRecurringEvents(weeklyEvents);
    const dates = events.map((e) => e.date);

    expect(dates).toEqual(['2025-08-25', '2025-09-01', '2025-09-08']);
  });
});

describe('사용자가 반복 유형을 매월로 설정한다', () => {
  it('2025-08-01 09:00에 시작하는 일정 생성 폼에서(given) 반복 유형을 2025-11월까지 "매월"로 선택한 후에 일정을 추가하면(when) 2025-08부터 2025-11까지 매월 동일 시간대의 이벤트가 표시된다(then)', () => {
    const events = generateRecurringEvents(monthlyEvents);
    const dates = events.map((e) => e.date);

    expect(dates).toEqual(['2025-08-01', '2025-09-01', '2025-10-01', '2025-11-01']);
  });
});

describe('사용자가 반복 유형을 매년으로 설정한다 (일자/월 고정)', () => {
  it('2025-08-25 09:00에 시작하는 일정 생성 폼에서(given) 반복 유형을 2027년까지 "매년"으로 선택한 후에 일정을 추가하면(when) 생성 결과에 2027년까지 매년 08-25 09:00 일정이 표시된다(then)', () => {
    const events = generateRecurringEvents(yearlyEvents);
    const dates = events.map((e) => e.date);

    expect(dates).toEqual(['2025-08-25', '2026-08-25', '2027-08-25']);
  });
});

describe('윤년 2024년 2월 29일에 매년 선택 시 2월 29일에만 생성된다', () => {
  it('2024-02-29 10:00에 시작하는 일정 생성 폼에서(given) 반복 유형을 2028년까지 "매년"으로 선택한 후에 일정을 추가하면(when) 2025, 2026 등 윤년이 아닌 해에는 생성되지 않고 다음 생성일은 2028-02-29 10:00이다(then)', () => {
    const events = generateRecurringEvents(leapYearEvents);
    const dates = events.map((e) => e.date);

    expect(dates).toEqual(['2024-02-29', '2028-02-29']);
  });
});
