import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";

function AnimalFormPage() {
  const [formValues, setFormValues] = useState({
    name: "",
    species: "",
    department: "",
    keeper: "",
  });
  const navigate = useNavigate();

  // 폼 입력값 저장
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("등록할 동물 데이터 : ", formValues);
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
            <div className="form-actions">
              <CommonButton variant="primary" type="submit">
                저장
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
