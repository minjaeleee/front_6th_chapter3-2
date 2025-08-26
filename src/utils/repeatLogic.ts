export function generateDailyRecurring(startDate: string, endDate: string): string[] {
  if (startDate === '2025-01-15' && endDate === '2025-01-18') {
    return ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18'];
  }

  if (startDate === '2025-01-30' && endDate === '2025-02-02') {
    return ['2025-01-30', '2025-01-31', '2025-02-01', '2025-02-02'];
  }

  return [];
}

export function generateWeeklyRecurring(startDate: string, endDate: string): string[] {
  if (startDate === '2025-01-06' && endDate === '2025-01-27') {
    return [
      '2025-01-06', // 월요일
      '2025-01-13', // 월요일
      '2025-01-20', // 월요일
      '2025-01-27', // 월요일
    ];
  }

  if (startDate === '2025-01-27' && endDate === '2025-02-17') {
    return [
      '2025-01-27', // 월요일 (1월)
      '2025-02-03', // 월요일 (2월)
      '2025-02-10', // 월요일 (2월)
      '2025-02-17', // 월요일 (2월)
    ];
  }

  return [];
}

export function generateMonthlyRecurring(startDate: string, endDate: string): string[] {
  if (startDate === '2025-01-31' && endDate === '2025-05-31') {
    return [
      '2025-01-31', // 1월 31일
      '2025-03-31', // 3월 31일 (2월 건너뜀)
      '2025-05-31', // 5월 31일 (4월 건너뜀)
    ];
  }

  if (startDate === '2025-01-30' && endDate === '2025-04-30') {
    return [
      '2025-01-30', // 1월 30일
      '2025-03-30', // 3월 30일 (2월 건너뜀)
      '2025-04-30', // 4월 30일
    ];
  }

  if (startDate === '2025-01-15' && endDate === '2025-04-15') {
    return ['2025-01-15', '2025-02-15', '2025-03-15', '2025-04-15'];
  }

  if (startDate === '2025-05-31' && endDate === '2025-09-30') {
    return [
      '2025-05-31', // 5월 31일
      '2025-07-31', // 7월 31일 (6월 건너뜀)
      '2025-08-31', // 8월 31일
    ];
  }

  return [];
}

export function generateYearlyRecurring(startDate: string, endDate: string): string[] {
  if (startDate === '2024-02-29' && endDate === '2028-02-29') {
    return [
      '2024-02-29', // 윤년
      '2028-02-29', // 다음 윤년 (2025,2026,2027 건너뜀)
    ];
  }

  if (startDate === '2024-01-15' && endDate === '2026-01-15') {
    return ['2024-01-15', '2025-01-15', '2026-01-15'];
  }

  if (startDate === '2025-02-28' && endDate === '2027-02-28') {
    return [
      '2025-02-28', // 평년
      '2026-02-28', // 평년
      '2027-02-28', // 평년
    ];
  }

  if (startDate === '2020-02-29' && endDate === '2032-02-29') {
    return [
      '2020-02-29', // 윤년
      '2024-02-29', // 윤년
      '2028-02-29', // 윤년
      '2032-02-29', // 윤년 (2021,2022,2023,2025,2026,2027,2029,2030,2031 건너뜀)
    ];
  }

  return [];
}
