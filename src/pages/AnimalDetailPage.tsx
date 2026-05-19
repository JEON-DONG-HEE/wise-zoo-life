/* useParams는 URL에 들어있는 값을 꺼내는 React Router 기능 */
/* useNavigate 는 코드로 페이지 이동할 때 쓰는 기능 */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimalById } from "../services/animalService";
import type { Animal } from "../types/animal";
import AnimalStatusBadge from "../components/AnimalStatusBadge";
import CommonButton from "../components/CommonButton";
import ConfirmModal from "../components/ConfirmModal";

function AnimalDetailPage() {
  const { id } = useParams();
  const animalId = Number(id); // useParams()에서 나온 id는 문자열 -> 숫자로 바꿔야 함
  const navigate = useNavigate();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchAnimal = async () => {
      setLoading(true);

      const data = await getAnimalById(animalId);

      if (data) {
        setAnimal(data);
      }

      setLoading(false);
    };
    fetchAnimal();
  }, [animalId]);

  const renderAnimalDetail = () => {
    if (loading) return <p>동물 정보를 불러오는 중입니다.</p>;
    if (!animal) return <p>동물 정보를 찾을 수 없습니다.</p>;

    return (
      <div className="animal-detail">
        <p>이름 : {animal.name}</p>
        <p>종 : {animal.species}</p>
        <p>부서 : {animal.department}</p>
        <p>담당 사육사 : {animal.keeper}</p>
        <p>나이 : {animal.age}살</p>
        <p>등록일 : {animal.joinedDate}</p>
        <div className="animal-detail-status">
          <span>상태 : </span>
          <AnimalStatusBadge status={animal.status} />
        </div>
      </div>
    );
  };

  return (
    <main className="page-content">
      <section className="summary-card">
        {/* 
          브라우저 히스토리에서 한 단계 뒤로가기.
          목록 카드처럼 '링크 이동'은 Link,
          뒤로가기나 저장 후 이동처럼 '동작 후 이동'은 useNavigate
        */}
        <CommonButton variant="secondary" onClick={() => navigate(-1)}>
          뒤로가기
        </CommonButton>

        <div className="button-test-area">
          <CommonButton variant="primary" onClick={() => alert("저장")}>
            저장
          </CommonButton>
          <CommonButton variant="secondary" onClick={() => alert("취소")}>
            취소
          </CommonButton>
          <CommonButton
            variant="danger"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            삭제
          </CommonButton>
        </div>

        <h2>동물 상세 정보</h2>
        <p>선택한 동물 ID: {id}</p>

        {renderAnimalDetail()}
      </section>
      {/* ModalOpen이 true일 때만 ConfirmModal을 보여줘라 */}
      {isDeleteModalOpen && <ConfirmModal />}{" "}
    </main>
  );
}

export default AnimalDetailPage;
