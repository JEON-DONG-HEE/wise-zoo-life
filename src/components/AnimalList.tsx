import { useEffect, useState } from "react";
import { getAnimals } from "../services/animalService";
import AnimalCard from "./AnimalCard";
import type { Animal, FilterStatus } from "../types/animal";
import LoadingMessage from "./LoadingMessage";
import EmptyMessage from "./EmptyMessage";
import ErrorMessage from "./ErrorMessage";
import AnimalSearchBox from "./AnimalSearchBox";
import AnimalFilterButtons from "./AnimalFilterButtons";

function AnimalList() {
  const [animals, setAnimals] = useState<Animal[]>([]); //animals는 Animal 객체들이 들어가는 배열
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        setError(""); // 이전 에러 초기화

        const data = await getAnimals(); //getAnimals() 결과가 올 때까지 기다린다. 결과가 오면 data에 담는다.

        setAnimals(data);
      } catch {
        setError("동물 데이터를 불러오지 못했습니다.");
      } finally {
        // 성공하든 실패하든 마지막에 무조건 실행.
        setLoading(false);
      }
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

  const searchedAnimals = animals.filter((animal) => {
    const lowerKeyword = keyword.toLowerCase(); // 영어 검색 대비용

    return (
      animal.name.toLowerCase().includes(lowerKeyword) ||
      animal.species.toLowerCase().includes(lowerKeyword) ||
      animal.department.toLowerCase().includes(lowerKeyword) ||
      animal.keeper.toLowerCase().includes(lowerKeyword)
    );
  });

  // 동물 리스트 카드 (early return 방식 : 예외 상황 먼저 처리 → 마지막에 정상 화면 return)
  // 데이터 loading, error, empty, success 처리
  const renderAnimalList = () => {
    if (loading) return <LoadingMessage />;
    if (error) return <ErrorMessage message={error} />;
    if (searchedAnimals.length === 0) return <EmptyMessage />;

    return (
      <ul>
        {searchedAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </ul>
    );
  };

  return (
    <section className="animal-list">
      <h2>동물 목록</h2>
      <p>현재 동물 수 : ({searchedAnimals.length})</p>
      <AnimalSearchBox keyword={keyword} onChangeKeyword={setKeyword} />
      <AnimalFilterButtons
        selectedStatus={selectedStatus}
        onChangeStatus={handleFilterAnimals}
      />
      {renderAnimalList()}
    </section>
  );
}

export default AnimalList;
