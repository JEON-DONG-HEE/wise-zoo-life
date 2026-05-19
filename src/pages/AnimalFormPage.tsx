import { useState } from "react";

function AnimalFormPage() {
  const [formValues, setFormValues] = useState({
    name: "",
    species: "",
    department: "",
    keeper: "",
  });

  return (
    <div>
      <main className="page-content">
        <section className="summary-card">
          <h2>동물 등록</h2>
          <p>새로운 동물 정보를 등록합니다.</p>

          <form className="animal-form">
            <div className="form-field">
              <label htmlFor="name">동물이름</label>
              <input
                id="name"
                type="text"
                value={formValues.name}
                onChange={(event) =>
                  setFormValues({
                    ...formValues, // 기존 입력값들은 유지한다
                    name: event.target.value, // 그중 name 값만 새 입력값으로 바꾼다.
                  })
                }
                placeholder="예: 레오"
              />
            </div>
            <div className="form-field">
              <label htmlFor="species">종</label>
              <input
                id="species"
                type="text"
                value={formValues.species}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    species: event.target.value,
                  })
                }
                placeholder="예: 사자"
              />
            </div>
            <div className="form-field">
              <label htmlFor="department">부서</label>
              <input
                id="department"
                type="text"
                value={formValues.department}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    department: event.target.value,
                  })
                }
                placeholder="예: 맹수팀"
              />
            </div>
            <div className="form-field">
              <label htmlFor="keeper">담당 사육사</label>
              <input
                id="keeper"
                type="text"
                value={formValues.keeper}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    keeper: event.target.value,
                  })
                }
                placeholder="예: 김사육"
              />
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AnimalFormPage;
