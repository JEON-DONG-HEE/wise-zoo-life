import { useState } from "react";
import { animalData } from "../data/animalData";
import AnimalCard from "./AnimalCard";

function AnimalList() {
  const [animals, setAnimals] = useState(animalData);
  const handleShowAll = () => {
    setAnimals(animalData);
  };
  const handleShowActive = () => {
    const activeAnimals = animalData.filter(
      (animal) => animal.status === "ACTIVE",
    );
    setAnimals(activeAnimals);
  };
  const handleShowResting = () => {
    const restingAnimals = animalData.filter(
      (animal) => animal.status === "RESTING",
    );
    setAnimals(restingAnimals);
  };

  return (
    <section className="animal-list">
      <h2>동물 목록</h2>
      <p>현재 동물 수 : ({animals.length})</p>
      <div className="filter-buttons">
        <button type="button" onClick={handleShowAll}>
          전체
        </button>
        <button type="button" onClick={handleShowActive}>
          관리중
        </button>
        <button type="button" onClick={handleShowResting}>
          휴식중
        </button>
      </div>
      <ul>
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </ul>
    </section>
  );
}

export default AnimalList;
