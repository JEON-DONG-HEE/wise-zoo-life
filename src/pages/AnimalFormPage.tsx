import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import type { Animal, AnimalStatus } from "../types/animal";
import { addAnimal } from "../services/animalService";

// 폼에 입력될 값들의 형태를 미리 정해둔 타입
type AnimalFormValues = {
  name: string;
  species: string;
  department: string;
  keeper: string;
  age: string;
  status: AnimalStatus;
  joinedDate: string;
};

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
  const [submitting, setSubmitting] = useState(false); // 저장 중 state 추가, submitting : 저장 중인지 여부
  const navigate = useNavigate();

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

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault(); // submit 할 때 기본 새로고침 막기
    // console.log("등록할 동물 데이터 : ", formValues);

    // 저장 중 에러가 나면 setSubmitting(false) 가 실행되지 않을 수 있어서 try/finally 사용
    try {
      setSubmitting(true);

      const newAnimal: Animal = {
        id: Date.now(),
        name: formValues.name,
        species: formValues.species,
        department: formValues.department,
        keeper: formValues.keeper,
        age: Number(formValues.age), // 입력창에서 들어온 string 을 Number 로 바꿈
        status: formValues.status,
        joinedDate: formValues.joinedDate,
      };

      // console.log("등록할 동물 데이터 : ", newAnimal);

      // 등록 폼 submit 시 addAnimal 호출
      const savedAnimal = await addAnimal(newAnimal);
      console.log("저장 완료 : ", savedAnimal);
      alert("동물 정보가 등록되었습니다.");
      navigate("/animals"); // 저장 완료 후 목록 이동
    } finally {
      setSubmitting(false); // 성공/실패와 관계없이 submitting false
    }
  };

  return (
    <div>
      <main className="page-content">
        <section className="summary-card">
          <h2>동물 등록</h2>
          <p>새로운 동물 정보를 등록합니다.</p>

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
              <CommonButton variant="secondary" onClick={() => navigate(-1)}>
                취소
              </CommonButton>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AnimalFormPage;
