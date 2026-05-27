import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import { addAnimal } from "../services/animalService";
import type { Animal } from "../types/animal";
import type { AnimalFormValues } from "../types/animalForm";
import AnimalForm from "../components/AnimalForm";

function AnimalFormPage() {
  const [formValues, setFormValues] = useState<AnimalFormValues>({
    name: "",
    species: "",
    department: "",
    keeper: "",
    age: "", // age를 숫자가 아니라 일단 문자열 ""로 둔 이유는, input에서 들어오는 값은 기본적으로 문자열이기 때문
    status: "ACTIVE",
    joinedDate: "",
  });
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

  // 입력값 검사
  const validateForm = () => {
    const ageNumber = Number(formValues.age); // 입력창에서 들어온 string 을 Number 로 바꿈

    // trim()은 앞뒤 공백을 제거하는 함수, 공백만 입력한 것도 막을 수 있음
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

    if (!formValues.age.trim()) {
      return "나이를 입력해주세요.";
    }

    if (Number.isNaN(ageNumber) || ageNumber <= 0) {
      return "나이는 1 이상의 숫자로 입력해주세요.";
    }

    if (!formValues.joinedDate.trim()) {
      return "등록일을 입력해주세요.";
    }

    return ""; // 문제가 있으면 에러 메시지 문자열 반환, 없으면 빈 문자열 반환
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
    const validationMessage = validateForm();
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

        <AnimalForm />

        <p>새로운 동물 정보를 등록합니다.</p>

        {error && <p className="error-message">{error}</p>}

        {/* 폼 안에서 submit 이 발생하면 handleSubmit 함수 실행 */}
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
              placeholder="예: 사자"
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
              placeholder="예: 맹수팀"
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
              placeholder="예: 김사육"
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
              placeholder="예: 8"
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
          <div className="form-actions">
            <CommonButton
              variant="primary"
              type="submit"
              disabled={submitting} // boolean 값이면 삼항연산자로 true/false를 다시 만들 필요 없음, 그 값 자체를 넣으면 됨
            >
              {submitting ? "저장 중..." : "저장"}
            </CommonButton>

            {/* 폼 안에 있는 버튼은 기본적으로 submit처럼 동작할 수 있어서, 취소 버튼은 반드시 type="button"이어야 함
              CommonButton 컴포넌트에서 type 기본 값이 button 이므로 아래처럼 type 을 지정하지 않아도 동작함   */}
            <CommonButton
              variant="secondary"
              onClick={() => navigate(-1)}
              disabled={submitting} // 저장 중이면 취소 버튼도 비활성화
            >
              취소
            </CommonButton>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AnimalFormPage;
