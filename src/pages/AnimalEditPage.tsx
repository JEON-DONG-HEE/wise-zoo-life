import { useParams } from "react-router-dom";
import { useEffect, useState, type ChangeEvent } from "react";
import { getAnimalById } from "../services/animalService";
import type { Animal, AnimalStatus } from "../types/animal";

type AnimalFormValues = {
  name: string;
  species: string;
  department: string;
  keeper: string;
  age: string;
  status: AnimalStatus;
  joinedDate: string;
};

function AnimalEditPage() {
  const { id } = useParams();
  const animalId = Number(id);
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [formValues, setFormValues] = useState<AnimalFormValues>({
    name: "",
    species: "",
    department: "",
    keeper: "",
    age: "",
    status: "ACTIVE",
    joinedDate: "",
  });

  useEffect(() => {
    const fetchAnimal = async () => {
      const data = await getAnimalById(animalId);

      console.log("수정 대상 : ", data);

      setAnimal(data ?? null); // data가 있으면 data, undefined 면 null 사용

      if (!data) return;

      setFormValues({
        name: data.name,
        species: data.species,
        department: data.department,
        keeper: data.keeper,
        age: String(data.age), // 기존 동물의 숫자 나이를 input value 에 넣기 위해 문자열로 바꿈
        status: data.status,
        joinedDate: data.joinedDate,
      });
    };
    fetchAnimal();
  }, [animalId]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    // console.log("변경된 필드 이름 : ", name);
    // console.log("변경된 값 : ", value);

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <main className="page-content">
      <section className="summary-card">
        <h2>동물 정보 수정</h2>
        <p>기존 동물 정보를 수정합니다.</p>
        <p>수정 폼 이름 값 : {formValues.name}</p>
        <p>수정 폼 나이 값 : {formValues.age}</p>
      </section>
    </main>
  );
}

export default AnimalEditPage;
