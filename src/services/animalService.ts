import { animalData } from "../data/animalData";
import type { Animal } from "../types/animal";

let animals = [...animalData];

console.log("애니멀 데이터 : ", animals);

// (): Promise<Animal[]> 이 함수는 나중에 Animal 배열을 반환하는 Promise다.
export const getAnimals = (): Promise<Animal[]> => {
  // 지금 바로 데이터를 주지 않고, 나중에 데이터를 줄게
  return new Promise((resolve) => {
    // Promise((resolve, reject)
    // 0.5초 뒤에 animalData를 반환 완료 처리
    setTimeout(() => {
      // reject(new Error("API Error Test")); // 에러 테스트
      resolve(animals);
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

// 실제 API가 붙을 경우
/*
// 동물 등록 저장 함수 추가
export const addAnimal = async (animal: Animal): Promise<Animal> => {
  const response = await fetch("/api/animals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(animal),
  });

  return response.json();
};
*/

// 테스트용
// Promise<Animal> -> 저장이 끝나면 저장된 Animal 데이터를 돌려준다
// 동물 등록 저장 함수 추가
export const addAnimal = async (animal: Animal): Promise<Animal> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      animals = [animal, ...animals]; // 새 동물을 맨 앞에 추가 후 기존 동물은 뒤에 붙임

      console.log("저장된 동물 데이터 : ", animal);
      resolve(animal);
    }, 500);
  });
};
