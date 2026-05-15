import type { Animal } from "../types/animal";

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
    </li>
  );
}

export default AnimalCard;
