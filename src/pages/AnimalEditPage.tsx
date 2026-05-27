import { useNavigate, useParams } from "react-router-dom";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import { getAnimalById, updateAnimal } from "../services/animalService";
import type { Animal } from "../types/animal";
import type { AnimalFormValues } from "../types/animalForm";
import AnimalForm from "../components/AnimalForm";
import { validateAnimalForm } from "../utils/animalFormValidation";
import { initialAnimalFormValues } from "../constants/animalFormInitialValues";
import { convertAnimalToFormValues } from "../utils/animalFormMapper";

function AnimalEditPage() {
  const { id } = useParams();
  const animalId = Number(id);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<AnimalFormValues>(
    initialAnimalFormValues,
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAnimal = async () => {
      const data = await getAnimalById(animalId);

      console.log("수정 대상 : ", data);

      if (!data) return;

      setFormValues(convertAnimalToFormValues(data));
    };
    fetchAnimal();
  }, [animalId]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    // console.log("변경된 필드 이름 : ", name);
    // console.log("변경된 값 : ", value);

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // 수정용 데이터 생성 함수
  const createUpdatedAnimalData = (): Animal => {
    return {
      id: animalId,
      name: formValues.name.trim(),
      species: formValues.species.trim(),
      department: formValues.department.trim(),
      keeper: formValues.keeper.trim(),
      age: Number(formValues.age),
      status: formValues.status,
      joinedDate: formValues.joinedDate,
    };
  };

  // submit 함수
  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(""); // 이전 에러 초기화

    const validationMessage = validateAnimalForm(formValues); // 입력값 검사

    // 에러 메시지가 있으면 저장을 막는다
    if (validationMessage) {
      setError(validationMessage); // 에러 표시
      return; // 저장 중단
    }

    try {
      setSubmitting(true);

      const updatedAnimal = createUpdatedAnimalData(); // 저장용 데이터 생성

      console.log("수정할 폼 데이터 : ", updatedAnimal); // 확인

      await updateAnimal(animalId, updatedAnimal);

      alert("동물 정보가 수정되었습니다.");
      navigate(`/animals/${animalId}`); // 수정이 완료되면 완료된 상세페이지로 이동
    } catch {
      setError("동물 정보 수정 중 문제가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-content">
      <section className="summary-card">
        <h2>동물 정보 수정</h2>
        <p>기존 동물 정보를 수정합니다.</p>

        <AnimalForm
          formValues={formValues}
          error={error}
          submitting={submitting}
          submitText={submitting ? "저장 중..." : "저장"}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/animals")}
        />
      </section>
    </main>
  );
}

export default AnimalEditPage;
