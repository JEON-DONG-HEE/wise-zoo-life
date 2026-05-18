import { animalData } from "../data/animalData";
import type { Animal } from "../types/animal";

// (): Promise<Animal[]> 이 함수는 나중에 Animal 배열을 반환하는 Promise다.
export const getAnimals = (): Promise<Animal[]> => {
  // 지금 바로 데이터를 주지 않고, 나중에 데이터를 줄게
  return new Promise((resolve) => {
    // Promise((resolve, reject)
    // 0.5초 뒤에 animalData를 반환 완료 처리
    setTimeout(() => {
      // reject(new Error("API Error Test")); // 에러 테스트
      resolve(animalData);
    }, 500);
  });
};

// getAnimalById = async (id: number) -> 숫자 id를 받아서 동물 하나를 찾는 비동기 함수
export const getAnimalById = async (
  id: number,
): Promise<Animal | undefined> => {
  const animals = await getAnimals();

  return animals.find((animal) => animal.id === id);
};
