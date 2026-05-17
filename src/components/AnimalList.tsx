import { useState } from "react";
import { animalData } from "../data/animalData";
import AnimalCard from "./AnimalCard";

/* 필터 버튼 상태는 아래 4개 중 하나만 가능 */
type FilterStatus = "ALL" | "ACTIVE" | "RESTING" | "TRANSFERRED";

function AnimalList() {
  const [animals, setAnimals] = useState(animalData);
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("ALL");
  const [loading, setLoading] = useState(false);

  const handleFilterAnimals = (status: FilterStatus) => {
    setLoading(true);

    setTimeout(() => {
      // 전체 보기라면 필터링하지 말고 원본 전체 데이터를 넣고 함수를 종료
      if (status === "ALL") {
        setAnimals(animalData);
        setSelectedStatus("ALL");
        setLoading(false);
        return;
      }

      const filteredAnimals = animalData.filter(
        (animal) => animal.status === status,
      );

      setAnimals(filteredAnimals);
      setSelectedStatus(status);
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
          onClick={() => handleFilterAnimals("ALL")} // 인자를 넘겨야 하는 함수는 () => 함수명(값) 형태로 감싸야 함
        >
          전체
        </button>
        <button
          type="button"
          className={selectedStatus === "ACTIVE" ? "active" : ""}
          onClick={() => handleFilterAnimals("ACTIVE")}
        >
          관리중
        </button>
        <button
          type="button"
          className={selectedStatus === "RESTING" ? "active" : ""}
          onClick={() => handleFilterAnimals("RESTING")}
        >
          휴식중
        </button>
        <button
          type="button"
          className={selectedStatus === "TRANSFERRED" ? "active" : ""}
          onClick={() => handleFilterAnimals("TRANSFERRED")}
        >
          이동완료
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : animals.length === 0 ? (
        <p className="empty-message">조회된 동물이 없습니다.</p>
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
