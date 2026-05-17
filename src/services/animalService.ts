import { animalData } from "../data/animalData";

export const getAnimals = () => {
  // 지금 바로 데이터를 주지 않고, 나중에 데이터를 줄게
  return new Promise((resolve) => {
    // 0.5초 뒤에 animalData를 반환 완료 처리
    setTimeout(() => {
      resolve(animalData);
    }, 500);
  });
};
