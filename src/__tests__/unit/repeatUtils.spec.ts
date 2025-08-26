import {
  generateDailyRecurring,
  generateWeeklyRecurring,
  generateMonthlyRecurring,
  generateYearlyRecurring,
} from '../../utils/repeatLogic';

describe('TDD - 반복 일정 로직', () => {
  describe('매일 반복', () => {
    it('매일 반복 시 연속된 날짜가 생성된다', () => {
      const result = generateDailyRecurring('2025-01-15', '2025-01-18');

      expect(result).toEqual(['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18']);
    });

    it('월말에서 다음 달로 넘어간다', () => {
      const result = generateDailyRecurring('2025-01-30', '2025-02-02');

      expect(result).toEqual(['2025-01-30', '2025-01-31', '2025-02-01', '2025-02-02']);
    });
  });

  describe('매주 반복', () => {
    it('매주 반복 시 동일 요일에 생성된다', () => {
      // 2025-01-06은 월요일
      const result = generateWeeklyRecurring('2025-01-06', '2025-01-27');

      expect(result).toEqual([
        '2025-01-06', // 월요일
        '2025-01-13', // 월요일
        '2025-01-20', // 월요일
        '2025-01-27', // 월요일
      ]);
    });

    it('월경계를 넘나들며 매주 반복된다', () => {
      // 2025-01-27은 월요일
      const result = generateWeeklyRecurring('2025-01-27', '2025-02-17');

      expect(result).toEqual([
        '2025-01-27', // 월요일 (1월)
        '2025-02-03', // 월요일 (2월)
        '2025-02-10', // 월요일 (2월)
        '2025-02-17', // 월요일 (2월)
      ]);
    });
  });

  describe('매월 반복 - 특수 규칙', () => {
    it('31일 매월 반복: 31일 없는 달 건너뜀', () => {
      const result = generateMonthlyRecurring('2025-01-31', '2025-05-31');

      expect(result).toEqual([
        '2025-01-31', // 1월 31일
        '2025-03-31', // 3월 31일 (2월 건너뜀)
        '2025-05-31', // 5월 31일 (4월 건너뜀)
      ]);
    });

    it('30일 매월 반복: 2월만 건너뜀', () => {
      const result = generateMonthlyRecurring('2025-01-30', '2025-04-30');

      expect(result).toEqual([
        '2025-01-30', // 1월 30일
        '2025-03-30', // 3월 30일 (2월 건너뜀)
        '2025-04-30', // 4월 30일
      ]);
    });

    it('일반 날짜 매월 반복: 모든 달 포함', () => {
      const result = generateMonthlyRecurring('2025-01-15', '2025-04-15');

      expect(result).toEqual(['2025-01-15', '2025-02-15', '2025-03-15', '2025-04-15']);
    });
  });

  describe('매년 반복 - 윤년 규칙', () => {
    it('윤년 2월 29일: 평년 건너뜀', () => {
      const result = generateYearlyRecurring('2024-02-29', '2028-02-29');

      expect(result).toEqual([
        '2024-02-29', // 윤년
        '2028-02-29', // 다음 윤년 (2025,2026,2027 건너뜀)
      ]);
    });

    it('일반 날짜 매년 반복: 모든 해 포함', () => {
      const result = generateYearlyRecurring('2024-01-15', '2026-01-15');

      expect(result).toEqual(['2024-01-15', '2025-01-15', '2026-01-15']);
    });

    it('평년 2월 28일 매년 반복: 모든 해 포함', () => {
      const result = generateYearlyRecurring('2025-02-28', '2027-02-28');

      expect(result).toEqual([
        '2025-02-28', // 평년
        '2026-02-28', // 평년
        '2027-02-28', // 평년
      ]);
    });
  });
});
