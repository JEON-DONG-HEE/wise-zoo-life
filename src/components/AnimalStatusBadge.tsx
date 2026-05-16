import type { AnimalStatus } from "../types/animal";

type AnimalStatusBadgeProps = {
  status: AnimalStatus;
};

function AnimalStatusBadge({ status }: AnimalStatusBadgeProps) {
  const statusText = {
    ACTIVE: "관리중",
    RESTING: "휴식중",
    TRANSFERRED: "이동완료",
  };

  return <span className={`status-badge ${status}`}>{statusText[status]}</span>;
}

export default AnimalStatusBadge;
