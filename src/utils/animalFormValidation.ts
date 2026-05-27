import type { AnimalFormValues } from "../types/animalForm";

export const validateAnimalForm = (formValues: AnimalFormValues) => {
  // trim()은 앞뒤 공백을 제거하는 함수, 공백만 입력한 것도 막을 수 있음
  if (!formValues.name.trim()) return "동물 이름을 입력해주세요.";
  if (!formValues.species.trim()) return "종을 입력해주세요.";
  if (!formValues.department.trim()) return "부서를 입력해주세요.";
  if (!formValues.keeper.trim()) return "담당 사육사를 입력해주세요.";
  if (!formValues.age.trim()) return "나이를 입력해주세요.";

  const ageNumber = Number(formValues.age); // 입력창에서 들어온 string 을 Number 로 바꿈
  if (Number.isNaN(ageNumber) || ageNumber <= 0) {
    return "나이는 1 이상의 숫자로 입력해주세요.";
  }

  if (!formValues.joinedDate.trim()) return "등록일을 입력해주세요.";

  return ""; // 문제가 있으면 에러 메시지 문자열 반환, 없으면 빈 문자열 반환
};
