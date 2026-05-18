import AnimalList from "../components/AnimalList";

function AnimalListPage() {
  return (
    <main className="page-content">
      <section className="summary-card">
        <h2>동물 정보 관리</h2>
        <p>동물 목록, 상태, 담당 사육사 정보를 관리합니다.</p>
      </section>

      <AnimalList />
    </main>
  );
}

export default AnimalListPage;
