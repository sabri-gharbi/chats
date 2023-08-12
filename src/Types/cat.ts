export type Cat = {
  id: string;
  name: string;
  birthDate: Date;
  breed: string;
  gender: "Male" | "Female";
  city: string;
  description: string;
  photo: string;
  adoptionStatus: "Available" | "Adopted";
};
