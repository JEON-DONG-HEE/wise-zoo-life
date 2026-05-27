import type { AnimalStatus } from "./animal";

export type AnimalFormValues = {
  name: string;
  species: string;
  department: string;
  keeper: string;
  age: string;
  status: AnimalStatus;
  joinedDate: string;
};
