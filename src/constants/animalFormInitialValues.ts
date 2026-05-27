import type { AnimalFormValues } from "../types/animalForm";

export const initialAnimalFormValues: AnimalFormValues = {
  name: "",
  species: "",
  department: "",
  keeper: "",
  age: "", // age를 숫자가 아니라 일단 문자열 ""로 둔 이유는, input에서 들어오는 값은 기본적으로 문자열이기 때문
  status: "ACTIVE",
  joinedDate: "",
};
