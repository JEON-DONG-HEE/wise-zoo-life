// Routes   :  여러 Route를 감싸는 부모
// Route    :  특정 주소에 어떤 페이지를 보여줄지 정함
// Navigate :  다른 주소로 이동시킴
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AnimalListPage from "./pages/AnimalListPage";
import AnimalDetailPage from "./pages/AnimalDetailPage";
import AnimalFormPage from "./pages/AnimalFormPage";
import AnimalEditPage from "./pages/AnimalEditPage";

function App() {
  return (
    <div className="app">
      <header className="page-header">
        <h1>슬기로운 동물원 생활</h1>
        <p>동물 정보를 관리하는 인사파트 연습 프로젝트입니다.</p>
      </header>

      <Routes>
        {/* / 주소로 들어오면 /animals로 이동 */}
        <Route path="/" element={<Navigate to="/animals" replace />} />{" "}
        <Route path="/animals" element={<AnimalListPage />} />
        <Route path="/animals/new" element={<AnimalFormPage />} />
        <Route path="/animals/:id/edit" element={<AnimalEditPage />} />
        <Route path="/animals/:id" element={<AnimalDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
