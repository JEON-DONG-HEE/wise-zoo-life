import type { Animal } from "../types/animal";
import AnimalStatusBadge from "./AnimalStatusBadge";

type AnimalCardProps = {
  animal: Animal;
};

function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <li className="animal-card">
      <strong>{animal.id}</strong>
      <strong>{animal.name}</strong>
      <strong>{animal.species}</strong>
      <strong>{animal.department}</strong>
      <strong>{animal.keeper}</strong>
      <AnimalStatusBadge status={animal.status} />
    </li>
  );
}

export default AnimalCard;
