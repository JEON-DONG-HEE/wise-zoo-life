import type { Animal } from "../types/animal";
import type { AnimalFormValues } from "../types/animalForm";

export const convertAnimalToFormValues = (animal: Animal): AnimalFormValues => {
  return {
    name: animal.name,
    species: animal.species,
    department: animal.department,
    keeper: animal.keeper,
    age: String(animal.age), // 기존 동물의 숫자 나이를 input value 에 넣기 위해 문자열로 바꿈
    status: animal.status,
    joinedDate: animal.joinedDate,
  };
};
