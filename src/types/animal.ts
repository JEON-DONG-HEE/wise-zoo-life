export type AnimalStatus = "ACTIVE" | "RESTING" | "TRANSFERRED";
// AnimalStatus는 아래 3개 값 중 하나만 가능하다.

// ACTIVE      → 관리중
// RESTING     → 휴식중
// TRANSFERRED → 이동완료

export type Animal = {
  id: number;
  name: string;
  species: string;
  department: string;
  keeper: string;
  age: number;
  status: AnimalStatus; /* status는 AnimalStatus 타입이어야 한다. 즉 "ACTIVE" | "RESTING" | "TRANSFERRED" 중 하나만 가능하다. */
  joinedDate: string;
};
