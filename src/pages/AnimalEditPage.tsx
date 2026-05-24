import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimalById } from "../services/animalService";
import type { Animal } from "../types/animal";

function AnimalEditPage() {
  const { id } = useParams();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const animalId = Number(id);

  useEffect(() => {
    const fetchAnimal = async () => {
      const data = await getAnimalById(animalId);

      console.log("수정 대상 : ", data);

      setAnimal(data ?? null); // data가 있으면 data, undefined 면 null 사용
    };
    fetchAnimal();
  }, [animalId]);

  return (
    <main className="page-content">
      <section className="summary-card">
        <h2>동물 정보 수정</h2>
        <p>기존 동물 정보를 수정합니다.</p>
        <p>수정할 동물 ID : {animalId}</p>
        <p>수정할 동물 이름 : {animal?.name}</p>
      </section>
    </main>
  );
}

export default AnimalEditPage;
