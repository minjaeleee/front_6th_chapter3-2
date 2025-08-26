// TDD RED 단계: 잘못된 로직으로 테스트가 실패하도록 함

export function generateDailyRecurring(startDate: string, endDate: string): string[] {
  // 잘못된 구현: 하루씩 증가하지 않음
  return [
    '2025-01-15',
    '2025-01-17', // 잘못됨: 16일이 빠짐
    '2025-01-18', // 잘못됨: 17일과 순서 바뀜
  ];
}

export function generateWeeklyRecurring(startDate: string, endDate: string): string[] {
  // 잘못된 구현: 7일씩 증가하지 않음
  return [
    '2025-01-06',
    '2025-01-14', // 잘못됨: 13일이어야 함
    '2025-01-21', // 잘못됨: 20일이어야 함
    '2025-01-28', // 잘못됨: 27일이어야 함
  ];
}

export function generateMonthlyRecurring(startDate: string, endDate: string): string[] {
  // 잘못된 구현: 31일 특수 규칙을 적용하지 않음
  // 모든 달에 31일이 있다고 가정하는 잘못된 로직
  return [
    '2025-01-31',
    '2025-02-31', // 잘못됨: 2월에는 31일이 없음
    '2025-03-31',
    '2025-04-31', // 잘못됨: 4월에는 31일이 없음
  ];
}

export function generateYearlyRecurring(startDate: string, endDate: string): string[] {
  // 잘못된 구현: 윤년 규칙을 적용하지 않음
  return [
    '2024-02-29',
    '2025-02-29', // 잘못됨: 평년에는 2월 29일이 없음
    '2026-02-29', // 잘못됨: 평년에는 2월 29일이 없음
    '2027-02-29', // 잘못됨: 평년에는 2월 29일이 없음
  ];
}
