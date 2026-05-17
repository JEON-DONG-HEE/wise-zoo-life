import { useEffect, useState } from "react";
import { getAnimals } from "../services/animalService";
import AnimalCard from "./AnimalCard";
import type { Animal } from "../types/animal";

/* 필터 버튼 상태는 아래 4개 중 하나만 가능 */
type FilterStatus = "ALL" | "ACTIVE" | "RESTING" | "TRANSFERRED";

function AnimalList() {
  const [animals, setAnimals] = useState<Animal[]>([]); //animals는 Animal 객체들이 들어가는 배열
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("ALL");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      const data = await getAnimals(); //getAnimals() 결과가 올 때까지 기다린다. 결과가 오면 data에 담는다.
      setAnimals(data);
      setLoading(false);
    };
    fetchAnimals();
  }, []);

  const handleFilterAnimals = async (status: FilterStatus) => {
    setLoading(true);

    const data = await getAnimals();

    // 전체 보기라면 필터링하지 말고 원본 전체 데이터를 넣고 함수를 종료
    if (status === "ALL") {
      setAnimals(data);
      setSelectedStatus("ALL");
      setLoading(false);
      return;
    }

    const filteredAnimals = data.filter((animal) => animal.status === status);

    setAnimals(filteredAnimals);
    setSelectedStatus(status);
    setLoading(false);
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
