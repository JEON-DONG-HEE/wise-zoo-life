import type { ChangeEvent, SyntheticEvent } from "react";
import type { AnimalFormValues } from "../types/animalForm";

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

      {error && <p className="error-message">{error}</p>}

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitText}
        </button>
        <button type="button" onClick={onCancel} disabled={submitting}>
          취소
        </button>
      </div>
    </form>
  );
}

export default AnimalForm;
