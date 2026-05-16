import { useState } from "react";
import { animalData } from "../data/animalData";
import AnimalCard from "./AnimalCard";

function AnimalList() {
  const [animals, setAnimals] = useState(animalData);
  const [selectedStatus, setselectedStatus] = useState("ALL");

  const handleShowAll = () => {
    setAnimals(animalData);
    setselectedStatus("ALL");
  };
  const handleShowActive = () => {
    const activeAnimals = animalData.filter(
      (animal) => animal.status === "ACTIVE",
    );
    setAnimals(activeAnimals);
    setselectedStatus("ACTIVE");
  };
  const handleShowResting = () => {
    const restingAnimals = animalData.filter(
      (animal) => animal.status === "RESTING",
    );
    setAnimals(restingAnimals);
    setselectedStatus("RESTING");
  };

  return (
    <section className="animal-list">
      <h2>동물 목록</h2>
      <p>현재 동물 수 : ({animals.length})</p>
      <div className="filter-buttons">
        <button
          type="button"
          className={selectedStatus === "ALL" ? "active" : ""}
          onClick={handleShowAll}
        >
          전체
        </button>
        <button
          type="button"
          className={selectedStatus === "ACTIVE" ? "active" : ""}
          onClick={handleShowActive}
        >
          관리중
        </button>
        <button
          type="button"
          className={selectedStatus === "RESTING" ? "active" : ""}
          onClick={handleShowResting}
        >
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
