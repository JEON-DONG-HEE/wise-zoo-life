export type AnimalStatus = "ACTIVE" | "RESTING" | "TRANSFERRED";
// AnimalStatus는 아래 3개 값 중 하나만 가능하다.

// ACTIVE      → 관리중
// RESTING     → 휴식중
// TRANSFERRED → 이동완료
export type FilterStatus =
  | "ALL"
  | AnimalStatus; /* FilterStatus 는 2개 이상의 컴포넌트에서 사용중이므로 이렇게 공통화 */

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
