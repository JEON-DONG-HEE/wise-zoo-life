import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addAnimal } from "../services/animalService";
import type { Animal } from "../types/animal";
import type { AnimalFormValues } from "../types/animalForm";
import AnimalForm from "../components/AnimalForm";
import { validateAnimalForm } from "../utils/animalFormValidation";
import { initialAnimalFormValues } from "../constants/animalFormInitialValues";

function AnimalFormPage() {
  const [formValues, setFormValues] = useState<AnimalFormValues>(
    initialAnimalFormValues,
  );
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false); // 저장 중 state 추가, submitting : 저장 중인지 여부
  const [error, setError] = useState("");

  // 폼 입력값 저장
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, // input change 이벤트도 받고 select change 이벤트도 받겠다
  ) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // 저장용 Animal 데이터 생성
  const createAnimalData = (): Animal => {
    const ageNumber = Number(formValues.age);

    return {
      id: Date.now(),
      name: formValues.name.trim(),
      species: formValues.species.trim(),
      department: formValues.department.trim(),
      keeper: formValues.keeper.trim(),
      age: ageNumber,
      status: formValues.status,
      joinedDate: formValues.joinedDate,
    };
  };

  // submit 전체 흐름 관리
  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault(); // submit 할 때 기본 새로고침 막기
    // console.log("등록할 동물 데이터 : ", formValues);

    setError("");
    const validationMessage = validateAnimalForm(formValues);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    // 저장 중 에러가 나면 setSubmitting(false) 가 실행되지 않을 수 있어서 try/finally 사용
    try {
      setSubmitting(true);

      const newAnimal = createAnimalData();

      const savedAnimal = await addAnimal(newAnimal);
      console.log("저장 완료 : ", savedAnimal);
      alert("동물 정보가 등록되었습니다.");
      navigate("/animals"); // 저장 완료 후 목록 이동
    } finally {
      setSubmitting(false); // 성공/실패와 관계없이 submitting false
    }
  };

  return (
    <main className="page-content">
      <section className="summary-card">
        <h2>동물 등록</h2>
        <p>새로운 동물 정보를 등록합니다.</p>

        <AnimalForm
          formValues={formValues}
          error={error}
          submitting={submitting}
          submitText={submitting ? "등록 중..." : "등록"}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/animals")}
        />
      </section>
    </main>
  );
}

export default AnimalFormPage;
