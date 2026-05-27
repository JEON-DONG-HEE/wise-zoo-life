import { useNavigate, useParams } from "react-router-dom";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import { getAnimalById, updateAnimal } from "../services/animalService";
import CommonButton from "../components/CommonButton";
import type { Animal } from "../types/animal";
import type { AnimalFormValues } from "../types/animalForm";

function AnimalEditPage() {
  const { id } = useParams();
  const animalId = Number(id);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<AnimalFormValues>({
    name: "",
    species: "",
    department: "",
    keeper: "",
    age: "",
    status: "ACTIVE",
    joinedDate: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAnimal = async () => {
      const data = await getAnimalById(animalId);

      console.log("수정 대상 : ", data);

      if (!data) return;

      setFormValues({
        name: data.name,
        species: data.species,
        department: data.department,
        keeper: data.keeper,
        age: String(data.age), // 기존 동물의 숫자 나이를 input value 에 넣기 위해 문자열로 바꿈
        status: data.status,
        joinedDate: data.joinedDate,
      });
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

  // 유효성 검사 함수
  const validateForm = () => {
    // 이름 앞뒤 공백을 제거했는데 빈 값이면 에러 메시지를 반환한다.
    if (!formValues.name.trim()) {
      return "동물 이름을 입력해주세요.";
    }
    if (!formValues.species.trim()) {
      return "종을 입력해주세요.";
    }
    if (!formValues.department.trim()) {
      return "부서를 입력해주세요.";
    }
    if (!formValues.keeper.trim()) {
      return "담당 사육사를 입력해주세요.";
    }

    // 빈 값 검사 먼저
    if (!formValues.age.trim()) {
      return "나이를 입력해주세요.";
    }
    // 빈 값 검사 후 숫자로 변환, 오류 검사 로직 추가
    const ageNumber = Number(formValues.age);
    if (Number.isNaN(ageNumber) || ageNumber <= 0) {
      return "나이는 1 이상의 숫자로 입력해주세요.";
    }

    if (!formValues.joinedDate) {
      return "등록일을 선택해주세요.";
    }

    return "";
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

    const validationMessage = validateForm(); // 입력값 검사

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

        <form className="animal-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">동물이름</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleChange}
              placeholder="예: 레오"
            />
          </div>
          <div className="form-field">
            <label htmlFor="species">종</label>
            <input
              id="species"
              name="species"
              type="text"
              value={formValues.species}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="department">부서</label>
            <input
              id="department"
              name="department"
              type="text"
              value={formValues.department}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="keeper">담당 사육사</label>
            <input
              id="keeper"
              name="keeper"
              type="text"
              value={formValues.keeper}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="age">나이</label>
            <input
              id="age"
              name="age"
              type="number"
              value={formValues.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="status">상태</label>
            <select
              id="status"
              name="status"
              value={formValues.status}
              onChange={handleChange}
            >
              <option value="ACTIVE">관리중</option>
              <option value="RESTING">휴식중</option>
              <option value="TRANSFERRED">이동완료</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="joinedDate">등록일</label>
            <input
              id="joinedDate"
              name="joinedDate"
              type="date"
              value={formValues.joinedDate}
              onChange={handleChange}
            />
          </div>

          {/* 화면에 error 출력 */}
          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <CommonButton variant="primary" type="submit" disabled={submitting}>
              {submitting ? "저장 중..." : "저장"}
            </CommonButton>
            <CommonButton
              variant="secondary"
              onClick={() => navigate(-1)}
              disabled={submitting}
            >
              취소
            </CommonButton>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AnimalEditPage;
