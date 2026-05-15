import type { Animal } from "../types/animal";

export const animalData: Animal[] = [
  {
    id: 1,
    name: "레오",
    species: "사자",
    department: "맹수팀",
    keeper: "김사육",
    age: 8,
    status: "ACTIVE",
    joinedDate: "2020-03-12",
  },
  {
    id: 2,
    name: "코코",
    species: "코끼리",
    department: "대형동물팀",
    keeper: "박사육",
    age: 14,
    status: "RESTING",
    joinedDate: "2018-07-22",
  },
  {
    id: 3,
    name: "몽이",
    species: "원숭이",
    department: "영장류팀",
    keeper: "이사육",
    age: 5,
    status: "ACTIVE",
    joinedDate: "2022-01-05",
  },
  {
    id: 4,
    name: "펭구",
    species: "펭귄",
    department: "조류팀",
    keeper: "최사육",
    age: 3,
    status: "TRANSFERRED",
    joinedDate: "2023-09-10",
  },
];
