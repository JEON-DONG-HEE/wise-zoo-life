import type { Animal } from "../types/animal";
import AnimalStatusBadge from "./AnimalStatusBadge";
import { Link } from "react-router-dom";

type AnimalCardProps = {
  animal: Animal;
};

function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <li className="animal-card">
      <Link to={`/animals/${animal.id}`} className="animal-card-link">
        <strong>{animal.id}</strong>
        <strong>{animal.name}</strong>
        <strong>{animal.species}</strong>
        <strong>{animal.department}</strong>
        <strong>{animal.keeper}</strong>
        <AnimalStatusBadge status={animal.status} />
      </Link>
    </li>
  );
}

export default AnimalCard;
