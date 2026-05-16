import { animalData } from "../data/animalData";
import AnimalCard from "./AnimalCard";

function AnimalList() {
  return (
    <section className="animal-list">
      <h2>동물 목록</h2>
      <ul>
        {animalData.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </ul>
    </section>
  );
}

export default AnimalList;
