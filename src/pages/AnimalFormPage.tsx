import { useState, type ChangeEvent, type FormEvent } from "react";

function AnimalFormPage() {
  const [formValues, setFormValues] = useState({
    name: "",
    species: "",
    department: "",
    keeper: "",
  });

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
              {/* type="submit" submit 이벤트 발생 */}
              <button type="submit">저장</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AnimalFormPage;
