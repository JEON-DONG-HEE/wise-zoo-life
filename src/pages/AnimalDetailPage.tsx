/* useParams는 URL에 들어있는 값을 꺼내는 React Router 기능 */
/* useNavigate 는 코드로 페이지 이동할 때 쓰는 기능 */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimalById } from "../services/animalService";
import type { Animal } from "../types/animal";

function AnimalDetailPage() {
  const { id } = useParams();
  const animalId = Number(id); // useParams()에서 나온 id는 문자열 -> 숫자로 바꿔야 함
  const navigate = useNavigate();
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      const data = await getAnimalById(animalId);

      if (data) {
        setAnimal(data);
      }
    };
    fetchAnimal();
  }, [animalId]);

  return (
    <main className="page-content">
      <section className="summary-card">
        {/* 
          브라우저 히스토리에서 한 단계 뒤로가기.
          목록 카드처럼 '링크 이동'은 Link,
          뒤로가기나 저장 후 이동처럼 '동작 후 이동'은 useNavigate
        */}
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          뒤로가기
        </button>
        <h2>동물 상세 정보</h2>
        <p>선택한 동물의 상세 정보를 확인합니다.</p>

        {animal ? (
          <div>
            <p>이름 : {animal.name}</p>
            <p>종 : {animal.species}</p>
            <p>부서 : {animal.department}</p>
            <p>담당 사육사 : {animal.keeper}</p>
          </div>
        ) : (
          <p>동물 정보를 불러오는 중입니다.</p>
        )}
      </section>
    </main>
  );
}

export default AnimalDetailPage;
