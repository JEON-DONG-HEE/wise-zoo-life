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
      <p>AnimalForm 테스트</p>
      <p>현재 이름 : {formValues.name}</p>
      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitText}
      </button>

      <button type="button" onClick={onCancel}>
        취소
      </button>
    </form>
  );
}

export default AnimalForm;
