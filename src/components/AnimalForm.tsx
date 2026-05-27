import type { ChangeEvent, SyntheticEvent } from "react";
import type { AnimalFormValues } from "../types/animalForm";
import CommonButton from "../components/CommonButton";

type AnimalFormProps = {
  formValues: AnimalFormValues;
  error: string;
  submitting: boolean;
  submitText: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

function AnimalForm({
  formValues,
  error,
  submitting,
  submitText,
  onChange,
  onSubmit,
  onCancel,
}: AnimalFormProps) {
  return (
    <form className="animal-form" onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="name">동물이름</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formValues.name}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          placeholder="예: 8"
        />
      </div>
      <div className="form-field">
        <label htmlFor="status">상태</label>
        <select
          id="status"
          name="status"
          value={formValues.status}
          onChange={onChange}
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
          onChange={onChange}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="form-actions">
        <CommonButton
          variant="primary"
          type="submit"
          disabled={submitting} // boolean 값이면 삼항연산자로 true/false를 다시 만들 필요 없음, 그 값 자체를 넣으면 됨
        >
          {submitText}
        </CommonButton>

        {/* 폼 안에 있는 버튼은 기본적으로 submit처럼 동작할 수 있어서, 취소 버튼은 반드시 type="button"이어야 함
              CommonButton 컴포넌트에서 type 기본 값이 button 이므로 아래처럼 type 을 지정하지 않아도 동작함   */}
        <CommonButton
          variant="secondary"
          onClick={onCancel}
          disabled={submitting} // 저장 중이면 취소 버튼도 비활성화
        >
          취소
        </CommonButton>
      </div>
    </form>
  );
}

export default AnimalForm;
