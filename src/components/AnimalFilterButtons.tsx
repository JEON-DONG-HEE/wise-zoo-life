import type { FilterStatus } from "../types/animal";

type AnimalFilterButtonsProps = {
  selectedStatus: FilterStatus;
  onChangeStatus: (status: FilterStatus) => void;
};

const filterOptions: { label: string; value: FilterStatus }[] = [
  { label: "전체", value: "ALL" },
  { label: "관리중", value: "ACTIVE" },
  { label: "휴식중", value: "RESTING" },
  { label: "이동완료", value: "TRANSFERRED" },
];

function AnimalFilterButtons({
  selectedStatus,
  onChangeStatus,
}: AnimalFilterButtonsProps) {
  return (
    <div className="filter-buttons">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          className={selectedStatus === option.value ? "active" : ""}
          onClick={() => onChangeStatus(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default AnimalFilterButtons;
