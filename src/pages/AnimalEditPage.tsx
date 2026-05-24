import { useParams } from "react-router-dom";

function AnimalEditPage() {
  const { id } = useParams();
  const animalId = Number(id);

  console.log("현재 페이지 아이디 : ", animalId);

  return (
    <main className="page-content">
      <section className="summary-card">
        <h2>동물 정보 수정</h2>
        <p>기존 동물 정보를 수정합니다.</p>
      </section>
    </main>
  );
}

export default AnimalEditPage;
