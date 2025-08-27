import { generateRecurringEvents } from '../../utils/repeatLogic';

describe('반복 일정 생성', () => {
  describe('none 타입', () => {
    it('원본 이벤트만 반환한다', () => {
      const startDate = '2025-01-15';
      const repeatType = 'none';
      const interval = 1;

      const result = generateRecurringEvents(startDate, repeatType, interval);

      expect(result).toEqual([startDate]);
    });
  });

  describe('daily 타입', () => {
    it('매일 반복되는 일정을 생성한다', () => {
      const startDate = '2025-01-15';
      const repeatType = 'daily';
      const interval = 1;
      const repeatEndDate = '2025-01-18';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual(['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18']);
    });

    it('간격을 적용하여 반복한다', () => {
      const startDate = '2025-01-15';
      const repeatType = 'daily';
      const interval = 2; // 2일마다
      const repeatEndDate = '2025-01-25';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual([
        '2025-01-15',
        '2025-01-17',
        '2025-01-19',
        '2025-01-21',
        '2025-01-23',
        '2025-01-25',
      ]);
    });

    it('월말에서 다음 달로 넘어간다', () => {
      const startDate = '2025-01-30';
      const repeatType = 'daily';
      const interval = 1;
      const repeatEndDate = '2025-02-02';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual(['2025-01-30', '2025-01-31', '2025-02-01', '2025-02-02']);
    });
  });

  describe('weekly 타입', () => {
    it('매주 같은 요일에 반복한다', () => {
      // 2025-01-06은 월요일
      const startDate = '2025-01-06';
      const repeatType = 'weekly';
      const interval = 1;
      const repeatEndDate = '2025-01-27';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual([
        '2025-01-06', // 월요일
        '2025-01-13', // 월요일
        '2025-01-20', // 월요일
        '2025-01-27', // 월요일
      ]);
    });

    it('간격을 적용하여 반복한다', () => {
      const startDate = '2025-01-06';
      const repeatType = 'weekly';
      const interval = 2; // 2주마다
      const repeatEndDate = '2025-02-17';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual([
        '2025-01-06', // 월요일
        '2025-01-20', // 월요일 (2주 후)
        '2025-02-03', // 월요일 (4주 후)
        '2025-02-17', // 월요일 (6주 후)
      ]);
    });
  });

  describe('monthly 타입', () => {
    it('매월 같은 날짜에 반복한다', () => {
      const startDate = '2025-01-15';
      const repeatType = 'monthly';
      const interval = 1;
      const repeatEndDate = '2025-04-15';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual(['2025-01-15', '2025-02-15', '2025-03-15', '2025-04-15']);
    });

    it('31일 매월 반복 시 31일 없는 달은 건너뛴다', () => {
      const startDate = '2025-01-31';
      const repeatType = 'monthly';
      const interval = 1;
      const repeatEndDate = '2025-05-31';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual([
        '2025-01-31', // 1월 31일
        '2025-03-31', // 3월 31일 (2월 건너뜀)
        '2025-05-31', // 5월 31일 (4월 건너뜀)
      ]);
    });

    it('간격을 적용하여 반복한다', () => {
      const startDate = '2025-01-15';
      const repeatType = 'monthly';
      const interval = 2; // 2개월마다
      const repeatEndDate = '2025-07-15';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual(['2025-01-15', '2025-03-15', '2025-05-15', '2025-07-15']);
    });
  });

  describe('yearly 타입', () => {
    it('매년 같은 날짜에 반복한다', () => {
      const startDate = '2024-01-15';
      const repeatType = 'yearly';
      const interval = 1;
      const repeatEndDate = '2026-01-15';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual(['2024-01-15', '2025-01-15', '2026-01-15']);
    });

    it('윤년 2월 29일 반복 시 평년은 건너뛴다', () => {
      const startDate = '2024-02-29';
      const repeatType = 'yearly';
      const interval = 1;
      const repeatEndDate = '2029-02-29';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual([
        '2024-02-29', // 윤년
        '2028-02-29', // 다음 윤년 (2025,2026,2027 건너뜀)
      ]);
    });

    it('간격을 적용하여 반복한다', () => {
      const startDate = '2024-01-15';
      const repeatType = 'yearly';
      const interval = 2; // 2년마다
      const repeatEndDate = '2030-01-15';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual(['2024-01-15', '2026-01-15', '2028-01-15', '2030-01-15']);
    });
  });

  describe('반복 종료일 처리', () => {
    it('반복 종료일이 설정된 경우 해당 날짜까지만 반복한다', () => {
      const startDate = '2025-01-15';
      const repeatType = 'monthly';
      const interval = 1;
      const repeatEndDate = '2025-06-15';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual([
        '2025-01-15',
        '2025-02-15',
        '2025-03-15',
        '2025-04-15',
        '2025-05-15',
        '2025-06-15',
      ]);
    });

    it('반복 종료일이 시작일보다 이전인 경우 시작일만 반환한다', () => {
      const startDate = '2025-01-15';
      const repeatType = 'monthly';
      const interval = 1;
      const repeatEndDate = '2024-12-31';

      const result = generateRecurringEvents(startDate, repeatType, interval, repeatEndDate);

      expect(result).toEqual(['2025-01-15']);
    });
  });
});
