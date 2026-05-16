import { useState } from "react";
import { animalData } from "../data/animalData";
import AnimalCard from "./AnimalCard";

function AnimalList() {
  const [animals, setAnimals] = useState(animalData);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const handleShowAll = () => {
    setLoading(true);

    setTimeout(() => {
      setAnimals(animalData);
      setSelectedStatus("ALL");
      setLoading(false);
    }, 500); /* 로딩 상태 확인용 임시 지연 처리 */
  };
  const handleShowActive = () => {
    setLoading(true);

    setTimeout(() => {
      const activeAnimals = animalData.filter(
        (animal) => animal.status === "ACTIVE",
      );
      setAnimals(activeAnimals);
      setSelectedStatus("ACTIVE");
      setLoading(false);
    }, 500);
  };
  const handleShowResting = () => {
    setLoading(true);

    setTimeout(() => {
      const restingAnimals = animalData.filter(
        (animal) => animal.status === "RESTING",
      );
      setAnimals(restingAnimals);
      setSelectedStatus("RESTING");
      setLoading(false);
    }, 500);
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default AnimalList;
