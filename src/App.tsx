import { useState } from "react";
import "./App.css";
import { animalData } from "./data/animalData";
import AnimalCard from "./components/AnimalCard";

function App() {
  return (
    <div className="app">
      <header className="page-header">
        <h1>슬기로운 동물원 생활</h1>
        <p>동물 정보를 관리하는 인사파트 연습 프로젝트입니다.</p>
      </header>

      <main className="page-content">
        <section className="summary-card">
          <h2>동물 정보 관리</h2>
          <p>동물 목록, 상태, 담당 사육사 정보를 관리합니다.</p>
        </section>

        <section className="animal-list">
          <h2></h2>
          <ul>
            {animalData.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
